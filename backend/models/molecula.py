from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import pytz
from database import Base

class Molecula(Base):
    __tablename__ = "moleculas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    archivo = Column(String, nullable=False)  # ruta al archivo .mol2 o .sdf
    comentario = Column(String, nullable=True)

    libreria_id = Column(Integer, ForeignKey("librerias.id"), nullable=False)
    libreria = relationship("Libreria", back_populates="moleculas")

    creado_por = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), default=lambda: datetime.now(pytz.UTC))

    actualizado_por = Column(Integer, ForeignKey("usuarios.id"), nullable=True)
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=lambda: datetime.now(pytz.UTC))


