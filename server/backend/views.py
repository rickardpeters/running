from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import  login, logout
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
    users = User.objects.all()
    return Response("User not found.", status=404)
@csrf_exempt
@api_view(["POST"])
def log_out(request):
    user, created = FirebaseAuthentication().authenticate(request)
    if user.is_authenticated :
        
        logout(request)
        return JsonResponse(status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)

        


@csrf_exempt
@login_required
@api_view(["GET"])
def communities(request):
    communities = Community.objects.all()

    if not communities:
        return HttpResponse("No communities found.")

    ser_communities = CommunitySerializer(communities, many=True)

    return JsonResponse(ser_communities.data, safe=False)
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, CommunitySerializer, ChallengeSerializer
from .models import Community, Challenge
import json


@csrf_exempt
def log_in(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))

        email = data["email"]
        password = data["password"]

        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)
            ser_user = UserSerializer(user)
            return JsonResponse(ser_user.data, safe=False)

        else:
            return Response("User not found.", status=404)


@csrf_exempt
def log_out(request):
    if request.method == "POST":
        try:
            user = User.objects.get(username=request.user.username)
        except ObjectDoesNotExist:
            return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)

        logout(request)
        return JsonResponse(status.HTTP_200_OK, safe=False)


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
