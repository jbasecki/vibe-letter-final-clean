'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const message = searchParams.get('msg') || "";
  const sceneId = searchParams.get('vibe') || '14';
  const tilesStr = searchParams.get('tiles') || "";
  const from = searchParams.get('from') || 'A Friend';
  const selectedTiles = tilesStr ? tilesStr.split(',').filter(t => t.trim()) : [];

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
      <video key={sceneId} autoPlay loop muted={isMuted} playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.5 : 0.3 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!unfolded ? (
          <div style={{ textAlign: 'center' }}>
            {/* THE GOLDEN ORB (Goal 2) */}
            <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', width: '130px', height: '130px', background: 'radial-gradient(circle, #fff7ad 0%, #ffa700 70%)', borderRadius: '50%', margin: '0 auto 30px', boxShadow: '0 0 60px #ffa700', border: '2px solid white', animation: 'pulse 3s infinite' }} />
            <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: '1.5px solid gold', color: 'gold', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.8rem' }}>
               {isMuted ? 'UNMUTE AUDIO' : 'AUDIO ON'}
            </button>
          </div>
        ) : (
          <div style={{ width: '95%', textAlign: 'center' }}>
            <h2 style={{ color: 'gold', letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '40px' }}>HARMONICA MADE OF WORDS OF MEANING</h2>
            {/* HORIZONTAL TILES (Goal 6, 9) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px', flexWrap: 'nowrap', overflowX: 'auto' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ flex: '0 0 auto' }}>
                  <div style={{ display: 'flex', gap: '4px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(0,0,0,0.8)' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '60px' }} />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '60px' }} />
                  </div>
                  <p style={{ color: 'gold', fontSize: '0.7rem', marginTop: '10px', fontWeight: 'bold' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(30,0,0,0.9)', padding: '40px', borderRadius: '30px', border: '1px solid gold' }}>
              <p style={{ color: 'white', fontSize: '1.4rem' }}>{message}</p>
              <p style={{ color: 'gold', marginTop: '20px' }}>— {from.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default function OpenPage() { return <Suspense><OpenContent /></Suspense>; }
