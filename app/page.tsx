'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const SCENES = [
    { id: 'one', label: '1' }, { id: 'two', label: '2' }, { id: 'three', label: '3' },
    { id: 'four', label: '4' }, { id: 'five', label: '5' }, { id: 'six', label: '6' },
    { id: 'seven', label: '7' }, { id: 'eight', label: '8' }, { id: 'nine', label: '9' },
    { id: 'ten', label: '10' }, { id: 'eleven', label: '11' }, { id: 'twelve', label: '12' }
];

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isCleanView, setIsCleanView] = useState(false); // New state for "The Eye"

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
            }
        } catch (err) { console.error(err); }
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video key={selectedScene.id} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* EXIT CLEAN VIEW BUTTON */}
            {isCleanView && (
                <button 
                    onClick={() => setIsCleanView(false)} 
                    style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '70px', height: '70px', fontSize: '2rem', cursor: 'pointer', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                >
                    ✍️
                </button>
            )}

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    
                    {/* UI CARD */}
                    <div style={{ background: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '50px', width: '90%', maxWidth: '580px', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
                        <h2 style={{ color: '#333', marginBottom: '10px' }}>Vibe Greeting Shop</h2>
                        
                        <div style={{ minHeight: '120px', padding: '15px', background: '#fff', borderRadius: '20px', border: '1px solid #eee', textAlign: 'left', lineHeight: '1.8' }}>
                            {tokens.map((t, i) => {
                                const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                const isSel = selectedTiles.includes(clean);
                                return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} style={{ padding: '2px 6px', borderRadius: '6px', cursor: 'pointer', background: isSel ? '#ff6600' : 'transparent', color: isSel ? '#fff' : '#000' }}>{t}</span>
                            })}
                        </div>

                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '60px', marginTop: '15px', borderRadius: '12px', padding: '10px', border: '1px solid #ddd' }} />
                        
                        <button onClick={handleSend} style={{ width: '100%', marginTop: '20px', background: '#ff6600', color: '#fff', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Wrap & Send (0.99¢)</button>
                    </div>

                    {/* SIDEBAR GRID */}
                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(255,255,255,0.85)', padding: '15px', borderRadius: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '45px', height: '45px', borderRadius: '10px', border: selectedScene.id === s.id ? '3px solid #ff6600' : '1px solid #ccc', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                            ))}
                        </div>
                        
                        {/* THE EYE (Toggle Clean View) */}
                        <button 
                            onClick={() => setIsCleanView(true)} 
                            style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '20px', width: '100%', padding: '12px', cursor: 'pointer', fontSize: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        >
                            👁️
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
