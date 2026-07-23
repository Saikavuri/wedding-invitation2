import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "../animations";

interface EventSlideProps {
  label: string;
  heading: string;
  headingColor: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  mapsUrl: string;
  bgImage?: string;
  calendarUrl?: string;
}

export default function EventSlide({
  label,
  heading,
  headingColor,
  description,
  date,
  time,
  venue,
  dressCode,
  mapsUrl,
  bgImage,
  calendarUrl,
}: EventSlideProps) {
  const isDarkBg = !!bgImage;

  if (isDarkBg) {
    return (
      <section
        style={{
          minHeight: "100svh",
          position: "relative",
          overflow: "hidden",
          background: "#120803",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Background image */}
        <img
          src={bgImage}
          alt={heading}
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
        {/* Dimming overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(26,8,0,0.4) 0%, rgba(26,8,0,0.25) 50%, rgba(26,8,0,0.65) 100%)",
            zIndex: 1,
          }}
        />

        {/* User-supplied styled layout with z-index and flex */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "85px 20px 24px",
            gap: "6px",
            boxSizing: "border-box",
          }}
        >
          {/* Header block */}
          <div
            style={{
              padding: "0px 20px 0px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: "6px",
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255, 255, 255, 0.85)",
                textTransform: "uppercase",
                fontWeight: 600,
                textShadow: "rgba(0, 0, 0, 0.8) 0px 1px 6px",
              }}
            >
              {label}
            </span>
            <h2
              style={{
                fontFamily: "Cormorant, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(44px, 11vw, 64px)",
                lineHeight: 0.95,
                color: "rgb(240, 208, 128)",
                textShadow:
                  "rgba(0, 0, 0, 0.8) 0px 2px 20px, rgb(240, 208, 128) 0px 0px 40px",
                marginBottom: "6px",
              }}
            >
              {heading}
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgb(240, 208, 128)",
                margin: "8px auto",
              }}
            ></div>
          </div>

          {/* Description */}
          <div style={{ padding: "0px 20px 10px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "Cormorant, serif",
                fontStyle: "italic",
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: 500,
                textShadow: "rgba(0, 0, 0, 0.8) 0px 1px 6px",
                lineHeight: 1.6,
                margin: "0px auto",
                maxWidth: "300px",
              }}
            >
              {description}
            </p>
          </div>

          {/* Details Grid */}
          <div style={{ padding: "0px 20px", width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                maxWidth: "320px",
                margin: "0px auto",
              }}
            >
              {/* Date Box */}
              <div
                style={{
                  gridColumn: "span 1",
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  minHeight: "70px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f0d080"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      letterSpacing: "0.2em",
                      color: "rgba(255, 255, 255, 0.65)",
                      textTransform: "uppercase",
                    }}
                  >
                    Date
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "Cormorant, serif",
                    fontSize: "15px",
                    color: "rgb(255, 255, 255)",
                    lineHeight: 1.35,
                    textShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px",
                  }}
                >
                  {date}
                </span>
              </div>

              {/* Time Box */}
              <div
                style={{
                  gridColumn: "span 1",
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  minHeight: "70px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f0d080"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      letterSpacing: "0.2em",
                      color: "rgba(255, 255, 255, 0.65)",
                      textTransform: "uppercase",
                    }}
                  >
                    Time
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "Cormorant, serif",
                    fontSize: "15px",
                    color: "rgb(255, 255, 255)",
                    lineHeight: 1.35,
                    textShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px",
                  }}
                >
                  {time}
                </span>
              </div>

              {/* Venue Box */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  minHeight: "70px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f0d080"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "7px",
                      letterSpacing: "0.2em",
                      color: "rgba(255, 255, 255, 0.65)",
                      textTransform: "uppercase",
                    }}
                  >
                    Venue
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "Cormorant, serif",
                    fontSize: "14px",
                    color: "rgb(255, 255, 255)",
                    lineHeight: 1.35,
                    textShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px",
                  }}
                >
                  {venue}
                </span>
              </div>

              {/* Dress Code Box */}
              {dressCode && (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    minHeight: "70px",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f0d080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shirt"
                      aria-hidden="true"
                    >
                      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                    </svg>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "7px",
                        letterSpacing: "0.2em",
                        color: "rgba(255, 255, 255, 0.65)",
                        textTransform: "uppercase",
                      }}
                    >
                      Dress
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Cormorant, serif",
                      fontSize: "15px",
                      color: "rgb(255, 255, 255)",
                      lineHeight: 1.35,
                      textShadow: "rgba(0, 0, 0, 0.6) 0px 1px 4px",
                    }}
                  >
                    {dressCode}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Buttons Area */}
          <div
            style={{
              padding: "8px 20px 24px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "rgb(240, 208, 128)",
                color: "rgb(0, 0, 0)",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "14px",
                borderRadius: "14px",
                borderStyle: "none",
                boxShadow:
                  "rgba(201, 168, 76, 0.5) 0px 4px 20px, rgba(240, 208, 128, 0.25) 0px 0px 0px 2px",
                display: "block",
                width: "100%",
                maxWidth: "320px",
                textDecoration: "none",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }}
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              View Maps
            </a>

            {calendarUrl && (
              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "#fdf8f0",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "block",
                  width: "100%",
                  maxWidth: "320px",
                  textDecoration: "none",
                  textAlign: "center",
                  boxSizing: "border-box",
                  transition: "background 0.3s",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }}
                >
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M16 2v4M8 2v4M3 10h18"></path>
                </svg>
                Add to Calendar
              </a>
            )}
          </div>
        </motion.div>
      </section>
    );
  }

  // Standard non-backgroundImage layout remains clean and readable
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px 24px",
        boxSizing: "border-box",
        borderBottom: "1px solid rgba(201, 148, 42, 0.15)",
        background: "#fdf8f0",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        style={{ textAlign: "center", width: "100%" }}
      >
        <span
          style={{
            color: "#4a2208",
            opacity: 0.6,
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
            fontFamily: "sans-serif",
          }}
        >
          {label}
        </span>

        <h2
          style={{
            color: headingColor,
            fontSize: "56px",
            margin: "0 0 16px 0",
            fontFamily: "Great Vibes, cursive",
            lineHeight: 1,
          }}
        >
          {heading}
        </h2>

        <div
          style={{
            width: "40px",
            height: "1px",
            background: "#c9942a",
            margin: "0 auto 24px auto",
          }}
        />

        <p
          style={{
            color: "#4a2208",
            fontSize: "16px",
            fontStyle: "italic",
            marginBottom: "32px",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        {/* Date and Time Box */}
        <motion.div
          variants={scaleIn}
          style={{
            background: "rgba(201, 148, 42, 0.05)",
            border: "1px solid rgba(201, 148, 42, 0.15)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1a0800",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {date}
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "#4a2208",
              fontStyle: "italic",
            }}
          >
            {time}
          </div>
        </motion.div>

        {/* Venue Info */}
        <div style={{ marginBottom: "32px" }}>
          <span
            style={{
              display: "block",
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#c9942a",
              marginBottom: "4px",
              fontFamily: "sans-serif",
            }}
          >
            Venue
          </span>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#1a0800",
              lineHeight: 1.4,
            }}
          >
            {venue}
          </p>
        </div>

        {/* Dress Code */}
        {dressCode && (
          <div style={{ marginBottom: "32px" }}>
            <span
              style={{
                display: "block",
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#c9942a",
                marginBottom: "4px",
                fontFamily: "sans-serif",
              }}
            >
              Dress Code
            </span>
            <p
              style={{
                fontSize: "16px",
                color: "#1a0800",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              {dressCode}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            width: "100%",
          }}
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "#1a0800",
              color: "#fdf8f0",
              borderRadius: "30px",
              textDecoration: "none",
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: "500",
              boxShadow: "0 4px 12px rgba(26, 8, 0, 0.15)",
              width: "100%",
              maxWidth: "280px",
              textAlign: "center",
            }}
          >
            View Map
          </a>

          {calendarUrl && (
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "transparent",
                color: "#1a0800",
                borderRadius: "30px",
                textDecoration: "none",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: "600",
                border: "1.5px solid #1a0800",
                width: "100%",
                maxWidth: "280px",
                textAlign: "center",
              }}
            >
              Add to Calendar
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
