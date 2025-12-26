'use client';
import React, { useState, useEffect } from 'react';

export default function MeditativeSender() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("11");
    const [dimness, setDimness] = useState(0.7);
    const [vibeTiles, setVibeTiles] = useState<string[]>([]);

    const videoMap: { [key: string]: string } = {
        "1": "eleven.mp4", "4": "four.mp4", "5": "five.mp4", "8": "eight.mp4", "11": "eleven.mp4",
        "2": "bigfeelings.mp4", "3": "joy-of-winter.mp4", "6": "daffodil-love.mp4", "7": "giftofheart.mp4", "9": "happy-holidays.mp4"
    };

    // ALPHABET LOGIC: Extracting the "essence" of each word
    useEffect(() => {
        const words = message.trim().split(/\s+/);
        const newTiles = words.map(word => {
            if (word.length < 1) return "";
            return `${word[0].toUpperCase()}...${word[word.length - 1].toLowerCase()}`;
        }).filter(t => t !== "");
        setVibeTiles(newTiles);
    }, [message]);

    return (
        <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
            <video key={selectedScene} autoPlay loop muted playsInline 
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: dimness, zIndex: 0 }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${videoMap[selectedScene]}`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 1, padding: '20px', maxWidth: '650px', margin: '0 auto', background: 'rgba(0,0,0,0.6)', borderRadius: '25px', marginTop: '20px' }}>
                
                {/* MEDITATIVE VIBE ROW: Restoring the look from image_77e67d.jpg */}
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px', justifyContent: 'center' }}>
                    {vibeTiles.map((vibe, i) => (
                        <div key={i} style={{ minWidth: '60px', height: '80px', border: '1px solid gold', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #1a1a1a, #000)' }}>
                            <span style={{ fontSize: '0.6rem', color: 'gold' }}>VIBE</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{vibe}</span>
                        </div>
                    ))}
                </div>

                <textarea 
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your meditative message..."
                    style={{ width: '100%', height: '180px', borderRadius: '15px', padding: '15px', fontSize: '1.2rem', color: '#000', border: 'none' }}
                />

                <div style={{ marginTop: '20px' }}>
                    <label style={{ fontSize: '0.7rem' }}>Vibe Brightness: {Math.round(dimness * 100)}%</label>
                    <input type="range" min="0.1" max="1" step="0.1" value={dimness} onChange={(e) => setDimness(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>

                {/* DOUBLE GRID RESTORED */}
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '0.6rem', opacity: 0.7 }}>CLEAN SCENES</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                            {["1", "4", "5", "8", "11"].map(n => (
                                <button key={n} onClick={() => setSelectedScene(n)} style={{ padding: '8px', backgroundColor: selectedScene === n ? '#0070f3' : '#222', border: 'none', color: '#fff', borderRadius: '4px' }}>{n}</button>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '0.6rem', opacity: 0.7 }}>ARTISTIC SCENES</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                            {["2", "3", "6", "7", "9"].map(n => (
                                <button key={n} onClick={() => setSelectedScene(n)} style={{ padding: '8px', backgroundColor: selectedScene === n ? '#0070f3' : '#222', border: 'none', color: '#fff', borderRadius: '4px' }}>{n}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                    <button onClick={() => window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank')}
                        style={{ flex: 1, padding: '15px', borderRadius: '12px', backgroundColor: '#fff', color: '#000', fontWeight: 'bold' }}>PREVIEW</button>
                    <button style={{ flex: 1, padding: '15px', borderRadius: '12px', backgroundColor: '#0070f3', color: '#fff', fontWeight: 'bold' }}>SEND (0.99¢)</button>
                </div>
            </div>
        </main>
    );
}
