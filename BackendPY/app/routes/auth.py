from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.users import User
from app.schemas.users import UserResponse, UserLogin, UserCreate 
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    user_exists = db.query(User).filter(User.email == user_in.email).first()
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado"
        )
    
  
    new_user = User(
        name=user_in.name,
        email=user_in.email,
        password=pwd_context.hash(user_in.password), 
        rol="mecanico", 
        disponible=True
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    

    return new_user

@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not pwd_context.verify(credentials.password, str(user.password)):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Credenciales inválidas")

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
    user = db.query(User).first() 
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user