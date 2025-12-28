'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [showProse, setShowProse] = useState(false);
  
  const message = searchParams.get('msg') || "";
  const sceneId = searchParams.get('vibe') || '14';
  const tilesStr = searchParams.get('tiles') || "";
  const from = searchParams.get('from') || 'A Friend';
  const selectedTiles = tilesStr ? tilesStr.split(',') : [];

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  useEffect(() => {
    if (unfolded) {
      // Allows the receiver to absorb the Golden Vibes before the prose appears
      const timer = setTimeout(() => setShowProse(true), 3500);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* CINEMATIC BACKGROUND */}
      <video key={sceneId} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.55 : 0.25, transition: 'opacity 2.5s ease-in-out' }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {!unfolded ? (
          /* THE GLOWING GOLDEN ORB (Replaces Blue Box & Emoji Square) */
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ 
              width: '120px', height: '120px', 
              background: 'radial-gradient(circle, #fff7ad 0%, #ffa700 70%)', 
              borderRadius: '50%', margin: '0 auto 30px',
              boxShadow: '0 0 60px #ffa700, 0 0 120px rgba(255,165,0,0.5)',
              border: '2px solid white',
              animation: 'pulseGlow 3s infinite ease-in-out'
            }} />
            <p style={{ color: 'gold', letterSpacing: '8px', fontSize: '0.85rem', fontWeight: 'bold', textShadow: '2px 2px 5px black' }}>
              OPEN STASHED MESSAGE
            </p>
          </div>
        ) : (
          <div style={{ width: '95%', maxWidth: '1200px', textAlign: 'center' }}>
            
            {/* HORIZONTAL VIBE ROW (CLEAN) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '35px', marginBottom: '80px', flexWrap: 'nowrap', overflowX: 'auto', padding: '20px' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ flex: '0 0 auto', textAlign: 'center', animation: 'tileAppear 1.5s ease-out forwards' }}>
                  <div style={{ display: 'flex', gap: '5px', border: '1.5px solid #FFD700', padding: '12px', borderRadius: '18px', background: 'rgba(0,0,0,0.85)', boxShadow: '0 0 40px rgba(255,215,0,0.5)' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '75px', height: 'auto' }} alt="vibe-start" />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '75px', height: 'auto' }} alt="vibe-end" />
                  </div>
                  {/* SIGNED TRANSLATION BENEATH */}
                  <p style={{ color: '#FFD700', fontSize: '0.95rem', marginTop: '25px', fontWeight: '900', letterSpacing: '5px', textShadow: '2px 2px 6px black' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>
            
            {/* WARM PROSE REVEAL */}
            <div style={{ opacity: showProse ? 1 : 0, transform: showProse ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 2.5s ease, transform 2.5s ease', background: 'rgba(30,0,0,0.92)', padding: '55px', borderRadius: '45px', border: '1.5px solid gold', boxShadow: '0 0 40px rgba(218,165,32,0.3)' }}>
              <p style={{ color: 'white', fontSize: '1.7rem', lineHeight: '1.8', marginBottom: '35px', fontWeight: '200', letterSpacing: '0.8px' }}>{message}</p>
              <p style={{ color: 'gold', fontSize: '1rem', letterSpacing: '4px', opacity: 0.8 }}>— {from.toUpperCase()}</p>
              <button onClick={() => window.location.href='/?reply=true'} style={{ marginTop: '45px', background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)', color: 'black', padding: '16px 50px', borderRadius: '40px', cursor: 'pointer', border: 'none', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>REPLY FOR FREE</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes tileAppear {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '5px'}}>PREPARING THE REVEAL...</div>}><OpenContent /></Suspense>;
}
