from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os

from routes.auth import router as auth_router
from routes.speech import router as speech_router
from routes import translation
from routes import history

from database import engine, Base
from models.history import TranslationHistory
from models.user import AuthSession, User
from sqlalchemy import inspect, text


# ================= FOLDERS =================

os.makedirs("uploads", exist_ok=True)
os.makedirs("outputs", exist_ok=True)


# ================= FASTAPI =================

app = FastAPI(
    title="VoiceTranslate Assistant",
    description="Real-Time Multilingual Voice Translation Assistant",
    version="1.0.0"
)


# ================= DATABASE =================

Base.metadata.create_all(
    bind=engine
)

if "user_id" not in {
    column["name"]
    for column in inspect(engine).get_columns("translation_history")
}:
    with engine.begin() as connection:
        connection.execute(
            text(
                "ALTER TABLE translation_history "
                "ADD COLUMN user_id INTEGER"
            )
        )


# ================= CORS =================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ================= AUDIO OUTPUT =================

app.mount(
    "/outputs",
    StaticFiles(
        directory="outputs"
    ),
    name="outputs"
)


# ================= ROUTES =================

# LOGIN
app.include_router(
    auth_router
)

# 🎤 SPEECH / TRANSLATION
app.include_router(
    speech_router
)

# 🌐 TRANSLATION
app.include_router(
    translation.router
)

# 📜 HISTORY
app.include_router(
    history.router
)


# ================= HOME =================

@app.get("/")
def home():

    return {
        "message":
            "VoiceTranslate Assistant Backend is running"
    }


# ================= HEALTH =================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }