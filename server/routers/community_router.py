from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from services.database import get_db
from services import authentication
from utils import schemas, crud

router = APIRouter(
    prefix="/communities", dependencies=[Depends(authentication.authenticate_user)]
)


# GET COMMUNTIY
@router.get("/{community_id}", response_model=schemas.Community)
def read_community(community_id: int, db: Session = Depends(get_db)):
    db_community = crud.get_community(db, user_id=community_id)
    if db_community is None:
        raise HTTPException(status_code=404, detail="Community not found")
    return db_community


# GET COMMUNITIES
@router.get("/", response_model=list[schemas.Community])
def read_communities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    communities = crud.get_communities(db, skip=skip, limit=limit)
    return communities


# CREATE COMMUNITY
@router.post("/", response_model=schemas.Community)
def create_community(
    community: schemas.CommunityCreate,
    db: Session = Depends(get_db),
):
    db_community = crud.get_community_by_name(db, name=community.community_name)
    if db_community:
        raise HTTPException(
            status_code=400, detail="Community with that name already exists!"
        )
    return crud.create_user(db=db, community=community)


# UPDATE COMMUNITY STILL NEEDS IMPLEMENTATION
# @router.put("/{user_id}", response_model=schemas.User)
# def update_user(user_id: int, db: Session = Depends(get_db)):
#     updated_user = crud.update_user(db, user_id=user_id)
#     if update_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return updated_user


# DELETE COMMUNTIY
@router.delete("/{community_id}", response_model=schemas.Community)
def delete_community(community_id: int, db: Session = Depends(get_db)):
    deleted_community = crud.delete_community(db, community_id=community_id)
    if not deleted_community:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_community
