from django.urls import path
from .views import log_in, log_out, communities

urlpatterns = [
    path("users/login/", log_in, name="login"),
    path("users/logout/", log_out, name="login"),
    path("communities/", communities, name="communities"),
]
