from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

import os

from models.compuesto import Compuesto
from models.etiqueta import Etiqueta
from models.log import Log

from database import get_db
from auth import get_current_user, STORAGE_PATH

from schemas.compuesto import CompuestoRespuesta, CompuestoActualizar

from crud.compuesto import (
    obtener_compuestos,
    crear_compuesto,
    actualizar_compuesto,
    eliminar_compuesto
)

class EtiquetasUpdate(BaseModel):
    etiquetas_ids: list[int]

router = APIRouter(
    prefix="/compuestos",
    tags=["Compuestos"],
    dependencies=[Depends(get_current_user)]
)


@router.post("/")
async def crear(
    archivo: UploadFile = File(...),
    libreria_id: int = Form(...),
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not archivo.filename.endswith(".mol2"):
        raise HTTPException(status_code=400, detail="Solo mol2")

    ruta_relativa_libreria = os.path.join("librerias", f"libreria_{libreria_id}")

    ruta_libreria = os.path.join(STORAGE_PATH, ruta_relativa_libreria)

    os.makedirs(ruta_libreria, exist_ok=True)

    ruta_relativa_archivo = os.path.join(
        ruta_relativa_libreria,
        archivo.filename
    )

    ruta_archivo = os.path.join(
        STORAGE_PATH,
        ruta_relativa_archivo
    )

    with open(ruta_archivo, "wb") as buffer:
        buffer.write(await archivo.read())

    return await crear_compuesto(
        db,
        archivo.filename,
        ruta_relativa_archivo, 
        libreria_id,
        usuario.id
    )


@router.get("/", response_model=list[CompuestoRespuesta])
async def listar(db: AsyncSession = Depends(get_db)):
    return await obtener_compuestos(db)


@router.put("/{compuesto_id}", response_model=CompuestoRespuesta)
async def actualizar(
    compuesto_id: int,
    datos: CompuestoActualizar,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403)

    resultado = await actualizar_compuesto(db, compuesto_id, datos)

    if not resultado:
        raise HTTPException(status_code=404)

    log = Log(
        usuario_id=usuario.id,
        accion="update",
        descripcion=f"Compuesto con ID {compuesto_id} modificado"
    )

    db.add(log)
    await db.commit()

    return resultado


@router.delete("/{compuesto_id}")
async def eliminar(
    compuesto_id: int,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403)

    resultado = await eliminar_compuesto(db, compuesto_id)

    if not resultado:
        raise HTTPException(status_code=404)

    log = Log(
        usuario_id=usuario.id,
        accion="delete",
        descripcion=f"Compuesto con ID {compuesto_id} eliminado"
    )

    db.add(log)
    await db.commit()

    return {"mensaje": "Compuesto eliminado correctamente"}


@router.put("/{id}/etiquetas")
async def actualizar_etiquetas_compuesto(
    id: int,
    datos: EtiquetasUpdate,
    db: AsyncSession = Depends(get_db)
):

    stmt = (
        select(Compuesto)
        .where(Compuesto.id == id)
        .options(selectinload(Compuesto.etiquetas))
    )

    resultado = await db.execute(stmt)
    compuesto = resultado.scalar_one_or_none()

    if not compuesto:
        raise HTTPException(status_code=404, detail="Compuesto no encontrado")

    resultado = await db.execute(
        select(Etiqueta).where(Etiqueta.id.in_(datos.etiquetas_ids))
    )

    etiquetas = resultado.scalars().all()

    compuesto.etiquetas = etiquetas

    await db.commit()

    return {"ok": True}