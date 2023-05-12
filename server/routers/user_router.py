from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from services.database import get_db

from utils import schemas, crud

router = APIRouter()


# GET USER
@router.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# GET USERS
@router.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


# CREATE USER
@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


# UPDATE USER STILL NEEDS IMPLEMENTATION
@router.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, db: Session = Depends(get_db)):
    updated_user = crud.update_user(db, user_id=user_id)
    if update_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


# DELETE USER
@router.delete("/users/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    deleted_user = crud.delete_user(db, user_id=user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_user
