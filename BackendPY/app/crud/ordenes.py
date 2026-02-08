from sqlalchemy.orm import Session, joinedload
from app.models.gestion import Orden
from app.schemas.gestion import OrdenCreate
from app.models.tareas import Tarea
from app.schemas.tareas import TareaCreate, TareaUpdate
from app.models.clientes_vehiculos import Vehiculo
from app.schemas.gestion import VehiculoCreate 
from datetime import datetime

# --- FUNCIONES ORDENES ---
def get_ordenes_completas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Orden).offset(skip).limit(limit).all()

def get_orden_by_id(db: Session, orden_id: int):
    return db.query(Orden).filter(Orden.id == orden_id).first()

def crear_nueva_orden(db: Session, orden: OrdenCreate):
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
        raise e

def actualizar_orden(db: Session, orden_id: int, orden_data: OrdenCreate):
    db_orden = db.query(Orden).filter(Orden.id == orden_id).first()
    if not db_orden: return None

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
        raise e

def eliminar_orden(db: Session, orden_id: int):
    db_orden = db.query(Orden).filter(Orden.id == orden_id).first()
    if not db_orden: return {"ok": False}
    try:
        db.delete(db_orden)
        db.commit()
        return {"ok": True} # Cambiado a objeto para evitar error de parseo en Axios
    except Exception as e:
        db.rollback()
        raise e

# --- FUNCIONES TAREAS ---
def get_tareas(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Tarea)
        .options(joinedload(Tarea.orden), joinedload(Tarea.mecanico))
        .order_by(Tarea.id.desc())
        .offset(skip).limit(limit).all()
    )

def get_tarea_by_id(db: Session, tarea_id: int):
    return (
        db.query(Tarea)
        .options(joinedload(Tarea.orden), joinedload(Tarea.mecanico))
        .filter(Tarea.id == tarea_id).first()
    )

def crear_tarea(db: Session, tarea: TareaCreate):
    db_tarea = Tarea(**tarea.model_dump())
    try:
        db.add(db_tarea)
        db.commit()
        db.refresh(db_tarea)
        return get_tarea_by_id(db, db_tarea.id)
    except Exception as e:
        db.rollback()
        raise e  

def actualizar_tarea(db: Session, tarea_id: int, tarea_data: TareaUpdate):
    db_tarea = db.query(Tarea).filter(Tarea.id == tarea_id).first()
    if not db_tarea: return None

    datos = tarea_data.model_dump(exclude_unset=True)
    for key, value in datos.items():
        setattr(db_tarea, key, value)

    try:
        db.commit()
        db.refresh(db_tarea)
        return get_tarea_by_id(db, db_tarea.id)
    except Exception as e:
        db.rollback()
        raise e

def eliminar_tarea(db: Session, tarea_id: int):
    db_tarea = db.query(Tarea).filter(Tarea.id == tarea_id).first()
    if not db_tarea: return {"ok": False}
    try:
        db.delete(db_tarea)
        db.commit()
        return {"ok": True}
    except Exception as e:
        db.rollback()
        raise e

# --- FUNCIONES VEHICULOS ---
def get_vehiculos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Vehiculo).offset(skip).limit(limit).all()

def create_vehiculo(db: Session, vehiculo: VehiculoCreate):
    vehiculo_data = vehiculo.model_dump()
    model_columns = Vehiculo.__table__.columns.keys()
    safe_data = {k: v for k, v in vehiculo_data.items() if k in model_columns}
    db_vehiculo = Vehiculo(**safe_data)
    db.add(db_vehiculo)
    db.commit()
    db.refresh(db_vehiculo)
    return db_vehiculo

def delete_vehiculo(db: Session, vehiculo_id: int):
    db_vehiculo = db.query(Vehiculo).filter(Vehiculo.id == vehiculo_id).first()
    if db_vehiculo:
        db.delete(db_vehiculo)
        db.commit()
        return {"ok": True}
    return {"ok": False}