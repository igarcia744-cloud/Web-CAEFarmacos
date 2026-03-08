from pydantic import BaseModel
from typing import Optional

class EtiquetaBase(BaseModel):
    nombre: str
    color: Optional[str]

class EtiquetaCreate(EtiquetaBase):
    pass

class EtiquetaUpdate(BaseModel):
    nombre: Optional[str] = None
    color: Optional[str] = None

class EtiquetaOut(EtiquetaBase):
    id: int
    class Config:
        orm_mode = True
