from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.users import UserResponse, UserCreate
from app.crud import users as crud_users

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/mecanicos", response_model=List[UserResponse])
def read_mecanicos(db: Session = Depends(get_db)):
    """Este endpoint es el que debe consumir tu modal"""
    mecanicos = crud_users.get_mecanicos(db)
    return mecanicos

@router.post("/", response_model=UserResponse)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_users.create_user(db=db, user=user)