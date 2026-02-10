from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from sqlalchemy.dialects.mysql import BIGINT

class Tarea(Base):
    __tablename__ = "tareas"

    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    
    orden_id = Column(BIGINT(unsigned=True), ForeignKey("ordens.id", ondelete="CASCADE"), nullable=False)
    mecanico_id = Column(BIGINT(unsigned=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    estado_de_trabajo = Column(String(50), default="pendiente")
    notificacion_al_cliente = Column(String(255), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    orden = relationship("Orden", back_populates="tareas")
    
   
    mecanico = relationship("User", back_populates="tareas_asignadas")
    
 
    productos_usados = relationship("ProductoUsado", back_populates="tarea", cascade="all, delete-orphan")