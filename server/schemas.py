from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    first_name: str
    last_name: str
    firebase_uid: str


class UserStravaTokens(UserBase):
    strava_access_token: Optional[str]
    strava_refresh_token: Optional[str]


class User(UserBase):
    id: int
    first_name: str
    last_name: str

    class Config:
        orm_mode = True
