# Herramienta para etiquetado, búsqueda y cribado de librerías de fármacos

TFG – Desarrollo de una aplicación web para la gestión de librerías de compuestos químicos.

## Tecnologías utilizadas

## Requisitos previos

Antes de instalar, asegúrate de tener instalados:

- Python 3.10+ (incluye pip)
- Node.js 16+ (incluye npm)
- PostgreSQL 12+ (opcional: PgAdmin4 para administración)
- Git


## Tecnologías utilizadas

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Passlib
- Uvicorn

### Frontend
- React
- React Router
- Axios
- Bootstrap

### Base de datos
- PostgreSQL

---

# Instalación del proyecto

Clonar repositorio:

```
git clone https://github.com/usuario/proyecto.git
cd proyecto
```

Ejecutar script de instalación:

```
./setup.sh
```

---

# Configuración de variables de entorno

Copiar archivo de ejemplo:

```
cp seguridad.env.example seguridad.env
```

Editar seguridad.env con los datos de la base de datos y claves secretas. Asegúrate de que el archivo se llama seguridad.env porque el código lo carga así.

---

# Ejecutar aplicación

### Backend

```
uvicorn backend.main:app --reload
```

Backend disponible en:

```
http://localhost:8000
```

Documentación automática API:

```
http://localhost:8000/docs
```

---

### Frontend

```
cd frontend
npm start
```

Frontend disponible en:

```
http://localhost:3000
```

---

# Funcionalidades

- Gestión de usuarios
- Creación de librerías de compuestos
- Subida de archivos ZIP
- Extracción automática de compuestos `.mol2`
- Etiquetado de moléculas
- Registro de modificaciones

---

# Arquitectura del sistema

```
React (Frontend)
      |
      | HTTP REST API
      v
FastAPI (Backend)
      |
      v
SQLAlchemy
      |
      v
Base de Datos PostgreSQL
```

---

# Autor
Iván García Pérez
Trabajo Fin de Grado 
UCAM