'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HarmonicaContent() {
  const searchParams = useSearchParams();
  
  // Extracting the data from the link: Video ID + Two Lines of Alphabet Logic
  const vibeId = searchParams.get('vibe') || '1';
  const line1 = searchParams.get('l1') || '';
  const line2 = searchParams.get('l2') || '';

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      
      {/* THE STASHED VIDEO ATMOSPHERE */}
      <video
        autoPlay loop muted playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
      >
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      {/* THE UNFOLDING MESSAGE */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white', background: 'rgba(0,0,0,0.4)', textAlign: 'center', padding: '20px' }}>
        <div style={{ border: '1px solid gold', padding: '40px', borderRadius: '15px', background: 'rgba(0,0,0,0.6)', boxShadow: '0 0 30px rgba(218,165,32,0.3)' }}>
          <h2 style={{ color: 'gold', fontSize: '1rem', letterSpacing: '2px', marginBottom: '20px', opacity: 0.8 }}>A VIBE HAS UNFOLDED</h2>
          
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>{line1}</p>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{line2}</p>
          
          <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>2026 NEW YEAR VAULT</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function HarmonicaPage() {
  return (
    <Suspense fallback={<div style={{ background: '#000', height: '100vh', color: 'gold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>UNFOLDING...</div>}>
      <HarmonicaContent />
    </Suspense>
  );
}
