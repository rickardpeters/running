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
