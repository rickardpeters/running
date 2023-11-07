from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from firebaseAuth.authentication import FirebaseAuthentication
from .serializers import UserSerializer, CommunitySerializer, ChallengeSerializer
from .models import Community, Challenge, UserExtended
import json


@csrf_exempt
@api_view(["POST"])
def log_in(request):
    if request.method == "POST":  ##### Behövs denna? Iom att vi har api_view
        fire_user, _ = FirebaseAuthentication().authenticate(request)
        user = fire_user.user

        if user is not None:
            # The login function for the django user model
            login(request, user, "django.contrib.auth.backends.ModelBackend")
            print(user.is_authenticated)
            ser_user = UserSerializer(fire_user)
            return Response(ser_user.data)

        else:
            return Response("User not found.", status=404)


@csrf_exempt
@login_required
@api_view(["POST"])
def log_out(request):
    fire_user, created = FirebaseAuthentication().authenticate(
        request
    )  ## Behövs created? Ska motsvara ett token från firebase?
    user = fire_user.user

    if user.is_authenticated:
        logout(request)
        return JsonResponse(status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)


@api_view(["GET"])  #### Göra om till inte api_view?
def getUsers(request):
    users = UserExtended.objects.all()
    users_ser = UserSerializer(users, many=True)
    return Response(users_ser.data)


@api_view(["POST"])  #### Göra om till inte api_view?
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


@api_view(["GET"])  #### Göra om till inte api_view?
def get_joined_communities(request, user_id):
    user = UserExtended.objects.get(identifier=user_id)
    if not user:
        return JsonResponse("User not found")
    comm_ids = user.communities.values_list("pk", flat=True)
    if not comm_ids:
        return Response([])
    comm_joined = Community.objects.filter(id__in=comm_ids).all()
    if not comm_joined:
        return Response([])
    comm_ser = CommunitySerializer(comm_joined, many=True)
    return Response(comm_ser.data)


@csrf_exempt
@api_view(["POST"])  #### Göra om till inte api_view?
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
@api_view(["GET"])  #### Varför dubbel?
def communities(request):
    communities = Community.objects.all()

    if not communities:
        return HttpResponse("No communities found.")

    ser_communities = CommunitySerializer(communities, many=True)

    return JsonResponse(ser_communities.data, safe=False)


"""
This view handles CREATE and READ for all communities.
"""


@csrf_exempt
def communities(request):  #### Lägga in try/except
    if request.method == "GET":
        try:
            communities = Community.objects.all()

        except ObjectDoesNotExist:
            return JsonResponse(status.HTTP_404_NOT_FOUND, safe=False)

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
def challenges(request, user_id):
    if request.method == "GET":
        user_extended = UserExtended.objects.get(identifier=user_id)

        # Retrieve the challenges related to the user's communities
        user_communities = user_extended.communities.all()
        challenges = Challenge.objects.filter(community_id__in=user_communities)

        if not challenges:
            return HttpResponse("No challenges found.", status=404)

        ser_challenges = ChallengeSerializer(challenges, many=True)

        return JsonResponse(ser_challenges.data, safe=False)

    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))

        name = data["name"]
        goal = data["goal"]
        community_id = data["community_id"]

        

        community = Community.objects.get(id=community_id)

        new_challenge = Challenge.objects.create(
            name=name, goal=goal, community_id=community
        )

        ser_challenge = ChallengeSerializer(new_challenge)

        return JsonResponse(ser_challenge.data, safe=False)
