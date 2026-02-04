
from sqlalchemy import Column, Integer, String, ForeignKey
from .base import Base

class Frenos(Base):
    __tablename__ = "frenos"
    id = Column(Integer, primary_key=True)
    tarea_id = Column(Integer, ForeignKey("tareas.id", ondelete="CASCADE"))
    delanteros = Column(String(255), default="0")
    traseros = Column(String(255), default="0")
    estacionamiento = Column(String(255), default="0")

class EstadoNeumaticos(Base):
    __tablename__ = "estado_neumaticos"
    id = Column(Integer, primary_key=True)
    tarea_id = Column(Integer, ForeignKey("tareas.id", ondelete="CASCADE"))
    delanteros_derechos = Column(String(255), default="0")
    delanteros_izquierdos = Column(String(255), default="0")

class TrenDelantero(Base):
    __tablename__ = "tren_delantero"
    id = Column(Integer, primary_key=True)
    tarea_id = Column(Integer, ForeignKey("tareas.id", ondelete="CASCADE"))
    rotulas = Column(String(255), default="0")
    bujes = Column(String(255), default="0")
    amort = Column(String(255), default="0")