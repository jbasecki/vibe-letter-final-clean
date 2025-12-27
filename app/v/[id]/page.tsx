'use client';
import React, { useState } from 'react';

export default function ReceiverPage() {
    const [isUnfolded, setIsUnfolded] = useState(false);
    return (
        <main style={{ background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!isUnfolded ? (
                <div onClick={() => setIsUnfolded(true)} style={{ cursor: 'pointer' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" style={{ width: '300px' }} />
                </div>
            ) : (
                <h1 style={{ color: 'white' }}>Your Vibe has Unfolded.</h1>
            )}
        </main>
    );
}
