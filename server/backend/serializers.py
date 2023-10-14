from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Community, Challenge
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "username", "token"

    def get_token(self, user):
        token = Token.objects.get(user=user)
        return token.key


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = "__all__"


class CommunitySerializer(serializers.ModelSerializer):
    challenges = ChallengeSerializer(many=True, read_only=True)

    class Meta:
        model = Community
        fields = "__all__"
