from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import os
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials, auth


# Load environment variables
load_dotenv()

cred = credentials.Certificate(os.environ.get("FIREBASE_ADMIN_CREDENTIALS_URL"))
firebase_admin.initialize_app(cred)


def authenticate_user(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
):
    try:
        token = credentials.credentials
        return auth.verify_id_token(token)
    except auth.InvalidIdTokenError as e:
        raise HTTPException(status_code=401, detail=str(e))
