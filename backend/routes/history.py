from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.history import TranslationHistory
from routes.auth import get_current_user
from models.user import User

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

@router.get("/")
def get_history(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    records = (
        db.query(TranslationHistory)
        .filter(TranslationHistory.user_id == user.id)
        .order_by(TranslationHistory.created_at.desc())
        .all()
    )

    return {
        "history": [_serialize_record(record) for record in records]
    }


@router.post("/")
def add_history(
    data: dict,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    required_fields = (
        "original_text",
        "detected_language",
        "target_language",
        "translated_text",
    )
    if any(not data.get(field) for field in required_fields):
        raise HTTPException(
            status_code=400,
            detail="All translation history fields are required.",
        )

    record = TranslationHistory(
        user_id=user.id,
        original_text=data["original_text"],
        detected_language=data["detected_language"],
        target_language=data["target_language"],
        translated_text=data["translated_text"],
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return _serialize_record(record)


@router.delete("/")
def clear_history(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.query(TranslationHistory).filter(
        TranslationHistory.user_id == user.id
    ).delete()
    db.commit()


    return {
        "message": "History cleared successfully"
    }


def _serialize_record(record: TranslationHistory):
    return {
        "id": record.id,
        "original_text": record.original_text,
        "detected_language": record.detected_language,
        "target_language": record.target_language,
        "translated_text": record.translated_text,
        "date": (
            record.created_at.strftime("%Y-%m-%d %H:%M:%S")
            if record.created_at
            else datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        ),
    }