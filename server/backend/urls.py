from django.urls import path
from .views import (
    join_community,
    log_in,
    log_out,
    communities,
    community_by_id,
    challenges,
    leave_community,
    get_joined_communities,
)

urlpatterns = [
    path("users/login/", log_in, name="login"),
    path("users/logout/", log_out, name="login"),
    path("users/communities/<str:user_id>/", get_joined_communities, name="get_joined"),
    path("communities/", communities, name="communities"),
    path("communities/<int:community_id>/", community_by_id, name="communities/id"),
    path("communities/join/", join_community, name="join-community"),
    path("communities/leave/", leave_community, name="leave-community"),
    path("challenges/", challenges, name="challenges"),
    path("challenges/<str:user_id>/", challenges, name="challenges"),
]
