import { useState } from 'react';

export default function DiscPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/* Simple Box with Play and Stop buttons */}
      <div
        className="fixed left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center bg-white border border-gray-400 rounded-xl shadow-lg"
        style={{ width: '170px', height: '110px', padding: '18px' }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '1.1rem', color: '#333' }}>Adorn Player</div>
        <div className="flex gap-4">
          <button
            style={{ padding: '8px 18px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => setIsPlaying(true)}
          >
            Play
          </button>
          <button
            style={{ padding: '8px 18px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => setIsPlaying(false)}
          >
            Stop
          </button>
        </div>
        {/* Hidden YouTube audio player */}
        {isPlaying && (
          <iframe
            style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 1, opacity: 0, zIndex: 0 }}
            src="https://www.youtube.com/embed/8dM5QYdTo08?autoplay=1"
            title="YouTube audio player"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>

      {/* Main Disc Player */}
      <div
        className="relative w-64 h-64 rounded-full bg-black overflow-hidden group cursor-pointer flex items-center justify-center"
        onClick={() => !isPlaying && setIsPlaying(true)}
        style={{ background: 'radial-gradient(circle at 60% 40%, #444 60%, #111 100%)' }}
      >
      <img
        src="/disc.avif"
        alt="Disc"
        className="w-full h-full object-cover rounded-full transition duration-500 transform group-hover:rotate-180"
      />
      {!isPlaying && (
        <button
          className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-80 rounded-full p-4 text-4xl shadow-lg m-auto"
          aria-label="Play"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}
        >
          ▶️
        </button>
      )}
      {isPlaying && (
        <iframe
          style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 1, opacity: 0, zIndex: 0 }}
          src="https://www.youtube.com/embed/8dM5QYdTo08?autoplay=1"
          title="YouTube audio player"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
    </>
  );
}
