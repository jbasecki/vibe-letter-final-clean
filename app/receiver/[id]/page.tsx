'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Complete Alphabet Map for the wobbling gifts
const alphabetMap: { [key: string]: string } = {
    'A': 'https://storage.googleapis.com/simple-bucket-27/A.png', 'B': 'https://storage.googleapis.com/simple-bucket-27/B.png',
    'C': 'https://storage.googleapis.com/simple-bucket-27/C.png', 'D': 'https://storage.googleapis.com/simple-bucket-27/D.png',
    'E': 'https://storage.googleapis.com/simple-bucket-27/E.png', 'F': 'https://storage.googleapis.com/simple-bucket-27/F.png',
    'G': 'https://storage.googleapis.com/simple-bucket-27/G.png', 'H': 'https://storage.googleapis.com/simple-bucket-27/H.png',
    'I': 'https://storage.googleapis.com/simple-bucket-27/I.png', 'J': 'https://storage.googleapis.com/simple-bucket-27/J.png',
    'K': 'https://storage.googleapis.com/simple-bucket-27/K.png', 'L': 'https://storage.googleapis.com/simple-bucket-27/L.png',
    'M': 'https://storage.googleapis.com/simple-bucket-27/M.png', 'N': 'https://storage.googleapis.com/simple-bucket-27/N.png',
    'O': 'https://storage.googleapis.com/simple-bucket-27/O.png', 'P': 'https://storage.googleapis.com/simple-bucket-27/P.png',
    'Q': 'https://storage.googleapis.com/simple-bucket-27/Q.png', 'R': 'https://storage.googleapis.com/simple-bucket-27/R.png',
    'S': 'https://storage.googleapis.com/simple-bucket-27/S.png', 'T': 'https://storage.googleapis.com/simple-bucket-27/T.png',
    'U': 'https://storage.googleapis.com/simple-bucket-27/U.png', 'V': 'https://storage.googleapis.com/simple-bucket-27/V.png',
    'W': 'https://storage.googleapis.com/simple-bucket-27/W.png', 'X': 'https://storage.googleapis.com/simple-bucket-27/X.png',
    'Y': 'https://storage.googleapis.com/simple-bucket-27/Y.png', 'Z': 'https://storage.googleapis.com/simple-bucket-27/Z.png',
};

// The Full 12-Space Grid Data
const SCENES = [
    { id: 'loveisall', name: 'Love is All' }, { id: 'winter-daffodil', name: 'Winter Daffodil' },
    { id: 'goldenglow', name: 'Golden Glow' }, { id: 'midnight', name: 'Midnight Sparkle' },
    { id: 'my-little', name: 'My Little Vibe' }, { id: 'magic', name: 'Winter Magic' },
    { id: 'snowman', name: 'Snowman' }, { id: 'cat-vibe', name: 'The Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'inline-block', margin: '0 8px' }}>
            {isOpen ? (
                <span style={{ fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' }}>{word}</span>
            ) : (
                <div className="wobble" style={styles.boxBody}>🎁</div>
            )}
        </span>
    );
}

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [currentVibe, setCurrentVibe] = useState(SCENES[0]);
    
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const tilesStr = decodeURIComponent(searchParams.get('tiles') || "");
    const selectedTiles = tilesStr.split(',');
    const tokens = msg.split(/(\s+)/);

    return (
        <main style={styles.container}>
            <video key={currentVibe.id} autoPlay loop muted style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${currentVibe.id}.mp4`} type="video/mp4" />
            </video>

            {/* THE 12-SPACE GRID MENU */}
            <div style={styles.gridContainer}>
                <h4 style={{ color: 'gold', fontSize: '0.7rem', marginBottom: '10px', textAlign: 'center' }}>CHOOSE VIBE</h4>
                <div style={styles.videoGrid}>
                    {SCENES.map((scene) => (
                        <button 
                            key={scene.id} 
                            onClick={() => setCurrentVibe(scene)}
                            style={{
                                ...styles.gridItem,
                                border: currentVibe.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: currentVibe.id === scene.id ? 'rgba(255,215,0,0.4)' : 'rgba(0,0,0,0.5)'
                            }}
                        >
                            {scene.name.split(' ')[0]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="snowflakes">
                {[...Array(10)].map((_, i) => <div key={i} className="snowflake">❅</div>)}
            </div>

            <div style={styles.overlay}>
                <div style={styles.vibeCard}>
                    <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                    <div style={{ fontSize: '1.8rem', color: '#333', lineHeight: '2.2' }}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            const isGift = clean && selectedTiles.includes(clean);
                            return <React.Fragment key={i}>{isGift ? <GiftBoxTile word={clean} /> : token}</React.Fragment>;
                        })}
                    </div>
                    <button style={styles.hugBtn}>Send a Digital Hug Back</button>
                </div>
            </div>

            <style jsx global>{`
                .snowflake { color: #fff; font-size: 1.2em; position: fixed; top: -10%; z-index: 1; animation: snow 10s linear infinite; }
                @keyframes snow { 0% { top: -10%; } 100% { top: 110%; } }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
                @keyframes wobble { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
            `}</style>
        </main>
    );
}

export default function Page() {
    return <Suspense fallback={<div>Loading...</div>}><ReceiverContent /></Suspense>;
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 },
    // STYLING THE 4x3 GRID
    gridContainer: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.3)', backdropFilter: 'blur(10px)' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' },
    gridItem: { width: '60px', height: '60px', color: 'white', borderRadius: '10px', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s', textAlign: 'center' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    vibeCard: { background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '40px', border: '8px solid #ffd700', width: '90%', maxWidth: '700px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', fontSize: '2.2rem', marginBottom: '20px', fontWeight: 'bold' },
    boxBody: { width: '80px', height: '60px', background: 'linear-gradient(135deg, #8b4513, #a0522d)', borderRadius: '10px', border: '2px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
    hugBtn: { background: '#ff6600', color: 'white', padding: '15px 35px', borderRadius: '50px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px' }
};
