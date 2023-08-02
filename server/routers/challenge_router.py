from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from services.database import get_db
from services import authentication
from utils import schemas, crud

router = APIRouter(
    prefix="/challenges", dependencies=[Depends(authentication.authenticate_user)]
)

# GET CHALLENGE


@router.get("/{challenge_id}", response_model=schemas.Challenge)
def read_challenge(challenge_id: int, db: Session = Depends(get_db)):
    db_challenge = crud.get_challenge(db, challenge_id=challenge_id)
    if db_challenge is None:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return db_challenge


# GET CHALLENGES


@router.get("/", response_model=list[schemas.Challenge])
def read_challenges(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    challenges = crud.get_challenges(db, skip=skip, limit=limit)
    return challenges


# CREATE CHALLENGE


@router.post("/", response_model=schemas.Challenge)
def create_challenge(challenge: schemas.ChallengeCreate, db: Session = Depends(get_db)):
    challenge_data = {
        "name": challenge.name,
        "goal": challenge.goal,
        "start_date": challenge.start_date,
        "end_date": challenge.end_date,
        "community_id": challenge.community_id,
    }

    return crud.create_challenge(db=db, challenge=challenge_data)


# DELETE CHALLENGE


@router.delete("/{challenge_id}", response_model=schemas.ChallengeDelete)
def delete_challenge(challenge_id: int, db: Session = Depends(get_db)):
    deleted_challenge = crud.delete_challenge(db, challenge_id=challenge_id)
    if not deleted_challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return deleted_challenge


# UPDATE CHALLENGE


@router.put("/{challenge_id}", response_model=schemas.Challenge)
def update_challenge(
    challenge: schemas.ChallengeUpdate, challenge_id: int, db: Session = Depends(get_db)
):
    db_challenge = crud.get_challenge(db=db, challenge_id=challenge_id)
    if db_challenge is None:
        raise HTTPException(status_code=404, detail="Challenge not found")

    updated_challenge = crud.update_challenge(
        db=db,
        challenge=db_challenge,
        challenge_update=challenge.dict(exclude_unset=True),
    )

    return updated_challenge
