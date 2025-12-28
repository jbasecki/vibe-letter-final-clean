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
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center', border: '2px solid gold', padding: '50px', borderRadius: '35px', background: 'rgba(60,0,0,0.7)', boxShadow: '0 0 40px rgba(255,215,0,0.5)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🏺</div> 
            <p style={{ color: 'gold', marginTop: '10px', letterSpacing: '5px', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 0 10px black' }}>OPEN STASHED MESSAGE</p>
          </div>
        ) : (
          <div style={{ width: '95%', maxWidth: '900px', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '50px', animation: 'warmFadeIn 2.5s' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '2px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(0,0,0,0.8)', boxShadow: '0 0 25px rgba(255,215,0,0.4)' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '60px' }} />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '60px' }} />
                  </div>
                  <p style={{ color: 'gold', fontSize: '0.8rem', marginTop: '15px', fontWeight: '900', letterSpacing: '3px', textShadow: '0 0 10px black' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>
            
            <div style={{ opacity: showProse ? 1 : 0, transition: 'opacity 2.5s', background: 'rgba(30,0,0,0.9)', padding: '45px', borderRadius: '35px', border: '1px solid gold', boxShadow: '0 0 20px gold' }}>
              <p style={{ color: 'white', fontSize: '1.4rem', lineHeight: '1.7', marginBottom: '25px', fontWeight: '200' }}>{message}</p>
              <p style={{ color: 'gold', fontSize: '0.8rem', letterSpacing: '3px' }}>— {from.toUpperCase()}</p>
              <button onClick={() => window.location.href='/?reply=true'} style={{ marginTop: '35px', background: 'gold', color: 'black', padding: '12px 35px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', border: 'none' }}>REPLY FOR FREE</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{` @keyframes warmFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>UNFOLDING...</div>}><OpenContent /></Suspense>;
}
