from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.inventario import CategoriaCreate, CategoriaResponse, ProductoCreate, ProductoResponse
from app.crud import inventario as crud

router = APIRouter()

@router.get("/categorias", response_model=List[CategoriaResponse])
def read_categorias(db: Session = Depends(get_db)):
    return crud.get_categorias(db)

@router.post("/categorias", response_model=CategoriaResponse)
def create_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    return crud.create_categoria(db, categoria)

@router.get("/productos", response_model=List[ProductoResponse])
def read_productos(db: Session = Depends(get_db)):
    return crud.get_productos(db)

@router.post("/productos", response_model=ProductoResponse)
def create_producto(producto: ProductoCreate, db: Session = Depends(get_db)):
    return crud.create_producto(db, producto)