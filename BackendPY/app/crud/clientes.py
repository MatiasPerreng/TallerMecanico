from sqlalchemy.orm import Session
from app.models.clientes import Cliente
from app.schemas.clientes import ClienteCreate

def get_clientes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Cliente).offset(skip).limit(limit).all()

def crear_cliente(db: Session, cliente: ClienteCreate):
    db_cliente = Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def desactivar_cliente(db: Session, cliente_id: int):

    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    

    if db_cliente:
        setattr(db_cliente, "disponible", False)
        db.commit()
        db.refresh(db_cliente)
        return db_cliente
    
    return None