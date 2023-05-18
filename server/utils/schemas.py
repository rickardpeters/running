from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    first_name: str
    last_name: str


class UserStravaTokens(UserBase):
    strava_access_token: Optional[str]
    strava_refresh_token: Optional[str]


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


class CommunityCreate(CommunityBase):
    community_name: str


class Community(CommunityBase):
    id: int
    community_admins: list[User]
    created_at: datetime
    users: list[User]


class ChallengeBase(BaseModel):
    name: str


class ChallengeCreate(ChallengeBase):
    goal: int
    name: str
    start_date: datetime
    end_date: datetime


class ChallengeUpdate(ChallengeBase):
    goal: int


class Challenge(ChallengeBase):
    name: str
    goal: int
    #community: int
    start_date: datetime
    end_date: datetime

    class Config:
        orm_mode = True
