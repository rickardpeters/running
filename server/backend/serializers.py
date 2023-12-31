from rest_framework import serializers
from .models import Community, Challenge, UserExtended


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExtended
        fields = "__all__"


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = "__all__"


class CommunitySerializer(serializers.ModelSerializer):
    challenges = ChallengeSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Community
        fields = "__all__"
