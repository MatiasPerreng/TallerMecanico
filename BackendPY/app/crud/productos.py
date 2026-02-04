from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import Any
from app.models.gestion import Producto, OrdenRepuesto
from app.schemas.gestion import OrdenRepuestoCreate

def agregar_repuesto_a_orden(db: Session, item: OrdenRepuestoCreate):

    db_producto = db.query(Producto).filter(Producto.id == item.producto_id).first()
    
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    try:
        val_stock = getattr(db_producto, 'stock', 0)
        val_precio = getattr(db_producto, 'precio_venta', 0.0)
        
        actual_stock = int(val_stock) if val_stock is not None else 0
        venta_precio = float(val_precio) if val_precio is not None else 0.0
    except (TypeError, ValueError):
        actual_stock = 0
        venta_precio = 0.0

    if actual_stock < item.cantidad:
        raise HTTPException(status_code=400, detail="Stock insuficiente")

    try:
        nuevo_stock = actual_stock - item.cantidad
        setattr(db_producto, 'stock', nuevo_stock)
        
        nuevo_item = OrdenRepuesto(
            orden_id=item.orden_id,
            producto_id=item.producto_id,
            cantidad=item.cantidad,
            precio_unitario=venta_precio
        )
        
        db.add(nuevo_item)
        db.commit()
        db.refresh(nuevo_item)
        return nuevo_item
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error de BD: {str(e)}")