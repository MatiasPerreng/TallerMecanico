from sqlalchemy.orm import Session, joinedload
from app.models.tareas import Tarea
from app.schemas.tareas import TareaCreate, TareaUpdate


def get_tareas(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Tarea)
        .options(
            joinedload(Tarea.orden),
            joinedload(Tarea.mecanico),
        )
        .order_by(Tarea.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_tarea_by_id(db: Session, tarea_id: int):
    return (
        db.query(Tarea)
        .options(
            joinedload(Tarea.orden),
            joinedload(Tarea.mecanico),
        )
        .filter(Tarea.id == tarea_id)
        .first()
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
    if not db_tarea:
        return None

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
    if not db_tarea:
        return False

    try:
        db.delete(db_tarea)
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        raise e
