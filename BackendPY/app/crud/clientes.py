# app/crud/clientes.py
from sqlalchemy.orm import Session
from app.models.clientes import Cliente
from app.schemas.clientes import ClienteCreate

def get_clientes(db: Session, skip: int = 0, limit: int = 100):
    """Obtiene la lista de clientes paginada"""
    return db.query(Cliente).offset(skip).limit(limit).all()

def get_cliente_by_id(db: Session, cliente_id: int):
    """Busca un cliente específico por su ID"""
    return db.query(Cliente).filter(Cliente.id == cliente_id).first()

def create_cliente(db: Session, cliente: ClienteCreate):
    """Crea un nuevo cliente en la base de datos"""
    db_cliente = Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def update_cliente(db: Session, cliente_id: int, cliente_data: ClienteCreate):
    """
    Actualiza los datos de un cliente existente.
    Busca al cliente, recorre los campos enviados y guarda los cambios.
    """
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    
    if not db_cliente:
        return None

    update_data = cliente_data.model_dump()
    

    for key, value in update_data.items():
        setattr(db_cliente, key, value)
    
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def delete_cliente(db: Session, cliente_id: int):
    """
    Elimina físicamente al cliente de la base de datos.
    Debido a 'cascade=all, delete-orphan' en el modelo, 
    esto también borrará sus órdenes automáticamente.
    """
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    
    if db_cliente:
        db.delete(db_cliente)
        db.commit()
        return True
    
    return False

def desactivar_cliente(db: Session, cliente_id: int):
    """Borrado lógico: Solo cambia el estado a no disponible"""
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    
    if db_cliente:
        db_cliente.disponible = False 
        db.commit()
        db.refresh(db_cliente)
        return db_cliente
    
    return None