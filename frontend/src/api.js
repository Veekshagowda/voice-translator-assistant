const API = "https://voice-translator-assistant.onrender.com";

export function authHeaders() {
    const token = localStorage.getItem("authToken");

    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
}

// ================= TRANSLATE AUDIO =================

export async function translateAudio(
    audioFile,
    sourceLanguage,
    targetLanguage
) {
    const formData = new FormData();

    formData.append(
        "file",
        audioFile,
        "recording.webm"
    );

    formData.append(
        "source_language",
        sourceLanguage
    );

    formData.append(
        "target_language",
        targetLanguage
    );

    console.log("🎤 Sending audio...");
    console.log("Source:", sourceLanguage);
    console.log("Target:", targetLanguage);

    const response = await fetch(
        `${API}/speech/translate`,
        {
            method: "POST",
            headers: authHeaders(),
            body: formData,
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "Backend error:",
            errorText
        );

        throw new Error(
            `Translation failed: ${errorText}`
        );
    }

    const data = await response.json();

    console.log(
        "✅ Translation result:",
        data
    );

    return data;
}


// ================= SAVE HISTORY =================

export async function saveHistory(data) {

    const response = await fetch(
        `${API}/history/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeaders(),
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {

        const errorText =
            await response.text();

        console.error(
            "History error:",
            errorText
        );

        throw new Error(
            "Failed to save history"
        );
    }

    return await response.json();
}