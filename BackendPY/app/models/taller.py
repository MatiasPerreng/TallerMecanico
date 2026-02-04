from sqlalchemy import Column, BigInteger, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class RolEnum(enum.Enum):
    jefe = "jefe"
    mecanico = "mecanico"

class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    email_verified_at = Column(DateTime, nullable=True)
    password = Column(String(255), nullable=False)
    disponible = Column(Boolean, default=True)
    rol = Column(Enum(RolEnum), default=RolEnum.mecanico)
    remember_token = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    tareas = relationship("Tarea", back_populates="mecanico")