from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime, timedelta
from jose import jwt, JWTError
from pydantic import BaseModel

from database import async_session
from models.usuario import Usuario
from security import verify_password

import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="seguridad.env")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
STORAGE_PATH = os.getenv("STORAGE_PATH")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

class LoginData(BaseModel):
    email: str
    password: str

# ---------------------------
# Función para crear token
# ---------------------------
def crear_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ---------------------------
# Autenticar usuario
# ---------------------------
async def autenticar_usuario(email: str, password: str, db: AsyncSession):
    result = await db.execute(select(Usuario).filter(Usuario.email == email))
    usuario = result.scalars().first()

    if not usuario:
        return None
    if not verify_password(password, usuario.hashed_password):
        return None
    return usuario

# ---------------------------
# Obtener usuario desde token
# ---------------------------
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar las credenciales",
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    async with async_session() as db:
        result = await db.execute(
            select(Usuario).filter(Usuario.id == int(user_id))
        )
        usuario = result.scalars().first()

        if usuario is None:
            raise credentials_exception

        return usuario

def crear_token_renovable(user_id: int):
    return crear_access_token({"sub": str(user_id)})

# ---------------------------
# LOGIN — ACEPTA JSON NORMAL
# ---------------------------
@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends()
):
    async with async_session() as db:

        usuario = await autenticar_usuario(
            form_data.username,
            form_data.password,
            db
        )

        if not usuario:
            raise HTTPException(
                status_code=401,
                detail="Credenciales incorrectas"
            )

        access_token = crear_access_token(data={"sub": str(usuario.id)})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": usuario.id,
            "nombre": usuario.nombre
        }

# ---------------------------
# Middleware para admins
# ---------------------------
async def admin_required(current_user: Usuario = Depends(get_current_user)):
    if not current_user.es_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permiso denegado, requiere administrador"
        )
    return current_user
