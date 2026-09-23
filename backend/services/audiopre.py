import whisper
import os
import numpy as np


def preprocess_audio(audio_file: str):

    print("\n====================================")
    print("🔇 AUDIO PROCESSING LAYER")
    print("====================================")

    print("Input audio:", audio_file)

    # Check file
    if not os.path.exists(audio_file):
        raise FileNotFoundError(
            "Audio file not found."
        )

    # Load audio
    audio = whisper.load_audio(audio_file)

    print(
        "Audio samples:",
        len(audio)
    )

    # --------------------------------------------------------
    # CHECK AUDIO LENGTH
    # --------------------------------------------------------

    duration = len(audio) / 16000

    print(
        "Duration:",
        round(duration, 2),
        "seconds"
    )

    if duration < 1.0:

        print(
            "⚠️ Audio is too short."
        )

        return None

    # --------------------------------------------------------
    # CHECK AUDIO LEVEL
    # --------------------------------------------------------

    max_amplitude = np.max(
        np.abs(audio)
    )

    rms = np.sqrt(
        np.mean(audio ** 2)
    )

    print(
        "Maximum amplitude:",
        round(float(max_amplitude), 4)
    )

    print(
        "RMS:",
        round(float(rms), 4)
    )

    # --------------------------------------------------------
    # CHECK SILENCE
    # --------------------------------------------------------

    if rms < 0.005:

        print(
            "⚠️ Audio is too quiet / silent."
        )

        return None

    # --------------------------------------------------------
    # NORMALIZE AUDIO
    # --------------------------------------------------------

    if max_amplitude > 0:

        audio = audio / max_amplitude

    print(
        "✅ Audio normalized"
    )

    print(
        "✅ Audio processing completed"
    )

    return audio