'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const isReply = searchParams.get('reply') === 'true';
  const [selectedVideo, setSelectedVideo] = useState(1);
  const [isMuted, setIsMuted] = useState(true);

  const handleAction = () => {
    window.location.href = isReply ? `/success?vibe=${selectedVideo}` : `https://buy.stripe.com/aFa8wQ2iM1SZ7wv73ofnO07?vibe=${selectedVideo}`;
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <video key={selectedVideo} autoPlay loop muted={isMuted} playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVideo}.mp4`} type="video/mp4" />
      </video>

      {/* VIBE HUD */}
      <div style={{ position: 'absolute', top: '15%', width: '100%', textAlign: 'center', zIndex: 5 }}>
        <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '10px' }}>
          {selectedVideo <= 10 ? 'GRID I: THE CLEARING' : 'GRID II: THE AWAKENING'}
        </p>
        <h1 style={{ color: 'white', fontSize: '1rem', fontWeight: '100', letterSpacing: '10px' }}>VIBE {selectedVideo.toString().padStart(2, '0')}</h1>
      </div>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* AUDIO BUTTON RESTORED */}
        <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid gold', color: 'gold', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '40px', fontSize: '0.7rem' }}>
          {isMuted ? 'UNMUTE ATMOSPHERE 🔇' : 'AUDIO LIVE 🔊'}
        </button>

        <div style={{ width: '80%', maxWidth: '350px', marginBottom: '50px' }}>
          <input type="range" min="1" max="19" value={selectedVideo} onChange={(e) => setSelectedVideo(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'gold' }} />
        </div>

        <button onClick={handleAction} style={{ background: 'gold', color: 'black', padding: '20px 60px', borderRadius: '40px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 0 30px gold' }}>
          {isReply ? 'STASH REPLY' : `STASH VIBE ${selectedVideo} ($0.99)`}
        </button>
      </div>
    </main>
  );
}

export default function Home() {
  return <Suspense><HomeContent /></Suspense>;
}
