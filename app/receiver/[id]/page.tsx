'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [unwrapped, setUnwrapped] = useState(false);
    const msg = searchParams.get('msg') || "";
    const scene = searchParams.get('scene') || "one";
    const tiles = searchParams.get('tiles')?.split(',') || [];
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <video key={scene} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${scene}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', padding: '40px' }}>
                {tiles.map((tile, i) => (
                    <div key={i} onClick={() => setUnwrapped(true)} style={{ position: 'relative', cursor: 'pointer', width: '320px' }}>
                        <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} />
                        
                        {unwrapped && (
                            <>
                                {/* Wiggle Text Flair */}
                                <div style={{ position: 'absolute', top: '-70px', width: '100%', textAlign: 'center', animation: 'wiggle 0.6s infinite ease-in-out' }}>
                                    <span style={{ background: '#fff', color: '#ff6600', padding: '8px 20px', borderRadius: '15px', border: '3px solid #ff6600', fontWeight: 'bold', fontSize: '1.8rem', boxShadow: '0 8px 15px rgba(0,0,0,0.2)' }}>{tile.toUpperCase()}</span>
                                </div>
                                {/* Clipped Letters */}
                                <div style={{ position: 'absolute', bottom: '42px', left: '18px', right: '18px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <img src={getLetterUrl(tile.charAt(0))} style={{ width: '45%', borderRadius: '8px', border: '3.5px solid gold', boxShadow: '0 6px 12px rgba(0,0,0,0.4)' }} />
                                    <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '45%', borderRadius: '8px', border: '3.5px solid gold', boxShadow: '0 6px 12px rgba(0,0,0,0.4)' }} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {!unwrapped && <p style={{ position: 'absolute', bottom: '60px', color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.8)', fontSize: '1.6rem', fontWeight: 'bold' }}>🎁 Tap your boxes to unwrap...</p>}
            </div>
            <style jsx>{` @keyframes wiggle { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } } `}</style>
        </main>
    );
}

export default function ReceiverPage() {
    return <Suspense fallback={<div style={{color:'white', textAlign:'center', paddingTop:'20vh'}}>Opening Gift...</div>}><ReceiverContent /></Suspense>;
}
