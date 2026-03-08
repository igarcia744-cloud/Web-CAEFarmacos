from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from database import async_session
from models.usuario import Usuario
from schemas.usuario import UsuarioCreate, UsuarioUpdate, UsuarioOut
from security import hash_password
from auth import admin_required

router = APIRouter(
    prefix="/usuarios",
    tags=["usuarios"]
)

# Dependencia para sesión asíncrona
async def get_db():
    async with async_session() as session:
        yield session

# Crear usuario
@router.post("/", response_model=UsuarioOut)
async def crear_usuario(usuario: UsuarioCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Usuario).filter(Usuario.email == usuario.email))
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    
    hashed_pw = hash_password(usuario.password)
    nuevo = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        hashed_password=hashed_pw,
        es_admin=usuario.es_admin
    )
    db.add(nuevo)
    await db.commit()
    await db.refresh(nuevo)
    return nuevo

# Listar usuarios
@router.get("/", response_model=List[UsuarioOut])
async def listar_usuarios(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Usuario))
    return result.scalars().all()

# Actualizar usuario
@router.put("/{usuario_id}", response_model=UsuarioOut)
async def actualizar_usuario(usuario_id: int, usuario: UsuarioUpdate, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Usuario).filter(Usuario.id == usuario_id))
    db_usuario = result.scalar_one_or_none()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Si viene contraseña, la hasheamos
    if usuario.password:
        usuario.hashed_password = hash_password(usuario.password)
    
    for key, value in usuario.model_dump(exclude_unset=True).items():
        setattr(db_usuario, key, value)
    
    await db.commit()
    await db.refresh(db_usuario)
    return db_usuario

# Eliminar usuario
@router.delete("/{usuario_id}")
async def eliminar_usuario(usuario_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Usuario).filter(Usuario.id == usuario_id))
    db_usuario = result.scalar_one_or_none()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    await db.delete(db_usuario)
    await db.commit()
    return {"detail": "Usuario eliminado correctamente"}
