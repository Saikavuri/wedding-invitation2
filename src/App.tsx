import { useEffect, useRef, useState } from "react";

// Types for scratch-off hearts
class ScratchHeart {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  container: HTMLElement;
  onReveal: () => void;
  isDrawing: boolean;
  revealed: boolean;
  width: number = 0;
  height: number = 0;

  constructor(canvasId: string, containerId: string, onReveal: () => void) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true })!;
    this.container = document.getElementById(containerId)!;
    this.onReveal = onReveal;
    this.isDrawing = false;
    this.revealed = false;
    this.init();
  }

  init() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.ctx.fillStyle = "#4A5733";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgba(255,255,255,0.7)";
    this.ctx.font = "11px 'Raleway', sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText("SCRATCH", this.width / 2, this.height / 2 + 4);

    this.container.classList.add("hinting");
    const stopHint = () => this.container.classList.remove("hinting");

    const startDraw = (e: MouseEvent | TouchEvent) => {
      stopHint();
      this.isDrawing = true;
      this.scratch(e);
    };

    this.canvas.addEventListener("mousedown", startDraw);
    this.canvas.addEventListener("touchstart", startDraw, { passive: false });
    window.addEventListener("mouseup", () => {
      this.isDrawing = false;
    });
    window.addEventListener("touchend", () => {
      this.isDrawing = false;
    });
    this.canvas.addEventListener("mousemove", (e) => this.scratch(e));
    this.canvas.addEventListener("touchmove", (e) => this.scratch(e), {
      passive: false,
    });
  }

  getMousePos(e: MouseEvent | TouchEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const isTouch = "touches" in e && e.touches.length > 0;
    const clientX = isTouch
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;
    const clientY = isTouch
      ? (e as TouchEvent).touches[0].clientY
      : (e as MouseEvent).clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  scratch(e: MouseEvent | TouchEvent) {
    if (!this.isDrawing || this.revealed) return;
    if (e.cancelable && e.type.startsWith("touch")) e.preventDefault();
    const pos = this.getMousePos(e);
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, this.width * 0.22, 0, Math.PI * 2);
    this.ctx.fill();
    if (Math.random() > 0.2) this.checkProgress();
  }

  checkProgress() {
    if (this.revealed) return;
    const sampleRate = 32;
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
    const pixels = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixels.length; i += sampleRate) {
      if (pixels[i] < 128) transparentPixels++;
    }
    const totalPixels = pixels.length / sampleRate;
    if ((transparentPixels / totalPixels) * 100 > 45) this.revealAll();
  }

  revealAll() {
    this.revealed = true;
    this.canvas.style.opacity = "0";
    setTimeout(() => {
      this.canvas.style.display = "none";
      this.onReveal();
    }, 1000);
  }
}

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const entryVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isGateRevealed, setIsGateRevealed] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // 12s safety fallback for gate loader
    const readyFallback = setTimeout(() => {
      setIsVideoReady(true);
    }, 12000);

    const handleCanPlay = () => {
      clearTimeout(readyFallback);
      setIsVideoReady(true);
    };

    const entryVideo = entryVideoRef.current;
    if (entryVideo) {
      entryVideo.addEventListener("canplay", handleCanPlay, { once: true });
      try {
        entryVideo.currentTime = 0.001;
      } catch (e) {}
    }

    return () => {
      clearTimeout(readyFallback);
      if (entryVideo) {
        entryVideo.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, []);

  useEffect(() => {
    if (!isGateRevealed) return;

    const sections = [
      "hero",
      "scratch-reveal-section",
      "haldi-card",
      "wedding-card",
      "details-section",
    ];
    let currentIndex = 0;
    let timer: number;
    let isAutoScrolling = false;

    const startAutoScroll = () => {
      timer = setInterval(() => {
        // Find which section is currently closest to the viewport top to continue from there
        let closestIndex = 0;
        let minDiff = Infinity;
        sections.forEach((id, idx) => {
          const el = document.getElementById(id);
          if (el) {
            const diff = Math.abs(el.getBoundingClientRect().top);
            if (diff < minDiff) {
              minDiff = diff;
              closestIndex = idx;
            }
          }
        });

        // Go to next section
        currentIndex = (closestIndex + 1) % sections.length;
        let targetId = sections[currentIndex];
        // If target is haldi-card, scroll to events-section to include the header
        if (targetId === "haldi-card") {
          targetId = "events-section";
        }

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          isAutoScrolling = true;
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            isAutoScrolling = false;
          }, 1200);
        }
      }, 8000);
    };

    const resetTimer = () => {
      if (isAutoScrolling) return;
      clearInterval(timer);
      startAutoScroll();
    };

    startAutoScroll();

    window.addEventListener("scroll", resetTimer, { passive: true });
    window.addEventListener("touchstart", resetTimer, { passive: true });
    window.addEventListener("mousedown", resetTimer, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
    };
  }, [isGateRevealed]);

  const playBgAudio = () => {
    const bgAudio = audioRef.current;
    if (!bgAudio) return;

    const playPromise = bgAudio.play();
    const applyOffset = () => {
      if (bgAudio.duration && bgAudio.duration > 8) {
        bgAudio.currentTime = 8;
      }
    };

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          applyOffset();
          setIsMuted(false);
        })
        .catch(() => {});
    } else {
      applyOffset();
      setIsMuted(false);
    }
  };

  useEffect(() => {
    if (isGateRevealed) {
      // Start background magic canvas
      initMagic();

      // Scroll elements observer
      initScrollAnim();

      // Initialize scratch hearts
      initScratchHearts();
    }
  }, [isGateRevealed]);

  const revealMain = () => {
    if (isGateRevealed) return;
    setIsGateRevealed(true);
    document.body.style.overflow = "auto";

    // Play hero video
    const heroVideo = heroVideoRef.current;
    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.loop = true;
      heroVideo.play().catch(() => {});
    }
  };

  const handleGateClick = async () => {
    if (isGateRevealed) return;

    // 1. Play audio synchronously in click handler
    playBgAudio();

    // 2. Play muted entry video
    const entryVideo = entryVideoRef.current;
    if (entryVideo) {
      entryVideo.muted = true;
      try {
        await entryVideo.play();
      } catch (err) {
        revealMain();
      }
    }
  };

  // Toggle mute function
  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(() => {});
        setIsMuted(false);
      } else {
        audio.pause();
        setIsMuted(true);
      }
    }
  };

  // Ambient magic: drifting petals + floating glow
  const initMagic = () => {
    const canvas = document.getElementById("magic-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w: number,
      h: number,
      dpr: number,
      motes: any[] = [],
      petals: any[] = [],
      running = false;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const PETAL_COLORS = [
      "193,180,140", // soft gold-sage
      "201,168,76", // gold
      "210,170,170", // blush
      "121,127,92", // sage
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeMote() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2,
        vy: -(0.1 + Math.random() * 0.22),
        sway: 0.4 + Math.random() * 1.0,
        swaySpeed: 0.0007 + Math.random() * 0.0013,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: 0.25 + Math.random() * 0.4,
        twinkle: 0.0009 + Math.random() * 0.0016,
        gold: Math.random() > 0.4,
      };
    }

    function makePetal(fromTop: boolean) {
      return {
        x: Math.random() * w,
        y: fromTop ? -20 - Math.random() * h : Math.random() * h,
        len: 7 + Math.random() * 9,
        wid: 3 + Math.random() * 4,
        vy: 0.35 + Math.random() * 0.65,
        sway: 14 + Math.random() * 26,
        swaySpeed: 0.0006 + Math.random() * 0.0012,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.012,
        alpha: 0.3 + Math.random() * 0.35,
        color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
      };
    }

    function seed() {
      const area = w * h;
      const moteCount = Math.max(14, Math.min(30, Math.round(area / 38000)));
      const petalCount = Math.max(10, Math.min(22, Math.round(area / 52000)));
      motes = Array.from({ length: moteCount }, makeMote);
      petals = Array.from({ length: petalCount }, () => makePetal(false));
    }

    function drawPetal(p: any) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = `rgb(${p.color})`;
      ctx.beginPath();
      ctx.moveTo(0, -p.len / 2);
      ctx.quadraticCurveTo(p.wid, 0, 0, p.len / 2);
      ctx.quadraticCurveTo(-p.wid, 0, 0, -p.len / 2);
      ctx.fill();
      ctx.restore();
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);

      // Motes
      for (const m of motes) {
        m.y += m.vy;
        m.x += Math.sin(t * m.swaySpeed + m.phase) * m.sway * 0.05;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        const a = m.baseAlpha * (0.5 + 0.5 * Math.sin(t * m.twinkle + m.phase));
        const c = m.gold ? "201,168,76" : "140,150,110";
        ctx.beginPath();
        ctx.fillStyle = `rgba(${c},${a})`;
        ctx.shadowBlur = 9;
        ctx.shadowColor = `rgba(${c},${a * 0.85})`;
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Petals
      for (const p of petals) {
        p.y += p.vy;
        p.x += Math.sin(t * p.swaySpeed + p.phase) * p.sway * 0.03;
        p.rot += p.vrot;
        if (p.y > h + 20) {
          Object.assign(p, makePetal(true));
        }
        drawPetal(p);
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      resize();
      seed();
      requestAnimationFrame(draw);
    }

    start();
  };

  // Scroll in animations
  const initScrollAnim = () => {
    const items = document.querySelectorAll(".anim");
    if (!window.IntersectionObserver) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((el) => obs.observe(el));
  };

  // Scratch cards
  const initScratchHearts = () => {
    let revealedHeartsCount = 0;
    const totalHearts = 3;

    const checkAllRevealed = () => {
      revealedHeartsCount++;
      if (revealedHeartsCount === totalHearts) {
        const heartsRow = document.getElementById("heartsRow");
        if (heartsRow) heartsRow.classList.add("unlocked");
        const surpriseMsg = document.getElementById("surpriseMessage");
        if (surpriseMsg) {
          setTimeout(() => {
            surpriseMsg.classList.add("revealed");
            startCountdown();
          }, 500);
        }

        // Confetti explosion
        setTimeout(() => {
          if (typeof (window as any).confetti !== "function") return;
          const colors = [
            "#4A5733",
            "#797F5C",
            "#C9A961",
            "#F0E9E1",
            "#FFFFFF",
          ];
          (window as any).confetti({
            particleCount: 160,
            spread: 100,
            origin: { x: 0.5, y: 0.62 },
            colors,
            zIndex: 99999,
          });
          const duration = 3000;
          const end = Date.now() + duration;
          (function frame() {
            (window as any).confetti({
              particleCount: 6,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.6 },
              colors,
              zIndex: 99999,
            });
            (window as any).confetti({
              particleCount: 6,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.6 },
              colors,
              zIndex: 99999,
            });
            if (Date.now() < end) requestAnimationFrame(frame);
          })();
        }, 800);
      }
    };

    new ScratchHeart("scratchCanvas1", "heartContainer1", checkAllRevealed);
    new ScratchHeart("scratchCanvas2", "heartContainer2", checkAllRevealed);
    new ScratchHeart("scratchCanvas3", "heartContainer3", checkAllRevealed);
  };

  const startCountdown = () => {
    const weddingDate = new Date("August 26, 2026 19:30:00").getTime();
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-mins");
    const secsEl = document.getElementById("cd-secs");
    const container = document.getElementById("countdown-container");

    const updateTimer = () => {
      const distance = weddingDate - Date.now();
      if (distance < 0) {
        if (daysEl) daysEl.textContent = "00";
        if (hoursEl) hoursEl.textContent = "00";
        if (minsEl) minsEl.textContent = "00";
        if (secsEl) secsEl.textContent = "00";
        return;
      }
      const pad = (n: number) => (n < 10 ? "0" + n : String(n));
      if (daysEl) daysEl.textContent = pad(Math.floor(distance / 86400000));
      if (hoursEl)
        hoursEl.textContent = pad(Math.floor((distance % 86400000) / 3600000));
      if (minsEl)
        minsEl.textContent = pad(Math.floor((distance % 3600000) / 60000));
      if (secsEl)
        secsEl.textContent = pad(Math.floor((distance % 60000) / 1000));
    };

    updateTimer();
    setInterval(updateTimer, 1000);
    if (container) container.classList.add("revealed");
  };

  return (
    <>
      {/* ── Background audio lives outside #main-content so iOS can play it even before the gate is dismissed ── */}
      <audio
        ref={audioRef}
        id="bg-audio"
        src="/music.mp3"
        preload="auto"
        loop
      />

      {/* ── Entry gate ── */}
      <div
        id="entry-gate"
        role="button"
        aria-label="Click to play"
        onClick={handleGateClick}
        className={isGateRevealed ? "fade-out" : ""}
        style={{ display: isGateRevealed ? "none" : "flex" }}
      >
        <video
          ref={entryVideoRef}
          id="entry-video"
          playsInline
          preload="auto"
          muted
          onEnded={revealMain}
        >
          <source
            src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/June/danish%20and%20sohaima/download%20(3).mp4#t=0.001"
            type="video/mp4"
          />
        </video>

        {/* Loader: shown while video buffers */}
        <div id="gate-loader" className={isVideoReady ? "hidden-loader" : ""}>
          <div className="gate-spinner"></div>
          <div className="gate-loader-names">
            Lakshmi Sahithi &amp; Devendra Kumar
          </div>
          <div className="gate-loader-sub">Loading your invitation</div>
        </div>

        {/* Subtle open tab: appears once video is ready */}
        <div id="gate-tab" className={isVideoReady ? "visible" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11V6a2 2 0 0 1 4 0v5" />
            <path d="M13 11V8a2 2 0 0 1 4 0v6a6 6 0 0 1-6 6H9a6 6 0 0 1-5.68-4.1L2 14" />
            <path d="M5 14a2 2 0 0 1 4 0" />
          </svg>
          Tap to Open
        </div>
      </div>

      {/* ── MUTE BUTTON ── */}
      <button
        id="mute-btn"
        onClick={toggleMute}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-primary transition-all duration-300 backdrop-blur-sm ${
          isMuted ? "muted" : ""
        }`}
        aria-label="Toggle sound"
      >
        {/* Volume on icon */}
        <svg
          className="icon-sound"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
          <path d="M16 9a5 5 0 0 1 0 6" />
          <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
        </svg>
        {/* Volume off icon */}
        <svg
          className="icon-muted"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
          <line x1="22" x2="16" y1="2" y2="8" />
          <line x1="16" x2="22" y1="2" y2="8" />
        </svg>
      </button>

      {/* ── MAIN CONTENT ── */}
      <div id="main-content" className={isGateRevealed ? "visible" : ""}>
        {/* Ambient magic layer */}
        <canvas id="magic-canvas" aria-hidden="true"></canvas>

        <main className="bg-background">
          {/* ── 1. HERO ── */}
          <section id="hero">
            <div className="hero-video">
              <video
                ref={heroVideoRef}
                src="/wedding.mp4"
                playsInline
                muted
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            {/* Elegant overlay for text readability */}
            {/* <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(240, 233, 225, 0.75) 0%, rgba(240, 233, 225, 0.45) 50%, rgba(240, 233, 225, 0.85) 100%)",
                zIndex: 1,
              }}
            />
            <div className="hero-overlay">
              <div
                className="hero-fit"
                style={{
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(201, 169, 97, 0.3)",
                  borderRadius: "20px",
                  padding: "24px 20px",
                  boxShadow: "0 10px 30px rgba(74, 87, 51, 0.1)",
                  width: "92%",
                  margin: "0 auto",
                  boxSizing: "border-box",
                }}
              >
                <img
                  className="hero-bismillah"
                  src="/ganesha.png"
                  alt="Sri Ganesha"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "2px solid #C9A961",
                    margin: "0 auto 0.75rem",
                    boxShadow: "0 4px 12px rgba(201, 169, 97, 0.25)",
                  }}
                />
                <p
                  className="hero-line-sm"
                  style={{
                    color: "#797F5C",
                    fontWeight: 600,
                    letterSpacing: "0.25em",
                  }}
                >
                  || Shri Ganeshaya Namaha ||
                </p>
                <div
                  className="hero-verse"
                  style={{ margin: "0.5rem 0 0.75rem" }}
                >
                  <p
                    className="hero-quote"
                    style={{
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                      color: "#4A5733",
                      lineHeight: 1.4,
                    }}
                  >
                    &ldquo;Vakratunda Mahakaya Suryakoti Samaprabha&rdquo;
                  </p>
                  <p
                    className="hero-ref"
                    style={{
                      fontSize: "0.6rem",
                      color: "#797F5C",
                      marginTop: "2px",
                    }}
                  >
                    Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada
                  </p>
                </div>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "rgba(201, 169, 97, 0.4)",
                    margin: "0.5rem auto 0.75rem",
                  }}
                />
                <p
                  className="hero-invite"
                  style={{
                    color: "#797F5C",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  Join us to celebrate the wedding ceremony of
                </p>
                <h1
                  className="hero-name"
                  style={{
                    fontSize: "clamp(2.5rem, 10vw, 3.8rem)",
                    color: "#4A5733",
                  }}
                >
                  Lakshmi Sahithi
                </h1>
                <div
                  className="hero-amp"
                  style={{ margin: "0.2rem 0", color: "#C9A961" }}
                >
                  &amp;
                </div>
                <h1
                  className="hero-name"
                  style={{
                    fontSize: "clamp(2.5rem, 10vw, 3.8rem)",
                    color: "#4A5733",
                  }}
                >
                  Devendra Kumar
                </h1>
              </div>
            </div> */}
          </section>

          {/* ── 2. SCRATCH HEARTS + COUNTDOWN ── */}
          <section id="scratch-reveal-section">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="anim font-script text-4xl md:text-6xl text-foreground mb-2">
                Save the Date
              </h2>
              <p
                className="anim font-display text-sm md:text-base italic text-foreground/80 mb-1"
                style={{ transitionDelay: ".08s" }}
              >
                Reveal our big day
              </p>
              <p
                className="anim text-xs md:text-sm tracking-[0.15em] uppercase font-body text-foreground/65 mb-4"
                style={{ transitionDelay: ".12s" }}
              >
                Scratch the hearts to reveal
              </p>
            </div>

            <div
              className="hearts-row anim"
              id="heartsRow"
              style={{ transitionDelay: ".15s" }}
            >
              <div className="heart-container" id="heartContainer1">
                <div className="hidden-content">
                  <span className="label">Day</span>
                  <span className="value">26</span>
                </div>
                <canvas id="scratchCanvas1" className="scratch-canvas"></canvas>
              </div>
              <div className="heart-container" id="heartContainer2">
                <div className="hidden-content">
                  <span className="label">Month</span>
                  <span className="value">Aug</span>
                </div>
                <canvas id="scratchCanvas2" className="scratch-canvas"></canvas>
              </div>
              <div className="heart-container" id="heartContainer3">
                <div className="hidden-content">
                  <span className="label">Year</span>
                  <span className="value">2026</span>
                </div>
                <canvas id="scratchCanvas3" className="scratch-canvas"></canvas>
              </div>
            </div>

            <div className="text-center px-4">
              <div id="surpriseMessage" className="surprise-message">
                The start of a beautiful journey...
              </div>
              <div id="countdown-container" className="countdown-container">
                <div className="cd-item">
                  <span id="cd-days">00</span>
                  <small>Days</small>
                </div>
                <div className="cd-item">
                  <span id="cd-hours">00</span>
                  <small>Hrs</small>
                </div>
                <div className="cd-item">
                  <span id="cd-mins">00</span>
                  <small>Mins</small>
                </div>
                <div className="cd-item">
                  <span id="cd-secs">00</span>
                  <small>Secs</small>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. EVENTS ── */}
          <section id="events-section">
            <div className="events-header max-w-4xl mx-auto text-center anim">
              <span className="events-label">The Celebration Unfolds</span>
              <h2 className="font-script text-4xl md:text-6xl text-sage-dark leading-tight">
                With Blessed
                <br />
                Ceremonies
              </h2>
              <div className="events-ornament">
                <div className="events-ornament-line rev"></div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#4A5733"
                  aria-hidden="true"
                >
                  <path d="M12 3a9 9 0 1 0 9 9 7.5 7.5 0 0 1-9-9z" />
                </svg>
                <div className="events-ornament-line"></div>
              </div>
              <p
                className="anim font-display text-sm md:text-base italic text-sage-dark/75 mt-4 px-4"
                style={{ transitionDelay: ".1s" }}
              >
                Join us in celebration, guided by faith and love
              </p>
            </div>

            <div className="events-list">
              <div id="haldi-card" className="event-block anim">
                <p className="event-day">26 August 2026</p>
                <div className="event-card">
                  <div className="event-item relative">
                    <img
                      src="/haldi-new.jpeg"
                      alt="Haldi ceremony"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                      <h3 className="font-script text-[#800000] text-5xl md:text-6xl mb-2 tracking-wide leading-none drop-shadow-sm select-none">
                        Haldi
                      </h3>
                      <p className="font-display text-[#800000] text-lg md:text-xl font-medium tracking-[0.15em] uppercase select-none">
                        26 August 2026
                      </p>
                      <p className="font-body text-[#800000] text-xs md:text-sm tracking-[0.1em] uppercase mt-1 select-none">
                        9:00 AM Onwards
                      </p>
                      <a
                        href="https://maps.app.goo.gl/uMQ5uJ2JfokCfpyd8?g_st=aw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-3 text-[10px] md:text-xs font-semibold tracking-wider uppercase text-white bg-[#800000] rounded-full hover:bg-[#800000]/95 transition-all shadow-md active:scale-95"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Venue Map
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-sep anim">
                <div className="event-sep-line"></div>
                <div className="event-sep-dot"></div>
                <div className="event-sep-line"></div>
              </div>

              <div
                id="wedding-card"
                className="event-block anim"
                style={{ transitionDelay: ".08s" }}
              >
                <p className="event-day">26 August 2026</p>
                <div className="event-card">
                  <div className="event-item">
                    <img
                      src="/wedding.png"
                      alt="Nikkah ceremony"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. THE DETAILS / LOCATION ── */}
          <section id="details-section" className="bg-ivory">
            {/* String lights */}
            <div className="w-full">
              <img
                src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/April/Dr%20Sabina%20and%20Dr%20Chandan/string-lights-DfoJYed-.png"
                alt="String lights decoration"
                className="w-full object-contain"
              />
            </div>

            {/* Section heading */}
            <div className="max-w-4xl mx-auto section-padding pt-4 pb-0">
              <div className="text-center mb-0 anim">
                <h2 className="font-script text-5xl md:text-6xl text-sage-dark mb-3">
                  The Details
                </h2>
                <p className="text-sm text-sage-dark/85 font-body tracking-widest uppercase">
                  Everything you need to know
                </p>
              </div>
            </div>

            {/* Hindu-themed Location Card */}
            <div className="flex flex-col items-center px-4 anim my-8">
              <div
                className="relative bg-white/95 border-4 border-double border-[#C9A961] rounded-2xl p-8 md:p-12 shadow-soft text-center max-w-sm w-full mx-auto"
                style={{
                  boxShadow: "0 15px 40px rgba(201, 169, 97, 0.15)",
                }}
              >
                {/* Traditional red/gold corner dots */}
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#C9A961]" />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C9A961]" />
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#C9A961]" />
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#C9A961]" />

                <img
                  src="/ganesha.png"
                  alt="Ganesha Icon"
                  className="w-16 h-16 object-contain mx-auto mb-4 p-1 rounded-full border border-[#C9A961]/35 bg-[#F0E9E1]/30"
                />

                <h3 className="font-script text-4xl md:text-5xl text-[#4A5733] mb-1">
                  Wedding Venue
                </h3>

                <div className="w-16 h-[1.5px] bg-[#C9A961]/50 mx-auto my-3" />

                {/* Date & Time info */}
                <div className="mb-4 text-[#4A5733]">
                  <p className="font-display text-sm tracking-wider uppercase font-semibold">
                    26 August 2026
                  </p>
                  <p className="font-body text-xs text-sage/80 mt-0.5">
                    7:30 PM onwards
                  </p>
                </div>

                <div className="w-8 h-[1px] bg-[#C9A961]/30 mx-auto my-3" />

                <span className="font-display text-lg uppercase tracking-wider text-[#4A5733] block mb-1 font-semibold leading-snug">
                  Sri Sai Baba Temple
                </span>
                <span className="font-body text-xs text-[#4A5733]/70 tracking-widest uppercase block mb-6">
                  Papavinasanam, Gantasala
                </span>

                <div className="flex justify-center">
                  <a
                    href="https://maps.app.goo.gl/kxqRtFzxJ4dW77eD9?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 rounded-md px-5 text-sm font-medium bg-[#4A5733] text-white hover:bg-[#4A5733]/90 transition-colors shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Google Maps
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── 5. FOOTER ── */}
          <footer className="site-footer">
            <div className="footer-inner anim">
              <img
                className="mx-auto mb-6 w-20 h-20 object-contain rounded-full border-2 border-[#C9A961] p-1.5 shadow-md bg-white/95"
                src="/ganesha.png"
                alt="Ganesha Ornament"
                loading="lazy"
              />

              <h2 className="footer-names">
                <span className="shimmer">
                  Lakshmi Sahithi &amp; Devendra Kumar
                </span>
              </h2>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
