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
    db_community = crud.get_community(db, community_id=community_id)
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
    auth_user: dict = Depends(authentication.authenticate_user),
):
    db_community = crud.get_community_by_name(db, name=community.community_name)
    if db_community:
        raise HTTPException(
            status_code=400, detail="Community with that name already exists!"
        )
    current_user = crud.get_user(db, user_id=auth_user)
    if current_user is None:
        raise HTTPException(status_code=400, detail="No user found")

    return crud.create_community(db=db, community=community, current_user=current_user)


# UPDATE COMMUNITY
@router.put("/{community_id}", response_model=schemas.Community)
def update_community(
    community: schemas.CommunityUpdate,
    community_id: int,
    request_user_id: str = Depends(authentication.authenticate_user),
    db: Session = Depends(get_db),
):
    db_community = crud.get_community(db, community_id=community_id)
    if db_community is None:
        raise HTTPException(status_code=404, detail="User not found")

    if request_user_id not in [admin.id for admin in db_community.community_admins]:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this community"
        )

    if community.add_member:
        user = crud.get_user(db=db, user_id=community.add_member)
        if user and user not in db_community.members:
            db_community.members.append(user)
        else:
            raise HTTPException(status_code=404, detail="User not found")

    if community.remove_member:
        user = crud.get_user(db=db, user_id=community.remove_member)
        if user and user in db_community.members:
            db_community.members.remove(user)
        else:
            raise HTTPException(status_code=404, detail="User not found")

    updated_community = crud.update_community(
        db=db, community=db_community, update_data=community.dict(exclude_unset=True)
    )
    if updated_community is None:
        raise HTTPException(status_code=400, detail="Community could not be updated")
    return updated_community


# DELETE COMMUNTIY
@router.delete("/{community_id}", response_model=schemas.Community)
def delete_community(
    community_id: int,
    request_user_id: str = Depends(authentication.authenticate_user),
    db: Session = Depends(get_db),
):
    db_community = crud.get_community(db=db, community_id=community_id)
    if db_community is None:
        raise HTTPException(status_code=404, detail="Community not found")

    if request_user_id not in [admin.id for admin in db_community.community_admins]:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this community"
        )
    return crud.delete_community(db, community=db_community)
