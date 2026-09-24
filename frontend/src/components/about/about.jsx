import "./about.css";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaBullseye,
  FaGlobe,
  FaMobileAlt,
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

function About() {
  return (
    <section className="about" id="about">

      <motion.div
        className="about-content"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >

        <motion.h4
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ABOUT US
        </motion.h4>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Speak Any Language with Ease
          <span> Voice Translation</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our Real-Time Multilingual Voice Translation Assistant helps people
          who speak different languages communicate easily. It listens to your
          voice, translates your words into the selected language, and speaks
          the translated message instantly.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Using AI, Speech Recognition, Language Translation, and Text-to-Speech
          technology, the assistant provides fast, accurate, and real-time voice
          translation. It is useful for travel, education, business, and
          everyday conversations.
        </motion.p>

      </motion.div>

      <motion.div
        className="about-cards"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >

        <motion.div
          className="about-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 0 25px rgba(236,72,153,.4)",
          }}
        >
          <FaBolt className="about-icon" />
          <h3>Fast Processing</h3>
          <p>
             Enjoy fast voice recognition and real-time language translation.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 0 25px rgba(236,72,153,.4)",
          }}
        >
          <FaBullseye className="about-icon" />
          <h3>High Accuracy</h3>
          <p>
            
              Enjoy consistent and accurate translations for everyday conversations.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 0 25px rgba(236,72,153,.4)",
          }}
        >
          <FaGlobe className="about-icon" />
          <h3>Global Connectivity</h3>
          <p>
            Communicate with people worldwide without language barriers.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          variants={card}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 0 25px rgba(236,72,153,.4)",
          }}
        >
          <FaMobileAlt className="about-icon" />
          <h3>User Friendly</h3>
          <p>
            Simple, intuitive interface designed for a smooth user experience.
          </p>
        </motion.div>

      </motion.div>

    </section>
  );
}

export default About;