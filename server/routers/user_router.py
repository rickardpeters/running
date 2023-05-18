from fastapi import Depends, HTTPException, APIRouter, Request
from sqlalchemy.orm import Session

from services.database import get_db
from services import authentication
from utils import schemas, crud

router = APIRouter(
    prefix="/users", dependencies=[Depends(authentication.authenticate_user)]
)


# GET USER
@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# GET USERS
@router.get("/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


# CREATE USER
@router.post("/", response_model=schemas.User)
def create_user(
    user: schemas.UserCreate,
    current_user: str = Depends(authentication.authenticate_user),
    db: Session = Depends(get_db),
):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = crud.get_user(db, user_id=current_user)
    if db_user:
        raise HTTPException(
            status_code=400, detail="An user with this ID already exists"
        )

    user_data = {
        "firebase_uid": current_user,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }

    return crud.create_user(db=db, user=user_data)


# UPDATE USER
@router.put("/{user_id}", response_model=schemas.User)
def update_user(
    user: schemas.UserUpdate,
    user_id: str,
    request_user_id: str = Depends(authentication.authenticate_user),
    db: Session = Depends(get_db),
):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if user_id != request_user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this user"
        )

    updated_user = crud.update_user(
        db=db, user=db_user, update_data=user.dict(exclude_unset=True)
    )
    if updated_user is None:
        raise HTTPException(status_code=400, detail="User could not be updated")
    return updated_user


# DELETE USER
@router.delete("/{user_id}", response_model=schemas.User)
def delete_user(
    user_id: str,
    request_user_id: str = Depends(authentication.authenticate_user),
    db: Session = Depends(get_db),
):
    if user_id != request_user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this user"
        )
    deleted_user = crud.delete_user(db, user_id=user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_user
