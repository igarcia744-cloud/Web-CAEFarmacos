from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import os

from sqlalchemy.orm import selectinload
from models.etiqueta import Etiqueta
from models.compuesto import Compuesto
from models.libreria import Libreria
from models.relaciones_etiquetas import compuesto_etiquetas

from auth import STORAGE_PATH


async def obtener_compuestos(db: AsyncSession):

    resultado = await db.execute(
        select(
            Compuesto,
            Libreria.nombre.label("libreria_nombre")
        ).join(
            Libreria,
            Compuesto.libreria_id == Libreria.id
        )
    )

    datos = resultado.all()

    resultado_etiquetas = await db.execute(
        select(
            compuesto_etiquetas.c.compuesto_id,
            Etiqueta.id,
            Etiqueta.nombre
        ).join(
            Etiqueta,
            Etiqueta.id == compuesto_etiquetas.c.etiqueta_id
        )
    )

    etiquetas = resultado_etiquetas.all()

    etiquetas_dict = {}

    for comp_id, et_id, et_nombre in etiquetas:
        etiquetas_dict.setdefault(comp_id, []).append({
            "id": et_id,
            "nombre": et_nombre
        })

    return [
        {
            "id": comp.id,
            "nombre_archivo": comp.nombre_archivo,
            "ruta_archivo": comp.ruta_archivo,  # 🔥 RELATIVA
            "libreria_id": comp.libreria_id,
            "libreria_nombre": nombre_libreria,
            "etiquetas": etiquetas_dict.get(comp.id, [])
        }
        for comp, nombre_libreria in datos
    ]


async def obtener_compuesto(db: AsyncSession, compuesto_id: int):

    resultado = await db.execute(
        select(Compuesto)
        .where(Compuesto.id == compuesto_id)
        .options(selectinload(Compuesto.etiquetas))
    )

    return resultado.scalar_one_or_none()


async def crear_compuesto(
    db: AsyncSession,
    nombre_archivo: str,
    ruta_archivo: str, 
    libreria_id: int,
    usuario_id: int
):

    compuesto = Compuesto(
        nombre_archivo=nombre_archivo,
        ruta_archivo=ruta_archivo,
        libreria_id=libreria_id,
        subido_por=usuario_id
    )

    db.add(compuesto)
    await db.commit()
    await db.refresh(compuesto)

    return compuesto


async def actualizar_compuesto(db, compuesto_id, datos):

    resultado = await db.execute(
        select(Compuesto)
        .options(
            selectinload(Compuesto.etiquetas)
        )
        .where(
            Compuesto.id == compuesto_id
        )
    )

    compuesto = resultado.scalar_one_or_none()

    if not compuesto:
        return None

    ruta_relativa = compuesto.ruta_archivo
    nuevo_nombre = datos.nombre_archivo

    if ruta_relativa:

        ruta_actual = os.path.join(
            STORAGE_PATH,
            ruta_relativa
        )

        carpeta = os.path.dirname(
            ruta_relativa
        )

        nueva_ruta_relativa = os.path.join(
            carpeta,
            nuevo_nombre
        )

        nueva_ruta = os.path.join(
            STORAGE_PATH,
            nueva_ruta_relativa
        )

        if os.path.exists(ruta_actual):
            os.rename(
                ruta_actual,
                nueva_ruta
            )

        compuesto.ruta_archivo = nueva_ruta_relativa

    compuesto.nombre_archivo = nuevo_nombre
    compuesto.libreria_id = datos.libreria_id

    await db.commit()

    resultado = await db.execute(
        select(Compuesto)
        .options(
            selectinload(Compuesto.etiquetas)
        )
        .where(
            Compuesto.id == compuesto_id
        )
    )

    compuesto_actualizado = resultado.scalar_one()

    return compuesto_actualizado


async def eliminar_compuesto(db, compuesto_id: int):

    compuesto = await db.get(Compuesto, compuesto_id)

    if not compuesto:
        return None

    if compuesto.ruta_archivo:

        ruta_real = os.path.join(STORAGE_PATH, compuesto.ruta_archivo)

        if os.path.exists(ruta_real):
            os.remove(ruta_real)

    await db.delete(compuesto)
    await db.commit()

    return True