import hashlib
import hmac
import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import get_db
from models.user import AuthSession, User


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

security = HTTPBearer(auto_error=False)
PASSWORD_ITERATIONS = 600_000
SESSION_DURATION = timedelta(days=7)


class AccountRequest(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=4, max_length=128)


class LoginRequest(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    password: str = Field(min_length=1, max_length=128)


def _normalize_name(name: str) -> str:
    return name.strip().lower()


def _hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        PASSWORD_ITERATIONS,
    )
    return "pbkdf2_sha256${}${}${}".format(
        PASSWORD_ITERATIONS,
        salt.hex(),
        digest.hex(),
    )


def _verify_password(password: str, stored_hash: str) -> bool:
    try:
        algorithm, iterations, salt_hex, digest_hex = stored_hash.split("$")
        if algorithm != "pbkdf2_sha256":
            return False
        expected = bytes.fromhex(digest_hex)
        actual = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            bytes.fromhex(salt_hex),
            int(iterations),
        )
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False


def _create_session(user: User, db: Session) -> str:
    token = secrets.token_urlsafe(32)
    session = AuthSession(
        user_id=user.id,
        token_hash=hashlib.sha256(token.encode("utf-8")).hexdigest(),
        expires_at=datetime.utcnow() + SESSION_DURATION,
    )
    db.add(session)
    db.commit()
    return token


def _auth_response(user: User, token: str, message: str):
    return {
        "success": True,
        "message": message,
        "name": user.name,
        "token": token,
    }


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Authentication required")

    token_hash = hashlib.sha256(
        credentials.credentials.encode("utf-8")
    ).hexdigest()
    session = (
        db.query(AuthSession)
        .filter(AuthSession.token_hash == token_hash)
        .first()
    )

    if session is None or session.expires_at <= datetime.utcnow():
        raise HTTPException(status_code=401, detail="Invalid or expired session")

    user = db.query(User).filter(User.id == session.user_id).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid session")

    return user


@router.post("/register")
def register(data: AccountRequest, db: Session = Depends(get_db)):
    name = _normalize_name(data.name)
    if not name:
        raise HTTPException(status_code=400, detail="Name is required")

    user = User(name=name, password_hash=_hash_password(data.password))
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="An account with that name already exists",
        )

    db.refresh(user)
    return _auth_response(
        user,
        _create_session(user, db),
        "Account created successfully",
    )


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    name = _normalize_name(data.name)
    user = db.query(User).filter(User.name == name).first()

    if user is None or not _verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid name or password")

    return _auth_response(
        user,
        _create_session(user, db),
        "Login successful",
    )


@router.get("/me")
def current_account(user: User = Depends(get_current_user)):
    return {"name": user.name}


@router.post("/logout")
def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    token_hash = hashlib.sha256(
        credentials.credentials.encode("utf-8")
    ).hexdigest()
    db.query(AuthSession).filter(
        AuthSession.token_hash == token_hash,
        AuthSession.user_id == user.id,
    ).delete()
    db.commit()
    return {"success": True, "message": "Logged out successfully"}
