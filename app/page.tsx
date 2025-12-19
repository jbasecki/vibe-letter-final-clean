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
    <main style={{ minHeight: '100vh', display: 'flex', background: '#000', color: '#fff' }}>
      {/* Background Video Preview */}
      <video key={selectedScene.id} autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: 0 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
      </video>

      {/* Right-Side Menu */}
      <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {UNIQUE_SCENES.map(scene => (
          <button 
            key={scene.id} 
            onClick={() => setSelectedScene(scene)}
            style={{ 
              width: '80px', height: '80px', borderRadius: '15px', border: selectedScene.id === scene.id ? '3px solid gold' : '1px solid #555',
              background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '10px', cursor: 'pointer', backdropFilter: 'blur(5px)'
            }}
          >
            {scene.name}
          </button>
        ))}
      </div>

      {/* Center Editor */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ textShadow: '0 0 20px gold', marginBottom: '40px' }}>Vibe Greeting Shop</h1>

        {/* TOP LINE: Word-to-Gift Preview */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', minHeight: '60px' }}>
          {text.split(' ').map((word, i) => word && (
            <div key={i} style={{ width: '50px', height: '50px', background: 'gold', clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎁</div>
          ))}
        </div>

        {/* BOTTOM LINE: Message Input */}
        <textarea 
          placeholder="Type your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '60%', height: '80px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '20px', padding: '20px', color: 'white', fontSize: '1.2rem', backdropFilter: 'blur(10px)'
          }}
        />

        <button 
          onClick={() => { navigator.clipboard.writeText(generateLink()); alert('Link Copied!'); }}
          style={{ marginTop: '30px', background: 'gold', color: 'black', padding: '15px 40px', fontWeight: 'bold', borderRadius: '50px', border: 'none', cursor: 'pointer' }}
        >
          Wrap & Send!
        </button>
      </div>
    </main>
  );
}
