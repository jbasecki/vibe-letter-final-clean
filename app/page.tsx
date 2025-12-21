'use client';

import React, { useState } from 'react';

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [isWrapped, setIsWrapped] = useState(false);

    const handleWrap = async () => {
        // This links to your api/checkout/route.ts for the 0.99c charge
        console.log("Wrapping message:", message);
        setIsWrapped(true);
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* 1. NARRATIVE HEADER */}
            <div style={{ textAlign: 'center', paddingTop: '50px', zIndex: 50, position: 'relative' }}>
                <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', textShadow: '0 0 20px #0070f3', margin: 0 }}>
                    Sending a Heart in a Box
                </h1>
                <p style={{ color: '#0070f3', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '10px' }}>
                    — Send a Vibe —
                </p>
            </div>

            {/* 2. SNOWMAN VIDEO BACKGROUND */}
            <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
            </video>

            {/* 3. INTERACTIVE CONTENT */}
            <div style={{ zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                
                {/* BLUE BOX CENTERPIECE */}
                <div style={{ position: 'relative', width: '400px', marginBottom: '20px' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '100%', filter: 'drop-shadow(0 0 20px #0070f3)' }} />
                </div>

                {/* SECRET MESSAGE INPUT */}
                <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your secret message here..."
                        style={{
                            width: '100%',
                            height: '100px',
                            background: 'rgba(0,0,0,0.7)',
                            border: '2px solid #0070f3',
                            borderRadius: '15px',
                            color: 'white',
                            padding: '15px',
                            fontSize: '1.1rem',
                            outline: 'none',
                            marginBottom: '20px'
                        }}
                    />

                    {/* WRAP BUTTON */}
                    <button 
                        onClick={handleWrap}
                        style={{
                            background: '#0070f3',
                            color: '#fff',
                            border: 'none',
                            padding: '15px 50px',
                            borderRadius: '50px',
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 0 20px #0070f3'
                        }}
                    >
                        Wrap Message (0.99¢)
                    </button>
                </div>
            </div>
        </main>
    );
}
