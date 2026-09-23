import { useRef, useState } from "react";

import {
    translateAudio,
    saveHistory
} from "../../api";

import Translator from "../../components/translator/translator";

import "../../components/Translator/translator.css";


function Translate() {

    const [recording, setRecording] = useState(false);

    const [audioFile, setAudioFile] = useState(null);

    const [result, setResult] = useState(null);

    const [translating, setTranslating] = useState(false);


    // =====================================================
    // LANGUAGES
    // =====================================================

    const [sourceLanguage, setSourceLanguage] =
        useState("auto");

    const [targetLanguage, setTargetLanguage] =
        useState("en");


    const mediaRecorderRef =
        useRef(null);

    const chunksRef =
        useRef([]);

    const recordingStartTimeRef =
        useRef(null);


    // =====================================================
    // START RECORDING
    // =====================================================

    const startRecording = async () => {

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({

                    audio: {
                        channelCount: 1,
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }

                });

            console.log("🎤 Microphone access granted");

            chunksRef.current = [];

            let mimeType = "audio/webm";

            if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
                mimeType = "audio/webm;codecs=opus";
            }
            else if (MediaRecorder.isTypeSupported("audio/webm")) {
                mimeType = "audio/webm";
            }

            console.log("🎧 Recording format:", mimeType);

            const recorder =
                new MediaRecorder(stream, { mimeType: mimeType });

            mediaRecorderRef.current = recorder;

            // =================================================
            // START
            // =================================================

            recorder.onstart = () => {
                console.log("🎤 Recording started");
                recordingStartTimeRef.current = Date.now();
            };

            // =================================================
            // AUDIO DATA
            // =================================================

            recorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            // =================================================
            // STOP
            // =================================================

            recorder.onstop = async () => {

                console.log("🛑 Recording stopped");

                if (chunksRef.current.length === 0) {
                    console.error("❌ No audio data recorded");
                    alert("No audio was recorded. Please try again.");
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                const audioBlob =
                    new Blob(chunksRef.current, { type: mimeType });

                console.log("🎵 Audio size:", audioBlob.size, "bytes");

                // =================================================
                // CHECK RECORDING DURATION
                // =================================================

                const durationMs =
                    Date.now() - recordingStartTimeRef.current;

                console.log("⏱️ Recording duration:", durationMs, "ms");

                if (durationMs < 3000) {
                    console.error("❌ Recording too short:", durationMs, "ms");
                    alert("Please speak for at least 3 seconds for accurate detection.");
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                // =================================================
                // CHECK AUDIO SIZE
                // =================================================

                if (audioBlob.size < 1000) {
                    console.error("❌ Audio recording is too small");
                    alert("Recording is too short. Please speak for a few seconds.");
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                // =================================================
                // CREATE FILE
                // =================================================

                const file =
                    new File([audioBlob], "recording.webm", { type: mimeType });

                console.log("📁 Audio file:", file);

                setAudioFile(file);

                const currentSourceLanguage = sourceLanguage;

                console.log("🌐 Source language:", currentSourceLanguage);
                console.log("🎯 Target language:", targetLanguage);

                await handleTranslate(file, currentSourceLanguage);

                stream.getTracks().forEach((track) => track.stop());

            };

            recorder.onerror = (event) => {
                console.error("❌ Recorder error:", event);
            };

            recorder.start(1000);

            setRecording(true);

        }

        catch (error) {
            console.error("❌ Microphone error:", error);
            alert("Cannot access microphone. Please allow microphone permission.");
        }

    };


    // =====================================================
    // STOP RECORDING
    // =====================================================

    const stopRecording = () => {

        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
        ) {
            console.log("🛑 Stopping recording...");
            mediaRecorderRef.current.stop();
        }

        setRecording(false);

    };


    // =====================================================
    // TRANSLATE
    // =====================================================

    const handleTranslate =
        async (
            fileToTranslate = audioFile,
            selectedSourceLanguage = sourceLanguage
        ) => {

        if (!fileToTranslate) {
            alert("Please record your voice first.");
            return;
        }

        try {

            setTranslating(true);
            setResult(null);

            console.log("====================================");
            console.log("🎤 TRANSLATION STARTED");
            console.log("Source:", selectedSourceLanguage);
            console.log("Target:", targetLanguage);
            console.log("File:", fileToTranslate);
            console.log("====================================");

            const data =
                await translateAudio(
                    fileToTranslate,
                    selectedSourceLanguage,
                    targetLanguage
                );

            console.log("====================================");
            console.log("✅ BACKEND RESPONSE");
            console.log("Detected language:", data.detected_language);
            console.log("Recognized text:", data.recognized_text);
            console.log("Translated text:", data.translated_text);
            console.log("====================================");

            setResult(data);

            try {

                await saveHistory({
                    original_text: data.recognized_text,
                    detected_language: data.detected_language,
                    target_language: data.target_language,
                    translated_text: data.translated_text
                });

                console.log("✅ History saved");

            }

            catch (historyError) {
                console.error("⚠️ History save error:", historyError);
            }

        }

        catch (error) {
            console.error("❌ Translation error:", error);
            alert(error.message || "Translation failed. Please try again.");
        }

        finally {
            setTranslating(false);
        }

    };


    // =====================================================
    // CLEAR
    // =====================================================

    const clearResult = () => {
        setAudioFile(null);
        setResult(null);
    };


    // =====================================================
    // PLAY AUDIO
    // =====================================================

    const playAudio = () => {
        const audio = document.getElementById("translated-audio");
        if (audio) {
            audio.play();
        }
    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <Translator
            recording={recording}
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            startRecording={startRecording}
            stopRecording={stopRecording}
            audioFile={audioFile}
            result={result}
            translating={translating}
            handleTranslate={handleTranslate}
            clearResult={clearResult}
            playAudio={playAudio}
        />

    );

}


export default Translate;