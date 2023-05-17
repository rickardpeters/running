from sqlalchemy import Table, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from services.database import Base
from services import authentication


user_community_association_table = Table(
    "user_communities",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("community_id", Integer, ForeignKey("communities.id")),
)

admin_community_association_table = Table(
    "admin_communities",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("community_id", Integer, ForeignKey("communities.id")),
)


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, unique=False)
    last_name = Column(String, unique=False)
    strava_access_token = Column(String, unique=True)
    strava_refresh_token = Column(String, unique=True)
    communities = relationship(
        "Community", secondary=user_community_association_table, back_populates="users"
    )
    admin_of_communities = relationship(
        "Community",
        secondary=admin_community_association_table,
        back_populates="community_admins",
    )


class Community(Base):
    __tablename__ = "communities"

    id = Column(Integer, primary_key=True, index=True)
    community_name = Column(String, unique=True, index=True, nullable=False)
    community_admins = relationship(
        "User",
        secondary=admin_community_association_table,
        back_populates="admin_of_communities",
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    users = relationship(
        "User", secondary=user_community_association_table, back_populates="communities"
    )
    challenges = relationship("Challenge", back_populates="community")


class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String, unique=True, nullable=False)
    community = Column(Integer, ForeignKey('communities.id'))
    #community = Column(Integer, index=True, nullable=False)
    goal = Column(Integer, nullable=False)
    start_date = Column(DateTime(timezone=True), server_default=func.now())
    end_date = Column(DateTime(timezone=True))
