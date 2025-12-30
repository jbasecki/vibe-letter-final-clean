'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SenderContent() {
  const searchParams = useSearchParams();
  const vibeId = searchParams.get('vibe') || '14'; 
  const [message, setMessage] = useState("");
  const [stashedWords, setStashedWords] = useState<string[]>([]);
  const [name, setName] = useState("");

  const toggleWord = (word: string) => {
    const clean = word.trim().replace(/[.,!?;:]/g, "");
    if (!clean) return;
    setStashedWords(prev => prev.includes(clean) ? prev.filter(w => w !== clean) : [...prev, clean]);
  };

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(link);
    window.open(link, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      
      {/* THE SECURITY LAYER: YOUR VIDEO PLAYS BEHIND THE TEXT */}
      <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
        
        {/* HARMONICA PREVIEW */}
        <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '4px', opacity: 0.8 }}>HARMONICA PREVIEW</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', minHeight: '100px', marginTop: '20px' }}>
            {stashedWords.map((word, i) => (
              <div key={i} style={{ border: '1px solid gold', padding: '10px', borderRadius: '10px', background: 'rgba(255,215,0,0.2)' }}>
                <p style={{ color: 'gold', fontSize: '0.7rem' }}>{word.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '650px', background: 'rgba(0,0,0,0.7)', padding: '35px', borderRadius: '35px', border: '1px solid gold', position: 'relative' }}>
          
          <p style={{ color: 'white', fontSize: '0.9rem', marginBottom: '15px', fontWeight: 'bold' }}>Select words to stash:</p>
          
          <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {message.split(/\s+/).map((word, i) => (
              <span key={i} onClick={() => toggleWord(word)} style={{ 
                cursor: 'pointer', padding: '5px 10px', borderRadius: '8px', 
                background: stashedWords.includes(word.replace(/[.,!?;:]/g, "")) ? 'gold' : 'rgba(255,255,255,0.1)', 
                color: stashedWords.includes(word.replace(/[.,!?;:]/g, "")) ? 'black' : 'white'
              }}>{word}</span>
            ))}
          </div>

          <textarea 
            placeholder="Compose your message..."
            value={message} onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', height: '120px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.1rem', outline: 'none' }}
          />

          {/* PROMINENT GOLD-RIMMED [i] ICON */}
          <div 
            title="Meditative meaning is formed here through visual abstracts, transcending the symbols of traditional text."
            style={{ position: 'absolute', bottom: '80px', right: '25px', color: 'gold', border: '2px solid gold', borderRadius: '50%', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', cursor: 'help' }}
          >
            i
          </div>

          <input placeholder="Signature" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', background: 'transparent', borderTop: '1px solid #444', borderBottom: 'none', color: 'gold', textAlign: 'center', padding: '15px 0' }} />
        </div>

        <button onClick={handleStashAndCopy} style={{ marginTop: '40px', background: 'gold', color: 'black', padding: '18px 60px', borderRadius: '45px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
          PRODUCE & OPEN HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense><SenderContent /></Suspense>;
}
