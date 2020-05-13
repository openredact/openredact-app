from fastapi import APIRouter

from .endpoints import nlp, file

api_router = APIRouter()
api_router.include_router(nlp.router, prefix="/nlp", tags=["nlp"])
api_router.include_router(file.router, prefix="/file", tags=["file"])
