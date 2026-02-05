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
    """Alta de vehículo con validación de campos segura"""

    vehiculo_data = vehiculo.model_dump()
    
    model_columns = Vehiculo.__table__.columns.keys()
    safe_data = {k: v for k, v in vehiculo_data.items() if k in model_columns}
    
    db_vehiculo = Vehiculo(**safe_data)
    
    db.add(db_vehiculo)
    db.commit()
    db.refresh(db_vehiculo)
    return db_vehiculo

def update_vehiculo(db: Session, vehiculo_id: int, vehiculo_data: VehiculoCreate):
    """Modificación de vehículo con mapeo dinámico"""
    db_vehiculo = db.query(Vehiculo).filter(Vehiculo.id == vehiculo_id).first()
    
    if not db_vehiculo:
        return None
    

    update_data = vehiculo_data.model_dump()
    model_columns = Vehiculo.__table__.columns.keys()
    
    for key, value in update_data.items():
   
        if key in model_columns:
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