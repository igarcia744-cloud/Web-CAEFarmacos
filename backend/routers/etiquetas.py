from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy.future import select
from models.compuesto import Compuesto
from models.libreria import Libreria
from models.etiqueta import Etiqueta

from database import get_db
from auth import get_current_user

from models.log import Log 

from crud.etiqueta import (
    obtener_etiquetas,
    crear_etiqueta,
    actualizar_etiqueta,
    eliminar_etiqueta
)

from schemas.etiqueta import EtiquetaCrear, EtiquetaActualizar

router = APIRouter(prefix="/etiquetas", tags=["Etiquetas"], dependencies=[Depends(get_current_user)])

@router.get("/")
async def listar_etiquetas(db: AsyncSession = Depends(get_db)):

    return await obtener_etiquetas(db)

@router.post("/")
async def crear(
    datos: EtiquetaCrear,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403, detail="Solo admin")
    
    log = Log(
        usuario_id=usuario.id,
        accion="create",
        descripcion=f"Etiqueta con nombre {datos} creada"
    )

    db.add(log)
    await db.commit()

    return await crear_etiqueta(db, datos.nombre)

@router.put("/{etiqueta_id}")
async def modificar(
    etiqueta_id: int,
    datos: EtiquetaActualizar,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403)

    etiqueta = await actualizar_etiqueta(db, etiqueta_id, datos.nombre)

    if not etiqueta:
        raise HTTPException(status_code=404)
    
    log = Log(
        usuario_id=usuario.id,
        accion="update",
        descripcion=f"Etiqueta con ID {etiqueta_id} modificada"
    )

    db.add(log)
    await db.commit()

    return etiqueta

@router.delete("/{etiqueta_id}")
async def eliminar(
    etiqueta_id: int,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403)
    
    log = Log(
        usuario_id=usuario.id,
        accion="delete",
        descripcion=f"Etiqueta con ID {etiqueta_id} eliminada"
    )

    db.add(log)
    await db.commit()

    return await eliminar_etiqueta(db, etiqueta_id)

@router.post("/compuesto")
async def asignar_etiqueta_compuesto(
    compuesto_id: int,
    etiqueta_id: int,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403)

    compuesto_result = await db.execute(
        select(Compuesto).where(Compuesto.id == compuesto_id)
    )

    compuesto = compuesto_result.scalar_one_or_none()

    etiqueta_result = await db.execute(
        select(Etiqueta).where(Etiqueta.id == etiqueta_id)
    )

    etiqueta = etiqueta_result.scalar_one_or_none()

    if not compuesto or not etiqueta:
        raise HTTPException(status_code=404)

    compuesto.etiquetas.append(etiqueta)

    await db.commit()

    return {"mensaje": "Etiqueta asignada la conformación"}

@router.post("/libreria")
async def asignar_etiqueta_libreria(
    libreria_id: int,
    etiqueta_id: int,
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not usuario.es_admin:
        raise HTTPException(status_code=403)

    libreria_result = await db.execute(
        select(Libreria).where(Libreria.id == libreria_id)
    )

    libreria = libreria_result.scalar_one_or_none()

    etiqueta_result = await db.execute(
        select(Etiqueta).where(Etiqueta.id == etiqueta_id)
    )

    etiqueta = etiqueta_result.scalar_one_or_none()

    if not libreria or not etiqueta:
        raise HTTPException(status_code=404)

    libreria.etiquetas.append(etiqueta)

    await db.commit()

    return {"mensaje": "Etiqueta asignada al compuesto"}