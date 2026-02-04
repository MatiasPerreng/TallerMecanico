from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.users import User
from app.schemas.taller import UserLogin, UserOut
from passlib.context import CryptContext
from typing import Any

router = APIRouter(tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Credenciales inválidas (Email no encontrado)"
        )

  
    password_hash = str(user.password)
    if not pwd_context.verify(credentials.password, password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Credenciales inválidas (Contraseña incorrecta)"
        )


    return {
        "ok": True,
        "uid": str(user.id),
        "name": user.name,
        "email": user.email,
        "rol": user.rol,
        "token": "TOKEN_TEMPORAL_DE_PRUEBA" 
    }