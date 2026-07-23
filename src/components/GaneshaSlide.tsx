import { motion } from "framer-motion";
import { fadeUp } from "../animations";

export default function GaneshaSlide() {
  return (
    <section
      style={{
        height: "100svh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "48px 24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        background: "#120803",
      }}
    >
      {/* Background Image */}
      <img
        src="/ganesha.jpg"
        alt="Lord Ganesha"
        loading="eager"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Elegant Vignette Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(26,8,0,0.3) 0%, rgba(26,8,0,0.1) 40%, rgba(26,8,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* Devotional Caption at the Bottom */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          background: "rgba(18, 8, 3, 0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(253, 248, 240, 0.15)",
          borderRadius: "12px",
          padding: "16px 24px",
          maxWidth: "280px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "26px",
            color: "#f0d080",
            margin: "0 0 6px 0",
            letterSpacing: "1px",
          }}
        >
          Shri Ganeshaya Namaha
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "12px",
            color: "rgba(253, 248, 240, 0.85)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          "Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada"
        </p>
      </motion.div>
    </section>
  );
}
