from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from models.etiqueta import Etiqueta
from database import get_db
from auth import get_current_user, STORAGE_PATH
from models.log import Log

import os
from models.libreria import Libreria
from models.compuesto import Compuesto
from sqlalchemy import select

from schemas.libreria import LibreriaActualizar, LibreriaRespuesta
from crud.libreria import (
    obtener_librerias,
    actualizar_libreria,
    eliminar_libreria
)

class EtiquetasUpdate(BaseModel):
    etiquetas_ids: list[int]

router = APIRouter(prefix="/librerias", tags=["Librerías"], dependencies=[Depends(get_current_user)])


@router.get("/", response_model=list[LibreriaRespuesta])
async def listar_librerias(
    db: AsyncSession = Depends(get_db)
):
    return await obtener_librerias(db)


@router.put("/{libreria_id}")
async def actualizar_libreria(
    libreria_id: int,
    datos: LibreriaActualizar,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403, detail="Solo administradores")

    libreria = await db.get(Libreria, libreria_id)

    if not libreria:
        raise HTTPException(status_code=404, detail="Compuesto no encontrado")

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

        resultado = await db.execute(
            select(Compuesto).where(Compuesto.libreria_id == libreria_id)
        )

        compuestos = resultado.scalars().all()

        for compuesto in compuestos:

            if compuesto.ruta_archivo:

                nombre_archivo = os.path.basename(compuesto.ruta_archivo)
                compuesto.ruta_archivo = os.path.join(
                    nueva_ruta_relativa,
                    nombre_archivo
                )

    libreria.nombre = nuevo_nombre
    libreria.comentario = nuevo_comentario

    await db.commit()
    await db.refresh(libreria)

    # log de acción
    log = Log(
        usuario_id=usuario.id,
        accion="update",
        descripcion=f"Librería con ID {libreria_id} modificada"
    )

    db.add(log)
    await db.commit()

    return libreria


@router.delete("/{libreria_id}")
async def eliminar(
    libreria_id: int,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403)

    resultado = await eliminar_libreria(db, libreria_id)

    if not resultado:
        raise HTTPException(status_code=404, detail="Compuesto no encontrado")

    # log
    log = Log(
        usuario_id=usuario.id,
        accion="delete",
        descripcion=f"Librería con ID {libreria_id} eliminada"
    )

    db.add(log)
    await db.commit()

    return {"mensaje": "Compuesto eliminado correctamente"}


@router.put("/{id}/etiquetas")
async def actualizar_etiquetas_libreria(
    id: int,
    datos: EtiquetasUpdate,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):
    
    if not usuario.es_admin:
        raise HTTPException(status_code=403)

    stmt = (
        select(Libreria)
        .where(Libreria.id == id)
        .options(selectinload(Libreria.etiquetas))
    )

    resultado = await db.execute(stmt)
    libreria = resultado.scalar_one_or_none()

    if not libreria:
        raise HTTPException(status_code=404, detail="No encontrado")

    resultado = await db.execute(
        select(Etiqueta).where(Etiqueta.id.in_(datos.etiquetas_ids))
    )

    etiquetas = resultado.scalars().all()

    libreria.etiquetas = etiquetas

    await db.commit()

    return {"ok": True}