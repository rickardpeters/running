from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token


class Community(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    community_name = models.CharField(max_length=255, blank=False, default="")
    description = models.TextField(
        max_length=255, blank=True, default="No description."
    )

    def __str__(self):
        return str(self.id) + " - " + self.community_name


class UserExtended(models.Model):
    strava_key = models.CharField(max_length=255, blank=True, default="No key")
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    identifier = models.CharField(max_length=900, unique=True, blank=False)

    communities = models.ManyToManyField(Community, related_name="members")

    def is_authenticated(self):
        return self.user.is_authenticated

    def is_active(self):
        return self.user.is_active


class Challenge(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255, blank=False, default="")
    goal = models.IntegerField(blank=False)
    community_id = models.ForeignKey(Community, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id) + " - " + self.name


""" Creates Auth Token for a new user on creation"""


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
