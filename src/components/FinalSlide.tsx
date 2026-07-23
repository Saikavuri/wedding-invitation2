import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "../animations";

interface FinalSlideProps {
  bgImage?: string;
}

export default function FinalSlide({ bgImage }: FinalSlideProps) {
  const isDarkBg = !!bgImage;

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 24px",
        boxSizing: "border-box",
        background: isDarkBg ? "#120803" : "#fdf8f0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image if provided */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt="Thank You Background"
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(26,8,0,0.4) 0%, rgba(26,8,0,0.2) 50%, rgba(26,8,0,0.65) 100%)",
              zIndex: 1,
            }}
          />
        </>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        style={{
          zIndex: 2,
          position: "relative",
          width: "100%",
          ...(isDarkBg
            ? {
                background: "rgba(15, 8, 2, 0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: "16px",
                padding: "36px 20px",
                border: "1px solid rgba(201, 148, 42, 0.25)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                boxSizing: "border-box",
                maxWidth: "320px",
                margin: "0 auto",
              }
            : {}),
        }}
      >
        <motion.div
          variants={scaleIn}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: isDarkBg ? "#dfba6b" : "rgba(201, 148, 42, 0.1)",
            border: isDarkBg ? "none" : "1px solid #c9942a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            fontFamily: "Great Vibes, cursive",
            fontSize: "28px",
            color: isDarkBg ? "#1a0800" : "#c9942a",
            boxShadow: isDarkBg ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
          }}
        >
          DL
        </motion.div>

        <h2
          style={{
            color: isDarkBg ? "#ffe8a0" : "#1a0800",
            fontSize: "48px",
            margin: "0 0 16px 0",
            fontFamily: "Great Vibes, cursive",
            textShadow: isDarkBg ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
          }}
        >
          Thank You
        </h2>

        <p
          style={{
            color: isDarkBg ? "#fdf8f0" : "#4a2208",
            fontSize: "18px",
            fontStyle: "italic",
            maxWidth: "300px",
            margin: "0 auto 32px auto",
            lineHeight: 1.6,
            opacity: isDarkBg ? 0.9 : 1,
          }}
        >
          We look forward to celebrating our special day with all of our loved
          ones.
        </p>
      </motion.div>
    </section>
  );
}
