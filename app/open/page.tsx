'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HarmonicaContent() {
  const searchParams = useSearchParams();
  
  // This extracts your two lines of Alphabet Logic from the link
  const line1 = searchParams.get('l1') || '';
  const line2 = searchParams.get('l2') || '';
  const vibeId = searchParams.get('vibe') || '14'; // Default to Vibe 14 from your screenshot

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      {/* BACKGROUND VIDEO */}
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      {/* THE UNFOLDING BOX */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(0,0,0,0.4)' }}>
        <div style={{ border: '2px solid gold', padding: '40px', borderRadius: '15px', background: 'rgba(0,0,0,0.7)', textAlign: 'center', boxShadow: '0 0 30px gold' }}>
          <h2 style={{ color: 'gold', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '20px' }}>THE HARMONICA UNFOLDS</h2>
          
          {/* YOUR TWO LINES OF TEXT APPEAR HERE */}
          <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>{line1}</p>
          <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{line2}</p>
          
          <p style={{ color: 'gold', fontSize: '0.7rem', marginTop: '30px', opacity: 0.6 }}>2026 NEW YEAR VAULT</p>
        </div>
      </div>
    </main>
  );
}

export default function OpenPage() {
  return (
    <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>UNFOLDING VAULT...</div>}>
      <HarmonicaContent />
    </Suspense>
  );
}
