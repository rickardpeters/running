from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from services.database import engine
from routers import user_router, community_router, challenge_router
from utils import models

# Create all models in database
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# MIDDLEWARE
"""Makes sure only allowed hosts and origins can make calls to the server"""
<<<<<<< HEAD
app.add_middleware(TrustedHostMiddleware, allowed_hosts=[
                   "localhost", "127.0.0.1"])
=======
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1","192.168.56.1"])
>>>>>>> 145138a7ce60f8ac0d2b3be0aa704d9ebd137b1c
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000","http://192.168.56.1:3000 "],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS
app.include_router(user_router.router)
app.include_router(community_router.router)
<<<<<<< HEAD
app.include_router(challenge_router.router)


# ROOT (Example of how to protect routes in future)
# This can be deleted
@app.get("/", dependencies=[Depends(authentication.authenticate_user)])
async def root():
    return {"message": "Successfully authenticated!"}
=======
>>>>>>> 145138a7ce60f8ac0d2b3be0aa704d9ebd137b1c
