from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LibreriaBase(BaseModel):
    nombre: str
    comentario: Optional[str] = None
    ruta_zip: str
    etiqueta_id: Optional[int] = None

class LibreriaCreate(LibreriaBase):
    creado_por: int

class LibreriaUpdate(BaseModel):
    nombre: Optional[str] = None
    comentario: Optional[str] = None
    ruta_zip: Optional[str] = None
    etiqueta_id: Optional[int] = None
    actualizado_por: int

class LibreriaOut(LibreriaBase):
    id: int
    creado_por: int
    fecha_creacion: datetime
    actualizado_por: Optional[int] = None
    fecha_actualizacion: Optional[datetime] = None

    class Config:
        orm_mode = True

