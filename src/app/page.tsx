"use client";

import { useState } from "react";
import styles from "./page.module.css";
import TulipSVG from "./TulipSVG";
import dynamic from "next/dynamic";
const TulipLottie = dynamic(() => import("./TulipLottie"), { ssr: false });
import Image from "next/image";

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
                <div className={styles.datestamp}>
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
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
              joy, compassion—and happiness—because I would have all the talking
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
