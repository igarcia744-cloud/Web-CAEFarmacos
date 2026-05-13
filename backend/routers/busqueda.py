from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from auth import get_current_user
from database import get_db

from models.libreria import Libreria
from models.compuesto import Compuesto
from models.etiqueta import Etiqueta

from schemas.busqueda import ResultadoBusqueda


router = APIRouter(prefix="/buscar", tags=["Busqueda"], dependencies=[Depends(get_current_user)])

@router.get("/", response_model=ResultadoBusqueda)
async def buscar_por_etiqueta(
    etiqueta: str,
    db: AsyncSession = Depends(get_db)
):

    resultado = await db.execute(
        select(Etiqueta).where(Etiqueta.nombre == etiqueta)
    )

    etiqueta_obj = resultado.scalar_one_or_none()

    if not etiqueta_obj:
        raise HTTPException(status_code=404, detail="Etiqueta no encontrada")

    resultado_librerias = await db.execute(
        select(Libreria).join(Libreria.etiquetas).where(Etiqueta.id == etiqueta_obj.id)
    )

    librerias = resultado_librerias.scalars().all()

    resultado_compuestos = await db.execute(
        select(Compuesto).join(Compuesto.etiquetas).where(Etiqueta.id == etiqueta_obj.id)
    )

    compuestos = resultado_compuestos.scalars().all()

    return {
        "etiqueta": etiqueta,
        "librerias": librerias,
        "compuestos": compuestos
    }

@router.get("/librerias/{etiqueta_id}")
async def buscar_librerias_por_etiqueta(
    etiqueta_id: int,
    db: AsyncSession = Depends(get_db)
):

    resultado = await db.execute(
        select(Libreria).join(Libreria.etiquetas).where(Etiqueta.id == etiqueta_id)
    )

    librerias = resultado.scalars().all()

    return librerias

@router.get("/compuestos/{etiqueta_id}")
async def buscar_compuestos_por_etiqueta(
    etiqueta_id: int,
    db: AsyncSession = Depends(get_db)
):

    resultado = await db.execute(
        select(Compuesto).join(Compuesto.etiquetas).where(Etiqueta.id == etiqueta_id)
    )

    compuestos = resultado.scalars().all()

    return compuestos