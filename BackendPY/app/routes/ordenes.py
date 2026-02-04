from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.gestion import OrdenOut, OrdenCreate
from app.crud import ordenes as crud_ordenes

router = APIRouter(prefix="/ordenes", tags=["Órdenes"])

@router.get("/", response_model=List[OrdenOut])
def leer_ordenes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ordenes = crud_ordenes.get_ordenes_activas(db, skip=skip, limit=limit)
    return ordenes

@router.post("/", response_model=OrdenOut)
def crear_orden(orden: OrdenCreate, db: Session = Depends(get_db)):
    return crud_ordenes.create_orden(db=db, orden=orden)