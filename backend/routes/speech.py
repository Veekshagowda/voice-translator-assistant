from fastapi import (
    APIRouter,
    BackgroundTasks,
    UploadFile,
    File,
    Form,
    HTTPException
)
from fastapi import Depends

import shutil
import os
import subprocess  # 🔴 CHANGED - added
import uuid

from services.speech_to_text import speech_to_text
from services.translator import translate_text
from services.text_to_speech import text_to_speech
from routes.auth import get_current_user


router = APIRouter(
    prefix="/speech",
    tags=["Speech"]
)


def create_translation_audio(text: str, language: str, output_file: str):
    try:
        text_to_speech(text, language, output_file)
        print("✅ Background audio created:", output_file)
    except Exception as e:
        print("❌ Background audio failed:", repr(e))


# =====================================================
# TEST
# =====================================================

@router.get("/test")
def speech_test():

    return {
        "message": "Speech API is working"
    }


# =====================================================
# TRANSLATE AUDIO
# =====================================================

@router.post("/translate")
async def translate_audio(

    background_tasks: BackgroundTasks,

    user=Depends(get_current_user),

    file: UploadFile = File(...),

    source_language: str = Form("auto"),

    target_language: str = Form(...)

):

    try:

        # =================================================
        # CREATE FOLDERS
        # =================================================

        os.makedirs(
            "uploads",
            exist_ok=True
        )

        os.makedirs(
            "outputs",
            exist_ok=True
        )


        # =================================================
        # SAVE AUDIO
        # =================================================

        file_path = os.path.join(
            "uploads",
            file.filename
        )


        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )


        print("\n====================================")
        print("📁 AUDIO SAVED")
        print("====================================")

        print(
            "File:",
            file_path
        )

        print(
            "Source:",
            source_language
        )

        print(
            "Target:",
            target_language
        )


        # =================================================
        # NOISE REDUCTION  # 🔴 CHANGED - new block
        # =================================================

        denoised_path = file_path.replace(".webm", "_denoised.wav")

        try:

            subprocess.run(
                [
                    "ffmpeg", "-y",
                    "-i", file_path,
                    "-af", "afftdn=nf=-25,highpass=f=100,lowpass=f=8000",
                    "-ar", "16000",
                    "-ac", "1",
                    denoised_path
                ],
                check=True,
                capture_output=True
            )

            print("🔇 Noise reduction applied:", denoised_path)

            audio_for_processing = denoised_path

        except Exception as e:

            print("⚠️ Denoise failed, using original audio:", repr(e))

            audio_for_processing = file_path


        # =================================================
        # SPEECH TO TEXT
        # =================================================

        result = speech_to_text(

            audio_for_processing,  # 🔴 CHANGED - was file_path

            source_language

        )


        recognized_text = result["text"].strip()

        detected_language = result["language"]


        print("\n====================================")
        print("📝 SPEECH RESULT")
        print("====================================")

        print(
            "Recognized:",
            repr(recognized_text)
        )

        print(
            "Detected:",
            detected_language
        )


        # =================================================
        # CHECK SPEECH
        # =================================================

        if not recognized_text:

            raise HTTPException(

                status_code=400,

                detail=
                "No speech detected. Please speak clearly and try again."

            )


        # =================================================
        # TRANSLATION
        # =================================================

        translated_text = translate_text(

            recognized_text,

            target_language

        )


        print("\n====================================")
        print("🌐 TRANSLATION")
        print("====================================")

        print(
            "Translated:",
            translated_text
        )


        # =================================================
        # CHECK TRANSLATION
        # =================================================

        if not translated_text:

            raise HTTPException(

                status_code=400,

                detail=
                "Translation returned empty text."

            )


        # =================================================
        # TEXT TO SPEECH
        # =================================================

        output_file = None
        output_filename = None

        if target_language.lower().strip() != "tcy":
            output_filename = (
                f"translated_{target_language}_{uuid.uuid4().hex}.mp3"
            )
            output_file = os.path.join("outputs", output_filename)

            background_tasks.add_task(
                create_translation_audio,
                translated_text,
                target_language,
                output_file
            )


        print("\n====================================")
        print("🔊 AUDIO CREATED")
        print("====================================")

        print(
            "Output:",
            output_file
        )


        # =================================================
        # RESPONSE
        # =================================================

        return {

            "filename":
                file.filename,

            "source_language":
                detected_language,

            "detected_language":
                detected_language,

            "recognized_text":
                recognized_text,

            "target_language":
                target_language,

            "translated_text":
                translated_text,

            "audio_url":
                f"/outputs/{output_filename}"
                if output_file
                else None

        }


    # =====================================================
    # HTTP ERROR
    # =====================================================

    except HTTPException:

        raise


    # =====================================================
    # VALUE ERROR
    # =====================================================

    except ValueError as e:

        raise HTTPException(

            status_code=422,

            detail=str(e)

        )


    # =====================================================
    # OTHER ERROR
    # =====================================================

    except Exception as e:

        print(
            "\n❌ TRANSLATION ERROR:",
            repr(e)
        )


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )