#!/usr/bin/env bash
set -e

echo "================================"
echo "Instalando proyecto TFG"
echo "================================"

# Detectar python
PYTHON_CMD=$(command -v python3 || command -v python || true)
if [ -z "$PYTHON_CMD" ]; then
  echo "ERROR: Python no encontrado. Instala Python 3 y vuelve a ejecutar."
  exit 1
fi

echo "Python encontrado: $PYTHON_CMD"

echo "Creando entorno virtual..."
$PYTHON_CMD -m venv venv

# Activar entorno virtual si es posible
unameOut=$(uname -s 2>/dev/null || echo "Unknown")
case "$unameOut" in
  *MINGW*|*MSYS*|*CYGWIN*|*Windows_NT*)
    echo "Sistema Windows detectado. Para activar el entorno virtual desde PowerShell:"
    echo "  .\\venv\\Scripts\\Activate.ps1"
    echo "O desde cmd:"
    echo "  .\\venv\\Scripts\\activate.bat"
    ACTIVATED=false
    ;;
  *)
    echo "Activando entorno virtual..."
    # shellcheck disable=SC1091
    source venv/bin/activate
    ACTIVATED=true
    ;;
esac

echo "Actualizando pip..."
# Use the venv pip if activated, else call via python -m pip
if [ "$ACTIVATED" = true ]; then
  pip install --upgrade pip
else
  $PYTHON_CMD -m pip install --upgrade pip
fi

echo "Instalando dependencias backend..."
if [ "$ACTIVATED" = true ]; then
  pip install -r requirements.txt
else
  $PYTHON_CMD -m pip install -r requirements.txt
fi

# Crear ejemplo de archivo de variables de entorno
cat > seguridad.env.example <<EOF
# Variables de entorno para la aplicación
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/tu_basedatos
SECRET_KEY=CAMBIA_ESTO_POR_UNA_CLAVE_SECRETA
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
STORAGE_PATH=storage
EOF

echo "Se ha creado seguridad.env.example. Copia o edita este archivo y guárdalo como seguridad.env."

# Instalación del frontend
if [ -d "frontend" ]; then
  if command -v npm >/dev/null 2>&1; then
    echo "Instalando frontend..."
    (cd frontend && npm install)
  else
    echo "npm no encontrado. Ignorando instalación del frontend."
  fi
fi

# Opción para crear tablas en la base de datos usando SQLAlchemy (requiere DATABASE_URL configurada)
read -p "¿Crear tablas en la base de datos ahora? (requiere que seguridad.env tenga DATABASE_URL) [y/N]: " create_db
if [[ "$create_db" =~ ^[Yy]$ ]]; then
  if [ ! -f seguridad.env ]; then
    echo "Error: seguridad.env no existe. Crea seguridad.env primero."
  else
    # Exportar variables del archivo (simple, no exporta líneas comentadas)
    export $(grep -v '^#' seguridad.env | xargs)
    echo "Creando tablas en la base de datos..."
    $PYTHON_CMD - <<PY
import asyncio
from backend.database import engine, Base
async def run():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
asyncio.run(run())
PY
  fi
fi

echo "================================"
echo "Instalación completada"
echo "================================"
echo "Para iniciar el backend:"
echo "uvicorn backend.main:app --reload"
echo "Para iniciar el frontend:"
echo "cd frontend && npm start"