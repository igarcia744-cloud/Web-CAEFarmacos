from sqlalchemy import Table, Column, ForeignKey
from database import Base

libreria_etiquetas = Table(
    "libreria_etiquetas",
    Base.metadata,
    Column("libreria_id", ForeignKey("librerias.id"), primary_key=True),
    Column("etiqueta_id", ForeignKey("etiquetas.id"), primary_key=True),
)

compuesto_etiquetas = Table(
    "compuesto_etiquetas",
    Base.metadata,
    Column("compuesto_id", ForeignKey("compuestos.id"), primary_key=True),
    Column("etiqueta_id", ForeignKey("etiquetas.id"), primary_key=True),
)