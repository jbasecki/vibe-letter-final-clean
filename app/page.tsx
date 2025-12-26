'use client';
import React, { useState } from 'react';

export default function UltimateVibeSender() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("11");
    const [dimness, setDimness] = useState(0.5); // Default 50%

    const videoMap: { [key: string]: string } = {
        "1": "eleven.mp4", "2": "bigfeelings.mp4", "3": "joy-of-winter.mp4",
        "4": "four.mp4", "5": "five.mp4", "6": "daffodil-love.mp4",
        "7": "giftofheart.mp4", "8": "eight.mp4", "9": "happy-holidays.mp4",
        "11": "eleven.mp4"
    };

    return (
        <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
            {/* INSTANT BACKGROUND: Updates when grid is clicked */}
            <video 
                key={selectedScene} autoPlay loop muted playsInline 
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: dimness, zIndex: 0 }}
            >
                <source src={`https://storage.googleapis.com/simple-bucket-27/${videoMap[selectedScene] || 'eleven.mp4'}`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 1, padding: '20px', maxWidth: '500px', margin: '0 auto', background: 'rgba(0,0,0,0.4)', borderRadius: '15px' }}>
                <textarea 
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ width: '100%', height: '80px', borderRadius: '10px', padding: '10px', color: '#000' }}
                />

                {/* DIMNESS SLIDER */}
                <div style={{ marginTop: '15px' }}>
                    <label style={{ fontSize: '0.7rem' }}>Background Brightness: {Math.round(dimness * 100)}%</label>
                    <input type="range" min="0.1" max="1" step="0.1" value={dimness} onChange={(e) => setDimness(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>

                {/* GRID CATEGORIES */}
                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '0.7rem' }}>CLEAN SCENES</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' }}>
                        {["1", "4", "5", "8", "11"].map(n => (
                            <button key={n} onClick={() => setSelectedScene(n)} style={{ padding: '10px', backgroundColor: selectedScene === n ? '#0070f3' : '#333', border: 'none', borderRadius: '4px', color: '#fff' }}>{n}</button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                    <button onClick={() => window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank')}
                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}>PREVIEW</button>
                    <button style={{ flex: 1, padding: '12px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}>SEND (0.99¢)</button>
                </div>
            </div>
        </main>
    );
}
