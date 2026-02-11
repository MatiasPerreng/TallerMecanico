from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.users import UserResponse, UserCreate, UserUpdate 
from app.crud import users as crud_users
from app.models.users import User

router = APIRouter(tags=["Usuarios"])


@router.get("/usuarios", response_model=List[UserResponse])
def read_users(db: Session = Depends(get_db)):
    """Ruta: GET /api/usuarios"""
    return db.query(User).all()


@router.get("/mecanicos", response_model=List[UserResponse])
def read_mecanicos(db: Session = Depends(get_db)):
    """Ruta: GET /api/mecanicos"""
    return crud_users.get_mecanicos(db)


@router.post("/usuarios", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    """Ruta: POST /api/usuarios"""
    db_user = crud_users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    return crud_users.create_user(db=db, user=user)


@router.put("/usuarios/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)):
    """Ruta: PUT /api/usuarios/{id}"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    

    return crud_users.update_user(db=db, user_id=user_id, user=user_data)


@router.delete("/usuarios/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Ruta: DELETE /api/usuarios/{id}"""
    success = crud_users.delete_user(db=db, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"ok": True, "message": "Usuario eliminado correctamente"}