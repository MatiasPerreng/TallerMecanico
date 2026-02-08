from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TareaBase(BaseModel):
    orden_id: int
    mecanico_id: int
    estado_de_trabajo: str
    notificacion_al_cliente: Optional[str] = None


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

    class Config:
        from_attributes = True
