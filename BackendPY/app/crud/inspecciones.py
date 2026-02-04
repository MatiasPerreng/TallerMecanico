from sqlalchemy.orm import Session
from app.models.gestion import InspeccionFrenos 
from app.schemas.gestion import InspeccionFrenosCreate

def crear_inspeccion_frenos(db: Session, inspeccion: InspeccionFrenosCreate):
    db_inspeccion = InspeccionFrenos(**inspeccion.model_dump())
    db.add(db_inspeccion)
    db.commit()
    db.refresh(db_inspeccion)
    return db_inspeccion