from fastapi import HTTPException, Header

import os
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials
from firebase_admin.auth import verify_id_token, InvalidIdTokenError

# Load environment variables
load_dotenv()

cred = credentials.Certificate(os.environ.get("FIREBASE_ADMIN_CREDENTIALS_URL"))
firebase_admin.initialize_app(cred)


async def authenticate_user(token: str = Header(...)):
    try:
        return verify_id_token(token)
    except InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(token: str = Header(...)):
    try:
        decoded_token = verify_id_token(token)
        uid = decoded_token["uid"]
        return uid
    except InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
