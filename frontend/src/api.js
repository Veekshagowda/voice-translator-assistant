const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function authHeaders() {
    const token = localStorage.getItem("authToken");

    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
}

export function apiUrl(path) {
    return `${API}${path.startsWith("/") ? path : `/${path}`}`;
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
        apiUrl("/speech/translate"),
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
        apiUrl("/history/"),
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