from sqlalchemy.orm import Session

from . import models, schemas


##### USER CRUD #####
def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(
    db: Session,
    user: dict,
):
    db_user = models.User(
        email=user["email"],
        id=user["firebase_uid"],
        first_name=user["first_name"],
        last_name=user["last_name"],
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int):
    pass


def delete_user(db: Session, user_id: str):
    user = get_user(db=db, user_id=user_id)
    if user is None:
        return None
    db.delete(user)
    db.commit()
    return user


##### COMMUNITY CRUD #####
def get_community(db: Session, community_id: schemas.Community):
    return (
        db.query(models.Community).filter(models.Community.id == community_id).first()
    )


def get_community_by_name(db: Session, name: str):
    return (
        db.query(models.Community)
        .filter(models.Community.community_name == name)
        .first()
    )


def get_communities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Community).offset(skip).limit(limit).all()


def create_community(
    db: Session, community: schemas.Community, current_user: schemas.User
):
    db_community = models.Community(
        name=community.community_name, community_admin=current_user.id
    )
    db.add(db_community)
    db.commit()
    db.refresh(db_community)
    return db_community


def update_community(db: Session, community_id: int):
    pass


def delete_community(db: Session, community_id: int):
    community = get_community(db=db, community_id=community_id)
    if community is None:
        return None
    db.delete(community)
    db.commit()
    return community
