from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authtoken.models import Token
from firebaseAuth.authentication import FirebaseAuthentication

from server.settings import AUTHENTICATION_BACKENDS
from .serializers import UserSerializer, CommunitySerializer, ChallengeSerializer
from .models import Community, Challenge, UserExtended
import json


@csrf_exempt
@api_view(["POST"])
def log_in(request):
    if request.method == "POST":
        user, _ = FirebaseAuthentication().authenticate(request)
        print(user)
        if user is not None:
            # The login function for the django user model
            login(request, user.user)
            ser_user = UserSerializer(user)
            return Response(ser_user.data)

        else:
            return Response("User not found.", status=404)


@api_view(["GET"])
def getUsers(request):
    users = UserExtended.objects.all()
    users_ser = UserSerializer(users, many=True)
    return Response(users_ser.data)


@csrf_exempt
@api_view(["POST"])
def log_out(request):
    print("inne i första laget")
    user, created = FirebaseAuthentication().authenticate(request)
    print("efter firebase")
    if user.is_authenticated:
        print("authenticated", user)
        logout(request)
        return JsonResponse(status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)


@api_view(["POST"])
def join_community(request):
    data = json.loads(request.body.decode("utf-8"))
    user_id = data["user"]
    community_id = data["community_id"]

    user_extended = UserExtended.objects.get(
        identifier=user_id
    )  # Retrieve the UserExtended instance for the user
    community = Community.objects.get(
        id=community_id
    )  # Retrieve the community by its ID
    user_extended.communities.add(community)

    return JsonResponse("Success", safe=False)


@csrf_exempt
@api_view(["POST"])
def leave_community(request):
    data = json.loads(request.body.decode("utf-8"))
    user_id = data["user"]
    community_id = data["community_id"]

    user_extended = UserExtended.objects.get(identifier=user_id)
    community = Community.objects.get(id=community_id)
    user_extended.communities.remove(community)

    return JsonResponse("Success", safe=False)


@csrf_exempt
@login_required
@api_view(["GET"])
def communities(request):
    communities = Community.objects.all()

    if not communities:
        return HttpResponse("No communities found.")

    ser_communities = CommunitySerializer(communities, many=True)

    return JsonResponse(ser_communities.data, safe=False)


"""
This view handles READ and UPDATE for all communities.
"""


@csrf_exempt
def communities(request):
    if request.method == "GET":
        communities = Community.objects.all()

        if not communities:
            return HttpResponse("No communities found.")

        ser_communities = CommunitySerializer(communities, many=True)

        return JsonResponse(ser_communities.data, safe=False)

    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))

        community_name = data["community_name"]
        description = data["description"]

        if Community.objects.filter(community_name=community_name):
            return HttpResponse("A Community with that name already exists.")

        new_community = Community.objects.create(
            community_name=community_name, description=description
        )

        ser_community = CommunitySerializer(new_community)

        return JsonResponse(ser_community.data, safe=False)


"""
This view handles READ, UPDATE and DELETE for community by id.
"""


@csrf_exempt
def community_by_id(request, community_id):
    print(community_id)
    if request.method == "GET":
        try:
            community = Community.objects.get(id=community_id)
            print(community)

        except ObjectDoesNotExist:
            return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)

        ser_community = CommunitySerializer(community)

        return JsonResponse(ser_community.data, safe=False)

    if request.method == "DELETE":
        try:
            community = Community.objects.filter(id=community_id)

        except ObjectDoesNotExist:
            return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)

        ser_community = CommunitySerializer(community)

        community.delete()

        return JsonResponse(ser_community.data, safe=False)

    if request.method == "PUT":
        try:
            community = Community.objects.filter(id=community_id)

        except ObjectDoesNotExist:
            return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)

        data = json.loads(request.body.decode("utf-8"))

        community.update(**data)

        updated_community = Community.objects.get(id=community_id)

        ser_community = CommunitySerializer(updated_community)

        return JsonResponse(ser_community.data, safe=False)


@csrf_exempt
def challenges(request):
    if request.method == "GET":
        challenges = Challenge.objects.all()

        if not challenges:
            return HttpResponse("No challenges found.")

        ser_challenges = ChallengeSerializer(challenges, many=True)

        return JsonResponse(ser_challenges.data, safe=False)

    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))

        name = data["name"]
        goal = data["goal"]
        community_id = data["community_id"]

        if Challenge.objects.filter(name=name):
            return HttpResponse("A Challenge with that name already exists.")

        community = Community.objects.get(id=community_id)

        new_challenge = Challenge.objects.create(
            name=name, goal=goal, community_id=community
        )

        ser_challenge = ChallengeSerializer(new_challenge)

        return JsonResponse(ser_challenge.data, safe=False)
