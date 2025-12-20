'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg') || "";
    const scene = searchParams.get('scene') || "loveisall";
    const tiles = searchParams.get('tiles')?.split(',') || [];

    const tokens = msg.split(/(\s+)/);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <video key={scene} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${scene}.mp4`} type="video/mp4" />
            </video>
            
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '50px', border: '10px solid #ffd700', textAlign: 'center', maxWidth: '90%' }}>
                    <h1 style={{ color: '#28a745', fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Send! 🥳</h1>
                    
                    {/* ENHANCED LINK DISPLAY */}
                    <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '15px', marginBottom: '25px', wordBreak: 'break-all' }}>
                        <p style={{ color: '#ff4500', fontWeight: 'bold' }}>Copy & Share this link:</p>
                        <code>https://vibe-letter-final-clean.vercel.app/receiver/vibe?msg={encodeURIComponent(msg)}&tiles={tiles.join(',')}</code>
                    </div>

                    <button onClick={() => window.location.href = '/'} style={{ background: '#ff6600', color: 'white', padding: '15px 40px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
                        Create Another One
                    </button>
                </div>
            </div>
        </main>
    );
}
