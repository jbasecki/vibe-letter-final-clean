'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Updated to match your exact 12 bucket filenames
const SCENES = [
    { id: 'loveisall', name: 'Love' },
    { id: 'daffodil-love', name: 'Winter' },
    { id: 'digital-hug', name: 'Hug' },
    { id: 'giftofheart', name: 'Heart' },
    { id: 'happy-holidays', name: 'Holidays' },
    { id: 'happy-newyear', name: 'New Year' },
    { id: 'happy-newyear26', name: '2026' },
    { id: 'joy-of-winter', name: 'Joy' },
    { id: 'bigfeelings', name: 'Feelings' },
    { id: 'midnight', name: 'Midnight' },
    { id: 'magic-stars', name: 'Magic' },
    { id: 'forest-vibe', name: 'Forest' }
];

/* --- ENHANCED PREVIEW COMPONENT --- */
function PreviewGift({ word }: { word: string }) {
    const first = word.charAt(0).toUpperCase();
    const last = word.charAt(word.length - 1).toUpperCase();
    const url = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l}5.png`;
    return (
        <div style={{ display: 'inline-flex', gap: '5px', alignItems: 'center', margin: '0 8px', verticalAlign: 'middle' }}>
            <img src={url(first)} style={{ width: '45px', borderRadius: '4px' }} alt={first} />
            <img src={url(last)} style={{ width: '45px', borderRadius: '4px' }} alt={last} />
        </div>
    );
}

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isPreview, setIsPreview] = useState(false);

    const tokens = message.split(/(\s+)/);

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
                alert("Stripe session failed. Redeploy your Vercel settings one last time!");
            }
        } catch (err) { console.error("Checkout error", err); }
    };

    const toggleTile = (word: string) => {
        const clean = word.toLowerCase().replace(/[.,!?;:]/g, "").trim();
        if (!clean) return;
        setSelectedTiles(prev => prev.includes(clean) ? prev.filter(t => t !== clean) : [...prev, clean]);
    };

    return (
        <main style={styles.container}>
            <video key={selectedScene.id} autoPlay loop playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

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
                <button onClick={() => setIsPreview(!isPreview)} style={styles.eyeBtn}>
                    {isPreview ? '✍️' : '👁️'}
                </button>
            </div>

            <div style={styles.overlay}>
                <div style={styles.editorCard}>
                    {isPreview ? (
                        <>
                            <h2 style={{ color: '#ff4500' }}>Live Gift Preview</h2>
                            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>This is how your gift will appear to the recipient! ✨</p>
                            <div style={styles.previewArea}>
                                {tokens.map((token, i) => {
                                    const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                    return selectedTiles.includes(clean) ? <PreviewGift key={i} word={token} /> : token;
                                })}
                            </div>
                            <button onClick={() => setIsPreview(false)} style={styles.backBtn}>Back to Editor</button>
                        </>
                    ) : (
                        <>
                            <h2 style={{ color: '#ff4500' }}>Vibe Greeting Shop</h2>
                            
                            <p style={{ color: '#b8860b', fontSize: '0.9rem', marginBottom: '10px' }}>
                                ✨ Tapped words become symmetrical alphabet art in your final gift!
                            </p>
                            <div style={styles.inputArea}>
                                {tokens.map((token, i) => {
                                    const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                    const isSelected = selectedTiles.includes(clean);
                                    return (
                                        <span key={i} onClick={() => toggleTile(token)} style={{
                                            ...styles.token,
                                            background: isSelected ? '#ffd700' : 'transparent',
                                            border: isSelected ? '1px solid #b8860b' : 'none'
                                        }}>
                                            {token}
                                        </span>
                                    );
                                })}
                            </div>
                            <textarea 
                                style={styles.hiddenInput} 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                placeholder="Type your message here..." 
                            />
                            <button onClick={handleSend} style={styles.sendBtn}>Wrap & Send (0.99¢)</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 },
    topLeftControls: { position: 'absolute', top: '0', left: '0', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '15px' },
    gridContainer: { background: '#000', padding: '15px', borderRadius: '0 0 30px 0', borderRight: '3px solid gold', borderBottom: '3px solid gold' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
    gridItem: { width: '80px', height: '80px', color: 'white', borderRadius: '15px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' },
    eyeBtn: { width: '65px', height: '65px', borderRadius: '50%', background: '#fff', border: '3px solid gold', fontSize: '2.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    editorCard: { background: 'rgba(255,255,255,0.98)', padding: '40px', borderRadius: '50px', width: '90%', maxWidth: '540px', textAlign: 'center' },
    inputArea: { minHeight: '80px', padding: '15px', background: '#fff', borderRadius: '20px', border: '1px solid #eee', marginBottom: '15px', textAlign: 'left' },
    token: { cursor: 'pointer', padding: '2px 4px', borderRadius: '4px' },
    hiddenInput: { width: '100%', height: '80px', padding: '15px', borderRadius: '15px', border: '1px solid #ddd', marginBottom: '20px' },
    sendBtn: { background: '#ff6600', color: 'white', padding: '18px 50px', borderRadius: '60px', border: 'none', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer' },
    previewArea: { fontSize: '1.4rem', margin: '20px 0', lineHeight: '2.4', textAlign: 'left' },
    backBtn: { background: '#444', color: '#fff', padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', marginTop: '10px' }
};
