from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
import pytz
from sqlalchemy.orm import relationship
from models.relaciones_etiquetas import compuesto_etiquetas
from database import Base

class Compuesto(Base):
    __tablename__ = "compuestos"

    id = Column(Integer, primary_key=True, index=True)

    nombre_archivo = Column(String, nullable=False)
    ruta_archivo = Column(String, nullable=False)

    libreria_id = Column(Integer, ForeignKey("librerias.id"))

    subido_por = Column(Integer, ForeignKey("usuarios.id"))

    fecha_subida = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(pytz.UTC)
    )

    etiquetas = relationship(
        "Etiqueta",
        secondary=compuesto_etiquetas,
        back_populates="compuestos"
    )