from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime 
import pytz
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    es_admin = Column(Boolean, default=False)

    fecha_creacion = Column(DateTime(timezone=True), default=lambda: datetime.now(pytz.UTC))
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=lambda: datetime.now(pytz.UTC))
