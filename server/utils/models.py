from sqlalchemy import Table, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from services.database import Base


user_community_association_table = Table(
    "user_communities",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id")),
    Column("community_id", Integer, ForeignKey("communities.id")),
)

admin_community_association_table = Table(
    "admin_communities",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id")),
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
        "Community",
        secondary=user_community_association_table,
        back_populates="members",
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
    description = Column(String, unique=False, nullable=False, default="")
    community_admins = relationship(
        "User",
        secondary=admin_community_association_table,
        back_populates="admin_of_communities",
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    members = relationship(
        "User", secondary=user_community_association_table, back_populates="communities"
    )
