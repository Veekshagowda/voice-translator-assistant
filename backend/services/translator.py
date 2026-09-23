from deep_translator import GoogleTranslator
from dotenv import load_dotenv
from google import genai
import os
import time


load_dotenv()


LANGUAGE_MAP = {
    "en": "en",
    "kn": "kn",
    "hi": "hi",
    "ta": "ta",
    "te": "te",
    "ml": "ml",
    "mr": "mr",
    "bn": "bn",
    "gu": "gu",
    "pa": "pa",
    "ur": "ur",
    "de": "de",
    "fr": "fr",
    "es": "es",
    "it": "it",
    "pt": "pt",
    "ru": "ru",
    "ja": "ja",
    "ko": "ko",
    "zh": "zh-CN",
    "ar": "ar",
}


def _translate_tulu_with_gemini(text: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY is not configured.")

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=(
            "Translate the following text into natural Tulu (ತುಳು). "
            "Return only the Tulu translation, with no explanation.\n\n"
            f"Text: {text.strip()}"
        ),
    )

    translated = (response.text or "").strip()
    if not translated:
        raise ValueError("Gemini returned an empty Tulu translation.")

    return translated


def translate_text(
    text: str,
    target_language: str
):

    if not text or not text.strip():

        raise ValueError(
            "No text available for translation."
        )


    target_language = (
        target_language
        .lower()
        .strip()
    )

    if target_language == "tcy":
        return _translate_tulu_with_gemini(text)

    target = LANGUAGE_MAP.get(
        target_language
    )


    if not target:

        raise ValueError(
            f"Unsupported target language: "
            f"{target_language}"
        )


    print("====================================")
    print("🌐 TRANSLATION")
    print("====================================")

    print(
        "Target:",
        target
    )

    print(
        "Input:",
        repr(text)
    )


    try:

        translator = GoogleTranslator(
            source="auto",
            target=target
        )


        translated = None

        for attempt in range(3):
            translated = translator.translate(
                text.strip()
            )

            if translated and not translated.lstrip().startswith(
                "Error 500 (Server Error)"
            ):
                break

            if attempt < 2:
                time.sleep(1)


        if not translated or translated.lstrip().startswith(
            "Error 500 (Server Error)"
        ):

            raise ValueError(
                "Translation returned empty text."
            )


        translated = translated.strip()


        print(
            "✅ Translated:",
            repr(translated)
        )


        return translated


    except Exception as e:

        print(
            "❌ Translation failed:",
            repr(e)
        )


        raise ValueError(
            f"Translation failed: {str(e)}"
        )