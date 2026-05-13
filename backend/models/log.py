from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
import pytz
from sqlalchemy.orm import relationship
from database import Base

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True)

    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario")

    accion = Column(String, nullable=False)
    descripcion = Column(String)

    fecha = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(pytz.UTC)
    )