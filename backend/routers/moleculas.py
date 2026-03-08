from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from database import async_session

from models.molecula import Molecula
from schemas.molecula import MoleculaCreate, MoleculaUpdate, MoleculaOut

from models.usuario import Usuario
from auth import admin_required

from fastapi.responses import FileResponse
from fastapi import Depends, HTTPException
from models.usuario import Usuario
from auth import get_current_user
import os
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/moleculas",
    tags=["moleculas"]
)

# Dependencia para obtener sesión asíncrona
async def get_db():
    async with async_session() as session:
        yield session

# Crear molécula
@router.post("/", response_model=MoleculaOut)
async def crear_molecula(molecula: MoleculaCreate, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    nueva = Molecula(**molecula.model_dump())
    db.add(nueva)
    await db.commit()
    await db.refresh(nueva)
    return nueva

# Listar todas las moléculas
@router.get("/", response_model=List[MoleculaOut])
async def listar_moleculas(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Molecula))
    return result.scalars().all()

# Listar moléculas de una librería
@router.get("/libreria/{libreria_id}", response_model=List[MoleculaOut])
async def listar_moleculas_libreria(libreria_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Molecula).filter(Molecula.libreria_id == libreria_id))
    return result.scalars().all()

# Actualizar molécula
@router.put("/{molecula_id}", response_model=MoleculaOut)
async def actualizar_molecula(molecula_id: int, molecula: MoleculaUpdate, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Molecula).filter(Molecula.id == molecula_id))
    db_molecula = result.scalar_one_or_none()
    if not db_molecula:
        raise HTTPException(status_code=404, detail="Molecula no encontrada")
    
    for key, value in molecula.model_dump(exclude_unset=True).items():
        setattr(db_molecula, key, value)
    
    await db.commit()
    await db.refresh(db_molecula)
    return db_molecula

# Eliminar molécula
@router.delete("/{molecula_id}")
async def eliminar_molecula(molecula_id: int, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Molecula).filter(Molecula.id == molecula_id))
    db_molecula = result.scalar_one_or_none()
    if not db_molecula:
        raise HTTPException(status_code=404, detail="Molecula no encontrada")
    
    await db.delete(db_molecula)
    await db.commit()
    return {"detail": "Molecula eliminada correctamente"}

# Descargar molecula
@router.get("/descargar/{molecula_id}")
async def descargar_molecula(molecula_id: int, current_user: Usuario = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Molecula).filter(Molecula.id == molecula_id))
    molecula = result.scalars().first()
    if not molecula:
        raise HTTPException(status_code=404, detail="Molécula no encontrada")
    
    if not os.path.exists(molecula.archivo):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    
    return FileResponse(path=molecula.archivo, filename=os.path.basename(molecula.archivo))

