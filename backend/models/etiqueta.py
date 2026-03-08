from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Etiqueta(Base):
    __tablename__ = "etiquetas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, nullable=False)
    color = Column(String, nullable=True)

    librerias = relationship("Libreria", back_populates="etiqueta")
