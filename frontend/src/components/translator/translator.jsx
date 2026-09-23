import {
  FaMicrophone,
  FaExchangeAlt,
  FaPlay,
  FaTrash,
  FaCopy,
  FaGlobe,
  FaVolumeUp,
  FaRobot,
  FaBolt,
  FaShieldAlt,
} from "react-icons/fa";

import "./translator.css";

function Translator({
  recording,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
  startRecording,
  stopRecording,
  audioFile,
  result,
  translating,
  handleTranslate,
  clearResult,
  playAudio,
}) {

  // =====================================================
  // LANGUAGES
  // =====================================================

  const languages = [
    { value: "en", name: "English" },
    { value: "kn", name: "Kannada" },
    { value: "hi", name: "Hindi" },
    { value: "ta", name: "Tamil" },
    { value: "te", name: "Telugu" },
    { value: "ml", name: "Malayalam" },
    { value: "mr", name: "Marathi" },
    { value: "gu", name: "Gujarati" },
    { value: "bn", name: "Bengali" },
    { value: "tcy", name: "Tulu (ತುಳು)" },
  ];

  const sourceLanguages = languages.filter(
    (language) => language.value !== "tcy"
  );


  // =====================================================
  // STATUS
  // =====================================================

  const statusClass = recording
    ? "listening"
    : translating
      ? "processing"
      : result
        ? "complete"
        : "ready";

  const statusText = recording
    ? "Listening to your voice"
    : translating
      ? "Processing your speech"
      : result
        ? "Translation complete"
        : "Ready to translate";


  // =====================================================
  // COPY TRANSLATION
  // =====================================================

  const copyTranslation = async () => {

    if (!result?.translated_text) {
      alert("No translation available to copy.");
      return;
    }

    try {

      await navigator.clipboard.writeText(
        result.translated_text
      );

      alert("✅ Translation copied!");

    } catch (error) {

      console.error("Copy failed:", error);

      alert("❌ Failed to copy translation.");

    }
  };


  // =====================================================
  // TRANSLATE
  // =====================================================

  const handleTranslateClick = () => {

    if (!audioFile) {
      alert("Please record your voice first.");
      return;
    }

    console.log(
      "Source language:",
      sourceLanguage
    );

    console.log(
      "Target language:",
      targetLanguage
    );

    handleTranslate(
      audioFile,
      sourceLanguage
    );
  };


  // =====================================================
  // SWAP LANGUAGES
  // =====================================================

  const handleSwap = () => {

    if (sourceLanguage === "auto") {

      alert(
        "Auto Detect cannot be swapped."
      );

      return;
    }

    const oldSource = sourceLanguage;

    setSourceLanguage(
      targetLanguage
    );

    setTargetLanguage(
      oldSource
    );
  };


  // =====================================================
  // GET LANGUAGE NAME
  // =====================================================

  const getLanguageName = (code) => {

    if (!code) {
      return "Unknown";
    }

    if (code === "auto") {
      return "Auto Detect";
    }

    const language = languages.find(
      (item) => item.value === code
    );

    return language
      ? language.name
      : code;
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="translator-page">

      <div className="translator-card">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="translator-top">

          <div className="ai-title">

            <div className="ai-icon">
              <FaRobot />
            </div>

            <div>

              <h1>
                Voice<span>Translate</span>
              </h1>

              <p>
                Real-Time Multilingual Voice Translation
              </p>

            </div>

          </div>


          <div className="ai-badge">

            <span className="status-dot"></span>

            AI Assistant Online

          </div>

        </div>



        {/* =================================================
            LANGUAGE SELECTION
        ================================================= */}

        <div className="language-area">


          {/* FROM */}

          <div className="language-card">

            <div className="language-label">

              <span>
                FROM
              </span>

              <small>
                Source Language
              </small>

            </div>


            <div className="select-wrapper">

              <FaGlobe className="language-globe" />

              <select
                value={sourceLanguage}
                onChange={(e) =>
                  setSourceLanguage(
                    e.target.value
                  )
                }
              >

                <option value="auto">
                  🌐 Auto Detect
                </option>

                {sourceLanguages.map(
                  (language) => (

                    <option
                      key={language.value}
                      value={language.value}
                    >
                      {language.name}
                    </option>

                  )
                )}

              </select>

            </div>

          </div>



          {/* SWAP */}

          <button
            className="modern-swap"
            type="button"
            onClick={handleSwap}
            title="Swap languages"
          >

            <FaExchangeAlt />

          </button>



          {/* TO */}

          <div className="language-card">

            <div className="language-label">

              <span>
                TO
              </span>

              <small>
                Target Language
              </small>

            </div>


            <div className="select-wrapper">

              <FaGlobe className="language-globe" />

              <select
                value={targetLanguage}
                onChange={(e) =>
                  setTargetLanguage(
                    e.target.value
                  )
                }
              >

                {languages.map(
                  (language) => (

                    <option
                      key={language.value}
                      value={language.value}
                    >
                      {language.name}
                    </option>

                  )
                )}

              </select>

            </div>

          </div>

        </div>



        {/* =================================================
            VOICE AREA
        ================================================= */}

        <div className="voice-area">


          {/* RINGS */}

          <div className="voice-ring ring-one"></div>

          <div className="voice-ring ring-two"></div>

          <div className="voice-ring ring-three"></div>



          {/* LEFT WAVE */}

          <div className="voice-wave left-wave">

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

          </div>



          {/* MICROPHONE */}

          <button
            className={`big-mic ${
              recording
                ? "mic-recording"
                : ""
            }`}
            onClick={
              recording
                ? stopRecording
                : startRecording
            }
            type="button"
          >

            <FaMicrophone />

            <span className="mic-glow"></span>

          </button>



          {/* RIGHT WAVE */}

          <div className="voice-wave right-wave">

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

          </div>



          {/* STATUS */}

          <div
            className={`voice-status ${statusClass}`}
          >

            <span className="pulse-dot"></span>

            {statusText}

          </div>



          <h2>

            {recording
              ? "Listening..."
              : translating
                ? "Processing..."
                : result
                  ? "Translation Ready"
                  : "Tap the microphone"}

          </h2>


          <p>

            {recording
              ? "Speak clearly. I'm listening to you."
              : translating
                ? "AI is detecting and translating your speech."
                : result
                  ? "Your translation has been completed."
                  : "Speak naturally and translate your voice instantly."}

          </p>

        </div>



        {/* =================================================
            TRANSLATE BUTTON
        ================================================= */}

        {audioFile &&
          !recording &&
          !result &&
          !translating && (

            <div className="translate-action">

              <button
                className="main-translate-btn"
                onClick={
                  handleTranslateClick
                }
                type="button"
              >

                <FaGlobe />

                Translate Voice

                <span>
                  →
                </span>

              </button>

            </div>

          )}



        {/* =================================================
            PROCESSING
        ================================================= */}

        {translating && (

          <div className="processing-card">

            <div className="processing-icon">

              <FaRobot />

            </div>


            <div>

              <strong>
                AI is processing your voice
              </strong>

              <p>
                Detecting language, transcribing
                and translating...
              </p>

            </div>


            <div className="processing-dots">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>

        )}



        {/* =================================================
            RESULT CARDS
        ================================================= */}

        <div className="results-area">


          {/* ORIGINAL */}

          <div className="speech-card original-card">

            <div className="speech-header">

              <div className="speech-title">

                <div className="speech-icon">

                  <FaMicrophone />

                </div>

                <div>

                  <h3>
                    Original Speech
                  </h3>

                  <small>
                    Recognized voice
                  </small>

                </div>

              </div>


              {result && (

                <span className="detected-tag">

                  DETECTED

                </span>

              )}

            </div>


            <div className="speech-content">

              {result?.recognized_text ? (

                <p>
                  {result.recognized_text}
                </p>

              ) : (

                <p className="empty-text">
                  Your spoken text will appear here...
                </p>

              )}

            </div>


            <div className="speech-footer">

              <span>
                {getLanguageName(
                  result?.detected_language ||
                  sourceLanguage
                )}
              </span>

              <span>
                🎤 Speech Input
              </span>

            </div>

          </div>



          {/* TRANSLATION */}

          <div className="speech-card translation-card">

            <div className="speech-header">

              <div className="speech-title">

                <div className="speech-icon translation-icon">

                  <FaGlobe />

                </div>

                <div>

                  <h3>
                    Translated Speech
                  </h3>

                  <small>
                    AI translation
                  </small>

                </div>

              </div>


              {result && (

                <span className="ai-result-tag">

                  AI TRANSLATED

                </span>

              )}

            </div>


            <div className="speech-content">

              {result?.translated_text ? (

                <p>
                  {result.translated_text}
                </p>

              ) : (

                <p className="empty-text">
                  Translated result will appear here...
                </p>

              )}

            </div>


            <div className="speech-footer">

              <span>
                {getLanguageName(
                  targetLanguage
                )}
              </span>

              <span>
                🌐 Translation
              </span>

            </div>

          </div>

        </div>



        {/* =================================================
            DETECTION PANEL
        ================================================= */}

        {result && (

          <div className="detection-panel">


            <div className="detection-left">

              <div className="detection-icon">

                🌐

              </div>


              <div>

                <span>
                  DETECTED LANGUAGE
                </span>

                <strong>
                  {getLanguageName(
                    result.detected_language
                  )}
                </strong>

              </div>

            </div>


            <div className="confidence">

              <span>
                AI Detection
              </span>

              <strong>
                ✓ Successful
              </strong>

            </div>

          </div>

        )}



        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        {result && (

          <div className="result-actions">


            {/* PLAY */}

            <button
              className="action play-action"
              onClick={playAudio}
              type="button"
            >

              <FaPlay />

              Play Translation

            </button>



            {/* COPY */}

            <button
              className="action copy-action"
              onClick={
                copyTranslation
              }
              type="button"
            >

              <FaCopy />

              Copy Translation

            </button>



            {/* CLEAR */}

            <button
              className="action clear-action"
              onClick={clearResult}
              type="button"
            >

              <FaTrash />

              Clear

            </button>

          </div>

        )}



        {/* =================================================
            AUDIO
        ================================================= */}

        {result?.audio_url && (

          <div className="audio-card">

            <div className="audio-icon">

              <FaVolumeUp />

            </div>


            <div className="audio-info">

              <strong>
                Translation Audio
              </strong>

              <span>
                Listen to the translated speech
              </span>

            </div>


            <audio
              id="translated-audio"
              controls
              onError={(event) => {
                const audio = event.currentTarget;
                const retryCount = Number(audio.dataset.retryCount || 0);

                if (retryCount < 10) {
                  audio.dataset.retryCount = String(retryCount + 1);
                  window.setTimeout(() => audio.load(), 500);
                }
              }}
              src={
                `http://127.0.0.1:8000${result.audio_url}`
              }
            />

          </div>

        )}



        {/* =================================================
            FEATURES
        ================================================= */}

        <div className="translator-features">

          <div>

            <FaGlobe />

            Multiple Languages

          </div>


          <div>

            <FaBolt />

            Real-Time AI

          </div>


          <div>

            <FaShieldAlt />

            Secure Processing

          </div>


          <div>

            <FaVolumeUp />

            Voice Output

          </div>

        </div>

      </div>

    </div>

  );
}


export default Translator;