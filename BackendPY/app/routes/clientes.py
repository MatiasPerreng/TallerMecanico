from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas import clientes as schemas 
from ..crud import clientes as crud_clientes


router = APIRouter(prefix="", tags=["Clientes"])

@router.get("/", response_model=List[schemas.ClienteOut])
def read_clientes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Obtener lista de clientes"""
    clientes = crud_clientes.get_clientes(db, skip=skip, limit=limit)
    return clientes

@router.post("/", response_model=schemas.ClienteOut)
def create_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    """Crear un nuevo cliente"""
    return crud_clientes.create_cliente(db=db, cliente=cliente)

@router.put("/{cliente_id}", response_model=schemas.ClienteOut)
def update_cliente(cliente_id: int, cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    """
    Editar un cliente existente. 
    Esta es la ruta que te estaba dando 'Not Found'.
    """
    db_cliente = crud_clientes.update_cliente(db, cliente_id=cliente_id, cliente_data=cliente)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cliente no encontrado para actualizar")
    return db_cliente

@router.delete("/{cliente_id}")
def delete_cliente(cliente_id: int, db: Session = Depends(get_db)):
    """
    Borrar un cliente de la base de datos.
    """
    success = crud_clientes.delete_cliente(db, cliente_id=cliente_id)
    if not success:
        raise HTTPException(status_code=404, detail="Cliente no encontrado para eliminar")
    return {"ok": True, "msg": "Cliente eliminado correctamente"}

@router.get("/{cliente_id}", response_model=schemas.ClienteOut)
def read_cliente_by_id(cliente_id: int, db: Session = Depends(get_db)):
    """Obtener un solo cliente por su ID"""
    db_cliente = crud_clientes.get_cliente_by_id(db, cliente_id=cliente_id)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return db_cliente