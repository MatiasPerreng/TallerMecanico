from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.users import User
from app.schemas.users import UserResponse, UserLogin 
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 1. LOGIN
@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Credenciales inválidas"
        )

    if not pwd_context.verify(credentials.password, str(user.password)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Credenciales inválidas"
        )

    return {
        "ok": True,
        "uid": user.id,
        "name": user.name,
        "email": user.email,
        "rol": user.rol,
        "token": "TOKEN_TEMPORAL_DE_PRUEBA" 
    }


@router.get("/usuario", response_model=UserResponse)
def get_usuario(db: Session = Depends(get_db)):
    """
    Este endpoint evita el 404 que causa el deslogueo.
    Por ahora, como estamos probando, devolveremos el primer usuario 
    o uno basado en un ID temporal para que el frontend no falle.
    """
    # TODO: 
    user = db.query(User).first() 
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user