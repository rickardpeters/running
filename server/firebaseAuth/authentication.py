import firebase_admin
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone
from firebase_admin import auth
from firebase_admin import credentials
from rest_framework import authentication
from rest_framework import exceptions

from backend.models import UserExtended

from .exceptions import FirebaseError
from .exceptions import InvalidAuthToken
from .exceptions import NoAuthToken

from .exceptions import FirebaseError, InvalidAuthToken, NoAuthToken

cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "tddd27-735f0",
  "private_key_id": "42d595cba8c52b0f81ae23c5d44137c8e95797b5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3bgGCZOg9EUI4\nZfxrspF7/LVRU49PRvbha9lRTsR2R8aGMETRYeG8mFNWM7HdZu+o/0a75sRBhiVN\nj6WlJPvyXYH5/Dzt4NIpEN+icXVsShrACiOlJGF01d57+Q9bKhIuQ5te50p1P51C\nj+ABy142HqAR6P2CO5O7PHuaTjXc2J4GDmvRQtgrKvl1vikLigENKhIpcA7XK3BB\nO8jBNLs4TNkaOt/b1+Mwbo3UpgrfnG6qcbAejaG5kUeXV5NxyujTickBmMF8Iohl\nvs/MPWDCJlSsWuAtNKflPaI6r1m928lCNcvvr8qBuC/ZwLGuW4/o95tbRj8dEz8n\n9ya32qejAgMBAAECggEAOSeFP+B6PqD0jcc1ZkdfLo943czYEB8wCOBGeB+/do15\nzdEXeFhz8oRSHz9/UdnjnjhgjWbjyvjmAatbNUB3YrcBK2gNgh91zIbt79tDd8kF\nWcYvAiN6XGHRb7aUstbCkHjPXjxaRntaYGWdKmH4SouzW7FJ4Hz41LQNXXC2Nsgf\nJ/zQcUYi1xFR8tLA97Ct0c1MtYaUsDIpCntv1xzk+SPvVTHsApO4ZiaL1A31b5T1\nk/j6fHysWIFf/rBe1tOhfIqqr+JSssKxJfeuzM2/iQIqHeJw7r//WEguLTWftmkP\n9XqG45G8AwGcf+dPC8v+/Xb70oJtmsCAcatAZut3aQKBgQDe+pH8v6+rV1O31FUA\nQ6PzgLOf/EZLdVcGiqvfuxYJWu+cp8ufFateKRoJ2ZnJXA5MHuGvqzhdl6LMyVF0\nq85LCS8I0zPZ6f0O2Co2FPMvMokWsJtscHgnl0zg+BH+PfiA3nOJsgfSaH69DDfp\n6XBEoM5D+gnlXEJFLl6q5ifmSwKBgQDSmBN+CtROgQkoSugst85qVlXOqoLc9yv4\neeLaeyT7EH7CQ/JDJ/LnDXLXZyvA+J8jeuA11lmZfaUvfc4WnBWMIXfZ5I30POZs\njP/oq6fJST0Ppe3W0p6Zwy5Fi8ExmjeV6HtqxrJMUkuANdvI3WVdJy2xstUJWT0z\ncJbCTy1NCQKBgBow8Ijxsx67KThElp9rUoy9p1u5dEBUzh4Ul8+12AbNSavrAb3z\n+6cZyNczWh8O0xcZ4YSS5hIIR7UqSIkdzSN/Nqkgtcx48aKWvY6Qs2ft1bB2misI\novRzjzI1sVddzBzHBGc+JDEQ2SI3lzHAm9FT2iad7h+k0JvzsGb+ld01AoGASbRx\n9gYiQguFQfXdhnEaLDtlMryYqm9Tk1ZNYDwDOF+QjbssGfbsW5NoYx03wgUB5XAG\n8rC/kSnZW2LDc0RTgkTgZoFIcXezCcDbe/o/8gHQ/h4LvMjgO16FXk/IYOzhkXTZ\nZQh/tJiE1i2Da6yY4l5o7q1xRCFYex1nlkAR0ckCgYEAtkcwqsLtfAkcZbGFISoU\nfcjWj82zYj7xNFRKzKskiVzl11bq+ANXpoGkh36xi0hkvOVwQ5eOpZXJZw4qjxxe\nuSf5VKVyeQNxSwaxOnX5CBsWNqVObVVD08z9rmWYJWMEoVRCZtfaWxzGCs30cB0L\n2eZGneHvbjCsCLUYG0tlpc8=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-6xbt0@tddd27-735f0.iam.gserviceaccount.com",
  "client_id": "110496716736371607641",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6xbt0%40tddd27-735f0.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
})

default_app = firebase_admin.initialize_app(cred)

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            raise NoAuthToken("No auth token provided")
        # Removing "Bearer" from token
        id_token = auth_header.split(" ").pop()
        decoded_token = None
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise InvalidAuthToken("Invalid auth token")

        if not id_token or not decoded_token:
            return None

        try:
            uid = decoded_token.get("user_id")
          
        except Exception:
            raise FirebaseError()

        user, created = UserExtended.objects.get_or_create(identifier=uid)
        user.last_login = timezone.localtime()
        

        return user, None
    

    def get_user(self, user_id):
        try:
            return UserExtended.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None