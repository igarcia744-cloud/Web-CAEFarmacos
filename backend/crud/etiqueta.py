from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from sqlalchemy import delete
from models.etiqueta import Etiqueta
from models.relaciones_etiquetas import compuesto_etiquetas, libreria_etiquetas


async def obtener_etiquetas(db: AsyncSession):

    resultado = await db.execute(select(Etiqueta))

    return resultado.scalars().all()


async def obtener_etiqueta(db: AsyncSession, etiqueta_id: int):

    resultado = await db.execute(
        select(Etiqueta).where(Etiqueta.id == etiqueta_id)
    )

    return resultado.scalar_one_or_none()


async def crear_etiqueta(db: AsyncSession, nombre: str):

    etiqueta = Etiqueta(nombre=nombre)

    db.add(etiqueta)

    await db.commit()

    await db.refresh(etiqueta)

    return etiqueta


async def actualizar_etiqueta(db: AsyncSession, etiqueta_id: int, nombre: str):

    etiqueta = await obtener_etiqueta(db, etiqueta_id)

    if not etiqueta:
        return None

    etiqueta.nombre = nombre

    await db.commit()

    await db.refresh(etiqueta)

    return etiqueta


async def eliminar_etiqueta(db, etiqueta_id: int):

    etiqueta = await db.get(Etiqueta, etiqueta_id)

    if not etiqueta:
        return None
    
    await db.execute(
        delete(compuesto_etiquetas).where(
            compuesto_etiquetas.c.etiqueta_id == etiqueta_id
        )
    )

    await db.execute(
        delete(libreria_etiquetas).where(
            libreria_etiquetas.c.etiqueta_id == etiqueta_id
        )
    )

    await db.delete(etiqueta)

    await db.commit()

    return True