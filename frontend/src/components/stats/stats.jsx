import "./stats.css";
import {
  FaGlobe,
  FaBolt,
  FaBullseye,
  FaMicrophone,
} from "react-icons/fa";

function Stats() {
  return (
    <div className="stats">

      <div className="stat-card">
        <div className="stat-icon">
          <FaGlobe />
        </div>

        <div>
          <h2>100+</h2>
          <p>Languages</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <FaBolt />
        </div>

        <div>
          <h2>Real-Time</h2>
          <p>Translation</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <FaBullseye />
        </div>

        <div>
          <h2>98%</h2>
          <p>Accuracy</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <FaMicrophone />
        </div>

        <div>
          <h2>AI</h2>
          <p>Voice Assistant</p>
        </div>
      </div>

    </div>
  );
}

export default Stats;