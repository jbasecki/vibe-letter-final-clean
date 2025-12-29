'use client';
import React, { useState } from 'react';

export default function ReceiverPage() {
  const [isRevealed, setIsRevealed] = useState(false);

  // Example data that would be fetched from your database
  const stashedWords = ["HAPPY", "SUNNY", "MONDAY"]; 
  const senderSignature = "Mom";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'gold', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* THE HEADER: REFINED AND PROFESSIONAL */}
      <h2 style={{ letterSpacing: '6px', fontSize: '1rem', marginBottom: '50px', opacity: isRevealed ? 1 : 0, transition: 'opacity 2s' }}>
        A HARMONICA COMPOSED OF MEANINGFUL WORDS
      </h2>

      {/* THE GOLDEN ORB (Click to Unfold) */}
      {!isRevealed ? (
        <div 
          onClick={() => setIsRevealed(true)}
          style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, #FFD700 0%, #B8860B 100%)', boxShadow: '0 0 50px gold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <p style={{ color: 'black', fontWeight: 'bold', letterSpacing: '2px' }}>UNFOLD</p>
        </div>
      ) : (
        /* THE REVEALED HARMONICA */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 2s ease-in' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            {stashedWords.map((word, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  width: '80px', height: '120px', border: '1px solid gold', borderRadius: '12px',
                  backgroundImage: `url(https://storage.googleapis.com/simple-bucket-27/vibes/${word[0].toLowerCase()}.png)`,
                  backgroundSize: 'cover', backgroundPosition: 'center'
                }} />
                <p style={{ fontSize: '0.7rem', marginTop: '10px', letterSpacing: '3px' }}>{word.toUpperCase()}</p>
              </div>
            ))}
          </div>

          {/* THE GOLDEN CURSIVE SIGNATURE */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px' }}>signed,</p>
            <p style={{ 
              fontFamily: "'Dancing Script', cursive", 
              fontSize: '2.5rem', 
              color: '#FFD700', 
              textShadow: '0 0 10px rgba(255, 215, 0, 0.4)' 
            }}>
              {senderSignature}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
