
from pydantic import BaseModel, EmailStr
from typing import Optional
from ..models.users import UserRole

class UserBase(BaseModel):
    name: str
    email: EmailStr
    rol: UserRole
    disponible: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    disponible: Optional[bool] = None

class UserOut(UserBase):
    id: int
    class Config: from_attributes = True