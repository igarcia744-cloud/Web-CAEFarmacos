#!/bin/bash

echo "================================"
echo "Instalando proyecto TFG"
echo "================================"

echo "Creando entorno virtual..."
python3 -m venv venv

echo "Activando entorno virtual..."
source venv/bin/activate

echo "Actualizando pip..."
pip install --upgrade pip

echo "Instalando dependencias backend..."
pip install -r requirements.txt

echo "Instalando frontend..."
cd frontend
npm install
npm install rc-slider
cd ..

echo "================================"
echo "Instalación completada"
echo "================================"

echo "Para iniciar el backend:"
echo "uvicorn backend.main:app --reload"

echo "Para iniciar el frontend:"
echo "cd frontend && npm start"