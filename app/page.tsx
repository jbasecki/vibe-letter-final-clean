'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const SCENES = [
    { id: 'loveisall', name: 'Love' }, { id: 'winter-daffodil', name: 'Winter' },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic' },
    { id: 'snowman', name: 'Snow' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);

    const handleSend = async () => {
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, tiles: selectedTiles.join(','), sceneId: selectedScene.id }),
            });
            const data = await res.json();
            if (data.id) {
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
                await stripe?.redirectToCheckout({ sessionId: data.id });
            } else {
                alert("Stripe session failed. Check your Vercel Environment Variables!");
            }
        } catch (err) { console.error(err); }
    };

    return (
        <main style={styles.container}>
            <video key={selectedScene.id} autoPlay loop playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* REFINED LOGO SHIELD */}
            <div style={styles.topLeftControls}>
                <div style={styles.gridContainer}>
                    <div style={styles.videoGrid}>
                        {SCENES.map((scene) => (
                            <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{
                                ...styles.gridItem,
                                border: selectedScene.id === scene.id ? '4px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: selectedScene.id === scene.id ? 'rgba(255,215,0,0.6)' : 'rgba(0,0,0,0.95)'
                            }}>
                                {scene.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button style={styles.eyeBtn}>👁️</button>
            </div>

            <div style={styles.overlay}>
                <div style={styles.editorCard}>
                    <h2 style={{ color: '#ff4500' }}>Vibe Greeting Shop</h2>
                    <textarea 
                        style={styles.input} 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Type your message..." 
                    />
                    <button onClick={handleSend} style={styles.sendBtn}>Wrap & Send (0.99¢)</button>
                </div>
            </div>
        </main>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 },
    topLeftControls: { position: 'absolute', top: '0', left: '0', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '15px' },
    gridContainer: { background: 'rgba(0,0,0,0.98)', padding: '15px', borderRadius: '0 0 25px 0', borderRight: '3px solid gold', borderBottom: '3px solid gold' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
    // Refined to 75px to shield the logo without covering the screen
    gridItem: { width: '75px', height: '75px', color: 'white', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' },
    eyeBtn: { width: '60px', height: '60px', borderRadius: '50%', background: '#fff', border: '3px solid gold', fontSize: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '20px' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    editorCard: { background: 'rgba(255,255,255,0.98)', padding: '30px', borderRadius: '40px', width: '90%', maxWidth: '500px', textAlign: 'center' },
    input: { width: '100%', height: '80px', margin: '20px 0', padding: '15px', borderRadius: '15px', border: '1px solid #ddd' },
    sendBtn: { background: '#ff6600', color: 'white', padding: '15px 45px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }
};
