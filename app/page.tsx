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
    const [isPreview, setIsPreview] = useState(false);
    const [isCleanView, setIsCleanView] = useState(false);

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video key={selectedScene.id} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        {/* BOX AREA: Optimized for 1600px Blue Box */}
                        <div style={{ position: 'relative', width: '400px', minHeight: '380px', background: 'rgba(0,0,0,0.5)', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', perspective: '1000px' }}>
                            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                {/* Using blue-box.png now */}
                                <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" 
                                     style={{ width: '95%', filter: 'drop-shadow(0 0 15px rgba(0, 112, 243, 0.6))' }} />
                                
                                {selectedTiles.length > 0 && (
                                    <div style={{ position: 'absolute', bottom: '75px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                        {selectedTiles.map((tile, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '4px' }}>
                                                {/* Left Rhomboid skewed for the blue box angle */}
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '82px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 15px #0070f3', transform: 'rotateY(20deg) skewY(-4deg)' }} />
                                                {/* Right Rhomboid skewed for the blue box angle */}
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '82px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 15px #0070f3', transform: 'rotateY(-20deg) skewY(4deg)' }} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BLUE SEND BUTTON: Matches blue-box.png */}
                        <button style={{ width: '400px', marginTop: '-25px', background: '#0070f3', color: '#fff', padding: '15px 0', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.5rem', boxShadow: '0 0 20px rgba(0, 112, 243, 0.5)', zIndex: 30 }}>
                            Send a Vibe
                        </button>

                        {/* WIDE WRITING LINES: Stable at 650px */}
                        {!isPreview && (
                            <div style={{ width: '650px', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '15px 25px', borderRadius: '15px', border: '1px solid #0070f3' }}>
                                    {tokens.map((t, i) => {
                                        const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                        const isSel = selectedTiles.includes(clean);
                                        return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} 
                                                     style={{ padding: '2px 5px', borderRadius: '5px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', color: '#fff' }}>{t}</span>
                                    })}
                                </div>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." 
                                          style={{ width: '100%', height: '60px', borderRadius: '15px', padding: '15px 25px', border: '1px solid #0070f3', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '1.2rem', resize: 'none' }} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div style={{ position: 'absolute', right: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '35px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', border: '2px solid #0070f3' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '65px', height: '65px', borderRadius: '18px', border: selectedScene.id === s.id ? '3px solid #0070f3' : '1px solid rgba(255,255,255,0.2)', background: selectedScene.id === s.id ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.5)', color: selectedScene.id === s.id ? '#000' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
