import { useEffect, useState } from "react";
import "./Settings.css";

function Settings() {
  const [targetLanguage, setTargetLanguage] = useState("kn");
  const [voiceOutput, setVoiceOutput] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "voiceTranslateSettings"
    );

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      setTargetLanguage(settings.targetLanguage || "kn");
      setVoiceOutput(settings.voiceOutput ?? true);
      setAutoPlay(settings.autoPlay ?? true);
      setSaveHistory(settings.saveHistory ?? true);
      setTheme(settings.theme || "dark");

      applyTheme(settings.theme || "dark");
    } else {
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (selectedTheme) => {
    document.body.classList.remove(
      "dark-theme",
      "light-theme"
    );

    if (selectedTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.add("dark-theme");
    }
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;

    setTheme(selectedTheme);
    applyTheme(selectedTheme);
  };

  const handleSave = () => {
    const settings = {
      targetLanguage,
      voiceOutput,
      autoPlay,
      saveHistory,
      theme,
    };

    localStorage.setItem(
      "voiceTranslateSettings",
      JSON.stringify(settings)
    );

    applyTheme(theme);

    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    setTargetLanguage("kn");
    setVoiceOutput(true);
    setAutoPlay(true);
    setSaveHistory(true);
    setTheme("dark");

    localStorage.removeItem(
      "voiceTranslateSettings"
    );

    applyTheme("dark");

    alert("Settings reset successfully!");
  };

  return (
    <div className="settings-page">

      {/* Header */}
      <div className="settings-header">
        <h1>
          <span className="settings-gear">⚙</span>
          Settings
        </h1>

        <p>
          Customize your VoiceTranslate application.
        </p>
      </div>

      {/* Cards Container */}
      <div className="settings-grid">

        {/* ================= TRANSLATION ================= */}
        <div className="settings-card translation-card">

          <div className="card-heading">
            <div className="card-icon translation-icon">
              🌐
            </div>

            <h2>Translation</h2>
          </div>

          <div className="card-content">

            <h3>Default Target Language</h3>

            <p>
              Choose the language for translation.
            </p>

            <select
              value={targetLanguage}
              onChange={(e) =>
                setTargetLanguage(e.target.value)
              }
            >
              <option value="kn">Kannada</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
              <option value="ml">Malayalam</option>
              <option value="en">English</option>
              <option value="mr">Marathi</option>
              <option value="gu">Gujarati</option>
              <option value="bn">Bengali</option>
              <option value="tcy">Tulu (ತುಳು)</option>
            </select>

          </div>
        </div>


        {/* ================= VOICE ================= */}
        <div className="settings-card voice-card">

          <div className="card-heading">
            <div className="card-icon voice-icon">
              🎤
            </div>

            <h2>Voice</h2>
          </div>

          <div className="voice-settings">

            {/* Voice Output */}
            <div className="voice-row">

              <div>
                <h3>Voice Output</h3>

                <p>
                  Enable translated voice output.
                </p>
              </div>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={voiceOutput}
                  onChange={(e) =>
                    setVoiceOutput(e.target.checked)
                  }
                />

                <span className="toggle-slider"></span>
              </label>

            </div>


            {/* Auto Play */}
            <div className="voice-row">

              <div>
                <h3>Auto Play Translation</h3>

                <p>
                  Automatically play the translated voice.
                </p>
              </div>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={(e) =>
                    setAutoPlay(e.target.checked)
                  }
                />

                <span className="toggle-slider"></span>
              </label>

            </div>

          </div>
        </div>


        {/* ================= HISTORY ================= */}
        <div className="settings-card history-card">

          <div className="card-heading">
            <div className="card-icon history-icon">
              📜
            </div>

            <h2>History</h2>
          </div>

          <div className="history-content">

            <div>
              <h3>Save Translation History</h3>

              <p>
                Save your translations in the History page.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={saveHistory}
                onChange={(e) =>
                  setSaveHistory(e.target.checked)
                }
              />

              <span className="toggle-slider history-toggle"></span>
            </label>

          </div>

        </div>


        {/* ================= APPEARANCE ================= */}
        <div className="settings-card appearance-card">

          <div className="card-heading">
            <div className="card-icon appearance-icon">
              🎨
            </div>

            <h2>Appearance</h2>
          </div>

          <div className="appearance-content">

            <h3>Theme</h3>

            <p>
              Choose your application theme.
            </p>

            <select
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>

          </div>

        </div>

      </div>


      {/* ================= BUTTONS ================= */}
      <div className="settings-buttons">

        <button
          className="save-btn"
          onClick={handleSave}
        >
          💾
          <span>Save Settings</span>
        </button>

        <button
          className="reset-btn"
          onClick={handleReset}
        >
          ↻
          <span>Reset</span>
        </button>

      </div>

    </div>
  );
}

export default Settings;