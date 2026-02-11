from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base


import app.models.users as user_models
import app.models.inventario as inventario_models



Base.metadata.create_all(bind=engine)


from app.routes import auth, clientes, vehiculos, ordenes, users, tareas, inventario 

app = FastAPI(
    title="Taller Mecánico API",
    description="Sistema de gestión para taller mecánico con inventario y autenticación",
    version="1.0.0"
)


origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

app.include_router(clientes.router, prefix="/api/clientes", tags=["Clientes"])
app.include_router(vehiculos.router, prefix="/api/vehiculos", tags=["Vehículos"])
app.include_router(ordenes.router, prefix="/api/ordenes", tags=["Órdenes"])
app.include_router(inventario.router, prefix="/api/inventario", tags=["Inventario"])


app.include_router(users.router, prefix="/api", tags=["Usuarios"])
app.include_router(tareas.router, prefix="/api", tags=["Tareas"])

@app.get("/", tags=["Root"])
def root():
    return {
        "ok": True,
        "message": "API de Taller Mecánico Online funcionando correctamente",
        "version": "1.0.0"
    }