'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SenderContent() {
  const searchParams = useSearchParams();
  const vibeId = searchParams.get('vibe') || '14'; 
  
  const [message, setMessage] = useState("");
  const [stashedWords, setStashedWords] = useState<string[]>([]);
  const [name, setName] = useState("");

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  const toggleWord = (word: string) => {
    const clean = word.trim().replace(/[.,!?;:]/g, "");
    if (!clean) return;
    setStashedWords(prev => 
      prev.includes(clean) ? prev.filter(w => w !== clean) : [...prev, clean]
    );
  };

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    // THE PERSISTENCE BRIDGE
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    
    navigator.clipboard.writeText(link);
    window.open(link, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      {/* ALPHABET TILES */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', overflowX: 'auto', width: '100%', justifyContent: 'center', padding: '20px' }}>
        {stashedWords.map((word, i) => (
          <div key={i} style={{ display: 'flex', gap: '4px', border: '1px solid gold', padding: '5px', borderRadius: '8px' }}>
            <img src={getLetterUrl(word[0])} style={{ width: '40px' }} alt="tile" />
            <img src={getLetterUrl(word[word.length-1])} style={{ width: '40px' }} alt="tile" />
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
        <textarea 
          placeholder="ENTER MESSAGE" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onBlur={(e) => e.target.value.split(" ").forEach(toggleWord)}
          style={{ background: 'transparent', color: 'white', border: '1px solid #333', width: '100%', height: '150px', padding: '20px', borderRadius: '15px', fontSize: '1.2rem' }}
        />
        
        <input 
          placeholder="SIGNATURE" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ background: 'transparent', color: 'gold', border: 'none', borderBottom: '1px solid #333', width: '100%', marginTop: '20px', textAlign: 'center', letterSpacing: '2px' }}
        />

        <button 
          onClick={handleStashAndCopy}
          style={{ marginTop: '60px', background: '#fbbf24', color: 'black', padding: '20px 40px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer', border: 'none', width: '100%' }}
        >
          PRODUCE & OPEN HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense fallback={<div>Loading...</div>}><SenderContent /></Suspense>;
}
