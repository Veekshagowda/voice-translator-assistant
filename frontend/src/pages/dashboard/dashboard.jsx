import "./dashboard.css";
import { Link } from "react-router-dom";

import Image from "../../assets/mic.png";

import {
  FaHome,
  FaMicrophone,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaGlobe,
  FaBullseye,
  FaBolt,
  FaShieldAlt,
  FaArrowRight,
  FaWaveSquare,
  FaUsers,
  FaLock,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        {/* LOGO */}

        <div className="voice-logo">

          <div className="logo-mic">
            <FaMicrophone />
          </div>

          <div>
            <h2>
              Voice<span>HUB</span>
            </h2>

            <p>
              Speak. Translate. Connect.
            </p>
          </div>

        </div>


        {/* SIDEBAR MENU */}

        <nav className="dashboard-menu">

          <Link
            to="/dashboard"
            className="menu-item active"
          >
            <div className="menu-icon">
              <FaHome />
            </div>

            <span>Dashboard</span>
          </Link>


          <Link
            to="/translate"
            className="menu-item"
          >
            <div className="menu-icon">
              <FaMicrophone />
            </div>

            <span>Translate</span>
          </Link>


          <Link
            to="/history"
            className="menu-item"
          >
            <div className="menu-icon">
              <FaHistory />
            </div>

            <span>History</span>
          </Link>


          <Link
            to="/settings"
            className="menu-item"
          >
            <div className="menu-icon">
              <FaCog />
            </div>

            <span>Settings</span>
          </Link>


          <Link
            to="/"
            className="menu-item logout"
          >
            <div className="menu-icon">
              <FaSignOutAlt />
            </div>

            <span>Logout</span>
          </Link>

        </nav>


        {/* SIDEBAR MICROPHONE */}

        <div className="sidebar-microphone">

          <div className="mic-glow"></div>

          <img
            src={Image}
            alt="Voice microphone"
          />

          <div className="sound-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* TOP HEADER */}

        <header className="dashboard-header">

          <div>
            <h1>
              Namasthe....!!!!
            </h1>

            <p>
              Here's what's happening with your translations today.
            </p>
          </div>

          <div className="header-profile">

            <div className="notification">
              🔔
              <span>3</span>
            </div>

            <div className="profile-circle">
              U
            </div>

            <div className="profile-text">
              <strong>User</strong>
              
            </div>

          </div>

        </header>


        {/* ================= STAT CARDS ================= */}

        <section className="stats-grid">


          {/* CARD 1 */}

          <div className="stat-card purple">

            <div className="stat-icon">
              <FaGlobe />
            </div>

            <div>
              <h2>120+</h2>
              <p>Languages Supported</p>
              <small>Worldwide Coverage</small>
            </div>

          </div>


          {/* CARD 2 */}

          <div className="stat-card blue">

            <div className="stat-icon">
              <FaBullseye />
            </div>

            <div>
              <h2>98%</h2>
              <p>Translation Accuracy</p>
              <small>AI Powered Accuracy</small>
            </div>

          </div>


          {/* CARD 3 */}

          <div className="stat-card pink">

            <div className="stat-icon">
              <FaBolt />
            </div>

            <div>
              <h2>Real-time</h2>
              <p>Lightning Fast</p>
              <small>Instant Translations</small>
            </div>

          </div>


          {/* CARD 4 */}

          <div className="stat-card green">

            <div className="stat-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h2>24/7</h2>
              <p>AI Assistant</p>
              <small>Always Available</small>
            </div>

          </div>

        </section>


        {/* ================= HERO ================= */}

        <section className="dashboard-hero">

          <div className="hero-content">

            <span className="hero-small-title">
              Your AI Voice Translation Assistant
            </span>

            <h2>
              Break Language Barriers
              <br />
              Connect the <span>World</span>
            </h2>

            <p>
              Speak naturally and let our AI translate
              your voice in real-time across multiple
              languages.
            </p>

            <Link
              to="/translate"
              className="start-button"
            >

              <FaMicrophone />

              <span>
                Start Translation
              </span>

              <FaArrowRight />

            </Link>

          </div>


          {/* HERO MICROPHONE */}

          <div className="hero-microphone">

            <div className="hero-glow"></div>

            <img
              src={Image}
              alt="AI microphone"
            />

            <div className="hero-rings">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="hero-wave">
              <FaWaveSquare />
            </div>

          </div>

        </section>


        {/* ================= WHY CHOOSE ================= */}

        <section className="why-section">

          <h2>
            Why Choose VoiceHUB?
          </h2>


          <div className="feature-grid">


            {/* FEATURE 1 */}

            <div className="feature-card">

              <div className="feature-icon purple-icon">
                <FaWaveSquare />
              </div>

              <h3>
                AI-Powered
                <br />
                Technology
              </h3>

              <p>
                Advanced AI models ensure
                accurate and natural translations.
              </p>

            </div>


            {/* FEATURE 2 */}

            <div className="feature-card">

              <div className="feature-icon blue-icon">
                <FaMicrophone />
              </div>

              <h3>
                Voice First
                <br />
                Experience
              </h3>

              <p>
                Speak naturally, we handle
                the rest for you.
              </p>

            </div>


            {/* FEATURE 3 */}

            <div className="feature-card">

              <div className="feature-icon pink-icon">
                <FaUsers />
              </div>

              <h3>
                Multi-language
                <br />
                Support
              </h3>

              <p>
                Support for 120+ languages
                and dialects.
              </p>

            </div>


            {/* FEATURE 4 */}

            <div className="feature-card">

              <div className="feature-icon green-icon">
                <FaLock />
              </div>

              <h3>
                Secure &
                <br />
                Private
              </h3>

              <p>
                Your data is protected with
                secure translation technology.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;