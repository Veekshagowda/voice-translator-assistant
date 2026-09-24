
import time
import threading
from functools import lru_cache

from deep_translator import GoogleTranslator


# =========================================================
# GOOGLE TRANSLATOR RATE LIMIT PROTECTION
# =========================================================

# Only one Google translation request at a time
_translation_lock = threading.Lock()

# Minimum time between Google requests
MIN_REQUEST_INTERVAL = 1.0

_last_request_time = 0.0


def _wait_before_request():
    global _last_request_time

    elapsed = time.time() - _last_request_time

    if elapsed < MIN_REQUEST_INTERVAL:
        time.sleep(
            MIN_REQUEST_INTERVAL - elapsed
        )

    _last_request_time = time.time()


# =========================================================
# CACHED TRANSLATION
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

    # -----------------------------------------------------
    # Protect GoogleTranslator from simultaneous requests
    # -----------------------------------------------------

    with _translation_lock:

        _wait_before_request()

        translator = GoogleTranslator(
            source="auto",
            target=target_language
        )

        # -------------------------------------------------
        # Retry several times if Google rate-limits us
        # -------------------------------------------------

        last_error = None

        for attempt in range(3):

            try:

                print(
                    f"🌐 Translation request "
                    f"(attempt {attempt + 1}/3)"
                )

                translated = translator.translate(text)

                if translated:
                    return translated.strip()

                raise RuntimeError(
                    "Google returned empty translation"
                )

            except Exception as e:

                last_error = e

                print(
                    f"⚠️ Google translation attempt "
                    f"{attempt + 1} failed:",
                    repr(e)
                )

                # Wait longer before every retry
                if attempt < 2:

                    wait_time = 2 ** attempt

                    print(
                        f"⏳ Waiting {wait_time} seconds "
                        "before retry..."
                    )

                    time.sleep(wait_time)

                    _wait_before_request()

        raise RuntimeError(
            f"Google translation failed: {last_error}"
        )


# =========================================================
# MAIN TRANSLATION FUNCTION
# =========================================================

def translate_text(
    text: str,
    target_language: str
):

    try:

        # -------------------------------------------------
        # Validate text
        # -------------------------------------------------

        if not text or not text.strip():

            return ""

        text = text.strip()
        target_language = target_language.strip().lower()

        print("\n====================================")
        print("🌐 TRANSLATION REQUEST")
        print("====================================")

        print("Text:", repr(text))
        print("Target:", target_language)

        # -------------------------------------------------
        # If source and target are the same,
        # don't call Google unnecessarily
        # -------------------------------------------------

        # This is useful if the detected source language
        # matches the selected target language.

        if target_language in ("auto", ""):
            raise ValueError(
                "Target language is required"
            )

        # -------------------------------------------------
        # Cached translation
        # -------------------------------------------------

        translated = translate_text_cached(
            text,
            target_language
        )

        print(
            "Translated:",
            repr(translated)
        )

        print("====================================\n")

        return translated

    except Exception as e:

        print(
            "\n❌ Translation error:",
            repr(e)
        )

        raise RuntimeError(
            f"Translation failed: {str(e)}"
        )

