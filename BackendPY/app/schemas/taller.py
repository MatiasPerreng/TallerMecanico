from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from enum import Enum

class RolUsuario(str, Enum):
    jefe = "jefe"
    mecanico = "mecanico"

class UserBase(BaseModel):
    name: str
    email: EmailStr
    rol: RolUsuario = RolUsuario.mecanico
    disponible: bool = True

class UserCreate(UserBase):
    """Para crear mecánicos nuevos (incluye password)"""
    password: str

class UserOut(UserBase):
    """Para mostrar el perfil o listar mecánicos"""
    id: int
    
    model_config = ConfigDict(from_attributes=True)

class UserLogin(BaseModel):
    """Para el formulario de inicio de sesión"""
    email: EmailStr
    password: str