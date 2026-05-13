from pydantic import BaseModel


class EtiquetaCrear(BaseModel):

    nombre: str


class EtiquetaActualizar(BaseModel):

    nombre: str


class EtiquetaRespuesta(BaseModel):

    id: int
    nombre: str

    class Config:
        from_attributes = True