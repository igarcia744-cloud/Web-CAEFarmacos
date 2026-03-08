from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MoleculaBase(BaseModel):
    nombre: str
    archivo: str
    comentario: Optional[str] = None
    libreria_id: int

class MoleculaCreate(MoleculaBase):
    creado_por: int

class MoleculaUpdate(BaseModel):
    nombre: Optional[str] = None
    archivo: Optional[str] = None
    comentario: Optional[str] = None
    libreria_id: Optional[int] = None
    actualizado_por: int

class MoleculaOut(MoleculaBase):
    id: int
    creado_por: int
    fecha_creacion: datetime
    actualizado_por: Optional[int] = None
    fecha_actualizacion: Optional[datetime] = None

    class Config:
        orm_mode = True

