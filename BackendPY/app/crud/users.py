from sqlalchemy.orm import Session
from app.models.users import User, UserRole
from app.schemas.users import UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        rol=user.rol,
        disponible=user.disponible
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_mecanicos(db: Session):
    """Filtra solo los usuarios que son mecánicos para el select del modal"""
    return db.query(User).filter(User.rol == UserRole.mecanico).all()

def get_all_users(db: Session):
    return db.query(User).all()