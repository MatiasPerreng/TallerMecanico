from sqlalchemy.orm import Session
from app.models.users import User, UserRole
from app.schemas.users import UserCreate, UserUpdate # Importado UserUpdate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

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

def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None
    

    update_data = user.model_dump(exclude_unset=True)
    

    if "password" in update_data and update_data["password"]:
        update_data["password"] = pwd_context.hash(update_data["password"])
    

    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = get_user_by_id(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False