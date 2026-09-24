from deep_translator import GoogleTranslator


def translate_text(text: str, target_language: str):
    translated = GoogleTranslator(
        source="auto",
        target=target_language
    ).translate(text)

    return translated