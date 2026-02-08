from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
# Importa el router de tareas (asegúrate de que el nombre coincida con tu archivo en app/routes)
from app.routes import auth, clientes, vehiculos, ordenes, users, tareas 
import app.models as models 

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Taller Mecánico API")

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

# Registra los routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(clientes.router, prefix="/api/clientes", tags=["Clientes"])
app.include_router(vehiculos.router, prefix="/api/vehiculos", tags=["Vehículos"])
app.include_router(ordenes.router, prefix="/api/ordenes", tags=["Órdenes"])
app.include_router(users.router, prefix="/api")

# AGREGA ESTA LÍNEA:
app.include_router(tareas.router, prefix="/api", tags=["Tareas"])

@app.get("/")
def root():
    return {"message": "API de Taller Mecánico Online funcionando correctamente"}