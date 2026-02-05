from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.gestion import OrdenOut, OrdenCreate
from app.crud import ordenes as crud_ordenes


router = APIRouter(prefix="", tags=["Órdenes"])

@router.get("/", response_model=List[OrdenOut])
def leer_ordenes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Obtener todas las órdenes con su información relacionada"""
    return crud_ordenes.get_ordenes_completas(db, skip=skip, limit=limit)

@router.post("/", response_model=OrdenOut, status_code=status.HTTP_201_CREATED)
def crear_orden(orden: OrdenCreate, db: Session = Depends(get_db)):
    """Crear una nueva orden de trabajo"""
    try:
        return crud_ordenes.crear_nueva_orden(db=db, orden=orden)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Error al crear la orden: {str(e)}"
        )