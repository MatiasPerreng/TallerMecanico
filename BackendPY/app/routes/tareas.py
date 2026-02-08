from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.tareas import TareaCreate, TareaUpdate, TareaOut
from app.crud.tareas import (
    get_tareas,
    get_tarea_by_id,
    crear_tarea,
    actualizar_tarea,
    eliminar_tarea,
)

router = APIRouter(prefix="/tareas", tags=["Tareas"])


@router.get("/", response_model=list[TareaOut])
def listar_tareas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_tareas(db, skip, limit)


@router.get("/{tarea_id}", response_model=TareaOut)
def obtener_tarea(tarea_id: int, db: Session = Depends(get_db)):
    tarea = get_tarea_by_id(db, tarea_id)
    if not tarea:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return tarea


@router.post("/", response_model=TareaOut)
def crear_nueva_tarea(tarea: TareaCreate, db: Session = Depends(get_db)):
    return crear_tarea(db, tarea)


@router.put("/{tarea_id}", response_model=TareaOut)
def editar_tarea(
    tarea_id: int,
    tarea_data: TareaUpdate,
    db: Session = Depends(get_db),
):
    tarea = actualizar_tarea(db, tarea_id, tarea_data)
    if not tarea:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return tarea


@router.delete("/{tarea_id}")
def borrar_tarea(tarea_id: int, db: Session = Depends(get_db)):
    ok = eliminar_tarea(db, tarea_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"ok": True}
