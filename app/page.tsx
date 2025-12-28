'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const isReply = searchParams.get('reply') === 'true';
  const [selectedVideo, setSelectedVideo] = useState(1);
  const [isMuted, setIsMuted] = useState(true);

  const handleAction = () => {
    if (isReply) {
      window.location.href = `/success?vibe=${selectedVideo}`;
    } else {
      // Directs to Stripe while passing the chosen Vibe ID
      window.location.href = `https://buy.stripe.com/aFa8wQ2iM1SZ7wv73ofnO07?vibe=${selectedVideo}`;
    }
  };

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      {/* BACKGROUND VIDEO WITH DYNAMIC AUDIO */}
      <video key={selectedVideo} autoPlay loop muted={isMuted} playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVideo}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white', background: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', letterSpacing: '2px' }}>{isReply ? 'SEND A REPLY' : 'STASH A VIBE'}</h1>
        
        {/* AUDIO TOGGLE */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid gold', color: 'gold', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '40px', fontSize: '0.8rem' }}
        >
          {isMuted ? 'UNMUTE NATURE 🔇' : 'AUDIO LIVE 🔊'}
        </button>

        {/* VIBE INTENSITY SLIDER */}
        <div style={{ width: '85%', maxWidth: '400px', marginBottom: '40px' }}>
          <p style={{ fontSize: '0.7rem', opacity: 0.8, letterSpacing: '2px', marginBottom: '15px' }}>
            {selectedVideo <= 10 ? 'GRID I: THE CLEARING' : 'GRID II: THE AWAKENING'}
          </p>
          <input 
            type="range" min="1" max="19" 
            value={selectedVideo} 
            onChange={(e) => setSelectedVideo(parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: 'gold' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.6rem', opacity: 0.5 }}>
            <span>SOFT FREQUENCY</span>
            <span>HIGH ENERGY</span>
          </div>
        </div>

        <button onClick={handleAction} style={{ background: 'gold', color: 'black', padding: '18px 50px', borderRadius: '35px', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 0 25px gold' }}>
          {isReply ? 'STASH REPLY' : `STASH VIBE ${selectedVideo} ($0.99)`}
        </button>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{color: 'gold'}}>Entering the Vault...</div>}>
      <HomeContent />
    </Suspense>
  );
}
