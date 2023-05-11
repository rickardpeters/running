from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from sqlalchemy.orm import Session


from database import SessionLocal, engine

import crud, models, schemas, authentication


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# DATABASE DEPENDENCY
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# MIDDLEWARE
"""Makes sure only allowed hosts and origins can make calls to the server"""
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1"])


# ROOT (Example of how to protect routes in future)
@app.get("/", dependencies=[Depends(authentication.authenticate_user)])
async def root():
    return {"message": "Successfully authenticated!"}


# GET USER
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# GET USERS
@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


# CREATE USER
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


# UPDATE USER STILL NEEDS IMPLEMENTATION
@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, db: Session = Depends(get_db)):
    updated_user = crud.update_user(db, user_id=user_id)
    if update_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return update_user


# DELETE USER
@app.delete("/users/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    deleted_user = crud.delete_user(db, user_id=user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_user
