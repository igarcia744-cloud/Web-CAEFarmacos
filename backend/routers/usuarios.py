from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models.usuario import Usuario
from schemas.usuario import UsuarioCrear
from security import hash_password

router = APIRouter(
    prefix="/usuarios",
    tags=["usuarios"]
)


@router.post("/")
async def crear_usuario(
    datos: UsuarioCrear,
    db: AsyncSession = Depends(get_db)
):

    resultado = await db.execute(
        select(Usuario).where(
            Usuario.email == datos.email
        )
    )

    existe = resultado.scalar_one_or_none()

    if existe:
        raise HTTPException(
            status_code=400,
            detail="El email ya existe"
        )

    usuario = Usuario(
        nombre=datos.nombre,
        email=datos.email,
        hashed_password=hash_password(
            datos.password
        ),
        es_admin=datos.es_admin
    )

    db.add(usuario)

    await db.commit()
    await db.refresh(usuario)

    return usuario