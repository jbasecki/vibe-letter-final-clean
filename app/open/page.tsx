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
      // Delay the long-form prose so the focus stays on the vibe-tiles first
      const timer = setTimeout(() => setShowProse(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <video key={sceneId} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.5 : 0.2, transition: 'opacity 2s' }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {!unfolded ? (
          /* THE BRAND: BLUE BOX WITH GOLD OUTLINE */
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center', border: '2px solid gold', padding: '40px', borderRadius: '30px', background: 'rgba(0,0,0,0.4)', boxShadow: '0 0 30px gold' }}>
            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '180px', filter: 'drop-shadow(0 0 15px #0070f3)' }} alt="Vault" />
            <p style={{ color: 'gold', marginTop: '20px', letterSpacing: '4px', fontSize: '0.8rem' }}>OPEN THE STASHED MESSAGE</p>
          </div>
        ) : (
          <div style={{ width: '95%', maxWidth: '900px', textAlign: 'center' }}>
            
            /* THE GOLDEN VIBES WITH TRANSLATIONS */
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', animation: 'fadeIn 2s' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '2px', border: '1px solid gold', padding: '6px', borderRadius: '8px', background: 'rgba(0,0,0,0.6)', boxShadow: '0 0 25px gold' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '55px' }} alt="start" />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '55px' }} alt="end" />
                  </div>
                  /* THE ENGLISH TRANSLATION SIGNED BELOW */
                  <p style={{ color: 'gold', fontSize: '0.7rem', marginTop: '12px', fontWeight: 'bold', letterSpacing: '2px' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>
            
            /* THE FULL PROSE REVEAL */
            <div style={{ opacity: showProse ? 1 : 0, transition: 'opacity 2s', background: 'rgba(0,0,0,0.7)', padding: '35px', borderRadius: '25px', border: '1px solid gold', boxShadow: '0 0 15px rgba(218,165,32,0.2)' }}>
              <p style={{ color: 'white', fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '20px', fontWeight: 'lighter' }}>{message}</p>
              <p style={{ color: 'gold', fontSize: '0.8rem', letterSpacing: '2px' }}>— {from.toUpperCase()}</p>
              <button onClick={() => window.location.href='/?reply=true'} style={{ marginTop: '30px', background: 'none', border: '1px solid gold', color: 'gold', padding: '10px 25px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.7rem' }}>REPLY FOR FREE</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{` @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense><OpenContent /></Suspense>;
}
