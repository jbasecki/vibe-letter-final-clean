'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

export default function VibeDisplayPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const isJustPaid = searchParams.get('session_id'); // Stripe sends this back
    
    const [vibeData, setVibeData] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    // Fetch the vibe from your database using the unique ID
    useEffect(() => {
        const fetchVibe = async () => {
            const res = await fetch(`/api/vibes/${id}`);
            const data = await res.json();
            setVibeData(data);
        };
        if (id) fetchVibe();
    }, [id]);

    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/receive/${id}`);
        setCopied(true);
    };

    if (!vibeData) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading your Vibe...</div>;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* The cinematic background chosen by the sender */}
            <video autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeData.scene_id}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                
                {/* SENDER VIEW: Just paid, give them the link */}
                {isJustPaid && (
                    <div style={{ background: 'rgba(0,0,0,0.85)', padding: '30px', borderRadius: '25px', border: '2px solid #0070f3', textAlign: 'center', marginBottom: '40px', maxWidth: '500px', boxShadow: '0 0 30px #0070f3' }}>
                        <h2 style={{ color: '#fff' }}>🎁 Vibe Wrapped Successfully!</h2>
                        <p style={{ color: '#ccc', margin: '15px 0' }}>Share this secret link with your friend:</p>
                        <div style={{ background: '#111', padding: '15px', borderRadius: '10px', color: '#0070f3', fontWeight: 'bold', marginBottom: '15px', wordBreak: 'break-all' }}>
                            {window.location.origin}/receive/{id}
                        </div>
                        <button onClick={copyLink} style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
                            {copied ? "✅ Link Copied!" : "📋 Copy Link"}
                        </button>
                    </div>
                )}

                {/* THE BOX: The visual centerpiece for the receiver */}
                <div style={{ position: 'relative', width: '400px', height: '350px', background: 'rgba(0,0,0,0.6)', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', perspective: '1000px' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '85%', filter: 'drop-shadow(0 0 15px #0070f3)' }} />
                    
                    <div style={{ position: 'absolute', bottom: '60px', display: 'flex', gap: '8px' }}>
                        {vibeData.tiles.split(',').map((word: string, i: number) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '3px' }}>
                                    <img src={`https://storage.googleapis.com/simple-bucket-27/${word[0].toUpperCase()}5.png`} style={{ width: '70px', transform: 'rotateY(20deg) skewY(-4deg)', border: '1px solid #0070f3', borderRadius: '5px' }} />
                                    <img src={`https://storage.googleapis.com/simple-bucket-27/${word.slice(-1).toUpperCase()}5.png`} style={{ width: '70px', transform: 'rotateY(-20deg) skewY(4deg)', border: '1px solid #0070f3', borderRadius: '5px' }} />
                                </div>
                                <span style={{ color: '#0070f3', fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>{word}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* THE MESSAGE: Hidden for sender, revealed for friend */}
                {!isJustPaid && (
                   <div style={{ width: '600px', marginTop: '30px', background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid #0070f3', textAlign: 'center', fontSize: '1.4rem' }}>
                       {vibeData.message}
                   </div>
                )}
            </div>
        </main>
    );
}
