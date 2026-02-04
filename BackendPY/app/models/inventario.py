from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class Categoria(Base):
    __tablename__ = "categorias"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), unique=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    productos = relationship("Producto", back_populates="categoria")

class Producto(Base):
    __tablename__ = "productos"
    id = Column(Integer, primary_key=True, index=True)
    categoria_id = Column(Integer, ForeignKey("categorias.id", ondelete="CASCADE"))
    nombre = Column(String(255), nullable=False)
    marca = Column(String(255), nullable=False)
    detalles = Column(String(255))
    stock = Column(Integer, default=0)
    precio = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    categoria = relationship("Categoria", back_populates="productos")

class ProductoUsado(Base):
    __tablename__ = "producto_usados"
    id = Column(Integer, primary_key=True, index=True)
    tarea_id = Column(Integer, ForeignKey("tareas.id", ondelete="CASCADE"))
    producto_id = Column(Integer, ForeignKey("productos.id", ondelete="CASCADE"))
    cantidad = Column(Integer, default=1)
    created_at = Column(DateTime, server_default=func.now())