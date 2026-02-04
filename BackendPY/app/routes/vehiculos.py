from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import vehiculos as crud

router = APIRouter(prefix="/vehiculos", tags=["Vehículos"])

@router.get("/{matricula}")
def read_vehiculo(matricula: str, db: Session = Depends(get_db)):
    vehiculo = crud.get_vehiculo_by_matricula(db, matricula)
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    return vehiculo