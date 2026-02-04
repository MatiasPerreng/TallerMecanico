from sqlalchemy.orm import Session
from app.models.clientes_vehiculos import Vehiculo
from app.schemas.gestion import VehiculoCreate 

def get_vehiculo_by_matricula(db: Session, matricula: str):
    return db.query(Vehiculo).filter(Vehiculo.matricula == matricula).first()

def create_vehiculo(db: Session, vehiculo: VehiculoCreate):
    db_vehiculo = Vehiculo(**vehiculo.model_dump())
    db.add(db_vehiculo)
    db.commit()
    db.refresh(db_vehiculo)
    return db_vehiculo