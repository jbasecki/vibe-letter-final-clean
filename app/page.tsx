'use client';
import React, { useState } from 'react';

export default function VibeSender() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("1");

    return (
        <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
            {/* IMPROVED BRIGHTNESS: Now at 50% opacity */}
            <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, zIndex: 0 }}>
                <source src="https://storage.googleapis.com/simple-bucket-27/eleven.mp4" type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 1, padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ backgroundColor: 'rgba(0,0,255,0.7)', padding: '15px', textAlign: 'center', borderRadius: '8px', marginBottom: '20px' }}>
                    Type your message, pick your vibe, and see the preview.
                </div>

                <textarea 
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    style={{ width: '100%', height: '100px', borderRadius: '10px', padding: '15px', color: '#000', fontSize: '1.1rem' }}
                />

                {/* GRID 1: CLEAN BACKGROUNDS */}
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '0.8rem', opacity: 0.9 }}>1. CLEAN SCENES (Text Only)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '10px' }}>
                        {["1", "4", "5", "8", "11"].map((num) => (
                            <button key={num} onClick={() => setSelectedScene(num)}
                                style={{ padding: '12px', backgroundColor: selectedScene === num ? '#0070f3' : 'rgba(51,51,51,0.8)', color: 'white', border: 'none', borderRadius: '5px' }}>
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GRID 2: PRE-PRINTED WISHES */}
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ fontSize: '0.8rem', opacity: 0.9 }}>2. ARTISTIC SCENES (With Graphics)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '10px' }}>
                        {["2", "3", "6", "7", "9"].map((num) => (
                            <button key={num} onClick={() => setSelectedScene(num)}
                                style={{ padding: '12px', backgroundColor: selectedScene === num ? '#0070f3' : 'rgba(51,51,51,0.8)', color: 'white', border: 'none', borderRadius: '5px' }}>
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                    <button 
                        onClick={() => window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank')}
                        style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#000', borderRadius: '8px', fontWeight: 'bold' }}
                    >
                        SEE PREVIEW
                    </button>
                    {/* Placeholder for the SEND button */}
                    <button style={{ flex: 1, padding: '15px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>
                        SEND (0.99¢)
                    </button>
                </div>
            </div>
        </main>
    );
}
