'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function HarmonicaContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  
  // Grabbing your stashed alphabet logic
  const line1 = searchParams.get('l1') || 'NO LINE 1';
  const line2 = searchParams.get('l2') || 'NO LINE 2';
  const from = searchParams.get('from') || 'A FRIEND';
  const vibeId = searchParams.get('vibe') || '14';

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000' }}>
      {/* ATMOSPHERE VIDEO */}
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div 
          onClick={() => setUnfolded(true)}
          style={{ 
            border: '2px solid gold', padding: '50px', borderRadius: '20px', 
            background: 'rgba(0,0,0,0.85)', textAlign: 'center', 
            cursor: unfolded ? 'default' : 'pointer',
            boxShadow: '0 0 30px gold', transition: 'all 0.5s ease', maxWidth: '400px'
          }}
        >
          {!unfolded ? (
            <h2 style={{ color: 'gold', letterSpacing: '4px' }}>CLICK TO UNFOLD</h2>
          ) : (
            <div style={{ animation: 'fadeIn 2s ease-in' }}>
              <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '20px' }}>STASHED BY {from}</p>
              <p style={{ color: 'white', fontSize: '2.2rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '10px 0' }}>{line1}</p>
              <p style={{ color: 'white', fontSize: '2.2rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '10px 0' }}>{line2}</p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); window.location.href = '/?reply=true'; }}
                style={{ marginTop: '30px', background: 'none', border: '1px solid gold', color: 'gold', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
              >
                REPLY FOR FREE
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{` @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } `}</style>
    </main>
  );
}

export default function OpenPage() {
  return (
    <Suspense fallback={<div style={{color: 'gold'}}>UNFOLDING...</div>}>
      <HarmonicaContent />
    </Suspense>
  );
}
