import whisper


print("🔍 Loading language detection model...")

model = whisper.load_model("small")

print("✅ Language detection model loaded")


def detect_language(audio):

    print("\n====================================")
    print("🔍 LANGUAGE DETECTION LAYER")
    print("====================================")

    # Make sure audio is the correct length
    audio = whisper.pad_or_trim(audio)

    # Convert audio to Mel spectrogram
    mel = whisper.log_mel_spectrogram(
        audio,
        n_mels=model.dims.n_mels
    ).to(model.device)

    # Detect language
    _, probabilities = model.detect_language(mel)

    # Get top 5 languages
    top_languages = sorted(
        probabilities.items(),
        key=lambda x: x[1],
        reverse=True
    )[:5]

    print("\n📊 Top language probabilities:")

    for language, probability in top_languages:
        print(
            f"{language}: {probability:.4f}"
        )

    detected_language = top_languages[0][0]
    confidence = top_languages[0][1]

    print("\n🌐 Detected:", detected_language)
    print(
        "Confidence:",
        round(confidence, 4)
    )

    return detected_language, confidence