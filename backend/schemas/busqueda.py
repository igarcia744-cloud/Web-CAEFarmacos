from pydantic import BaseModel
from typing import List
from schemas.compuesto import CompuestoRespuesta
from schemas.libreria import LibreriaRespuesta


class ResultadoBusqueda(BaseModel):

    etiqueta: str
    librerias: List[LibreriaRespuesta]
    compuestos: List[CompuestoRespuesta]