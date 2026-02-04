# app/crud/vehiculos.py (o gestion.py)
from sqlalchemy.orm import Session
from app.models.clientes_vehiculos import Vehiculo
from app.schemas.gestion import VehiculoCreate 

def get_vehiculos(db: Session, skip: int = 0, limit: int = 100):
    """Obtiene la lista de todos los vehículos"""
    return db.query(Vehiculo).offset(skip).limit(limit).all()

def get_vehiculo_by_id(db: Session, vehiculo_id: int):
    """Busca un vehículo por su ID primario"""
    return db.query(Vehiculo).filter(Vehiculo.id == vehiculo_id).first()

def get_vehiculo_by_matricula(db: Session, matricula: str):
    """Busca un vehículo por su matrícula (identificador único)"""
    return db.query(Vehiculo).filter(Vehiculo.matricula == matricula).first()

def create_vehiculo(db: Session, vehiculo: VehiculoCreate):
    """Alta de vehículo"""
    db_vehiculo = Vehiculo(**vehiculo.model_dump())
    db.add(db_vehiculo)
    db.commit()
    db.refresh(db_vehiculo)
    return db_vehiculo

def update_vehiculo(db: Session, vehiculo_id: int, vehiculo_data: VehiculoCreate):
    """Modificación de vehículo"""
    db_vehiculo = db.query(Vehiculo).filter(Vehiculo.id == vehiculo_id).first()
    
    if not db_vehiculo:
        return None
    

    update_data = vehiculo_data.model_dump()
    for key, value in update_data.items():
        setattr(db_vehiculo, key, value)
    
    db.commit()
    db.refresh(db_vehiculo)
    return db_vehiculo

def delete_vehiculo(db: Session, vehiculo_id: int):
    """Baja de vehículo (Eliminación física)"""
    db_vehiculo = db.query(Vehiculo).filter(Vehiculo.id == vehiculo_id).first()
    
    if db_vehiculo:
        db.delete(db_vehiculo)
        db.commit()
        return True
    
    return False