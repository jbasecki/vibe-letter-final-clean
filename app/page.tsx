// Replace your Sender Page return block with this more "Luxurious" styling
return (
  <main style={{ 
    minHeight: '100vh', 
    background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Playfair Display', serif", color: '#fff'
  }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '30px', textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
      Vibe Greeting Shop
    </h1>
    
    <textarea 
      placeholder="Type your secret message..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{ 
        width: '80%', maxW: '600px', height: '120px', 
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '15px', padding: '20px', color: 'white', fontSize: '1.2rem',
        backdropFilter: 'blur(10px)', outline: 'none', marginBottom: '40px'
      }}
    />

    <h3 style={{ marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>
      Pick your Vibe
    </h3>
    
    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
      {UNIQUE_SCENES.map(scene => (
        <button 
          key={scene.id}
          onClick={() => setSelectedScene(scene)}
          style={{ 
            padding: '12px 24px', borderRadius: '30px', cursor: 'pointer', transition: '0.3s',
            background: selectedScene.id === scene.id ? 'gold' : 'rgba(255,255,255,0.1)',
            color: selectedScene.id === scene.id ? 'black' : 'white',
            border: 'none', fontWeight: 'bold', boxShadow: selectedScene.id === scene.id ? '0 0 20px gold' : 'none'
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
        color: 'black', padding: '18px 45px', fontWeight: 'bold', 
        borderRadius: '50px', cursor: 'pointer', fontSize: '1.3rem',
        border: 'none', boxShadow: '0 10px 30px rgba(255,140,0,0.4)',
        transition: 'transform 0.2s'
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      Wrap & Send!
    </button>
  </main>
);
