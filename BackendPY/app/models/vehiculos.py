from sqlalchemy import Column, BigInteger, String, Date, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Vehiculo(Base):
    __tablename__ = "vehiculos"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    modelo = Column(String(255), nullable=False)
    marca = Column(String(255), nullable=False)
    color = Column(String(255), nullable=False)
    matricula = Column(String(255), unique=True, nullable=False)
    kilometraje = Column(String(255), nullable=False)
    numero_de_serie = Column(String(255), nullable=True)
    numero_de_motor = Column(String(255), nullable=True)
    fecha_de_compra = Column(Date, nullable=True)
    disponible = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    ordenes = relationship("Orden", back_populates="vehiculo")