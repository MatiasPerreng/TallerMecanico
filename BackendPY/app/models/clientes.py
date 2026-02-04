from sqlalchemy import Column, BigInteger, String, Boolean, DateTime, TIMESTAMP
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.dialects.mysql import BIGINT

class Cliente(Base):
    __tablename__ = "clientes"

  
    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    rut = Column(String(255), nullable=True)
    telefono = Column(String(255), nullable=False)
    domicilio = Column(String(255), nullable=True)
    disponible = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, nullable=True)
    updated_at = Column(TIMESTAMP, nullable=True)

    ordenes = relationship("Orden", back_populates="cliente")