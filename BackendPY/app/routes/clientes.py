from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas import clientes as schemas 
from ..crud import clientes as crud_clientes

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/", response_model=List[schemas.ClienteOut])
def read_clientes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clientes = crud_clientes.get_clientes(db, skip=skip, limit=limit)
    return clientes

@router.post("/", response_model=schemas.ClienteOut)
def create_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return crud_clientes.create_cliente(db=db, cliente=cliente)