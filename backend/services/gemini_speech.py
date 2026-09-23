import os
import json

from dotenv import load_dotenv
from google import genai


# =========================================================
# LOAD .ENV FILE
# =========================================================

load_dotenv()


# =========================================================
# GEMINI API
# =========================================================

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "❌ GEMINI_API_KEY not found. Check your backend/.env file."
    )


client = genai.Client(
    api_key=api_key
)


# =========================================================
# GEMINI AUDIO → LANGUAGE + TEXT
# =========================================================

def gemini_speech_to_text(
    audio_file: str,
    source_language: str = "auto"
):

    print("\n====================================")
    print("🤖 GEMINI SPEECH RECOGNITION")
    print("====================================")

    print("Audio:", audio_file)
    print("Source language:", source_language)


    # =====================================================
    # UPLOAD AUDIO
    # =====================================================

    uploaded_file = client.files.upload(
        file=audio_file
    )

    print("✅ Audio uploaded to Gemini")


    # =====================================================
    # PROMPT
    # =====================================================

    if source_language == "auto":

        prompt = """
Listen carefully to the attached audio.

This audio contains human speech.

Your task is:

1. Identify the language actually spoken.
2. Transcribe the speech exactly in the ORIGINAL language.
3. Do NOT translate the speech.
4. Do NOT change the meaning.
5. Do NOT assume that the language is English.
6. Do not invent words.
7. Ignore background noise as much as possible.

Supported languages include:

English = en
Kannada = kn
Hindi = hi
Tamil = ta
Telugu = te
Malayalam = ml
Marathi = mr
Gujarati = gu
Bengali = bn
Tulu = tcy

Return ONLY valid JSON.

Format:

{
    "language": "kn",
    "text": "original spoken text"
}
"""

    else:

        prompt = f"""
Listen to the attached audio.

The user selected the source language:

{source_language}

Transcribe the speech exactly in that language.

Do NOT translate it.

Return ONLY valid JSON.

Format:

{{
    "language": "{source_language}",
    "text": "original spoken text"
}}
"""


    # =====================================================
    # GEMINI REQUEST
    # =====================================================

    response = client.models.generate_content(

        model="gemini-3.6-flash",

        contents=[
            uploaded_file,
            prompt
        ]
    )


    # =====================================================
    # RESPONSE
    # =====================================================

    raw_response = response.text.strip()

    print("\n====================================")
    print("🤖 GEMINI RESPONSE")
    print("====================================")

    print(raw_response)


    # =====================================================
    # REMOVE MARKDOWN JSON
    # =====================================================

    raw_response = raw_response.replace(
        "```json",
        ""
    )

    raw_response = raw_response.replace(
        "```",
        ""
    )

    raw_response = raw_response.strip()


    # =====================================================
    # PARSE JSON
    # =====================================================

    try:

        result = json.loads(
            raw_response
        )

    except json.JSONDecodeError as e:

        print(
            "❌ JSON ERROR:",
            e
        )

        raise ValueError(
            "Gemini returned invalid JSON: "
            + raw_response
        )


    # =====================================================
    # GET RESULT
    # =====================================================

    detected_language = result.get(
        "language",
        "unknown"
    )

    recognized_text = result.get(
        "text",
        ""
    ).strip()


    print("\n====================================")
    print("✅ GEMINI RESULT")
    print("====================================")

    print(
        "Detected language:",
        detected_language
    )

    print(
        "Recognized text:",
        repr(recognized_text)
    )


    return {

        "text": recognized_text,

        "language": detected_language

    }