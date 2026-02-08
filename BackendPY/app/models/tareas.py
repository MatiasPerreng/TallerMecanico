from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Tarea(Base):
    __tablename__ = "tareas"

    id = Column(Integer, primary_key=True, index=True)

    orden_id = Column(Integer, ForeignKey("ordenes.id"), nullable=False)
    mecanico_id = Column(Integer, ForeignKey("mecanicos.id"), nullable=False)

    estado_de_trabajo = Column(String(50), nullable=False)
    notificacion_al_cliente = Column(String(255), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    orden = relationship("Orden", back_populates="tareas")
    mecanico = relationship("Mecanico", back_populates="tareas")
