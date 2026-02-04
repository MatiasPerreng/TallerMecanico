from sqlalchemy import Column, BigInteger, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    rut = Column(String(255), nullable=True)
    telefono = Column(String(255), nullable=False)
    domicilio = Column(String(255), nullable=True)
    disponible = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    ordenes = relationship("Orden", back_populates="cliente")