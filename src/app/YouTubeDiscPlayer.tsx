import React, { useRef, useState } from 'react';

const YOUTUBE_URL = 'https://www.youtube.com/embed/8dM5QYdTo08?autoplay=1&loop=1&playlist=8dM5QYdTo08';

export default function YouTubeDiscPlayer() {
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  return (
    <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
      {!showPlayer && (
        <button
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: 'none',
            borderRadius: '50%',
            width: 80,
            height: 80,
            fontSize: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
          }}
          aria-label="Play Song"
          onClick={() => setShowPlayer(true)}
        >
          ▶️
        </button>
      )}
      {showPlayer && (
        <iframe
          ref={audioRef}
          width="90"
          height="90"
          style={{ borderRadius: '50%', border: 'none', width: 90, height: 90, background: '#111', boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}
          src={YOUTUBE_URL}
          allow="autoplay"
          title="Adorn Miguel YouTube Player"
        />
      )}
    </div>
  );
}
