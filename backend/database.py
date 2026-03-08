import os
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

# Cargar variables desde seguridad.env
load_dotenv(dotenv_path="seguridad.env")

DATABASE_URL = os.getenv("DATABASE_URL")
print(">> Conectando a:", DATABASE_URL)

# Motor asíncrono
engine = create_async_engine(DATABASE_URL, echo=True)

# Sesión asíncrona
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base para los modelos
Base = declarative_base()

# Dependencia para obtener sesión
async def get_db():
    async with async_session() as session:
        yield session
