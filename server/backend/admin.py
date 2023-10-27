from django.contrib import admin
from .models import UserExtended, Challenge, Community
from rest_framework.authtoken.models import Token

admin.site.site_header = "Kubba på lite"

admin.site.register(UserExtended)
admin.site.register(Challenge)
admin.site.register(Community)
