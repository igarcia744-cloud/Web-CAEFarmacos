from pydantic import BaseModel
from typing import List, Optional

class EtiquetaRespuesta(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True

class CompuestoBase(BaseModel):

    nombre_archivo: str
    libreria_id: int


class CompuestoCrear(CompuestoBase):
    pass


class CompuestoRespuesta(CompuestoBase):

    id: int
    ruta_archivo: str
    libreria_nombre: Optional[str] = None

    etiquetas: List[EtiquetaRespuesta] = []

    class Config:
        from_attributes = True

class CompuestoActualizar(BaseModel):

    nombre_archivo: str
    libreria_id: int