import "./Hero.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero">

      <div className="overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Real-Time <br />
          <span>Multilingual</span> <br />
          Voice Translation <br />
          Assistant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
         Experience fast, accurate, and real-time voice translation for effortless communication.
        </motion.p>

        <Link to="/login">
          <motion.button
            className="start-btn"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 25px #ec4899",
            }}
            whileTap={{ scale: 0.95 }}
          >
            LET'S GO
          </motion.button>
        </Link>

      </motion.div>

    </section>
  );
}

export default Hero;