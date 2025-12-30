'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function ReceiverPage() {
  const searchParams = useSearchParams();
  const [isRevealed, setIsRevealed] = useState(false);

  // This reads the data you "stashed" in the URL
  const vibeId = searchParams.get('vibe') || '14'; 
  const message = searchParams.get('msg') || '';
  const tilesStr = searchParams.get('tiles') || '';
  const stashedWords = tilesStr ? tilesStr.split(',') : [];
  const senderSignature = searchParams.get('from') || 'Mom';

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'gold', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* DYNAMIC BACKGROUND VIDEO FROM BUCKET */}
      <video 
        autoPlay loop muted playsInline 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: isRevealed ? 0.4 : 0.1 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ zIndex: 1, textAlign: 'center', padding: '20px' }}>
        {/* THE HEADER YOU LOVE */}
        <h2 style={{ letterSpacing: '6px', fontSize: '1rem', marginBottom: '50px', transition: 'opacity 2s' }}>
          A HARMONICA COMPOSED OF MEANINGFUL WORDS
        </h2>

        {!isRevealed ? (
          /* THE GOLDEN ORB */
          <div 
            onClick={() => setIsRevealed(true)}
            style={{ width: '120px', height: '120px', margin: '0 auto', borderRadius: '50%', background: 'radial-gradient(circle, #FFD700 0%, #B8860B 100%)', boxShadow: '0 0 50px gold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <p style={{ color: 'black', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem' }}>UNFOLD</p>
          </div>
        ) : (
          /* THE REVEALED HARMONICA WITH FIXED BUCKET TILES */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', justifyContent: 'center' }}>
              {stashedWords.map((word, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '80px', height: '120px', border: '1px solid gold', borderRadius: '12px',
                    /* STITCHED TO BUCKET VIBES FOLDER */
                    backgroundImage: `url(https://storage.googleapis.com/simple-bucket-27/vibes/${word[0].toLowerCase()}.png)`,
                    backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'rgba(255,215,0,0.1)'
                  }} />
                  <p style={{ fontSize: '0.7rem', marginTop: '12px', letterSpacing: '3px', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
                </div>
              ))}
            </div>

            {/* THE GOLDEN SIGNATURE YOU LOVE */}
            <div style={{ marginTop: '40px' }}>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px', marginBottom: '5px' }}>signed,</p>
              <p style={{ color: '#FFD700', fontSize: '2.5rem', marginTop: '0' }}>
                {senderSignature}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
