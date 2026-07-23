import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("invited")) {
      onComplete();
    }
  }, [onComplete]);

  const handleTap = () => {
    setOpened(true);
    setTimeout(() => {
      sessionStorage.setItem("invited", "true");
      onComplete();
    }, 2000);
  };

  return (
    <div
      onClick={handleTap}
      style={{
        position: "fixed",
        inset: 0,
        background: "#f5ece0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 999999,
      }}
    >
      <motion.img
        src="/envelope.png"
        alt="Wedding Envelope"
        style={{
          maxWidth: "80%",
          maxHeight: "60%",
          objectFit: "contain",
          border: "1px solid rgba(201, 148, 42, 0.25)",
          borderRadius: "8px",
          boxShadow:
            "0 20px 50px rgba(26, 8, 2, 0.12), 0 10px 20px rgba(26, 8, 2, 0.06)",
        }}
        animate={opened ? { y: 80, opacity: 0 } : { y: [0, -12, 0] }}
        transition={
          opened
            ? { duration: 0.8 }
            : { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }
      />
      {!opened && (
        <motion.p
          style={{
            marginTop: "20px",
            fontFamily: "sans-serif",
            fontSize: "16px",
            color: "#c9942a",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Tap to Open
        </motion.p>
      )}
    </div>
  );
}
