'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);

    const handleWrap = async () => {
        // This connects to your Stripe flow for the 0.99c charge
        console.log("Wrapping message and selected words:", message, selectedTiles);
    };

    const toggleTile = (word: string) => {
        if (selectedTiles.includes(word)) {
            setSelectedTiles(selectedTiles.filter(t => t !== word));
        } else if (selectedTiles.length < 2) {
            setSelectedTiles([...selectedTiles, word]);
        }
    };

    const words = message.split(/\s+/).filter(w => w.length > 0);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            
            {/* 1. THE SNOWMAN BACKGROUND */}
            <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src="https://storage.googleapis.com/simple-bucket-27/one.mp4" type="video/mp4" />
            </video>

            {/* 2. THE INTERACTIVE INTERFACE */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)' }}>
                
                {/* THE "ALL-IN-ONE" INTERACTION BOX */}
                <div style={{ 
                    background: 'rgba(0,0,0,0.85)', 
                    padding: '30px', 
                    borderRadius: '25px', 
                    border: '2px solid #0070f3', 
                    textAlign: 'center',
                    width: '90%',
                    maxWidth: '500px',
                    boxShadow: '0 0 30px rgba(0,112,243,0.5)'
                }}>
                    
                    {/* INTEGRATED HEADER SIGN */}
                    <h1 style={{ color: '#fff', fontSize: '2rem', margin: '0 0 5px 0', textShadow: '0 0 10px #0070f3' }}>
                        Sending a Heart in a Box
                    </h1>

                    {/* NEW TINY INSTRUCTION */}
                    <p style={{ color: '#0070f3', fontSize: '1rem', fontWeight: 'bold', fontStyle: 'italic', margin: '0 0 20px 0' }}>
                        click on one or two words to send them to the box:
                    </p>

                    {/* COMPOSING LINE (Word selection) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                        {words.length > 0 ? words.map((word, idx) => (
                            <span 
                                key={idx} 
                                onClick={() => toggleTile(word)}
                                style={{ 
                                    cursor: 'pointer',
                                    color: selectedTiles.includes(word) ? '#fff' : '#0070f3',
                                    background: selectedTiles.includes(word) ? '#0070f3' : 'transparent',
                                    padding: '4px 10px',
                                    borderRadius: '10px',
                                    border: '1px solid #0070f3',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {word}
                            </span>
                        )) : <span style={{ color: '#555' }}>Start typing below...</span>}
                    </div>

                    {/* MESSAGE INPUT */}
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your secret vibe here..."
                        style={{
                            width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)',
                            border: '1px solid #333', borderRadius: '10px', color: 'white',
                            padding: '12px', fontSize: '1rem', marginBottom: '20px', outline: 'none'
                        }}
                    />

                    {/* BLUE BOX CENTERPIECE */}
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '220px', filter: 'drop-shadow(0 0 15px #0070f3)' }} />
                    </div>

                    {/* WRAP BUTTON (0.99¢) */}
                    <button 
                        onClick={handleWrap}
                        style={{
                            background: '#0070f3', color: '#fff', border: 'none',
                            padding: '15px 50px', borderRadius: '50px', fontSize: '1.4rem',
                            fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px #0070f3'
                        }}
                    >
                        Wrap Message (0.99¢)
                    </button>
                </div>
            </div>
        </main>
    );
}
