import enum
from sqlalchemy import Column, String, Boolean, Enum
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.dialects.mysql import BIGINT

class UserRole(str, enum.Enum):
    jefe = "jefe"
    mecanico = "mecanico"

class User(Base):
    __tablename__ = "users"

    id = Column(BIGINT(unsigned=True), primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    disponible = Column(Boolean, default=True, nullable=False)
    rol = Column(Enum(UserRole), default=UserRole.mecanico, nullable=False)


    tareas_asignadas = relationship("Tarea", back_populates="mecanico")