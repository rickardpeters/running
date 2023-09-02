from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import os
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials, auth


# Load environment variables
load_dotenv()
app = FastAPI()

credentials_file = "firebase_credentials.json"

# Construct the full path to the credentials file
credentials_path = os.path.join(os.path.dirname(__file__), credentials_file)

# Initialize the Firebase app using the credentials file path
cred = credentials.Certificate(credentials_path)

firebase_admin.initialize_app(cred)


def authenticate_user(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
):
    """Authenticates the user and returns user id of corresponding user"""
    try:
        token = credentials.credentials
        return auth.verify_id_token(token)["uid"]
    except auth.InvalidIdTokenError as e:
        raise HTTPException(status_code=401, detail=str(e))
