'use client';
import React, { useState, useRef } from 'react';
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
    const [isCinematicView, setIsCinematicView] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const toggleAudio = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const toggleTile = (rawWord: string) => {
        const clean = rawWord.trim().replace(/[.,!?;:]/g, "");
        if (!clean) return;
        setSelectedTiles(prev => 
            prev.includes(clean) ? prev.filter(t => t !== clean) : prev.length < 4 ? [...prev, clean] : prev
        );
    };

    const handlePaymentAndSend = async () => {
        if (!message.trim()) { alert("Please type a message first!"); return; }
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, tiles: selectedTiles, sceneId: selectedScene.id }),
            });
            const session = await response.json();
            if (session.error) { alert(`Stripe Error: ${session.error}`); return; }
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            if (stripe) await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (err) { alert("Error connecting to Stripe."); }
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video 
                ref={videoRef}
                key={selectedScene.id} 
                autoPlay loop playsInline muted={isMuted} 
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
            >
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* AUDIO BUTTON */}
            <button onClick={toggleAudio} style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    
                    {/* RESPONSIVE BOX CONTAINER */}
                    <div style={{ width: '95%', maxWidth: '450px', background: 'rgba(0,0,0,0.5)', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #0070f3', paddingBottom: '20px', marginBottom: '10px' }}>
                        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '80%' }} alt="Box" />
                            {selectedTiles.length > 0 && (
                                <div style={{ position: 'absolute', bottom: '20%', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                    {selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '40px', border: '1px solid #0070f3' }} alt="Letter" />
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '40px', border: '1px solid #0070f3' }} alt="Letter" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RESPONSIVE INPUT AREA */}
                    <div style={{ width: '95%', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '12px', borderRadius: '15px', border: '1px solid #0070f3', fontSize: '0.9rem', minHeight: '40px' }}>
                            {tokens.map((t, i) => {
                                const clean = t.trim().replace(/[.,!?;:]/g, "");
                                const isSel = selectedTiles.includes(clean);
                                return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 4px', borderRadius: '4px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent' }}>{t}</span>
                            })}
                        </div>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your vibe..." style={{ width: '100%', height: '80px', borderRadius: '15px', padding: '12px', border: '1px solid #0070f3', background: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '1rem', resize: 'none', boxSizing: 'border-box' }} />
                        
                        <button onClick={handlePaymentAndSend} style={{ background: '#0070f3', color: '#fff', padding: '12px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>SEND (0.99¢)</button>
                    </div>

                    {/* SCENE PICKER (Sized for Mobile) */}
                    <div style={{ marginTop: '15px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {SCENES.map((s) => (
                            <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '40px', height: '40px', borderRadius: '10px', border: selectedScene.id === s.id ? '2px solid #fff' : '1px solid #333', background: selectedScene.id === s.id ? '#0070f3' : 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '0.8rem' }}>{s.label}</button>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
