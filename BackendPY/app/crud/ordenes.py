from sqlalchemy.orm import Session
from app.models.gestion import Orden
from app.schemas.gestion import OrdenCreate

def get_ordenes_completas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Orden).offset(skip).limit(limit).all()

def crear_nueva_orden(db: Session, orden: OrdenCreate):
    db_orden = Orden(**orden.model_dump())
    db.add(db_orden)
    db.commit()
    db.refresh(db_orden)
    return db_orden