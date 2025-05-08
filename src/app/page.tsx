"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import TulipSVG from "./TulipSVG";
import dynamic from "next/dynamic";
const TulipLottie = dynamic(() => import("./TulipLottie"), { ssr: false });
import Image from "next/image";
import React from "react";

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const photos = [
    {
      src: "/lovie/lovie_1.png",
      message: (
        <>
          <span className={styles.line}>
            From the very first moment I saw you,
          </span>
          <span className={styles.line}>time stood still. My heart knew</span>
          <span className={styles.line}>instantly that you were someone</span>
          <span className={styles.line}>I would wait eternities for.</span>
        </>
      ),
    },
    {
      src: "/lovie/lovie_2.png",
      message: (
        <>
          <span className={styles.line}>Your smile carries the</span>
          <span className={`${styles.line} ${styles.warmth}`}>warmth</span>
          <span className={styles.line}>
            of a <span className={styles.thousand}>thousand</span> suns. I
          </span>
          <span className={styles.line}>promise to</span>
          <span className={styles.line}>
            be your <span className={styles.constant}>constant</span>, your
          </span>
          <span className={`${styles.line} ${styles.rock}`}>rock,</span>
          <span className={styles.line}>
            your <span className={styles.harbor}>safe harbor</span>.
          </span>
        </>
      ),
    },
    {
      src: "/lovie/lovie_3.png",
      message: (
        <>
          <span className={styles.line}>
            Every second with you is a treasure
          </span>
          <span className={styles.line}>
            I hold dear. The universe may have
          </span>
          <span className={styles.line}>
            its own timeline, but my heart beats
          </span>
          <span className={styles.line}>in perfect sync with yours.</span>
        </>
      ),
    },
    {
      src: "/lovie/lovie_5.png",
      message:
        "In this vast world of uncertainty, my love for you remains unshakeable. Time is but a number when it comes to loving you.",
    },
    {
      src: "/lovie/lovie_6.png",
      message:
        "Your love has given my life new meaning, new purpose. The depth of my feelings for you knows no bounds.",
    },
    {
      src: "/lovie/lovie_7.png",
      message:
        "They say patience is a virtue, but waiting for you is a privilege. Every day apart only strengthens my resolve.",
    },
    {
      src: "/lovie/lovie_8.png",
      message:
        "In the tapestry of my life, you are the golden thread that makes everything shine brighter.",
    },
    {
      src: "/lovie/lovie_9.png",
      message:
        "My love for you transcends time itself. Years could pass like grains of sand, but my heart would remain steadfast and true.",
    },
    {
      src: "/lovie/lovie_10.png",
      message:
        "These four months are just the beginning of our eternal story. I promise to cherish you, wait for you, and love you more deeply with each passing day.",
    },
  ];

  const [letterOpen, setLetterOpen] = useState(false);
  const [flowers, setFlowers] = useState<{ x: number; y: number; id: number }[]>([]);
  const flowerId = useRef(0);

  function Pacman() {
    const [mouthOpen, setMouthOpen] = useState(true);
    const [dragging, setDragging] = useState(false);
    const [pos, setPos] = useState({ x: 40, y: 40 }); // Pac-Man position
    const [ghostPos, setGhostPos] = useState({ x: 40, y: 40 }); // Ghost position
    const [showBubble, setShowBubble] = useState(false);
    const [showGhostBubble, setShowGhostBubble] = useState(false);
    const [ghostDialog, setGhostDialog] = useState('Boo! 👻');
    const targetPos = useRef({ x: 40, y: 40 }); // Pac-Man target
    const offset = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);
    const track = useRef({ left: 0, top: 0, width: 500, height: 500 });
    const pacmanT = useRef(0); // 0 to 1, position along rectangle
    const ghostT = useRef(0.15); // ghost stays ahead
    const orbiting = useRef(true);
    const [angle, setAngle] = useState(0); // Pac-Man's facing angle in radians
    const prevPos = useRef(pos);
    const [speed, setSpeed] = useState(0.0007); // Pac-Man and ghost speed
    const speedTimeout = useRef<NodeJS.Timeout | null>(null);
    const ghostPosRef = useRef(ghostPos);

    // Update track on resize
    useEffect(() => {
      const handleResize = () => {
        if (typeof window !== 'undefined') {
          track.current = {
            left: 0,
            top: 0,
            width: window.innerWidth - 64,
            height: window.innerHeight - 64,
          };
        }
      };
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
      }
    }, []);

    // Helper: get (x, y) on rectangle perimeter for t in [0,1)
    function getRectPos(t: number) {
      const perim = 2 * (track.current.width + track.current.height);
      let d = t * perim;
      if (d < track.current.width) return { x: track.current.left + d, y: track.current.top };
      d -= track.current.width;
      if (d < track.current.height) return { x: track.current.left + track.current.width, y: track.current.top + d };
      d -= track.current.height;
      if (d < track.current.width) return { x: track.current.left + track.current.width - d, y: track.current.top + track.current.height };
      d -= track.current.width;
      return { x: track.current.left, y: track.current.top + track.current.height - d };
    }

    // Animation loop for rectangular track
    useEffect(() => {
      const animate = () => {
        setPos((prev) => {
          if (dragging) return prev;
          if (orbiting.current) {
            pacmanT.current = (pacmanT.current + speed) % 1;
            ghostT.current = (ghostT.current + speed) % 1;
            const pac = getRectPos(pacmanT.current);
            const ghost = getRectPos(ghostT.current);
            setGhostPos(ghost);
            targetPos.current = pac;
            // Calculate angle for Pac-Man facing
            const dx = pac.x - prevPos.current.x;
            const dy = pac.y - prevPos.current.y;
            if (dx !== 0 || dy !== 0) {
              setAngle(Math.atan2(dy, dx));
            }
            prevPos.current = pac;
            // Check for catch
            const dist = Math.hypot(pac.x - ghost.x, pac.y - ghost.y);
            if (dist < 40) {
              // Pop flowers at catch location
              const newFlowers = Array.from({ length: 8 }).map(() => ({
                x: (pac.x + ghost.x) / 2,
                y: (pac.y + ghost.y) / 2,
                id: flowerId.current++
              }));
              setFlowers((f) => [...f, ...newFlowers]);
              // Move ghost further ahead
              ghostT.current = (pacmanT.current + 0.25) % 1;
            }
            return pac;
          } else {
            // Smoothly animate to target if not orbiting
            const dx = targetPos.current.x - prev.x;
            const dy = targetPos.current.y - prev.y;
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
              return targetPos.current;
            }
            // Calculate angle for Pac-Man facing
            if (dx !== 0 || dy !== 0) {
              setAngle(Math.atan2(dy, dx));
            }
            const next = {
              x: prev.x + dx * 0.15,
              y: prev.y + dy * 0.15,
            };
            prevPos.current = next;
            return next;
          }
        });
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [dragging, speed]);

    // Remove flowers after animation
    useEffect(() => {
      if (flowers.length === 0) return;
      const timeout = setTimeout(() => {
        setFlowers((f) => f.slice(8));
      }, 1200);
      return () => clearTimeout(timeout);
    }, []);

    // Ghost dialog randomizer
    useEffect(() => {
      let timeout: NodeJS.Timeout;
      function randomGhostDialog() {
        const dialogs = [
          'Boo! 👻',
          'Catch me if you can!',
          "You can't eat me! 😜",
          'Spooky time!',
          '👻💨',
          "Pac-Man, you're too slow!"
        ];
        setGhostDialog(dialogs[Math.floor(Math.random() * dialogs.length)]);
        setShowGhostBubble(true);
        timeout = setTimeout(() => setShowGhostBubble(false), 2000 + Math.random() * 2000);
      }
      const interval = setInterval(() => {
        if (Math.random() < 0.15) randomGhostDialog();
      }, 2000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, []);

    // Ghost bust every 30 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        // Pop flowers at ghost's current position
        const ghost = ghostPosRef.current;
        const newFlowers = Array.from({ length: 8 }).map(() => ({
          x: ghost.x,
          y: ghost.y,
          id: flowerId.current++
        }));
        setFlowers((f) => [...f, ...newFlowers]);
        // Optionally, move ghost further ahead
        ghostT.current = (pacmanT.current + 0.35) % 1;
      }, 30000);
      return () => clearInterval(interval);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setDragging(true);
      orbiting.current = false;
      offset.current = {
        x: e.clientX - targetPos.current.x,
        y: e.clientY - targetPos.current.y,
      };
      document.body.style.userSelect = "none";
    };

    const handleMouseUp = () => {
      setDragging(false);
      // Snap Pac-Man to nearest point on rectangle and set t
      const px = pos.x, py = pos.y;
      let t = 0, minDist = Infinity;
      for (let idx = 0; idx < 1000; idx++) {
        const tt = idx / 1000;
        const p = getRectPos(tt);
        const dist = Math.hypot(p.x - px, p.y - py);
        if (dist < minDist) {
          minDist = dist;
          t = tt;
        }
      }
      pacmanT.current = t;
      ghostT.current = (t + 0.15) % 1;
      orbiting.current = true;
      document.body.style.userSelect = "";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const newX = Math.max(0, Math.min(e.clientX - offset.current.x, vw - 64));
        const newY = Math.max(0, Math.min(e.clientY - offset.current.y, vh - 64));
        targetPos.current = { x: newX, y: newY };
        setPos({ x: newX, y: newY });
        setGhostPos(getRectPos(ghostT.current));
      }
    };

    // Touch events for mobile
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setDragging(true);
      orbiting.current = false;
      const touch = e.touches[0];
      offset.current = {
        x: touch.clientX - targetPos.current.x,
        y: touch.clientY - targetPos.current.y,
      };
    };
    const handleTouchEnd = () => {
      setDragging(false);
      // Snap Pac-Man to nearest point on rectangle and set t
      const px = pos.x, py = pos.y;
      let t = 0, minDist = Infinity;
      for (let idx = 0; idx < 1000; idx++) {
        const tt = idx / 1000;
        const p = getRectPos(tt);
        const dist = Math.hypot(p.x - px, p.y - py);
        if (dist < minDist) {
          minDist = dist;
          t = tt;
        }
      }
      pacmanT.current = t;
      ghostT.current = (t + 0.15) % 1;
      orbiting.current = true;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (dragging) {
        const touch = e.touches[0];
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const newX = Math.max(0, Math.min(touch.clientX - offset.current.x, vw - 64));
        const newY = Math.max(0, Math.min(vh - (touch.clientY - offset.current.y) - 64, vh - 64));
        targetPos.current = { x: newX, y: newY };
        setPos({ x: newX, y: newY });
        setGhostPos(getRectPos(ghostT.current));
      }
    };

    useEffect(() => {
      if (dragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      }
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }, [dragging]);

    // Show Pac-Man speech bubble for 2.5s when Pac-Man is clicked
    const handleClick = () => {
      setMouthOpen((m) => !m);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2500);
      // Make Pac-Man faster for 2 seconds
      setSpeed(0.002);
      if (speedTimeout.current) clearTimeout(speedTimeout.current);
      speedTimeout.current = setTimeout(() => setSpeed(0.0007), 2000);
    };

    // Show ghost dialog on click
    const handleGhostClick = () => {
      const dialogs = [
        'Boo! 👻',
        "You can't catch me!",
        'Hehe!',
        '👻💨',
        'Spooky chase!',
        "Pac-Man, try harder!"
      ];
      setGhostDialog(dialogs[Math.floor(Math.random() * dialogs.length)]);
      setShowGhostBubble(true);
      setTimeout(() => setShowGhostBubble(false), 2000);
    };

    // Animate Pac-Man's mouth (bite animation)
    useEffect(() => {
      if (!dragging && orbiting.current) {
        const interval = setInterval(() => {
          setMouthOpen((open) => !open);
        }, 220);
        return () => clearInterval(interval);
      }
    }, [dragging]);

    useEffect(() => { ghostPosRef.current = ghostPos; }, [ghostPos]);

    return (
      <>
        {/* Ghost */}
        <div
          style={{
            position: "fixed",
            left: ghostPos.x,
            top: ghostPos.y,
            zIndex: 9998,
            width: 64,
            height: 64,
            pointerEvents: "auto",
            transition: dragging ? "none" : "box-shadow 0.2s",
          }}
          onClick={handleGhostClick}
          aria-label="Click the ghost!"
        >
          {/* Ghost speech bubble */}
          <div
            style={{
              position: "absolute",
              left: 70,
              top: -10,
              minWidth: 120,
              maxWidth: 200,
              background: "#fffefb",
              color: "#232323",
              borderRadius: 16,
              boxShadow: "0 2px 8px #b2b2ff99",
              padding: "0.7em 1.1em",
              fontFamily: "Caveat, Segoe Print, Dancing Script, Comic Sans MS, cursive",
              fontSize: 20,
              opacity: showGhostBubble ? 1 : 0,
              pointerEvents: "none",
              transition: "opacity 0.4s cubic-bezier(.4,1.6,.5,1)",
              transform: showGhostBubble ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
              transitionProperty: "opacity, transform",
            }}
          >
            {ghostDialog}
          </div>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <g>
              <ellipse cx="32" cy="40" rx="24" ry="18" fill="#fff" stroke="#b2b2ff" strokeWidth="3" />
              <ellipse cx="24" cy="38" rx="4" ry="6" fill="#b2b2ff" />
              <ellipse cx="40" cy="38" rx="4" ry="6" fill="#b2b2ff" />
              <circle cx="24" cy="38" r="2" fill="#fff" />
              <circle cx="40" cy="38" r="2" fill="#fff" />
              <ellipse cx="32" cy="54" rx="20" ry="4" fill="#b2b2ff" opacity="0.3" />
            </g>
          </svg>
        </div>
        {/* Pac-Man */}
        <div
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            zIndex: 9999,
            cursor: dragging ? "grabbing" : "pointer",
            touchAction: "none",
            transition: dragging ? "none" : "box-shadow 0.2s",
            boxShadow: dragging ? "0 0 16px #ffecb3" : "0 2px 12px #ffecb3",
            userSelect: "none",
            transform: `rotate(${angle}rad)`
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleClick}
          aria-label="Drag or click Pac-Man!"
        >
          {/* Pac-Man speech bubble */}
          <div
            style={{
              position: "absolute",
              right: 70,
              bottom: 40,
              minWidth: 120,
              maxWidth: 200,
              background: "#fffefb",
              color: "#232323",
              borderRadius: 16,
              boxShadow: "0 2px 8px #ffe06699",
              padding: "0.7em 1.1em",
              fontFamily: "Caveat, Segoe Print, Dancing Script, Comic Sans MS, cursive",
              fontSize: 20,
              opacity: showBubble ? 1 : 0,
              pointerEvents: "none",
              transition: "opacity 0.4s cubic-bezier(.4,1.6,.5,1)",
              transform: showBubble ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
              transitionProperty: "opacity, transform",
            }}
          >
            <span role="img" aria-label="heart">💛</span> Hi, Alhea! You make my coder smile! <span role="img" aria-label="pacman">😋</span>
          </div>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <g>
              <circle cx="32" cy="32" r="30" fill="#ffe066" stroke="#f7b801" strokeWidth="4" />
              {mouthOpen ? (
                <path
                  d="M32 32 L62 16 A30 30 0 1 0 62 48 Z"
                  fill="#fffefb"
                  style={{ transition: "d 0.2s" }}
                />
              ) : (
                <path
                  d="M32 32 L62 24 A30 30 0 1 0 62 40 Z"
                  fill="#fffefb"
                  style={{ transition: "d 0.2s" }}
                />
              )}
              <circle cx="44" cy="20" r="4" fill="#232323" />
            </g>
          </svg>
        </div>
        {/* Flower pop animation */}
        {flowers.map((flower, i) => (
          <FlowerPop key={flower.id} x={flower.x} y={flower.y} index={i % 8} />
        ))}
      </>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.polaroidCamera}>
          <div className={styles.cameraTop}>
            <div className={styles.lens}></div>
            <div className={styles.flash}></div>
            <div className={styles.viewfinder}></div>
            <div className={styles.exposureControl}>
              <div className={styles.exposureKnob}></div>
            </div>
          </div>

          <div className={styles.photoOutput}>
            {photos.map((photo, index) => (
              <div
                key={index}
                className={styles.polaroidFrame}
                onClick={() => setSelectedPhoto(index)}
              >
                <div
                  className={styles.photoContainer}
                  style={{ position: "relative" }}
                >
                  <Image
                    src={photo.src}
                    alt={`Memory ${index + 1}`}
                    width={400}
                    height={500}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      width: 36,
                      height: 88,
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  >
                    <TulipSVG style={{ width: 36, height: 88 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPhoto !== null && (
          <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.polaroidFrame}>
                <div
                  className={styles.photoContainer}
                  style={{ position: "relative" }}
                >
                  <Image
                    src={photos[selectedPhoto].src}
                    alt={`Memory ${selectedPhoto + 1}`}
                    width={400}
                    height={500}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      width: 36,
                      height: 88,
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  >
                    <TulipSVG style={{ width: 36, height: 88 }} />
                  </div>
                </div>
                <div className={styles.message}>
                  {photos[selectedPhoto].message}
                </div>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </main>
      <footer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "48px",
          marginBottom: "32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Tulip Lottie Animation on the left */}
        <div
          style={{
            position: "absolute",
            left: "-110px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.96,
            width: "90px",
            height: "220px",
            display: "block",
          }}
        >
          <TulipLottie />
        </div>
        {/* Pacman Component */}
        <Pacman />
        <div
          id="love-letter-animate"
          className={letterOpen ? "show" : ""}
          tabIndex={0}
          style={{
            cursor: letterOpen ? "default" : "pointer",
            outline: "none",
          }}
          onClick={() => setLetterOpen(true)}
          onKeyDown={(e) => {
            if (!letterOpen && (e.key === "Enter" || e.key === " "))
              setLetterOpen(true);
          }}
          aria-label={letterOpen ? undefined : "Click to open the love letter"}
        >
          <article
            style={{
              background: "#f7f6f2",
              borderRadius: "18px",
              padding: "2.5rem 2.5rem 2rem 2.5rem",
              maxWidth: "650px",
              color: "#232323",
              fontFamily:
                "Caveat, Segoe Print, Dancing Script, Times New Roman, cursive, sans-serif",
              fontSize: "1.25rem",
              boxShadow:
                "0 8px 32px rgba(80, 70, 50, 0.18), 0 1.5px 6px rgba(80,70,50,0.09)",
              textAlign: "left",
              border: "1.5px solid #eae6dd",
              letterSpacing: "0.04em",
              lineHeight: "2.1",
              whiteSpace: "pre-line",
              transform: "rotate(-1.5deg)",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontWeight: 700,
                marginBottom: "1.2rem",
                color: "#232323",
                fontFamily: "inherit",
                fontSize: "2rem",
              }}
            >
              To Alhea,
            </h2>
            <p style={{ marginBottom: "1.2rem" }}>
              To be lost in a world where everything seems to be so easily
              accessible seems hard to believe. But so many of us, under the
              surface, underneath all the brave faces, seem to feel that utter
              void filled with a longing and emptiness.
            </p>
            <p style={{ marginBottom: "1.2rem" }}>
              So there I was, lost. Looking for who I really was and what I
              really needed in life. Amongst the confusion, fear, worry,
              self-deprecation and burden, you shone out to me like a beacon of
              light on a sea of darkness.
            </p>
            <p style={{ marginBottom: "1.2rem" }}>
              You were always there, longer than I ever knew, and when I was
              falling, you caught me effortlessly and selflessly.
            </p>
            <p style={{ marginBottom: "1.2rem" }}>
              Our common ground is so extensive that I could wander the earth
              with you for a lifetime with nothing but feelings of wholeness,
              joy, compassion and happiness because I would have all the talking
              for you was effortless. Because when I faced my demons, they found
              yours and saved them away, leaving behind a crystal clear view of
              one another. It was as if we were destined to be seen... The other
              half of ourselves.
            </p>
            <p
              style={{
                marginTop: "2.2rem",
                textAlign: "right",
                color: "#232323",
                fontSize: "1.1rem",
                fontFamily: "inherit",
              }}
            >
              — Sean Michael Andrew B.Mendoza
            </p>
            <div
              style={{
                textAlign: "center",
                color: "#b2b2b2",
                fontSize: "1.3rem",
                marginTop: "1.1rem",
                fontFamily: "inherit",
              }}
            >
              x
            </div>
          </article>
        </div>
      </footer>
    </>
  );
}

function FlowerPop({ x, y, index }: { x: number; y: number; index: number }) {
  // 8 directions
  const angle = (index / 8) * 2 * Math.PI;
  const [pop, setPop] = useState(false);
  useEffect(() => {
    setTimeout(() => setPop(true), 10);
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        left: x + 32,
        top: y + 32,
        pointerEvents: 'none',
        zIndex: 10000,
        transform: pop
          ? `translate(${Math.cos(angle) * 60}px, ${Math.sin(angle) * 60}px) scale(1.2)`
          : 'translate(0,0) scale(0.5)',
        opacity: pop ? 0.85 : 0,
        transition: 'transform 0.7s cubic-bezier(.4,1.6,.5,1), opacity 1.1s',
      }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36">
        <g>
          <circle cx="18" cy="18" r="10" fill="#f7b6d2" />
          <ellipse cx="18" cy="13" rx="4" ry="7" fill="#f08bb7" />
          <ellipse cx="18" cy="23" rx="4" ry="7" fill="#ffe066" />
          <ellipse cx="13" cy="18" rx="7" ry="4" fill="#b7e3a8" />
          <ellipse cx="23" cy="18" rx="7" ry="4" fill="#4ECDC4" />
        </g>
      </svg>
    </div>
  );
}
