from sqlalchemy import Table, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from services.database import Base


association_table = Table(
    "user_communities",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("community_id", Integer, ForeignKey("communities.id")),
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, unique=False)
    last_name = Column(String, unique=False)
    strava_access_token = Column(String, unique=True)
    strava_refresh_token = Column(String, unique=True)
    communities = relationship(
        "Community", secondary=association_table, back_populates="users"
    )
    admin_of_communities = relationship("Community", back_populates="community_admin")


class Community(Base):
    __tablename__ = "communities"

    id = Column(Integer, primary_key=True, index=True)
    community_name = Column(String, unique=True, index=True, nullable=False)
    community_admin_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    community_admin = relationship("User", back_populates="admin_of_communities")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    users = relationship(
        "User", secondary=association_table, back_populates="communities"
    )
