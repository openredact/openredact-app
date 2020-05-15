import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router

app = FastAPI()

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


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
