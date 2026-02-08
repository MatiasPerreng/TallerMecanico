import enum
from sqlalchemy import Column, BigInteger, String, TIMESTAMP, Boolean, Enum
from app.database import Base

class UserRole(str, enum.Enum):
    jefe = "jefe"
    mecanico = "mecanico"

class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    disponible = Column(Boolean, default=True, nullable=False)
    rol = Column(Enum(UserRole), default=UserRole.mecanico, nullable=False)
    