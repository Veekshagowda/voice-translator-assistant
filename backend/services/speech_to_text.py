from services.gemini_speech import gemini_speech_to_text


def speech_to_text(
    audio_file: str,
    source_language: str = "auto"
):

    print("\n====================================")
    print("🎤 SPEECH TO TEXT")
    print("====================================")

    print(
        "Source language:",
        source_language
    )


    result = gemini_speech_to_text(

        audio_file,

        source_language

    )


    return {

        "text":
            result["text"],

        "language":
            result["language"],

        "confidence":
            1.0

    }