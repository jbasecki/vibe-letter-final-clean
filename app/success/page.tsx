'use client';
import React from 'react';

export default function SuccessPage() {
    return (
        <main style={{ height: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <img 
                src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                style={{ width: '300px', marginBottom: '20px' }} 
                alt="Gold Vault"
            />
            <h1 style={{ color: 'gold' }}>YOUR VIBE IS STASHED</h1>
            <p>Payment Successful. Your meditative message is safe in the vault.</p>
        </main>
    );
}
