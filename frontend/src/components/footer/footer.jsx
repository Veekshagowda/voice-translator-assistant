import "./footer.css";
import {
  FaMicrophone,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}
        <div className="footer-about">

          <div className="footer-logo">
            <FaMicrophone className="footer-icon" />
            <h2>VoiceTranslate</h2>
          </div>

          <p>
            Speak, translate, and connect with people around the world
            through fast and accurate multilingual voice translation.
          </p>

          <div className="social-icons">

            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>

            <a href="mailto:support@voicetranslate.com" aria-label="Email">
              <FaEnvelope />
            </a>

          </div>

        </div>


        {/* Quick Links */}
        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <a href="#about">About</a>

          <a href="#features">Features</a>

          <Link to="/login">Login</Link>

        </div>


        {/* Project */}
        <div className="footer-links">

          <h3>Our Assistant</h3>

          <p>🎤 Voice Recognition</p>
          <p>🌐 Multilingual Translation</p>
          <p>🔊 Speech Output</p>
          <p>🤖 AI Powered</p>

        </div>

      </div>


      <hr />

      <div className="footer-bottom">

        <p className="copyright">
          © 2026 VoiceTranslate. All Rights Reserved.
        </p>

        <p className="footer-tagline">
          Breaking Language Barriers 🌍
        </p>

      </div>

    </footer>
  );
}

export default Footer;