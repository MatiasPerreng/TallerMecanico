from app.database import SessionLocal
from app.models.users import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_initial_user():
    db = SessionLocal()
    try:

        email = "admin@taller.com"
        password_plana = "admin123"
        

        exists = db.query(User).filter(User.email == email).first()
        if exists:
            print(f"El usuario {email} ya existe.")
            return


        hashed_password = pwd_context.hash(password_plana)

        nuevo_usuario = User(
            name="Administrador",
            email=email,
            password=hashed_password,
            rol="jefe", 
            disponible=True
        )

        db.add(nuevo_usuario)
        db.commit()
        print(f"✅ Usuario creado con éxito!")
        print(f"Email: {email}")
        print(f"Password: {password_plana}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_initial_user()