from datetime import datetime
from typing import Optional, List
from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    first_name: str
    last_name: str


class UserStravaTokens(UserBase):
    strava_access_token: Optional[str]
    strava_refresh_token: Optional[str]


class UserSummery(UserBase):
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class UserUpdate(UserBase):
    email: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]


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
    description: Optional[str]


class CommunityUpdate(CommunityBase):
    community_name: Optional[str]
    description: Optional[str]
    add_member: Optional[str]
    remove_member: Optional[str]
    add_admin: Optional[str]
    remove_admin: Optional[str]


class Community(CommunityBase):
    id: int
    description: str
    created_at: datetime
    users: list[User]
    community_admins: List[UserSummery]
    members: List[UserSummery]


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
