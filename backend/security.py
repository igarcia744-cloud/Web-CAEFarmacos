from passlib.context import CryptContext

# Objeto que define el algoritmo de hash que usaremos (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    #Aqui se define una contraseña en texto plano y devuelve una version cifrada
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    #Se compara una contraseña en texto plano con su version cifrada
    return pwd_context.verify(password, hashed)