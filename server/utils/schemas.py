from pydantic import BaseModel
from typing import Optional
from datetime import datetime


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
