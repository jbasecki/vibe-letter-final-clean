'use client';
import React, { useState } from 'react';

const SCENES = [
    { id: 'loveisall', name: 'Love' }, { id: 'winter-daffodil', name: 'Winter' },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic' },
    { id: 'snowman', name: 'Snow' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

export default function VibeGreetingCreator() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);

    const handleSend = () => {
        const encodedMsg = encodeURIComponent(message);
        const encodedGifts = encodeURIComponent(selectedTiles.join(','));
        // Sending to the Success Page we just built
        window.location.href = `/success?msg=${encodedMsg}&tiles=${encodedGifts}`;
    };

    const tokens = message.split(/(\s+)/);

    return (
        <main style={styles.container}>
            <video key={selectedScene.id} autoPlay loop muted style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* WHITE FROSTED GRID MENU */}
            <div style={styles.whiteGridContainer}>
                <h4 style={{ color: '#ff4500', fontSize: '0.6rem', marginBottom: '8px', textAlign: 'center' }}>
                    BACKGROUNDS
                </h4>
                <div style={styles.videoGrid}>
                    {SCENES.map((scene) => (
                        <button 
                            key={scene.id} 
                            onClick={() => setSelectedScene(scene)}
                            style={{
                                ...styles.gridItem,
                                border: selectedScene.id === scene.id ? '2px solid #ff4500' : '1px solid #ddd',
                                background: selectedScene.id === scene.id ? 'rgba(255,69,0,0.1)' : 'white',
                                color: '#333'
                            }}
                        >
                            {scene.name}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.overlay}>
                {/* THE WHITE EDITOR CARD */}
                <div style={styles.card}>
                    <h1 style={{fontSize: '1.5rem', margin: '0 0 10px 0', color: '#333'}}>Vibe Greeting Shop</h1>
                    <p style={{fontSize: '0.9rem', color: '#ff8c00', fontWeight: 'bold', marginBottom: '15px'}}>✨ Tap words to wrap them! 🎁</p>
                    
                    <div style={styles.previewSection}>
                        <p style={styles.previewText}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                if (!clean) return token;
                                const isSelected = selectedTiles.includes(clean);
                                return (
                                    <span key={i} onClick={() => {
                                        setSelectedTiles(prev => prev.includes(clean) ? prev.filter(t => t !== clean) : [...prev, clean]);
                                    }} style={isSelected ? styles.selectedWord : styles.normalWord}>
                                        {isSelected ? '🎁' : token}
                                    </span>
                                );
                            })}
                        </p>
                    </div>
                    <textarea style={styles.input} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." />
                    <button style={styles.sendBtn} onClick={handleSend}>Wrap & Send (0.99¢)</button>
                </div>
            </div>
        </main>
    );
}

const styles = {
    container: { height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' } as React.CSSProperties,
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 } as React.CSSProperties,
    whiteGridContainer: { 
        position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', 
        zIndex: 20, background: 'rgba(255,255,255,0.85)', padding: '12px', 
        borderRadius: '25px', backdropFilter: 'blur(10px)', border: '1px solid white' 
    } as React.CSSProperties,
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' },
    gridItem: { width: '55px', height: '55px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold' } as React.CSSProperties,
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)' } as React.CSSProperties,
    card: { background: 'rgba(255,255,255,0.96)', padding: '30px', borderRadius: '35px', width: '90%', maxWidth: '500px', textAlign: 'center' as const } as React.CSSProperties,
    previewSection: { minHeight: '80px', marginBottom: '15px', padding: '15px', background: '#fff', borderRadius: '20px', border: '2px dashed #ffd700' },
    previewText: { fontSize: '1.2rem', lineHeight: '1.8', color: '#333' },
    normalWord: { cursor: 'pointer', padding: '2px 5px' },
    selectedWord: { cursor: 'pointer', background: '#ffd700', borderRadius: '8px', padding: '4px 8px' },
    input: { width: '100%', height: '70px', padding: '12px', borderRadius: '15px', border: '1px solid #ddd', marginBottom: '15px' },
    sendBtn: { width: '100%', padding: '18px', borderRadius: '40px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', background: 'linear-gradient(45deg, #ff4500, #ff8c00)', cursor: 'pointer' } as React.CSSProperties
};
