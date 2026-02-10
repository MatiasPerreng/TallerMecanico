from sqlalchemy import Column, String, Float, ForeignKey, TIMESTAMP, func, Integer, DECIMAL
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.dialects.mysql import BIGINT

class Categoria(Base):
    __tablename__ = "categorias"
    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False, unique=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    productos = relationship("Producto", back_populates="categoria")

class Producto(Base):
    __tablename__ = "productos"
    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    categoria_id = Column(BIGINT(unsigned=True), ForeignKey("categorias.id", ondelete="CASCADE"), nullable=False)
    nombre = Column(String(255), nullable=False)
    detalles = Column(String(255), nullable=True)
    marca = Column(String(255), nullable=False)
    stock = Column(Integer, default=0)
    precio = Column(DECIMAL(10, 2), nullable=False) 
    
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    categoria = relationship("Categoria", back_populates="productos")
    usos = relationship("ProductoUsado", back_populates="producto")

class ProductoUsado(Base):

    __tablename__ = "producto_usados"

    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    tarea_id = Column(BIGINT(unsigned=True), ForeignKey("tareas.id", ondelete="CASCADE"), nullable=False)
    producto_id = Column(BIGINT(unsigned=True), ForeignKey("productos.id", ondelete="CASCADE"), nullable=False)
    
    cantidad = Column(Integer, nullable=False, default=1)
    
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    producto = relationship("Producto", back_populates="usos")
    tarea = relationship("Tarea", back_populates="productos_usados")