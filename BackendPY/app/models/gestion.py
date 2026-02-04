from sqlalchemy import Column, Integer, ForeignKey, Text, Date, Boolean, Enum, BigInteger
from sqlalchemy.orm import relationship
from .base import Base
import enum

class TareaEstado(enum.Enum):
    pendiente = "pendiente"
    en_proceso = "en_proceso"
    pendiente_de_facturacion = "pendiente_de_facturacion"
    completado = "completado"

class Orden(Base):
    __tablename__ = "ordens"
    __table_args__ = {'extend_existing': True}
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    cliente_id = Column(BigInteger, ForeignKey("clientes.id", ondelete="CASCADE"))
    vehiculo_id = Column(BigInteger, ForeignKey("vehiculos.id", ondelete="CASCADE"))
    detalle_de_trabajos_a_realizar = Column(Text)
    recepcion = Column(Date, nullable=False)
    prometido = Column(Date)
    cambio_de_aceite = Column(Boolean, default=False)
    cambio_de_filtro = Column(Boolean, default=False)
    disponible = Column(Boolean, default=True)

class Tarea(Base):
    __tablename__ = "tareas"
    __table_args__ = {'extend_existing': True}
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    orden_id = Column(BigInteger, ForeignKey("ordens.id", ondelete="CASCADE"))
    mecanico_id = Column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"))
    estado_de_trabajo = Column(Enum(TareaEstado), default=TareaEstado.pendiente)
    notificacion_al_cliente = Column(Text)