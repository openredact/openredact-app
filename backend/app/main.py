import uvicorn
import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.endpoints import router

# setup loggers
logging.config.fileConfig(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "logging.conf"), disable_existing_loggers=False
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title="OpenRedact API", description="Anonymize German documents using automatic PII detection.", version="0.1.0",
)


origins = [
    # for dev server
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    # for docker-compose
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:80",
    "http://127.0.0.1:80",
]

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)


app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
