from datetime import datetime
from typing import Optional, List
from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class UserStravaTokens(UserBase):
    strava_access_token: Optional[str]
    strava_refresh_token: Optional[str]

    class Config:
        orm_mode = True


class UserSummery(UserBase):
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class UserUpdate(UserBase):
    email: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]

    class Config:
        orm_mode = True


class User(UserBase):
    id: str
    first_name: str
    last_name: str
    communities: list
    admin_of_communities: list

    class Config:
        orm_mode = True


class CommunityBase(BaseModel):
    community_name: str

    class Config:
        orm_mode = True


class CommunityCreate(CommunityBase):
    community_name: str
    description: Optional[str]

    class Config:
        orm_mode = True


class CommunityUpdate(CommunityBase):
    community_name: Optional[str]
    description: Optional[str]
    add_member: Optional[str]
    remove_member: Optional[str]
    add_challenge: Optional[str]
    add_admin: Optional[str]
    remove_admin: Optional[str]

    class Config:
        orm_mode = True


class Community(CommunityBase):
    id: int
    description: str
    created_at: datetime
    users: Optional[list[User]]
    community_admins: List[UserSummery]
    members: List[UserSummery]
    challenges: Optional[List["ChallengeBase"]]

    class Config:
        orm_mode = True


class ChallengeBase(BaseModel):
    name: str
    goal: int

    class Config:
        orm_mode = True


class Challenge(ChallengeBase):
    id: int
    name: str
    goal: int
    start_date: datetime
    end_date: datetime
    community: Optional[CommunityCreate]

    class Config:
        orm_mode = True


class ChallengeCreate(ChallengeBase):
    goal: int
    name: str
    start_date: datetime
    end_date: datetime
    community_id: int

    class Config:
        orm_mode = True


class ChallengeUpdate(ChallengeBase):
    goal: int

    class Config:
        orm_mode = True


Community.update_forward_refs()
Challenge.update_forward_refs()
