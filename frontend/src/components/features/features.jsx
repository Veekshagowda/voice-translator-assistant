import "./features.css";
import { motion } from "framer-motion";
import {
  FaMicrophone,
  FaLanguage,
  FaBolt,
  FaLock,
} from "react-icons/fa";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function Features() {
  return (
    <section className="features" id="features">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
         Features
      </motion.h2>

      <motion.p
        className="feature-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        
      </motion.p>

      <motion.div
        className="feature-container"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          className="feature-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
          }}
        >
          <FaMicrophone className="feature-icon" />
          <h3>Voice Recognition</h3>
          <p>
           Convert your spoken words into accurate text in real time.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
          }}
        >
          <FaLanguage className="feature-icon" />
          <h3>100+ Languages</h3>
          <p>
            Translate your voice into more than 100 languages instantly.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
          }}
        >
          <FaBolt className="feature-icon" />
          <h3>Real-Time Speed</h3>
          <p>
           Translate conversations in real time for smooth communication.
          </p>
        </motion.div>

        <motion.div
          className="feature-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
          }}
        >
          <FaLock className="feature-icon" />
          <h3>Secure & Private</h3>
          <p>
            Your conversations remain safe and protected.
          </p>
        </motion.div>
      </motion.div>

    </section>
  );
}

export default Features;