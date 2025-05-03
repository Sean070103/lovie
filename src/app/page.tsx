'use client';

import { useState } from 'react';
import styles from './page.module.css';


export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const photos = [
    { 
      src: '/lovie/lovie_1.png', 
      message: (
        <>
          <span className={styles.line}>From the very first moment I saw you,</span>
          <span className={styles.line}>time stood still. My heart knew</span>
          <span className={styles.line}>instantly that you were someone</span>
          <span className={styles.line}>I would wait eternities for.</span>
        </>
      )
    },
    { 
      src: '/lovie/lovie_2.png', 
      message: (
        <>
          <span className={styles.line}>Your smile carries the</span>
          <span className={`${styles.line} ${styles.warmth}`}>warmth</span>
          <span className={styles.line}>of a <span className={styles.thousand}>thousand</span> suns. I</span>
          <span className={styles.line}>promise to</span>
          <span className={styles.line}>be your <span className={styles.constant}>constant</span>, your</span>
          <span className={`${styles.line} ${styles.rock}`}>rock,</span>
          <span className={styles.line}>your <span className={styles.harbor}>safe harbor</span>.</span>
        </>
      )
    },
    { 
      src: '/lovie/lovie_3.png', 
      message: (
        <>
          <span className={styles.line}>Every second with you is a treasure</span>
          <span className={styles.line}>I hold dear. The universe may have</span>
          <span className={styles.line}>its own timeline, but my heart beats</span>
          <span className={styles.line}>in perfect sync with yours.</span>
        </>
      )
    },
    { 
      src: '/lovie/lovie_5.png', 
      message: 'In this vast world of uncertainty, my love for you remains unshakeable. Time is but a number when it comes to loving you.'
    },
    { 
      src: '/lovie/lovie_6.png', 
      message: 'Your love has given my life new meaning, new purpose. The depth of my feelings for you knows no bounds.'
    },
    { 
      src: '/lovie/lovie_7.png', 
      message: 'They say patience is a virtue, but waiting for you is a privilege. Every day apart only strengthens my resolve.'
    },
    { 
      src: '/lovie/lovie_8.png', 
      message: 'In the tapestry of my life, you are the golden thread that makes everything shine brighter.'
    },
    { 
      src: '/lovie/lovie_9.png', 
      message: 'My love for you transcends time itself. Years could pass like grains of sand, but my heart would remain steadfast and true.'
    },
    { 
      src: '/lovie/lovie_10.png', 
      message: 'These four months are just the beginning of our eternal story. I promise to cherish you, wait for you, and love you more deeply with each passing day.'
    }
  ];

  return (
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
              <div className={styles.photoContainer}>
            <img
                  src={photo.src}
                  alt={`Memory ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
            />
              </div>
              <div className={styles.datestamp}>
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto !== null && (
        <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.polaroidFrame}>
              <div className={styles.photoContainer}>
          <img
                  src={photos[selectedPhoto].src}
                  alt={`Memory ${selectedPhoto + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
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
  );
}
