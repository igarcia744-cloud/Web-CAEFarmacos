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

echo "Creando entorno virtual en backend/venv..."
$PYTHON_CMD -m venv backend/venv

# Activar entorno virtual si es posible
ACTIVATED=false
unameOut=$(uname -s 2>/dev/null || echo "Unknown")

case "$unameOut" in
  *MINGW*|*MSYS*|*CYGWIN*|*Windows_NT*)
    echo ""
    echo "Sistema Windows detectado."
    echo "Para activar el entorno virtual:"
    echo ""
    echo "PowerShell:"
    echo "  .\\backend\\venv\\Scripts\\Activate.ps1"
    echo ""
    echo "CMD:"
    echo "  .\\backend\\venv\\Scripts\\activate.bat"
    echo ""
    ;;
  *)
    echo "Activando entorno virtual..."
    # shellcheck disable=SC1091
    source backend/venv/bin/activate
    ACTIVATED=true
    ;;
esac

echo "Actualizando pip..."

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

echo "Creando frontend/.env..."

mkdir -p frontend

cat > frontend/.env <<EOF
REACT_APP_API_URL=http://localhost:8000
EOF

echo "Link del API para frontend creado correctamente"

# Instalación del frontend
if [ -d "frontend" ]; then
  if command -v npm >/dev/null 2>&1; then
    echo "Instalando frontend..."
    (
      cd frontend
      npm install
    )
  else
    echo "npm no encontrado. Ignorando instalación del frontend."
  fi
fi

echo "Utilize .env.example como archivo seguridad.env, configúrelo según sus necesidades"

read -p "¿Crear tablas en la base de datos ahora? (requiere backend/seguridad.env con DATABASE_URL) [y/N]: " create_db

if [[ "$create_db" =~ ^[Yy]$ ]]; then

  if [ ! -f backend/seguridad.env ]; then
    echo "Error: backend/seguridad.env no existe."
  else

    echo "Cargando variables desde backend/seguridad.env..."

    set -a
    source backend/seguridad.env
    set +a

    echo "Creando tablas en la base de datos..."

    $PYTHON_CMD - <<PY
import asyncio
from backend.database import engine, Base

async def run():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(run())
PY

    echo "Tablas creadas correctamente."
  fi
fi

echo ""
echo "================================"
echo "Instalación completada"
echo "================================"
echo ""
echo "--- Terminal 1 ---"
echo "Backend:"
echo "  backend\venv\Scripts\activate"
echo "  cd backend"
echo "  uvicorn main:app --reload"
echo ""
echo "--- Terminal 2 ---"
echo "Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""