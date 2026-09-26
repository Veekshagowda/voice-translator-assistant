import time

from deep_translator import GoogleTranslator
from deep_translator.exceptions import TooManyRequests


def translate_text(text: str, target_language: str):
    translator = GoogleTranslator(
        source="auto",
        target=target_language,
    )

    for attempt in range(1, 6):
        try:
            if attempt == 1:
                translated = translator.translate(text)
            else:
                translated = translator.translate_batch([text])[0]

            if translated and translated.strip():
                return translated.strip()
            raise ValueError("Google translation returned empty output.")
        except TooManyRequests as exc:
            if attempt == 5:
                raise RuntimeError(
                    f"Google translation failed: {exc}"
                ) from exc
            delay = min(2 ** attempt, 10)
            time.sleep(delay)
