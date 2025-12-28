'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [showProse, setShowProse] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [dimness, setDimness] = useState(0.4); // Light Adjuster State
  
  const message = searchParams.get('msg') || "";
  const sceneId = searchParams.get('vibe') || '14';
  const tilesStr = searchParams.get('tiles') || "";
  const from = searchParams.get('from') || 'A Friend';
  
  // No gaps for missing words; tiles line up in the order they were stashed
  const selectedTiles = tilesStr ? tilesStr.split(',').filter(t => t.trim().length > 0) : [];

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  useEffect(() => {
    if (unfolded) {
      const timer = setTimeout(() => setShowProse(true), 3500);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* CINEMATIC BACKGROUND WITH LIGHT ADJUSTER (DIMNESS) */}
      <video key={sceneId} autoPlay loop muted={isMuted} playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: dimness, transition: 'opacity 1s ease' }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {!unfolded ? (
          <div style={{ textAlign: 'center' }}>
            <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', width: '130px', height: '130px', background: 'radial-gradient(circle, #fff7ad 0%, #ffa700 70%)', borderRadius: '50%', margin: '0 auto 30px', boxShadow: '0 0 60px #ffa700, 0 0 120px rgba(255,165,0,0.5)', border: '2px solid white', animation: 'pulseGlow 3s infinite ease-in-out' }} />
            <p onClick={() => setUnfolded(true)} style={{ color: 'gold', letterSpacing: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', textShadow: '2px 2px 5px black' }}>OPEN STASHED MESSAGE</p>
          </div>
        ) : (
          <div style={{ width: '95%', maxWidth: '1200px', textAlign: 'center' }}>
            
            {/* ATMOSPHERIC CONTROLS: AUDIO & LIGHT */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', marginBottom: '40px', background: 'rgba(0,0,0,0.4)', padding: '10px 25px', borderRadius: '30px', width: 'fit-content', margin: '0 auto 40px', border: '1px solid rgba(255,215,0,0.3)' }}>
                <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: '1px solid gold', color: 'gold', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>
                    {isMuted ? 'UNMUTE SOUND 🔇' : 'AUDIO LIVE 🔊'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'gold', fontSize: '0.7rem' }}>LIGHT</span>
                    <input type="range" min="0.1" max="0.8" step="0.1" value={dimness} onChange={(e) => setDimness(parseFloat(e.target.value))} style={{ width: '80px', accentColor: 'gold', cursor: 'pointer' }} />
                </div>
            </div>

            {/* HORIZONTAL TILES (CLEAN SEQUENCE) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '60px', flexWrap: 'nowrap', overflowX: 'auto', padding: '15px' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ flex: '0 0 auto', textAlign: 'center', animation: 'tileFadeIn 1.5s ease-out forwards' }}>
                  <div style={{ display: 'flex', gap: '5px', border: '1.5px solid gold', padding: '12px', borderRadius: '18px', background: 'rgba(0,0,0,0.85)', boxShadow: '0 0 40px rgba(255,215,0,0.5)' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '75px' }} alt="letter-pair" />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '75px' }} alt="letter-pair" />
                  </div>
                  <p style={{ color: 'gold', fontSize: '0.95rem', marginTop: '20px', fontWeight: '900', letterSpacing: '4px', textShadow: '2px 2px 6px black' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>
            
            {/* FULL PROSE REVEAL */}
            <div style={{ opacity: showProse ? 1 : 0, transform: showProse ? 'translateY(0)' : 'translateY(30px)', transition: 'all 2.5s ease', background: 'rgba(30,0,0,0.92)', padding: '50px', borderRadius: '45px', border: '1px solid gold', boxShadow: '0 0 40px rgba(218,165,32,0.3)' }}>
              <p style={{ color: 'white', fontSize: '1.7rem', lineHeight: '1.8', marginBottom: '35px', fontWeight: '200' }}>{message}</p>
              <p style={{ color: 'gold', fontSize: '1rem', letterSpacing: '4px' }}>— {from.toUpperCase()}</p>
              <button onClick={() => window.location.href='/?reply=true'} style={{ marginTop: '40px', background: 'gold', color: 'black', padding: '16px 50px', borderRadius: '40px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}>REPLY FOR FREE</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulseGlow { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
        @keyframes tileFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense fallback={<div>Loading...</div>}><OpenContent /></Suspense>;
}
