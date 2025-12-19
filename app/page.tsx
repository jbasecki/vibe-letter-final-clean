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
    <main style={{ minHeight: '100vh', display: 'flex', background: '#000', color: '#fff', overflow: 'hidden' }}>
      {/* BACKGROUND VIDEO: Changes based on menu selection */}
      <video key={selectedScene.id} autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, zIndex: 0 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
      </video>

      {/* RIGHT MENU: Frosted Glass Style */}
      <div style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {UNIQUE_SCENES.map(scene => (
          <button 
            key={scene.id} 
            onClick={() => setSelectedScene(scene)}
            style={{ 
              width: '100px', height: '100px', borderRadius: '20px', 
              border: selectedScene.id === scene.id ? '3px solid gold' : '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(0,0,0,0.6)', color: 'white', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: '0.3s'
            }}
          >
            {scene.name}
          </button>
        ))}
      </div>

      {/* CENTER EDITOR: Two-Line Magic */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 120px 0 40px' }}>
        <h1 style={{ textShadow: '0 0 20px gold', marginBottom: '10px', fontSize: '2.5rem' }}>Vibe Greeting Shop</h1>

        {/* TOP LINE: The "Translation" Preview */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', minHeight: '110px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {text.split(' ').map((word, i) => {
            const letter = word[0]?.toUpperCase() || 'A';
            return word && (
              <div key={i} style={{ 
                width: '80px', height: '80px', background: 'gold', 
                clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', // Rhomboid Shape
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(0,0,0,0.4)', animation: 'popIn 0.3s ease-out'
              }}>
                <span style={{ fontSize: '30px' }}>🎁</span>
              </div>
            );
          })}
        </div>

        {/* BOTTOM LINE: Message Input */}
        <textarea 
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '100%', maxWidth: '700px', height: '100px', background: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.3)', borderRadius: '25px', padding: '20px', 
            color: 'white', fontSize: '1.4rem', backdropFilter: 'blur(15px)', outline: 'none'
          }}
        />

        <button 
          onClick={() => { navigator.clipboard.writeText(generateLink()); alert('Link Copied!'); }}
          style={{ 
            marginTop: '40px', background: 'linear-gradient(45deg, #ffd700, #ff8c00)', 
            color: 'black', padding: '18px 50px', fontWeight: 'bold', 
            borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '1.2rem',
            boxShadow: '0 10px 30px rgba(255,215,0,0.4)'
          }}
        >
          Wrap & Send!
        </button>
      </div>

      <style jsx global>{`
        @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </main>
  );
}
