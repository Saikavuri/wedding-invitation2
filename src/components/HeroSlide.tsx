import { motion } from "framer-motion";
import { fadeUp } from "../animations";

export default function HeroSlide() {
  return (
    <section
      style={{
        position: "relative",
        height: "100svh",
        overflow: "hidden",
        background: "#120803",
      }}
    >
      {/* Background video */}
      <video
        src="/wedding.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "left center",
        }}
      />

      {/* Dark vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(26,8,0,0.55) 0%, rgba(26,8,0,0.15) 45%, rgba(26,8,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "48px 20px 48px",
          boxSizing: "border-box",
        }}
      >
        {/* TOP — PV logo + invite pill */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center" }}
        >
          {/* Logo seal */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#dfba6b",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1a0800",
              fontSize: "18px",
              fontWeight: "600",
              fontFamily: "Great Vibes, cursive",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            DL
          </div>

          {/* Frosted invite pill */}
          <div
            style={{
              background: "rgba(15, 8, 2, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "8px",
              padding: "10px 16px",
              border: "1px solid rgba(253, 248, 240, 0.12)",
              display: "inline-block",
              marginTop: "20px",
              maxWidth: "90%",
            }}
          >
            <p
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              WITH JOYFUL HEARTS, WE INVITE YOU TO CELEBRATE OUR WEDDING
            </p>
          </div>
        </motion.div>

        {/* BOTTOM — Couple names & tagline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center" }}
        >
          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 400,
              fontSize: "clamp(48px, 12vw, 64px)",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.05,
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Devendra Kumar
            <span
              style={{
                display: "block",
                fontSize: "18px",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                margin: "4px 0",
                color: "rgba(255, 255, 255, 0.75)",
                textTransform: "lowercase",
              }}
            >
              and
            </span>
            Lakshmi Sahithi
          </h1>

          {/* Thin Gold Divider */}
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "#c9942a",
              margin: "16px auto",
            }}
          />

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.6,
              maxWidth: "280px",
              margin: "0 auto",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            A love that builds palaces out of promises, and turns every vow into
            a universe.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
