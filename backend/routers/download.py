from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import os
import zipfile
import tempfile

from auth import get_current_user
from database import get_db
from models.compuesto import Compuesto
from models.libreria import Libreria

router = APIRouter(prefix="/download", tags=["download"], dependencies=[Depends(get_current_user)])


@router.get("/{tipo}/{id}")
async def descargar(tipo: str, id: int, db: AsyncSession = Depends(get_db)):

    if tipo == "compuesto":

        resultado = await db.execute(
            select(Compuesto).where(Compuesto.id == id)
        )

        compuesto = resultado.scalar_one_or_none()

        if not compuesto or not compuesto.ruta_archivo:
            raise HTTPException(404, "Archivo no encontrado")

        return FileResponse(
            path=compuesto.ruta_archivo,
            filename=compuesto.nombre_archivo,
            media_type="application/octet-stream"
        )

    if tipo == "libreria":

        resultado = await db.execute(
            select(Libreria).where(Libreria.id == id)
        )

        libreria = resultado.scalar_one_or_none()

        if not libreria or not libreria.ruta_zip:
            raise HTTPException(404, "Librería no encontrada")

        carpeta = libreria.ruta_zip

        if not os.path.exists(carpeta):
            raise HTTPException(404, "Carpeta no existe")

        temp_dir = tempfile.gettempdir()
        zip_path = os.path.join(temp_dir, f"{libreria.nombre}.zip")

        with zipfile.ZipFile(zip_path, "w") as zipf:

            for root, dirs, files in os.walk(carpeta):

                for file in files:

                    file_path = os.path.join(root, file)

                    # nombre dentro del zip
                    arcname = os.path.relpath(file_path, carpeta)

                    zipf.write(file_path, arcname)

        return FileResponse(
            path=zip_path,
            filename=f"{libreria.nombre}.zip",
            media_type="application/zip"
        )

    raise HTTPException(400, "Tipo no válido")