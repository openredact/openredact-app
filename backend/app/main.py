import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.endpoints import router

app = FastAPI(
    title="OpenRedact API", description="Anonymize German documents using automatic PII detection.", version="0.1.0",
)


origins = [
    # for dev server
    "http://localhost:3000",
    "http://127.0.0.1:3000",
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
    uvicorn.run(app, host="127.0.0.1", port=8000)
