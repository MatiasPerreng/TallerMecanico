from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime

class ClienteBase(BaseModel):
    nombre: str
    email: EmailStr
    rut: Optional[str] = "N/A"
    telefono: str
    domicilio: Optional[str] = "N/A"
    disponible: bool = True

class ClienteCreate(ClienteBase):
    """Para el POST desde el formulario de registro de clientes"""
    pass

class ClienteOut(ClienteBase):
    """Para listar clientes en tablas de React"""
    id: int
    created_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)