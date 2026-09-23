import "./Navbar.css";
import { FaMicrophone } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="logo"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <FaMicrophone className="logo-icon" />

        <div>
          <h2>VoiceHUB</h2>
          <p>Speak. Connect. Translate.</p>
        </div>
      </motion.div>

      <motion.ul
        className="nav-links"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <li>
          <motion.a href="#" whileHover={{ scale: 1.1, color: "#ec4899" }}>
            Home
          </motion.a>
        </li>

        <li>
          <motion.a href="#features" whileHover={{ scale: 1.1, color: "#ec4899" }}>
            Features
          </motion.a>
        </li>

        

        <li>
          <motion.a href="#about" whileHover={{ scale: 1.1, color: "#ec4899" }}>
            About
          </motion.a>
        </li>
      </motion.ul>
    </motion.nav>
  );
}

export default Navbar;