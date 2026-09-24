import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGlobe,
  FaBolt,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
       `https://voice-translator-assistant.onrender.com/auth/${
  isRegistering ? "register" : "login"
}
          isRegistering ? "register" : "login"
        }`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful:", data);

        localStorage.setItem("userName", data.name);
        localStorage.setItem("authToken", data.token);

        navigate("/dashboard");
      } else {
        setError(
          data.detail || "Invalid name or password"
        );
      }
    } catch (error) {
      console.error("❌ Login error:", error);

      setError(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Background decoration */}

      <div className="login-bg-circle circle-one"></div>
      <div className="login-bg-circle circle-two"></div>
      <div className="login-bg-circle circle-three"></div>


      {/* Main Login Container */}

      <div className="login-container">

        {/* LEFT SIDE */}

        <div className="login-info">

          <div className="brand-logo">
            <div className="brand-icon">
              <FaMicrophone />
            </div>

            <div>
              <h2>
                Voice<span>Translate</span>
              </h2>

              <p>
                Speak. Translate. Connect.
              </p>
            </div>
          </div>


          <div className="info-content">

            <span className="welcome-badge">
              <span></span>
              AI POWERED
            </span>

            <h1>
              Break the
              <br />

              <span>Language Barrier.</span>
            </h1>

            <p>
              Translate your voice instantly with
              our intelligent multilingual voice
              assistant.
            </p>

          </div>


          <div className="login-features">

            <div className="mini-feature">
              <div className="mini-icon">
                <FaGlobe />
              </div>

              <div>
                <strong>
                  Multiple Languages
                </strong>

                <span>
                  Connect with people worldwide
                </span>
              </div>
            </div>


            <div className="mini-feature">
              <div className="mini-icon">
                <FaBolt />
              </div>

              <div>
                <strong>
                  Real-Time Translation
                </strong>

                <span>
                  Fast and intelligent voice translation
                </span>
              </div>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE LOGIN */}

        <div className="login-card">

          <div className="mobile-logo">
            <div className="mobile-logo-icon">
              <FaMicrophone />
            </div>
          </div>


          <div className="login-heading">

            <h1>
                {isRegistering ? "Create Your Account" : "Welcome Back"}
            </h1>

            <p>
              {isRegistering
                ? "Create an account to use VoiceTranslate"
                : "Sign in to continue to VoiceTranslate"}
            </p>

          </div>


          <form onSubmit={handleLogin}>

            {/* NAME */}

            <div className="input-group">

              <label>
                Name
              </label>

              <div className="input-wrapper">

                <FaUser className="input-icon" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <FaLock className="input-icon" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  {isRegistering ? "Create Account" : "Sign In"}
                  <FaArrowRight />
                </>
              )}

            </button>

          </form>


          {/* DIVIDER */}

          <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>


          {/* GOOGLE */}

          <button
            className="google-btn"
            type="button"
            onClick={() =>
              alert(
                "Google login is not connected yet."
              )
            }
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
            />

            <span>
              Continue with Google
            </span>

          </button>


          {/* REGISTER */}

          <p className="register-text">

            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}

            <span
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
            >
              {isRegistering ? "Sign In" : "Create Account"}
            </span>

          </p>


          {/* SECURITY */}

          <div className="secure-login">

            <FaLock />

            <span>
              Your information is securely protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;