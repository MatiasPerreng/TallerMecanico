from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class ClienteRelacion(BaseModel):
    nombre: str
    model_config = ConfigDict(from_attributes=True)

class OrdenRelacion(BaseModel):
    id: int
    cliente: Optional[ClienteRelacion] = None
    model_config = ConfigDict(from_attributes=True)

class MecanicoRelacion(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class TareaBase(BaseModel):
    orden_id: int
    mecanico_id: int
    estado_de_trabajo: str
    notificacion_al_cliente: Optional[str] = "N/A"

class TareaCreate(TareaBase):
    pass

class TareaUpdate(BaseModel):
    orden_id: Optional[int] = None
    mecanico_id: Optional[int] = None
    estado_de_trabajo: Optional[str] = None
    notificacion_al_cliente: Optional[str] = None

class TareaOut(TareaBase):
    id: int
    created_at: datetime
    orden: Optional[OrdenRelacion] = None
    mecanico: Optional[MecanicoRelacion] = None

    model_config = ConfigDict(from_attributes=True)