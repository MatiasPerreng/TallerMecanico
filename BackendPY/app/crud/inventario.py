from sqlalchemy.orm import Session
from app.models.inventario import Categoria, Producto
from app.schemas.inventario import CategoriaCreate, CategoriaUpdate, ProductoCreate, ProductoUpdate



def get_categorias(db: Session):
    return db.query(Categoria).all()

def get_categoria(db: Session, categoria_id: int):
    return db.query(Categoria).filter(Categoria.id == categoria_id).first()

def create_categoria(db: Session, categoria: CategoriaCreate):

    db_obj = Categoria(nombre=categoria.nombre.upper())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update_categoria(db: Session, categoria_id: int, categoria: CategoriaUpdate):
    db_obj = get_categoria(db, categoria_id)
    if db_obj:
        update_data = categoria.model_dump(exclude_unset=True)
        for key, value in update_data.items():           
            if key == "nombre":
                value = value.upper()
            setattr(db_obj, key, value)
        db.commit()
        db.refresh(db_obj)
    return db_obj

def delete_categoria(db: Session, categoria_id: int):
    db_obj = get_categoria(db, categoria_id)
    if db_obj:
        db.delete(db_obj)
        db.commit()
        return True
    return False


def get_productos(db: Session):
    return db.query(Producto).all()

def get_producto(db: Session, producto_id: int):
    return db.query(Producto).filter(Producto.id == producto_id).first()

def create_producto(db: Session, producto: ProductoCreate):
    db_obj = Producto(**producto.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update_producto(db: Session, producto_id: int, producto: ProductoUpdate):
    db_obj = get_producto(db, producto_id)
    if db_obj:
  
        update_data = producto.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_obj, key, value)
        db.commit()
        db.refresh(db_obj)
    return db_obj

def delete_producto(db: Session, producto_id: int):
    db_obj = get_producto(db, producto_id)
    if db_obj:
        db.delete(db_obj)
        db.commit()
        return True
    return False



def update_stock_producto(db: Session, producto_id: int, cantidad_usada: int):
    """Resta stock cuando se usa un producto en una tarea"""
    db_obj = get_producto(db, producto_id)
    if db_obj:
        db_obj.stock -= cantidad_usada
        db.commit()
        db.refresh(db_obj)
    return db_obj