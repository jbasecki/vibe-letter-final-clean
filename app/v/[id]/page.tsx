'use client';
import React, { useState } from 'react';

export default function ReceiverPage() {
    const [isUnfolded, setIsUnfolded] = useState(false);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            {!isUnfolded ? (
                <div onClick={() => setIsUnfolded(true)} style={{ cursor: 'pointer' }}>
                    <img 
                        src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                        style={{ width: '250px', borderRadius: '20px', boxShadow: '0 0 30px gold' }} 
                        alt="Gold Vault" 
                    />
                    <h2 style={{ color: 'gold', marginTop: '20px', fontFamily: 'sans-serif' }}>TAP TO UNFOLD</h2>
                </div>
            ) : (
                <h1 style={{ color: 'white', fontFamily: 'sans-serif' }}>Your Vibe has Unfolded.</h1>
            )}
        </main>
    );
}
