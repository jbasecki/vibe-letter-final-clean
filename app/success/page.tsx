'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  const searchParams = useSearchParams();
  // We grab the video ID from the URL if the sender picked one on the Home Page
  const vibeId = searchParams.get('vibe') || '1'; 
  
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [copied, setCopied] = useState(false);

  const handleStashAndCopy = () => {
    // This creates the "Harmonica" link by combining Video ID + Line 1 + Line 2
    const baseUrl = window.location.origin;
    const harmonicaLink = `${baseUrl}/open?vibe=${vibeId}&l1=${encodeURIComponent(line1)}&l2=${encodeURIComponent(line2)}`;
    
    navigator.clipboard.writeText(harmonicaLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ border: '2px solid gold', borderRadius: '20px', padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', maxWidth: '500px', width: '90%' }}>
        <h1 style={{ color: 'gold', fontSize: '2rem', marginBottom: '10px' }}>VAULT SECURED</h1>
        <p style={{ color: 'white', opacity: 0.8, marginBottom: '30px' }}>Your $0.99 Vibe has been stashed. Now, build the harmonica.</p>

        {/* LINE 1: ALPHABET LOGIC */}
        <input 
          type="text" 
          placeholder="First line of alphabet logic..."
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', marginBottom: '15px', fontSize: '1rem' }}
        />

        {/* LINE 2: ALPHABET LOGIC */}
        <input 
          type="text" 
          placeholder="Second line of alphabet logic..."
          value={line2}
          onChange={(e) => setLine2(e.target.value)}
          style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', marginBottom: '30px', fontSize: '1rem' }}
        />

        <button 
          onClick={handleStashAndCopy}
          style={{ background: copied ? '#4CAF50' : 'gold', color: 'black', padding: '15px 40px', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: '0.3s', boxShadow: '0 0 20px gold' }}
        >
          {copied ? 'LINK COPIED!' : 'STASH & COPY LINK'}
        </button>
      </div>
    </main>
  );
}
