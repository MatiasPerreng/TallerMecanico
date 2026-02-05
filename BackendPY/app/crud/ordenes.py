from sqlalchemy.orm import Session
from app.models.gestion import Orden
from app.schemas.gestion import OrdenCreate
from datetime import datetime

def get_ordenes_completas(db: Session, skip: int = 0, limit: int = 100):
    """Obtiene todas las órdenes con sus relaciones cargadas (Cliente y Vehículo)"""
    return db.query(Orden).offset(skip).limit(limit).all()

def get_orden_by_id(db: Session, orden_id: int):
    """Obtiene una sola orden por su ID primario"""
    return db.query(Orden).filter(Orden.id == orden_id).first()

def crear_nueva_orden(db: Session, orden: OrdenCreate):
    """Alta de orden con filtrado de seguridad"""
    orden_data = orden.model_dump()
    

    model_columns = Orden.__table__.columns.keys()
    safe_data = {k: v for k, v in orden_data.items() if k in model_columns}

    if "created_at" in model_columns and safe_data.get("created_at") is None:
        safe_data["created_at"] = datetime.utcnow()
    
    db_orden = Orden(**safe_data)
    
    try:
        db.add(db_orden)
        db.commit()
        db.refresh(db_orden)
        return db_orden
    except Exception as e:
        db.rollback()
        print(f"DEBUG: Error al crear orden: {str(e)}")
        raise e

def actualizar_orden(db: Session, orden_id: int, orden_data: OrdenCreate):
    """Modificación de una orden existente"""
    db_orden = db.query(Orden).filter(Orden.id == orden_id).first()
    
    if not db_orden:
        return None

 
    datos_nuevos = orden_data.model_dump()
    model_columns = Orden.__table__.columns.keys()

    for key, value in datos_nuevos.items():
   
        if key in model_columns and key != "id":
            setattr(db_orden, key, value)
    
    if "updated_at" in model_columns:
        db_orden.updated_at = datetime.utcnow()

    try:
        db.commit()
        db.refresh(db_orden)
        return db_orden
    except Exception as e:
        db.rollback()
        print(f"DEBUG: Error al actualizar orden: {str(e)}")
        raise e

def eliminar_orden(db: Session, orden_id: int):
    """Baja física de una orden"""
    db_orden = db.query(Orden).filter(Orden.id == orden_id).first()
    
    if not db_orden:
        return False
        
    try:
        db.delete(db_orden)
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        print(f"DEBUG: Error al eliminar orden: {str(e)}")
        raise e