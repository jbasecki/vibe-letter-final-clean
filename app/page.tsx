'use client';
import React, { useState, useRef } from 'react';

const SCENES = [
    { id: 'eleven', label: '1' }, { id: 'bigfeelings', label: '2' }, { id: 'joy-of-winter', label: '3' },
    { id: 'four', label: '4' }, { id: 'five', label: '5' }, { id: 'daffodil-love', label: '6' },
    { id: 'giftofheart', label: '7' }, { id: 'eight', label: '8' }, { id: 'happy-holidays', label: '9' },
    { id: 'happynewyear26', label: '10' }
];

export default function UltimateMeditativeSender() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [dimness, setDimness] = useState(0.6);
    const videoRef = useRef<HTMLVideoElement>(null);

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const toggleTile = (rawWord: string) => {
        const clean = rawWord.trim().replace(/[.,!?;:]/g, "");
        if (!clean || clean.length < 1) return;
        setSelectedTiles(prev => 
            prev.includes(clean) ? prev.filter(t => t !== clean) : prev.length < 4 ? [...prev, clean] : prev
        );
    };

    const handlePreview = () => {
        // This sends the message, the scene, AND the picked vibes to the preview page
        const tileString = selectedTiles.join(',');
        window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene.id}&tiles=${tileString}&dim=${dimness}`, '_blank');
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* 1. DYNAMIC BACKGROUND */}
            <video ref={videoRef} key={selectedScene.id} autoPlay loop muted playsInline 
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: dimness }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                
                {/* 2. HEART IN A BOX AREA */}
                <div style={{ position: 'relative', width: '400px', height: '300px', background: 'rgba(0,0,0,0.5)', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', marginBottom: '10px' }}>
                    <div style={{ position: 'absolute', top: '-15px', background: '#0070f3', color: '#fff', padding: '5px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.7rem' }}>SEND A HEART IN A BOX</div>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '70%', opacity: 0.8 }} alt="Box" />

                    {/* VIBE TILES LAYERED OVER BOX */}
                    <div style={{ position: 'absolute', bottom: '50px', display: 'flex', gap: '8px' }}>
                        {selectedTiles.map((tile, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(0.8)' }}>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    <img src={getLetterUrl(tile[0])} style={{ width: '45px', border: '1px solid gold', borderRadius: '4px' }} alt="Start" />
                                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '45px', border: '1px solid gold', borderRadius: '4px' }} alt="End" />
                                </div>
                                <span style={{ background: 'gold', color: '#000', fontSize: '0.6rem', fontWeight: 'bold', marginTop: '4px', padding: '1px 5px', borderRadius: '3px' }}>{tile}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. INTERACTIVE MESSAGE AREA */}
                <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '20px', border: '1px solid #0070f3' }}>
                    <div style={{ marginBottom: '10px', fontSize: '0.8rem', color: '#fff', textAlign: 'center', opacity: 0.8 }}>Click words to transform into vibes:</div>
                    <div style={{ minHeight: '40px', textAlign: 'center', marginBottom: '10px' }}>
                        {tokens.map((t, i) => {
                            const clean = t.trim().replace(/[.,!?;:]/g, "");
                            const isSel = selectedTiles.includes(clean);
                            return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 8px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', borderRadius: '4px', transition: '0.3s' }}>{t}</span>
                        })}
                    </div>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your meditative message..." style={{ width: '100%', height: '70px', borderRadius: '10px', padding: '10px', background: '#222', color: '#fff', border: 'none' }} />
                </div>

                {/* 4. CONTROLS */}
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
                   <div style={{ background: 'rgba(0,0,0,0.8)', padding: '10px', borderRadius: '15px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                        {SCENES.map((s) => (
                            <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '35px', height: '35px', borderRadius: '8px', border: 'none', background: selectedScene.id === s.id ? '#0070f3' : '#111', color: '#fff', fontSize: '0.7rem' }}>{s.label}</button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button onClick={handlePreview} style={{ padding: '10px 25px', borderRadius: '20px', background: '#fff', color: '#000', fontWeight: 'bold', border: 'none' }}>PREVIEW</button>
                        <button style={{ padding: '10px 25px', borderRadius: '20px', background: '#0070f3', color: '#fff', fontWeight: 'bold', border: 'none' }}>SEND (0.99¢)</button>
                    </div>
                </div>
                <input type="range" min="0.1" max="1" step="0.1" value={dimness} onChange={(e) => setDimness(parseFloat(e.target.value))} style={{ width: '200px', marginTop: '10px' }} />
            </div>
        </main>
    );
}
