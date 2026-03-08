from fastapi import FastAPI
from routers import etiquetas, usuarios, moleculas, librerias
from auth import router as auth_router
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(etiquetas.router)
app.include_router(usuarios.router)
app.include_router(moleculas.router)
app.include_router(librerias.router)
app.include_router(auth_router)

origins = [
    "http://localhost:3000",  # React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Frontend permitido
    allow_credentials=True,
    allow_methods=["*"],     # Permite POST, GET, PUT, DELETE...
    allow_headers=["*"],     # Permite Authorization y Content-Type
)

# SOLO ACTIVAR ESTO SI CAMBIAN LOS MODELOS O NECESITAS RECREAR TABLAS
"""
@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
"""