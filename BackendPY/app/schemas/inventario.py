from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class CategoriaBase(BaseModel):
    nombre: str

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaUpdate(BaseModel):
    nombre: Optional[str] = None

class CategoriaResponse(CategoriaBase):
    id: int

    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)



class ProductoBase(BaseModel):
    categoria_id: int
    nombre: str
    detalles: Optional[str] = "N/A"
    marca: str
    stock: int = 0
    precio: float

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    categoria_id: Optional[int] = None
    nombre: Optional[str] = None
    detalles: Optional[str] = None
    marca: Optional[str] = None
    stock: Optional[int] = None
    precio: Optional[float] = None

class ProductoResponse(ProductoBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)