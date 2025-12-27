'use client';
import React from 'react';

export default function SuccessPage() {
    // This is the "Tiny Link" placeholder - we will link this to your message data next
    const shareableLink = "https://thevibe.games/v/example-token"; 

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#fff', textAlign: 'center' }}>
            
            {/* THE GOLD CURRENCY VAULT */}
            <div style={{ marginBottom: '30px', padding: '20px' }}>
                <img 
                    src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                    style={{ width: '280px', borderRadius: '20px', boxShadow: '0 0 30px gold' }} 
                    alt="Gold Vault" 
                />
                <h1 style={{ fontSize: '1.8rem', color: 'gold', marginTop: '20px' }}>Your Vibe is Stashed</h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>The currency of your words is ready for delivery.</p>
            </div>

            {/* THE TINY LINK ACTION */}
            <div style={{ width: '90%', maxWidth: '450px', background: '#111', padding: '25px', borderRadius: '25px', border: '1px solid #0070f3' }}>
                <p style={{ marginBottom: '10px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#0070f3' }}>Recipient's Tiny Link:</p>
                
                <div style={{ display: 'flex', background: '#000', padding: '12px', borderRadius: '15px', border: '1px solid #333', marginBottom: '15px' }}>
                    <code style={{ flex: 1, color: '#fff', fontSize: '0.9rem', alignSelf: 'center', overflow: 'hidden' }}>{shareableLink}</code>
                    <button 
                        onClick={() => {
                            navigator.clipboard.writeText(shareableLink);
                            alert("Vibe link copied! Text it to your friend now.");
                        }}
                        style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        COPY
                    </button>
                </div>

                <p style={{ fontSize: '0.75rem', color: '#888' }}>
                    Send this link via Text, WhatsApp, or DM to "unfold" the cinematic world.
                </p>
            </div>

            <button 
                onClick={() => window.location.href = '/'}
                style={{ marginTop: '30px', background: 'transparent', color: '#fff', border: '1px solid #444', padding: '12px 30px', borderRadius: '25px', cursor: 'pointer' }}
            >
                START A NEW VIBE
            </button>
        </main>
    );
}
