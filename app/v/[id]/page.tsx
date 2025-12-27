'use client';
import React, { useState } from 'react';

export default function ReceiverPage() {
    const [isUnfolded, setIsUnfolded] = useState(false);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!isUnfolded ? (
                <div onClick={() => setIsUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <img 
                        src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                        style={{ width: '250px', borderRadius: '20px' }} 
                        alt="Vault" 
                    />
                    <h2 style={{ color: 'gold', marginTop: '20px' }}>TAP TO UNFOLD</h2>
                </div>
            ) : (
                <h1 style={{ color: 'white' }}>Your Vibe has Unfolded.</h1>
            )}
        </main>
    );
}
