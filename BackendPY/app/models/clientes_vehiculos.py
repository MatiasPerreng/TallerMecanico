
from sqlalchemy import Column, Integer, String, Boolean, Date
from .base import Base

class Cliente(Base):
    __tablename__ = "clientes"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    rut = Column(String(255))
    telefono = Column(String(255), nullable=False)
    domicilio = Column(String(255))
    disponible = Column(Boolean, default=True)

class Vehiculo(Base):
    __tablename__ = "vehiculos"
    id = Column(Integer, primary_key=True, index=True)
    matricula = Column(String(255), unique=True, nullable=False)
    modelo = Column(String(255), nullable=False)
    marca = Column(String(255), nullable=False)
    color = Column(String(255))
    kilometraje = Column(String(255))
    fecha_de_compra = Column(Date)
    disponible = Column(Boolean, default=True)