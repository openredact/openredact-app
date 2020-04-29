from fastapi import APIRouter

from .endpoints import nlp

api_router = APIRouter()
api_router.include_router(nlp.router, prefix="/nlp", tags=["nlp"])
