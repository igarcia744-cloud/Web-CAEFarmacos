from pydantic import BaseModel


class UsuarioCrear(BaseModel):

    nombre: str
    email: str
    password: str
    es_admin: bool = False