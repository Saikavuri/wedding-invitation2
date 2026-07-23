import { motion } from "framer-motion";
import { fadeUp } from "../animations";

export default function FamilyInviteSlide() {
  return (
    <section
      style={{
        height: "100svh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
        src="/family_invite_bg.jpg"
        alt="Family Invitation Background"
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
            "linear-gradient(180deg, rgba(26,8,0,0.15) 0%, rgba(26,8,0,0.05) 50%, rgba(26,8,0,0.25) 100%)",
          zIndex: 1,
        }}
      />

      {/* Invitation Card Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "280px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#a67c1e",
            textTransform: "uppercase",
            fontWeight: 600,
            display: "block",
            marginBottom: "12px",
          }}
        >
          Blessings of Ancestors
        </span> */}

        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "36px",
            color: "#4a2208",
            margin: "0 0 16px 0",
            lineHeight: 1.2,
          }}
        >
          Sabbineni Family Wedding Invitation
        </h2>
      </motion.div>
    </section>
  );
}
