from django.urls import path
from .views import exit_community, get_joinded_communities, join_community, log_in, log_out, communities, community_by_id

urlpatterns = [
    path("users/login/", log_in, name="login"),
    path("users/logout/", log_out, name="login"),
    path("users/communities/<str:user_id>/", get_joinded_communities, name="get_joined"),
    path("communities/", communities, name="communities"),
    path("communities/<int:community_id>/", community_by_id, name="communities/id"),
    path("communities/join/",join_community, name="join-community"),
]
