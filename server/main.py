from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from services.database import engine
from routers import user_router, community_router
from utils import models
from services import authentication

# Create all models in database
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# MIDDLEWARE
"""Makes sure only allowed hosts and origins can make calls to the server"""
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router)
app.include_router(community_router.router)


# ROOT (Example of how to protect routes in future)
# This can be deleted
@app.get("/", dependencies=[Depends(authentication.authenticate_user)])
async def root():
    return {"message": "Successfully authenticated!"}
