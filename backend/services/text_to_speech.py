from gtts import gTTS
import os


def text_to_speech(
    text: str,
    language: str,
    output_file: str
):

    if not text or not text.strip():
        raise ValueError(
            "No text available for speech."
        )

    language = language.lower().strip()

    print("====================================")
    print("🔊 TEXT TO SPEECH")
    print("Language:", language)
    print("Text:", repr(text))
    print("Output:", output_file)
    print("====================================")

    try:

        # Make sure output directory exists
        output_dir = os.path.dirname(output_file)

        if output_dir:
            os.makedirs(
                output_dir,
                exist_ok=True
            )

        speech = gTTS(
            text=text.strip(),
            lang=language,
            slow=False
        )

        speech.save(
            output_file
        )

        print(
            "✅ Audio saved:",
            output_file
        )

        return output_file

    except Exception as e:

        print(
            "❌ Text-to-speech failed:",
            repr(e)
        )

        raise ValueError(
            f"Text-to-speech failed: {str(e)}"
        )