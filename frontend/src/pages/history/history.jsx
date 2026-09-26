import { useEffect, useState } from "react";
import "./history.css";
import { authHeaders } from "../../api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/history/`,
        {
          headers: authHeaders(),
        }
      );

      const data = await response.json();

      setHistory(data.history || []);
    } catch (error) {
      console.error("History error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="history-page">
        <h2>Loading history...</h2>
      </div>
    );
  }

  return (
    <div className="history-page">

      <h1>Translation History</h1>

      {history.length === 0 ? (
        <p className="no-history">
          No translations yet.
        </p>
      ) : (
        <div className="history-container">

          {history.map((item) => (
            <div className="history-card" key={item.id}>

              <h3>
                {item.original_text}
              </h3>

              <p className="detected">
                Detected: {item.detected_language}
              </p>

              <p className="translated">
                Translated: {item.translated_text}
              </p>

              <p className="target">
                Target: {item.target_language}
              </p>

              <small>
                {item.created_at}
              </small>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default History;