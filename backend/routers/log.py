from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from auth import get_current_user
from database import get_db
from models.log import Log

router = APIRouter(prefix="/logs", tags=["Logs"], dependencies=[Depends(get_current_user)])

@router.get("/")
async def obtener_logs(db: AsyncSession = Depends(get_db)):

    result = await db.execute(
        select(Log).options(selectinload(Log.usuario))
    )

    logs = result.scalars().all()

    return [
        {
            "descripcion": log.descripcion,
            "accion": log.accion,
            "fecha": log.fecha.strftime("%Y/%m/%d") if log.fecha else None,
            "usuario": log.usuario.nombre if log.usuario else "Desconocido"
        }
        for log in logs
    ]