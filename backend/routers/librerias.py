from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from auth import admin_required, get_current_user
from database import async_session
from models.libreria import Libreria
from models.usuario import Usuario
from schemas.libreria import LibreriaCreate, LibreriaUpdate, LibreriaOut
from fastapi.responses import FileResponse
import os

router = APIRouter(
    prefix="/librerias",
    tags=["librerias"]
)

# Dependencia para obtener sesión asíncrona
async def get_db():
    async with async_session() as session:
        yield session

# Crear librería
@router.post("/", response_model=LibreriaOut)
async def crear_libreria(libreria: LibreriaCreate, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Libreria).filter(Libreria.nombre == libreria.nombre))
    existente = result.scalar_one_or_none()
    if existente:
        raise HTTPException(status_code=400, detail="Ya existe una libreria con ese nombre")
    
    nueva = Libreria(**libreria.model_dump())
    db.add(nueva)
    await db.commit()
    await db.refresh(nueva)
    return nueva

# Listar librerías
@router.get("/", response_model=List[LibreriaOut])
async def listar_librerias(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Libreria))
    librerias = result.scalars().all()
    return librerias

# Actualizar librería
@router.put("/{libreria_id}", response_model=LibreriaOut)
async def actualizar_libreria(libreria_id: int, libreria: LibreriaUpdate, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Libreria).filter(Libreria.id == libreria_id))
    db_libreria = result.scalar_one_or_none()
    if not db_libreria:
        raise HTTPException(status_code=404, detail="Libreria no encontrada")
    
    for key, value in libreria.model_dump(exclude_unset=True).items():
        setattr(db_libreria, key, value)
    
    await db.commit()
    await db.refresh(db_libreria)
    return db_libreria

# Eliminar librería
@router.delete("/{libreria_id}")
async def eliminar_libreria(libreria_id: int, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Libreria).filter(Libreria.id == libreria_id))
    db_libreria = result.scalar_one_or_none()
    if not db_libreria:
        raise HTTPException(status_code=404, detail="Libreria no encontrada")
    
    if db_libreria.moleculas:
        raise HTTPException(status_code=400, detail="No se puede eliminar, contiene moleculas")
    
    await db.delete(db_libreria)
    await db.commit()
    return {"detail": "Libreria eliminada correctamente"}

# Descargar libreria
@router.get("/descargar/{libreria_id}")
async def descargar_libreria(
    libreria_id: int, current_user: Usuario = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Buscar la librería en la base de datos
    result = await db.execute(select(Libreria).filter(Libreria.id == libreria_id))
    libreria = result.scalars().first()
    
    if not libreria:
        raise HTTPException(status_code=404, detail="Librería no encontrada")
    
    # Verificar que el archivo ZIP exista
    if not os.path.exists(libreria.ruta_zip):
        raise HTTPException(status_code=404, detail="Archivo ZIP no encontrado")
    
    # Devolver el archivo ZIP como respuesta
    return FileResponse(
        path=libreria.ruta_zip,
        filename=os.path.basename(libreria.ruta_zip),
        media_type="application/zip"
    )
