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


@csrf_exempt
@login_required
def communities(request):
    if request.method == "GET":
        communities = Community.objects.all()

        if not communities:
            return HttpResponse("No communities found.")

        ser_communities = CommunitySerializer(communities, many=True)

        return JsonResponse(ser_communities.data, safe=False)
