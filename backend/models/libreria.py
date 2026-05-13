from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
import pytz
from sqlalchemy.orm import relationship
from models.relaciones_etiquetas import libreria_etiquetas
from database import Base

class Libreria(Base):
    __tablename__ = "librerias"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String, nullable=False)
    comentario = Column(String)

    ruta_zip = Column(String)

    creada_por = Column(Integer, ForeignKey("usuarios.id"))

    fecha_creacion = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(pytz.UTC)
    )

    etiquetas = relationship(
        "Etiqueta",
        secondary=libreria_etiquetas,
        back_populates="librerias"
    )