from pydantic import BaseModel
from typing import List, Optional

class EtiquetaRespuesta(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True


class LibreriaActualizar(BaseModel):
    nombre: str
    comentario: Optional[str] = None

class LibreriaRespuesta(BaseModel):

    id: int
    nombre: str
    comentario: Optional[str] = None
    ruta_zip: Optional[str] = None
    numero_compuestos: int

    etiquetas: List[EtiquetaRespuesta] = []

    class Config:
        from_attributes = True