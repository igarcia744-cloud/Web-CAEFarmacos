from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import os

from auth import get_current_user, STORAGE_PATH
from database import get_db
from models.compuesto import Compuesto

router = APIRouter(
    prefix="/archivo_mol",
    tags=["Archivos"],
)


@router.get("/compuesto/{id}")
async def obtener_mol_por_id(
    id: int,
    db: AsyncSession = Depends(get_db)
):

    resultado = await db.execute(
        select(Compuesto).where(Compuesto.id == id)
    )

    compuesto = resultado.scalar_one_or_none()

    if not compuesto:
        raise HTTPException(status_code=404, detail="Conformación no encontrada")

    if not compuesto.ruta_archivo:
        raise HTTPException(status_code=404, detail="Ruta no definida")

    ruta_real = os.path.join(STORAGE_PATH, compuesto.ruta_archivo)

    print("RUTA RELATIVA BD:", compuesto.ruta_archivo)
    print("RUTA REAL:", ruta_real)

    if not os.path.exists(ruta_real):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")

    return FileResponse(
        ruta_real,
        media_type="text/plain"
    )