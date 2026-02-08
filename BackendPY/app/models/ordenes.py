from sqlalchemy import Column, String, Date, Text, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.dialects.mysql import BIGINT

class Orden(Base):
    __tablename__ = "ordens"  # Confirmado: "ordens"

    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    cliente_id = Column(BIGINT(unsigned=True), ForeignKey("clientes.id", ondelete="CASCADE"), nullable=False)
    vehiculo_id = Column(BIGINT(unsigned=True), ForeignKey("vehiculos.id", ondelete="CASCADE"), nullable=False)
    
    detalle_de_trabajos_a_realizar = Column(Text, nullable=True)
    recepcion = Column(Date, nullable=False)
    prometido = Column(Date, nullable=True)
    cambio_de_aceite = Column(Boolean, default=False)
    cambio_de_filtro = Column(Boolean, default=False)
    detalles_de_entrada_del_vehiculo = Column(Text, nullable=True)
    disponible = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, nullable=True)
    updated_at = Column(TIMESTAMP, nullable=True)

    # Relaciones
    cliente = relationship("Cliente", back_populates="ordenes")
    vehiculo = relationship("Vehiculo", back_populates="ordenes")
    
    # Esta es la conexión necesaria para Tarea
    tareas = relationship("Tarea", back_populates="orden")