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
      const timer = setTimeout(() => setShowProse(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <video key={sceneId} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.5 : 0.25, transition: 'opacity 2s' }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {!unfolded ? (
          /* THE WARM BRAND VAULT: RED/GOLD AESTHETIC */
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center', border: '2px solid gold', padding: '50px', borderRadius: '35px', background: 'rgba(40,0,0,0.6)', boxShadow: '0 0 40px rgba(255,215,0,0.4)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🏺</div> {/* Symbolizing a warm, ancient vessel */}
            <p style={{ color: 'gold', marginTop: '10px', letterSpacing: '5px', fontSize: '0.8rem', fontWeight: 'bold' }}>OPEN THE STASHED MESSAGE</p>
          </div>
        ) : (
          <div style={{ width: '95%', maxWidth: '900px', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '50px', animation: 'warmFadeIn 2.5s' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '2px', border: '1.5px solid #ffcc00', padding: '6px', borderRadius: '10px', background: 'rgba(0,0,0,0.7)', boxShadow: '0 0 25px rgba(255,165,0,0.5)' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '55px' }} />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '55px' }} />
                  </div>
                  <p style={{ color: '#ffcc00', fontSize: '0.75rem', marginTop: '15px', fontWeight: '900', letterSpacing: '3px' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>
            
            <div style={{ opacity: showProse ? 1 : 0, transition: 'opacity 2.5s', background: 'rgba(20,0,0,0.85)', padding: '40px', borderRadius: '30px', border: '1px solid #ffcc00' }}>
              <p style={{ color: 'white', fontSize: '1.35rem', lineHeight: '1.7', marginBottom: '25px', fontWeight: '200', letterSpacing: '0.5px' }}>{message}</p>
              <p style={{ color: '#ffcc00', fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.8 }}>— {from.toUpperCase()}</p>
              <button onClick={() => window.location.href='/?reply=true'} style={{ marginTop: '30px', background: 'none', border: '1px solid #ffcc00', color: '#ffcc00', padding: '12px 30px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>REPLY FOR FREE</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{` @keyframes warmFadeIn { from { opacity: 0; filter: blur(5px); } to { opacity: 1; filter: blur(0); } } `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>UNFOLDING...</div>}><OpenContent /></Suspense>;
}
