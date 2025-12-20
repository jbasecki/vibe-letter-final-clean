'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ReceiverPage() {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg') || "";
    const scene = searchParams.get('scene') || "loveisall";
    const tiles = searchParams.get('tiles')?.split(',') || [];

    const tokens = msg.split(/(\s+)/);

    // Matches your bucket format: Letter + '5' + '.png'
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
            {/* CINEMATIC BACKGROUND */}
            <video key={scene} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${scene}.mp4`} type="video/mp4" />
            </video>
            
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ background: 'rgba(255,255,255,0.85)', padding: '50px', borderRadius: '60px', border: '15px solid #ffd700', textAlign: 'center', maxWidth: '90%' }}>
                    <div style={{ fontSize: '2.8rem', color: '#333', lineHeight: '3.5' }}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            if (tiles.includes(clean) && clean.length > 0) {
                                const first = token.charAt(0);
                                const last = token.charAt(token.length - 1);
                                return (
                                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', margin: '0 20px', verticalAlign: 'middle' }}>
                                        <img src={getLetterUrl(first)} style={{ width: '150px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }} alt={first} />
                                        <img src={getLetterUrl(last)} style={{ width: '150px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }} alt={last} />
                                    </span>
                                );
                            }
                            return token;
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
