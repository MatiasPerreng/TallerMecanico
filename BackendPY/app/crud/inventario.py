from sqlalchemy.orm import Session
from app.models.inventario import Categoria, Producto
from app.schemas.inventario import CategoriaCreate, ProductoCreate

def create_categoria(db: Session, categoria: CategoriaCreate):
    db_obj = Categoria(nombre=categoria.nombre)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_categorias(db: Session):
    return db.query(Categoria).all()

def create_producto(db: Session, producto: ProductoCreate):
    # .model_dump() es el equivalente moderno a .dict()
    db_obj = Producto(**producto.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_productos(db: Session):
    return db.query(Producto).all()