from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    es_admin: Optional[bool] = False

class UsuarioCreate(UsuarioBase):
    password: str  # contraseña sin encriptar al crear

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    es_admin: Optional[bool] = None

class UsuarioOut(UsuarioBase):
    id: int
    fecha_creacion: datetime
    fecha_actualizacion: Optional[datetime] = None

    class Config:
        orm_mode = True
