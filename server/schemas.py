from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str


class UserCreate(UserBase):
    id: int


class User(UserBase):
    id: Optional[UUID] = uuid4()

    class config:
        orm_mode = True
