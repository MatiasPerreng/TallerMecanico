from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, clientes, vehiculos, ordenes 
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

# Inclusión de Rutas
# Importante: Agregamos prefijos para que coincidan con tu Axios del frontend
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(clientes.router, prefix="/api/clientes", tags=["Clientes"])
app.include_router(vehiculos.router, prefix="/api/vehiculos", tags=["Vehículos"])
app.include_router(ordenes.router, prefix="/api/ordenes", tags=["Órdenes"])

@app.get("/")
def root():
    return {"message": "API de Taller Mecánico Online funcionando correctamente"}