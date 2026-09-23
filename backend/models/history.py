from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from datetime import datetime

from database import Base


class TranslationHistory(Base):

    __tablename__ = "translation_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
        index=True,
    )

    original_text = Column(String, nullable=False)

    detected_language = Column(String, nullable=False)

    target_language = Column(String, nullable=False)

    translated_text = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )