'use client';
import React from 'react';

export default function SuccessPage() {
    return (
        <main style={{ height: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <img 
                src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                style={{ width: '300px', marginBottom: '20px' }} 
                alt="Gold Vault"
            />
            <h1 style={{ color: 'gold' }}>YOUR VIBE IS STASHED</h1>
            <p>Payment Successful. Your message is safe in the vault.</p>
            <button onClick={() => window.location.href = '/'} style={{ marginTop: '20px', background: 'transparent', border: '1px solid gold', color: 'gold', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>
                RETURN HOME
            </button>
        </main>
    );
}
