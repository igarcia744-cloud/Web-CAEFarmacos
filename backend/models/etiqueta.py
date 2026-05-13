from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

from models.relaciones_etiquetas import compuesto_etiquetas, libreria_etiquetas


class Etiqueta(Base):

    __tablename__ = "etiquetas"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String, unique=True, nullable=False)

    compuestos = relationship(
        "Compuesto",
        secondary=compuesto_etiquetas,
        back_populates="etiquetas"
    )

    librerias = relationship(
        "Libreria",
        secondary=libreria_etiquetas,
        back_populates="etiquetas"
    )