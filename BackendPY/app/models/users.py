
from sqlalchemy import Column, Integer, String, Boolean, Enum, DateTime
from sqlalchemy.sql import func
from .base import Base
import enum

class UserRole(enum.Enum):
    jefe = "jefe"
    mecanico = "mecanico"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    rol = Column(Enum(UserRole), default=UserRole.mecanico)
    disponible = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())