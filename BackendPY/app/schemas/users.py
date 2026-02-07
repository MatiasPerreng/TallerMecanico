from pydantic import BaseModel, EmailStr
from typing import Optional
from app.models.users import UserRole

class UserBase(BaseModel):
    name: str
    email: EmailStr
    rol: UserRole = UserRole.mecanico
    disponible: bool = True

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True