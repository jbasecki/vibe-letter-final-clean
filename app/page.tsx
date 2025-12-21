'use client';

import React, { useState } from 'react';

export default function SenderPage() {
    const [isWrapped, setIsWrapped] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);

    const handleWrap = async () => {
        // This will eventually trigger the 0.99c Stripe checkout
        console.log("Wrapping vibe...");
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            
            {/* 1. THE NARRATIVE HEADER */}
            {!isWrapped && (
                <div style={{ textAlign: 'center', paddingTop: '60px', zIndex: 50, position: 'relative' }}>
                    <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', textShadow: '0 0 20px #0070f3', margin: 0 }}>
                        Sending a Heart in a Box
                    </h1>
                    <p style={{ color: '#0070f3', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '10px' }}>
                        — Send a Vibe —
                    </p>
                </div>
            )}

            {/* 2. THE BACKGROUND VIDEO */}
            <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
            </video>

            {/* 3. THE INTERACTIVE CORE */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                
                {/* THE BLUE BOX CENTERPIECE */}
                <div style={{ position: 'relative', width: '450px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '100%', filter: 'drop-shadow(0 0 20px #0070f3)' }} />
                </div>

                {/* THE ACTION BUTTON */}
                <button 
                    onClick={handleWrap}
                    style={{
                        marginTop: '30px',
                        background: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        padding: '18px 45px',
                        borderRadius: '50px',
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 0 25px #0070f3',
                        transition: 'transform 0.2s'
                    }}
                >
                    Wrap Message (0.99¢)
                </button>
            </div>
        </main>
    );
}
