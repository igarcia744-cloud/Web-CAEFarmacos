from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import pytz
from database import Base

class Libreria(Base):
    __tablename__ = "librerias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False, unique=True)
    comentario = Column(String, nullable=True)

    creado_por = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), default=lambda: datetime.now(pytz.UTC))

    actualizado_por = Column(Integer, ForeignKey("usuarios.id"), nullable=True)
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=lambda: datetime.now(pytz.UTC))

    ruta_zip = Column(String, nullable=False)

    # Relación con etiqueta
    etiqueta_id = Column(Integer, ForeignKey("etiquetas.id"), nullable=True)
    etiqueta = relationship("Etiqueta", back_populates="librerias")

    # Relación con moléculas
    moleculas = relationship("Molecula", back_populates="libreria")

