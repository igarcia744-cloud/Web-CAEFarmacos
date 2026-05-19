from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from auth import get_current_user
from database import get_db
from models.libreria import Libreria
from models.compuesto import Compuesto

router = APIRouter(prefix="/explorador", tags=["explorador"], dependencies=[Depends(get_current_user)])


@router.get("/")
async def explorar(ruta: str = "librerias", db: AsyncSession = Depends(get_db)):

    partes = ruta.split("/")

    if len(partes) == 1:

        resultado = await db.execute(
            select(Libreria).options(selectinload(Libreria.etiquetas))
        )

        librerias = resultado.scalars().all()

        return [
            {
                "id": l.id,
                "nombre": l.nombre,
                "tipo": "carpeta",
                "etiquetas": [e.nombre for e in l.etiquetas]
            }
            for l in librerias
        ]

    if len(partes) == 2:

        nombre_libreria = partes[1]

        resultado = await db.execute(
            select(Libreria).where(Libreria.nombre == nombre_libreria)
        )

        libreria = resultado.scalar_one_or_none()

        if not libreria:
            return []

        resultado = await db.execute(
            select(Compuesto).where(Compuesto.libreria_id == libreria.id)
        )

        compuestos = resultado.scalars().all()

        return [
            {
                "id": c.id,
                "nombre": c.nombre_archivo,
                "tipo": "archivo"
            }
            for c in compuestos
        ]

    return []