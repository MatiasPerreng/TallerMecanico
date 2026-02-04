# app/crud/clientes.py
from sqlalchemy.orm import Session
from app.models.clientes import Cliente
from app.schemas.clientes import ClienteCreate

def get_clientes(db: Session, skip: int = 0, limit: int = 100):
    """Obtiene la lista de clientes paginada"""
    return db.query(Cliente).offset(skip).limit(limit).all()

def create_cliente(db: Session, cliente: ClienteCreate):
    """
    Crea un nuevo cliente en la base de datos.
    Se cambió el nombre de 'crear_cliente' a 'create_cliente' 
    para que coincida con la llamada en routes/clientes.py
    """
 
    db_cliente = Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def desactivar_cliente(db: Session, cliente_id: int):
    """Cambia el estado del cliente a no disponible"""
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    
    if db_cliente:
  
        db_cliente.disponible = False 
        db.commit()
        db.refresh(db_cliente)
        return db_cliente
    
    return None

def get_cliente_by_id(db: Session, cliente_id: int):
    """Busca un cliente específico por su ID"""
    return db.query(Cliente).filter(Cliente.id == cliente_id).first()