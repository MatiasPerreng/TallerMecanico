from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from sqlalchemy.dialects.mysql import BIGINT

class Tarea(Base):
    __tablename__ = "tareas"

    id = Column(Integer, primary_key=True, index=True)


    orden_id = Column(BIGINT(unsigned=True), ForeignKey("ordens.id"), nullable=False)
    mecanico_id = Column(BIGINT(unsigned=True), ForeignKey("users.id"), nullable=False)

    estado_de_trabajo = Column(String(50), nullable=False)
    notificacion_al_cliente = Column(String(255), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    orden = relationship("Orden", back_populates="tareas")
    mecanico = relationship("User", back_populates="tareas")