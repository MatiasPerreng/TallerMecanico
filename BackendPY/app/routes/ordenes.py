from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.gestion import OrdenOut, OrdenCreate
from app.crud import ordenes as crud_ordenes


router = APIRouter(prefix="", tags=["Órdenes"])

@router.get("/", response_model=List[OrdenOut])
def leer_ordenes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_ordenes.get_ordenes_completas(db, skip=skip, limit=limit)

@router.get("/{orden_id}", response_model=OrdenOut)
def leer_orden_por_id(orden_id: int, db: Session = Depends(get_db)):
    db_orden = crud_ordenes.get_orden_by_id(db, orden_id=orden_id)
    if not db_orden:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return db_orden

@router.post("/", response_model=OrdenOut, status_code=status.HTTP_201_CREATED)
def crear_orden(orden: OrdenCreate, db: Session = Depends(get_db)):
    try:
        return crud_ordenes.crear_nueva_orden(db=db, orden=orden)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{orden_id}", response_model=OrdenOut)
def actualizar_orden(orden_id: int, orden: OrdenCreate, db: Session = Depends(get_db)):
    """Ruta para editar la orden que te está dando el 404"""
    db_orden = crud_ordenes.actualizar_orden(db, orden_id=orden_id, orden_data=orden)
    if not db_orden:
        raise HTTPException(status_code=404, detail="No se pudo actualizar: Orden no encontrada")
    return db_orden

@router.delete("/{orden_id}")
def eliminar_orden(orden_id: int, db: Session = Depends(get_db)):
    exito = crud_ordenes.eliminar_orden(db, orden_id=orden_id)
    if not exito:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return {"ok": True, "message": "Orden eliminada correctamente"}