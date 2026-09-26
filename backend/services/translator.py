import os
import time
from functools import lru_cache

from dotenv import load_dotenv
from google import genai


# =========================================================
# LOAD ENVIRONMENT
# =========================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY not found. "
        "Please add GEMINI_API_KEY to your environment variables."
    )


client = genai.Client(
    api_key=GEMINI_API_KEY
)


# =========================================================
# LANGUAGE NAMES
# =========================================================

LANGUAGE_NAMES = {
    "en": "English",
    "kn": "Kannada",
    "hi": "Hindi",
    "ta": "Tamil",
    "te": "Telugu",
    "ml": "Malayalam",
    "mr": "Marathi",
    "gu": "Gujarati",
    "bn": "Bengali",
    "tcy": "Tulu",
}


# =========================================================
# GEMINI TRANSLATION
# =========================================================

@lru_cache(maxsize=500)
def translate_text_cached(
    text: str,
    target_language: str
):

    text = text.strip()
    target_language = target_language.strip().lower()

    if not text:
        return ""

    target_name = LANGUAGE_NAMES.get(
        target_language,
        target_language
    )

    prompt = f"""
You are a professional multilingual translation system.

Translate the following text into {target_name}.

Rules:
1. Return ONLY the translated text.
2. Do not explain the translation.
3. Do not add quotation marks.
4. Preserve the original meaning exactly.
5. Keep names, numbers, dates and important details correct.
6. Do not add extra sentences.
7. Do not summarize.
8. Do not change the meaning.
9. If the input is already in {target_name}, return it naturally.
10. Preserve the speaker's intended meaning.

Text:
{text}
"""

    max_retries = 4

    for attempt in range(1, max_retries + 1):

        try:

            print("\n====================================")
            print("🌐 GEMINI TRANSLATION")
            print("====================================")
            print("Target:", target_name)
            print("Input:", repr(text))
            print("Attempt:", attempt)

            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt
            )

            translated = response.text

            if not translated:
                raise RuntimeError(
                    "Gemini returned an empty translation."
                )

            translated = translated.strip()

            if not translated:
                raise RuntimeError(
                    "Gemini returned an empty translation."
                )

            print("Translated:", repr(translated))
            print("====================================\n")

            return translated

        except Exception as e:

            error_message = str(e)

            print(
                f"❌ Gemini translation error "
                f"(attempt {attempt}/{max_retries}):"
            )

            print(error_message)

            temporary_error = (
                "503" in error_message
                or "UNAVAILABLE" in error_message.upper()
                or "429" in error_message
                or "RESOURCE_EXHAUSTED" in error_message.upper()
                or "high demand" in error_message.lower()
                or "rate limit" in error_message.lower()
            )

            if temporary_error and attempt < max_retries:

                delay = 2 ** (attempt - 1)

                print(
                    "⏳ Gemini temporarily unavailable. "
                    f"Retrying in {delay} seconds..."
                )

                time.sleep(delay)

                continue

            raise RuntimeError(
                f"Gemini translation failed: {error_message}"
            ) from e

    raise RuntimeError(
        "Gemini translation failed after multiple attempts."
    )


# =========================================================
# MAIN TRANSLATION FUNCTION
# =========================================================

def translate_text(
    text: str,
    target_language: str
):

    if not text or not text.strip():
        return ""

    target_language = target_language.strip().lower()

    if target_language == "auto":
        raise ValueError(
            "Target language cannot be auto."
        )

    return translate_text_cached(
        text.strip(),
        target_language
    )