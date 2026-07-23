import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { fadeUp, scaleIn } from "../animations";

export default function CountdownSlide() {
  const { days, hours, minutes, seconds } = useCountdown("2026-08-26T18:00:00");

  const unitStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    background: "rgba(253, 248, 240, 0.85)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(201, 148, 42, 0.25)",
    borderRadius: "12px",
    padding: "12px 8px",
    minWidth: "70px",
  };

  const numStyle = {
    fontSize: "28px",
    fontWeight: "600" as const,
    color: "#1a0800",
    fontFamily: "Cormorant Garamond, serif",
  };

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    color: "#c9942a",
    marginTop: "4px",
    fontFamily: "sans-serif",
  };

  return (
    <section
      style={{ position: "relative", height: "100svh", overflow: "hidden" }}
    >
      {/* Background photo */}
      <img
        src="/couple2.jpg"
        alt="Countdown Background"
        loading="eager"
        fetchPriority="high"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(26,8,0,0.5) 0%, rgba(26,8,0,0.3) 50%, rgba(26,8,0,0.6) 100%)",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center" }}
        >
          <span
            style={{
              color: "#fdf8f0",
              opacity: 0.9,
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
              fontFamily: "sans-serif",
            }}
          >
            Counting Down To The Big Day
          </span>

          <h2
            style={{
              color: "#fdf8f0",
              fontSize: "52px",
              margin: "0 0 32px 0",
              fontFamily: "Great Vibes, cursive",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            26 August 2026
          </h2>

          {/* Countdown timer container */}
          <motion.div
            variants={scaleIn}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "32px",
            }}
          >
            <div style={unitStyle}>
              <span style={numStyle}>{String(days).padStart(2, "0")}</span>
              <span style={labelStyle}>Days</span>
            </div>
            <div style={unitStyle}>
              <span style={numStyle}>{String(hours).padStart(2, "0")}</span>
              <span style={labelStyle}>Hrs</span>
            </div>
            <div style={unitStyle}>
              <span style={numStyle}>{String(minutes).padStart(2, "0")}</span>
              <span style={labelStyle}>Min</span>
            </div>
            <div style={unitStyle}>
              <span style={numStyle}>{String(seconds).padStart(2, "0")}</span>
              <span style={labelStyle}>Sec</span>
            </div>
          </motion.div>

          <p
            style={{
              color: "#fdf8f0",
              fontStyle: "italic",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "16px",
              maxWidth: "280px",
              margin: "0 auto",
              lineHeight: 1.6,
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            "Two hearts, one love, one beautiful beginning."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
