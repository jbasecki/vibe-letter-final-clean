'use client';
import React, { useState, useRef } from 'react';

// YOUR UPDATED NUMBERED LOGIC
const GRID_A = [
    { id: 'one', label: '1' }, { id: 'two', label: '2' }, { id: 'three', label: '3' }, 
    { id: 'four', label: '4' }, { id: 'five', label: '5' }, { id: 'six', label: '6' }, 
    { id: 'seven', label: '7' }, { id: 'eight', label: '8' }, { id: 'nine', label: '9' }, 
    { id: 'ten', label: '10' }, { id: 'eleven', label: '11' }, { id: 'twelve', label: '12' }
];

const GRID_B = [
    { id: '13', label: '13' }, { id: '14', label: '14' }, { id: '15', label: '15' }, 
    { id: '16', label: '16' }, { id: '17', label: '17' }, { id: '18', label: '18' }, { id: '19', label: '19' }
];

export default function MeditativeSender() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(GRID_A[0]);
    const [dimness, setDimness] = useState(0.6);
    const [isMuted, setIsMuted] = useState(false);
    
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleSend = () => {
        if (message.length < 2) {
            alert("Please type a message before sending your vibe!");
            return;
        }
        // YOUR LIVE STRIPE LINK
        window.location.href = "https://buy.stripe.com/00w7sMbTm1SZ4kj3RcfnO00";
    };

    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const toggleTile = (rawWord: string) => {
        const clean = rawWord.trim().replace(/[.,!?;:]/g, "");
        if (!clean) return;
        setSelectedTiles(prev => 
            prev.includes(clean) ? prev.filter(t => t !== clean) : prev.length < 4 ? [...prev, clean] : prev
        );
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* BACKGROUND VIDEO */}
            <video key={selectedScene.id} autoPlay loop muted={isMuted} playsInline 
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: dimness }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                
                {/* AUDIO TOGGLE */}
                <button onClick={toggleMute} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: '1px solid white', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}>
                    {isMuted ? '🔇' : '🔊'}
                </button>

                {/* THE VAULT / HEART BOX */}
                <div style={{ position: 'relative', width: '380px', height: '240px', background: 'rgba(0,0,0,0.4)', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', marginBottom: '20px' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '50%', opacity: 0.8 }} alt="Box" />
                    <div style={{ position: 'absolute', bottom: '30px', display: 'flex', gap: '8px' }}>
                        {selectedTiles.map((tile, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '2px', transform: 'scale(0.7)' }}>
                                <img src={getLetterUrl(tile[0])} style={{ width: '40px', border: '1px solid gold', borderRadius: '4px' }} alt="Vibe" />
                                <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '40px', border: '1px solid gold', borderRadius: '4px' }} alt="Vibe" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* TEXT AREA & UPDATED MANIFESTO */}
                <div style={{ width: '100%', maxWidth: '550px', background: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: '20px', border: '1px solid #0070f3' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5px', marginBottom: '10px' }}>
                        {message.split(' ').map((word, i) => (
                            <span key={i} onClick={() => toggleTile(word)} style={{ cursor: 'pointer', color: selectedTiles.includes(word.replace(/[.,!?;:]/g, "")) ? 'gold' : '#fff', fontWeight: 'bold' }}>{word} </span>
                        ))}
                    </div>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Type your message..." 
                        style={{ width: '100%', height: '70px', background: '#111', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px' }} 
                    />
                    <p style={{ fontSize: '0.7rem', color: '#0070f3', marginTop: '10px', textAlign: 'center' }}>
                        "Meditative communication moves beyond literal words to convey meaning through abstract associations"
                    </p>
                </div>

                {/* GRID SELECTION */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px' }}>
                        {GRID_A.map(s => (
                            <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '30px', height: '30px', borderRadius: '5px', background: selectedScene.id === s.id ? '#0070f3' : '#333', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '10px' }}>{s.label}</button>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
                        {GRID_B.map(s => (
                            <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '30px', height: '30px', borderRadius: '5px', background: selectedScene.id === s.id ? '#ffd700' : '#333', color: selectedScene.id === s.id ? '#000' : '#fff', border: 'none', cursor: 'pointer', fontSize: '10px' }}>{s.label}</button>
                        ))}
                    </div>
                </div>

                {/* THE COMMERCIAL BRIDGE */}
                <div style={{ marginTop: '25px' }}>
                    <button onClick={handleSend} style={{ padding: '12px 60px', borderRadius: '25px', border: 'none', background: '#0070f3', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px rgba(0,112,243,0.5)' }}>SEND (0.99¢)</button>
                </div>
                
                <input type="range" min="0.1" max="1" step="0.1" value={dimness} onChange={(e) => setDimness(parseFloat(e.target.value))} style={{ width: '120px', marginTop: '20px' }} />
            </div>
        </main>
    );
}
