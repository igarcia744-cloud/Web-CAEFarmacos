from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import select, func, delete
from models.etiqueta import Etiqueta
from models.libreria import Libreria
from models.compuesto import Compuesto
from models.relaciones_etiquetas import libreria_etiquetas

import shutil, os
from auth import STORAGE_PATH


async def obtener_librerias(db):

    resultado = await db.execute(
        select(
            Libreria.id,
            Libreria.nombre,
            Libreria.comentario,
            Libreria.ruta_zip,
            func.count(Compuesto.id).label("numero_compuestos")
        )
        .join(Compuesto, Compuesto.libreria_id == Libreria.id, isouter=True)
        .group_by(Libreria.id)
    )

    librerias = resultado.all()

    resultado_etiquetas = await db.execute(
        select(
            libreria_etiquetas.c.libreria_id,
            Etiqueta.id,
            Etiqueta.nombre
        )
        .join(Etiqueta, Etiqueta.id == libreria_etiquetas.c.etiqueta_id)
    )

    etiquetas = resultado_etiquetas.all()

    etiquetas_dict = {}

    for lib_id, et_id, et_nombre in etiquetas:
        etiquetas_dict.setdefault(lib_id, []).append({
            "id": et_id,
            "nombre": et_nombre
        })

    return [
        {
            "id": l.id,
            "nombre": l.nombre,
            "comentario": l.comentario,
            "ruta_zip": l.ruta_zip,  # 🔥 RELATIVA
            "numero_compuestos": l.numero_compuestos,
            "etiquetas": etiquetas_dict.get(l.id, [])
        }
        for l in librerias
    ]


async def obtener_libreria(db: AsyncSession, libreria_id: int):

    resultado = await db.execute(
        select(Libreria).where(Libreria.id == libreria_id)
    )

    return resultado.scalar_one_or_none()


async def actualizar_libreria(db, libreria_id, datos):

    libreria = await db.get(Libreria, libreria_id)

    if not libreria:
        return None

    nombre_antiguo = libreria.nombre
    ruta_relativa_antigua = libreria.ruta_zip

    nuevo_nombre = datos.nombre
    nuevo_comentario = datos.comentario

    if nuevo_nombre != nombre_antiguo and ruta_relativa_antigua:

        carpeta_base = os.path.dirname(ruta_relativa_antigua)
        nueva_ruta_relativa = os.path.join(carpeta_base, nuevo_nombre)

        ruta_antigua = os.path.join(STORAGE_PATH, ruta_relativa_antigua)
        nueva_ruta = os.path.join(STORAGE_PATH, nueva_ruta_relativa)

        if os.path.exists(ruta_antigua):
            os.rename(ruta_antigua, nueva_ruta)

        libreria.ruta_zip = nueva_ruta_relativa

    libreria.nombre = nuevo_nombre
    libreria.comentario = nuevo_comentario

    await db.commit()
    await db.refresh(libreria)

    return libreria


async def eliminar_libreria(db, libreria_id):

    libreria = await db.get(Libreria, libreria_id)

    if not libreria:
        return None

    # eliminar compuestos asociados
    await db.execute(
        delete(Compuesto).where(
            Compuesto.libreria_id == libreria_id
        )
    )

    # 🔥 eliminar carpeta real
    if libreria.ruta_zip:

        ruta_real = os.path.join(STORAGE_PATH, libreria.ruta_zip)

        if os.path.exists(ruta_real):
            shutil.rmtree(ruta_real)

    await db.delete(libreria)
    await db.commit()

    return True