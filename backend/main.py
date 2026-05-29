from fastapi import FastAPI, Request
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os

from auth import router as auth_router
from routers import usuarios
from routers.librerias import router as librerias_router
from routers.compuestos import router as compuestos_router
from routers.upload import router as upload_router
from routers.etiquetas import router as etiquetas_router
from routers.busqueda import router as busqueda_router
from routers.explorador import router as explorador_router
from routers.download import router as download_router
from routers.archivos import router as archivos
from routers.log import router as logs
from routers.usuarios import router as usuarios_router

from auth import *

app = FastAPI()
app.include_router(auth_router)
app.include_router(usuarios_router)

app.include_router(librerias_router)
app.include_router(compuestos_router)
app.include_router(etiquetas_router)
app.include_router(busqueda_router)

app.include_router(upload_router)

app.include_router(explorador_router)
app.include_router(download_router)

app.include_router(archivos)

app.include_router(logs)

origins = [
    "http://localhost:3000",  # React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],    
)

@app.middleware("http")
async def refresh_token_middleware(request: Request, call_next):

    response = await call_next(request)

    auth_header = request.headers.get("Authorization")

    if auth_header and auth_header.startswith("Bearer "):

        token = auth_header.split(" ")[1]

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("sub")

            if user_id:
                new_token = crear_token_renovable({"sub": user_id})

                response.headers["X-New-Token"] = new_token

        except Exception:
            pass

    return response

# SOLO ACTIVAR ESTO SI CAMBIAN LOS MODELOS O NECESITAS RECREAR TABLAS
"""
@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
"""