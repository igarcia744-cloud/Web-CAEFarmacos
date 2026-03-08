from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import async_session
from models.etiqueta import Etiqueta
from schemas.etiqueta import EtiquetaCreate, EtiquetaUpdate, EtiquetaOut
from typing import List
from models.usuario import Usuario
from auth import admin_required

router = APIRouter(
    prefix="/etiquetas",
    tags=["etiquetas"]
)

# Dependencia para obtener sesión asíncrona
async def get_db():
    async with async_session() as session:
        yield session

# Crear una etiqueta
@router.post("/", response_model=EtiquetaOut)
async def crear_etiqueta(etiqueta: EtiquetaCreate, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Etiqueta).filter(Etiqueta.nombre == etiqueta.nombre))
    etiqueta_existente = result.scalar_one_or_none()
    if etiqueta_existente:
        raise HTTPException(status_code=400, detail="Ya existe una etiqueta con ese nombre")
    
    nueva_etiqueta = Etiqueta(nombre=etiqueta.nombre, color=etiqueta.color)
    db.add(nueva_etiqueta)
    await db.commit()
    await db.refresh(nueva_etiqueta)
    return nueva_etiqueta

# Actualizar una etiqueta
@router.put("/{etiqueta_id}", response_model=EtiquetaOut)
async def actualizar_etiqueta(etiqueta_id: int, etiqueta: EtiquetaUpdate, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Etiqueta).filter(Etiqueta.id == etiqueta_id))
    etiqueta_db = result.scalar_one_or_none()
    if not etiqueta_db:
        raise HTTPException(status_code=404, detail="Etiqueta no encontrada")
    
    if etiqueta.nombre:
        result = await db.execute(
            select(Etiqueta).filter(Etiqueta.nombre == etiqueta.nombre, Etiqueta.id != etiqueta_id)
        )
        etiqueta_duplicada = result.scalar_one_or_none()
        if etiqueta_duplicada:
            raise HTTPException(status_code=400, detail="Ya existe otra etiqueta con ese nombre")
        
        etiqueta_db.nombre = etiqueta.nombre
    if etiqueta.color:
        etiqueta_db.color = etiqueta.color
    
    await db.commit()
    await db.refresh(etiqueta_db)
    return etiqueta_db

# Listar etiquetas
@router.get("/", response_model=List[EtiquetaOut])
async def listar_etiquetas(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Etiqueta))
    etiquetas = result.scalars().all()
    return etiquetas

# Eliminar una etiqueta
@router.delete("/{etiqueta_id}")
async def eliminar_etiqueta(etiqueta_id: int, db: AsyncSession = Depends(get_db), current_user: Usuario = Depends(admin_required)):
    result = await db.execute(select(Etiqueta).filter(Etiqueta.id == etiqueta_id))
    etiqueta_db = result.scalar_one_or_none()
    if not etiqueta_db:
        raise HTTPException(status_code=404, detail="Etiqueta no encontrada")
    
    if etiqueta_db.librerias:
        raise HTTPException(status_code=400, detail="No se puede eliminar la etiqueta, está asociada a librerías")
    
    await db.delete(etiqueta_db)
    await db.commit()
    return {"detail": "Etiqueta eliminada correctamente"}
