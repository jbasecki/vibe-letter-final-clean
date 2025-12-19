'use client';
import React, { useState } from 'react';

const UNIQUE_SCENES = [
  { id: 'loveisall', name: 'Love is All' },
  { id: 'winter-daffodil', name: 'Winter Daffodil' },
  { id: 'goldenglow', name: 'Golden Glow' },
  { id: 'midnight', name: 'Midnight Sparkle' }
];

export default function SenderPage() {
  const [text, setText] = useState('');
  const [selectedScene, setSelectedScene] = useState(UNIQUE_SCENES[0]);

  const generateLink = () => {
    const encoded = btoa(text);
    return `${window.location.origin}/receiver/${encoded}?scene=${selectedScene.id}`;
  };

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#fff', padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', textShadow: '0 0 15px gold' }}>
        Vibe Greeting Shop
      </h1>
      
      <textarea 
        placeholder="Type your secret message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ 
          width: '90%', maxWidth: '600px', height: '120px', 
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '15px', padding: '20px', color: 'white', fontSize: '1.1rem',
          backdropFilter: 'blur(10px)', marginBottom: '30px'
        }}
      />

      <h3 style={{ marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>
        Pick your Vibe:
      </h3>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
        {UNIQUE_SCENES.map(scene => (
          <button 
            key={scene.id}
            onClick={() => setSelectedScene(scene)}
            style={{ 
              padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', transition: '0.3s',
              background: selectedScene.id === scene.id ? 'gold' : 'rgba(255,255,255,0.1)',
              color: selectedScene.id === scene.id ? 'black' : 'white',
              border: 'none', fontWeight: 'bold'
            }}
          >
            {scene.name}
          </button>
        ))}
      </div>

      <button 
        onClick={() => { navigator.clipboard.writeText(generateLink()); alert('Link Copied!'); }}
        style={{ 
          background: 'linear-gradient(45deg, #ffd700, #ff8c00)', 
          color: 'black', padding: '15px 40px', fontWeight: 'bold', 
          borderRadius: '50px', cursor: 'pointer', fontSize: '1.2rem',
          border: 'none', boxShadow: '0 5px 20px rgba(255,140,0,0.3)'
        }}
      >
        Wrap & Send!
      </button>
    </main>
  );
}
