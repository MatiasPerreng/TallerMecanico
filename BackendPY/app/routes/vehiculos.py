from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.crud import vehiculos as crud
from app.schemas.gestion import VehiculoCreate, VehiculoOut

router = APIRouter(prefix="", tags=["Vehículos"])

@router.get("/", response_model=List[VehiculoOut])
def read_vehiculos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Obtener todos los vehículos"""
    return crud.get_vehiculos(db, skip=skip, limit=limit)

@router.get("/{matricula}", response_model=VehiculoOut)
def read_vehiculo_by_matricula(matricula: str, db: Session = Depends(get_db)):
    """Buscar un vehículo por su matrícula"""
    vehiculo = crud.get_vehiculo_by_matricula(db, matricula)
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    return vehiculo

@router.post("/", response_model=VehiculoOut, status_code=status.HTTP_201_CREATED)
def create_vehiculo(vehiculo: VehiculoCreate, db: Session = Depends(get_db)):
    """Crear un nuevo vehículo"""
    db_vehiculo = crud.get_vehiculo_by_matricula(db, matricula=vehiculo.matricula)
    if db_vehiculo:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="La matrícula ya está registrada en el sistema"
        )
    return crud.create_vehiculo(db=db, vehiculo=vehiculo)

@router.put("/{vehiculo_id}", response_model=VehiculoOut)
def update_vehiculo(vehiculo_id: int, vehiculo: VehiculoCreate, db: Session = Depends(get_db)):
    """Actualizar datos de un vehículo por ID"""
    db_vehiculo = crud.update_vehiculo(db, vehiculo_id=vehiculo_id, vehiculo_data=vehiculo)
    if not db_vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado para actualizar")
    return db_vehiculo

@router.delete("/{vehiculo_id}")
def delete_vehiculo(vehiculo_id: int, db: Session = Depends(get_db)):
    """Eliminar un vehículo por ID"""
    success = crud.delete_vehiculo(db, vehiculo_id=vehiculo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado para eliminar")
    return {"ok": True, "message": "Vehículo eliminado correctamente"}