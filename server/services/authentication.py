from fastapi import Depends, HTTPException, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import os
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials, auth

# Load environment variables
load_dotenv()

cred = credentials.Certificate(os.environ.get("FIREBASE_ADMIN_CREDENTIALS_URL"))
firebase_admin.initialize_app(cred)


async def authenticate_user(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
):
    try:
        token = credentials.credentials
        return auth.verify_id_token(token)
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
):
    try:
        token = credentials.credentials
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        return uid
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
