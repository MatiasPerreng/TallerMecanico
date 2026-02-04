from pydantic import BaseModel, ConfigDict
from datetime import date, datetime
from typing import Optional


class VehiculoBase(BaseModel):
    matricula: str
    modelo: str
    marca: str
    color: str
    kilometraje: str
    numero_de_serie: Optional[str] = "N/A"
    numero_de_motor: Optional[str] = "N/A"
    fecha_de_compra: Optional[date] = None
    disponible: bool = True

class VehiculoCreate(VehiculoBase):
    """Se usa para crear un vehículo desde el frontend"""
    pass

class VehiculoOut(VehiculoBase):
    """Se usa para devolver datos del vehículo al frontend"""
    id: int
    model_config = ConfigDict(from_attributes=True)



class OrdenBase(BaseModel):
    cliente_id: int
    vehiculo_id: int
    detalle_de_trabajos_a_realizar: Optional[str] = None
    recepcion: date
    prometido: Optional[date] = None
    cambio_de_aceite: bool = False
    cambio_de_filtro: bool = False
    detalles_de_entrada_del_vehiculo: Optional[str] = "N/A"
    disponible: bool = True

class OrdenCreate(OrdenBase):
    """Se usa para abrir una nueva orden de servicio"""
    pass

class OrdenOut(OrdenBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


class InspeccionFrenosBase(BaseModel):
    orden_id: int
    frenos_delanteros: str
    frenos_traseros: str
    liquido_frenos: bool
    observaciones: Optional[str] = None

class InspeccionFrenosCreate(InspeccionFrenosBase):
    pass

class InspeccionFrenosOut(InspeccionFrenosBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class ProductoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio_venta: float
    stock: int
    categoria: Optional[str] = None

class ProductoCreate(ProductoBase):
    """Para dar de alta nuevos repuestos o aceites"""
    pass

class ProductoOut(ProductoBase):
    id: int
    model_config = ConfigDict(from_attributes=True)



class OrdenRepuestoCreate(BaseModel):
    """Asocia un producto de stock con una orden específica"""
    orden_id: int
    producto_id: int
    cantidad: int

class OrdenRepuestoOut(BaseModel):
    id: int
    orden_id: int
    producto_id: int
    cantidad: int
    precio_unitario: float
    model_config = ConfigDict(from_attributes=True)