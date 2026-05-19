import os
import zipfile

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from auth import get_current_user

from models.libreria import Libreria
from crud.compuesto import crear_compuesto

from models.log import Log

from auth import STORAGE_PATH

router = APIRouter(prefix="/upload", tags=["Upload"], dependencies=[Depends(get_current_user)])

@router.post("/zip")
async def subir_zip(
    archivo: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not archivo.filename.endswith(".zip"):
        raise HTTPException(status_code=400, detail="Debe ser un archivo ZIP")

    nombre_libreria = archivo.filename.replace(".zip", "")

    ruta_relativa_libreria = os.path.join("librerias", nombre_libreria)

    ruta_libreria = os.path.join(STORAGE_PATH, ruta_relativa_libreria)

    nueva_libreria = Libreria(
        nombre=nombre_libreria,
        comentario="Librería subida automáticamente",
        ruta_zip=ruta_relativa_libreria, 
        creada_por=usuario.id
    )

    db.add(nueva_libreria)
    await db.commit()
    await db.refresh(nueva_libreria)

    os.makedirs(ruta_libreria, exist_ok=True)

    ruta_zip = os.path.join(ruta_libreria, f"{nombre_libreria}.zip")

    with open(ruta_zip, "wb") as buffer:
        buffer.write(await archivo.read())

    with zipfile.ZipFile(ruta_zip, "r") as zip_ref:
        zip_ref.extractall(ruta_libreria)
    
    os.remove(ruta_zip)

    for archivo_extraido in os.listdir(ruta_libreria):

        if archivo_extraido.endswith(".mol2"):

            ruta_relativa_archivo = os.path.join(
                ruta_relativa_libreria,
                archivo_extraido
            )

            ruta_archivo = os.path.join(
                STORAGE_PATH,
                ruta_relativa_archivo
            )

            await crear_compuesto(
                db,
                archivo_extraido,
                ruta_relativa_archivo, 
                nueva_libreria.id,
                usuario.id
            )

    log = Log(
        usuario_id=usuario.id,
        accion="subir_zip",
        descripcion=f"Librería {nueva_libreria.nombre} subida"
    )

    db.add(log)
    await db.commit()

    return {
        "mensaje": "Librería creada correctamente",
        "libreria_id": nueva_libreria.id
    }

@router.post("/mol2")
async def subir_mol2(
    archivo: UploadFile = File(...),
    libreria_id: int = Form(...),
    db: AsyncSession = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if not archivo.filename.endswith(".mol2"):
        raise HTTPException(status_code=400, detail="Debe ser un archivo .mol2")

    resultado = await db.execute(
        select(Libreria).where(Libreria.id == libreria_id)
    )

    libreria = resultado.scalar_one_or_none()

    if not libreria:
        raise HTTPException(status_code=404, detail="Librería no encontrada")

    ruta_relativa_libreria = os.path.join("librerias", libreria.nombre)

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

    await crear_compuesto(
        db,
        archivo.filename,
        ruta_relativa_archivo,
        libreria.id,
        usuario.id
    )

    log = Log(
        usuario_id=usuario.id,
        accion="subir_mol2",
        descripcion=f"Compuesto {archivo.filename} añadido a librería {libreria.nombre}"
    )

    db.add(log)
    await db.commit()

    return {
        "mensaje": "Compuesto añadido correctamente",
        "libreria_id": libreria.id
    }