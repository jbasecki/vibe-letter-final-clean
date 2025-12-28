'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function HarmonicaContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [showReply, setShowReply] = useState(false); // New state to hide the button initially
  
  const line1 = searchParams.get('l1') || '';
  const line2 = searchParams.get('l2') || '';
  const from = searchParams.get('from') || 'A FRIEND'; 
  const vibeId = searchParams.get('vibe') || '14'; 

  // When the user unfolds, wait 3 seconds before showing the reply prompt
  useEffect(() => {
    if (unfolded) {
      const timer = setTimeout(() => setShowReply(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(0,0,0,0.3)' }}>
        <div 
          onClick={() => !unfolded && setUnfolded(true)}
          style={{ 
            border: '2px solid gold', padding: '40px', borderRadius: '20px', 
            background: 'rgba(0,0,0,0.85)', textAlign: 'center', 
            cursor: unfolded ? 'default' : 'pointer',
            boxShadow: unfolded ? '0 0 50px gold' : '0 0 20px gold',
            transition: 'all 0.8s ease', maxWidth: '450px', width: '90%'
          }}
        >
          {!unfolded ? (
            <h2 style={{ color: 'gold', fontSize: '1.2rem', letterSpacing: '4px' }}>CLICK TO UNFOLD</h2>
          ) : (
            <>
              <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '20px' }}>STASHED BY {from}</p>
              
              <p style={{ color: 'white', fontSize: '2.2rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0' }}>{line1}</p>
              <p style={{ color: 'white', fontSize: '2.2rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0' }}>{line2}</p>
              
              {/* ONLY SHOWS AFTER 3 SECONDS OF READING */}
              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,215,0,0.3)', opacity: showReply ? 1 : 0, transition: 'opacity 1s ease' }}>
                <p style={{ color: 'white', fontSize: '0.8rem', marginBottom: '15px', opacity: 0.7 }}>Want to send the energy back?</p>
                <button 
                  onClick={() => window.location.href = '/?reply=true'}
                  style={{ background: 'none', border: '1px solid gold', color: 'gold', padding: '10px 25px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  REPLY FOR FREE
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function OpenPage() {
  return (
    <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>UNFOLDING...</div>}>
      <HarmonicaContent />
    </Suspense>
  );
}
