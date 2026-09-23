from fastapi import APIRouter, Depends, Form
from routes.auth import get_current_user
from services.translator import translate_text
from services.text_to_speech import text_to_speech
import os

router = APIRouter(
    prefix="/translation",
    tags=["Translation"]
)


@router.post("/text")
async def text_translation(
    user=Depends(get_current_user),
    text: str = Form(...),
    target_language: str = Form(...)
):
    # Translate text
    translated_text = translate_text(
        text,
        target_language
    )

    output_file = None

    if target_language.lower().strip() != "tcy":
        output_file = f"outputs/translated_{target_language}.mp3"

        text_to_speech(
            translated_text,
            target_language,
            output_file
        )

    return {
        "original_text": text,
        "target_language": target_language,
        "translated_text": translated_text,
        "audio_file": output_file
    }