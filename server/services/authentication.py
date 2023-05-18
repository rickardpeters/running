from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import os
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials, auth


# Load environment variables
load_dotenv()
app = FastAPI()


cred = credentials.Certificate(os.environ.get("FIREBASE_ADMIN_CREDENTIALS_URL"))
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
