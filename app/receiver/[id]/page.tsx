// receiver/page.tsx
export default function ReceiverView() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      
      {/* 1. BACKGROUND PRIORITY: Dimmed Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.4, // Dimmed to 40% so text pops
          filter: 'blur(2px)' // Optional: Slight blur adds focus to the text
        }}
      >
        <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
      </video>

      {/* 2. TEXT PRIORITY: Elegant Center Overlay */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '3rem',
          fontWeight: '300',
          textShadow: '0px 0px 20px rgba(0,0,0,0.8)', // Ensures readability
          maxWidth: '800px',
          lineHeight: '1.4'
        }}>
          "Your beautiful message appears here, making the writing the focus."
        </h1>
        
        {/* 3. VIBE TILES: Secondary reveal */}
        <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
            {/* These are the 3D vibes you created in the ad */}
            <div className="vibe-card">✨ Vibe 1</div>
            <div className="vibe-card">❤️ Vibe 2</div>
        </div>
      </div>
    </div>
  );
}
