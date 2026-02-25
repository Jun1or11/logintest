from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Login(BaseModel):
    usuario: str
    password: str

# POST → login
@app.post("/login")
def login(datos: Login):
    conn = psycopg2.connect(
        host="localhost",
        database="intranet_db",
        user="postgres",
        password="junior11"
    )
    cur = conn.cursor()
    cur.execute(
        "SELECT id FROM usuarios WHERE usuario=%s AND password=%s AND activo=true",
        (datos.usuario, datos.password)
    )
    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    return {"mensaje": "Login correcto", "usuario_id": user[0]}

# GET → listar usuarios (solo ejemplo)
@app.get("/usuarios")
def listar_usuarios():
    conn = psycopg2.connect(
        host="localhost",
        database="intranet_db",
        user="postgres",
        password="junior11"
    )
    cur = conn.cursor()
    cur.execute("SELECT id, usuario FROM usuarios WHERE activo=true")
    usuarios = cur.fetchall()
    cur.close()
    conn.close()
    return {"usuarios": usuarios}

# PUT → actualizar usuario (ejemplo simple)
@app.put("/usuarios/{usuario_id}")
def actualizar_usuario(usuario_id: int, datos: Login):
    conn = psycopg2.connect(
        host="localhost",
        database="intranet_db",
        user="postgres",
        password="junior11"
    )
    cur = conn.cursor()
    cur.execute(
        "UPDATE usuarios SET usuario=%s, password=%s WHERE id=%s",
        (datos.usuario, datos.password, usuario_id)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"mensaje": f"Usuario {usuario_id} actualizado"}

# DELETE → eliminar usuario
@app.delete("/usuarios/{usuario_id}")
def borrar_usuario(usuario_id: int):
    conn = psycopg2.connect(
        host="localhost",
        database="intranet_db",
        user="postgres",
        password="junior11"
    )
    cur = conn.cursor()
    cur.execute("DELETE FROM usuarios WHERE id=%s", (usuario_id,))
    conn.commit()
    cur.close()
    conn.close()
    return {"mensaje": f"Usuario {usuario_id} eliminado"}