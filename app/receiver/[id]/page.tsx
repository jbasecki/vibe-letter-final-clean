'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const SCENES = [
    { id: 'loveisall', name: 'Love' }, { id: 'winter-daffodil', name: 'Winter' },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic' },
    { id: 'snowman', name: 'Snow' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

function GiftBoxTile({ word, onOpen }: { word: string, onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const playPop = () => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } catch (e) { console.log("Audio blocked"); }
    };

    return (
        <span onClick={() => { if(!isOpen) { playPop(); onOpen(); } setIsOpen(!isOpen); }} style={{ cursor: 'pointer', display: 'inline-block', margin: '0 8px', verticalAlign: 'middle' }}>
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
    const [openedCount, setOpenedCount] = useState(0);
    const [showCard, setShowCard] = useState(true);
    const [history, setHistory] = useState<any[]>([]);
    
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const tilesStr = decodeURIComponent(searchParams.get('tiles') || "");
    const selectedTiles = tilesStr.split(',').filter(t => t !== "");
    const tokens = msg.split(/(\s+)/);

    useEffect(() => {
        // Load Received History
        const saved = localStorage.getItem('received_vibes');
        let currentHistory = saved ? JSON.parse(saved) : [];
        
        // Add current one to history if not already there
        if (msg && !currentHistory.find((h: any) => h.msg.includes(msg.substring(0, 10)))) {
            currentHistory = [{ msg: msg.substring(0, 20) + "...", date: new Date().toLocaleDateString(), url: window.location.href }, ...currentHistory].slice(0, 5);
            localStorage.setItem('received_vibes', JSON.stringify(currentHistory));
        }
        setHistory(currentHistory);
    }, [msg]);

    // Handle full video reveal
    useEffect(() => {
        if (selectedTiles.length > 0 && openedCount === selectedTiles.length) {
            setTimeout(() => setShowCard(false), 3000); // Fades away after 3 seconds
        }
    }, [openedCount, selectedTiles.length]);

    return (
        <main style={styles.container}>
            <video key={currentVibe.id} autoPlay loop muted style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${currentVibe.id}.mp4`} type="video/mp4" />
            </video>

            {/* BUTTON TO BRING CARD BACK */}
            {!showCard && (
                <button onClick={() => setShowCard(true)} style={styles.restoreBtn}>
                    👁️ Show Message
                </button>
            )}

            <div style={styles.gridContainer}>
                <h4 style={styles.gridHeader}>CHOOSE BACKGROUND</h4>
                <div style={styles.videoGrid}>
                    {SCENES.map((scene) => (
                        <button key={scene.id} onClick={() => setCurrentVibe(scene)} style={{ ...styles.gridItem, border: currentVibe.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.2)', background: currentVibe.id === scene.id ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.6)' }}>{scene.name}</button>
                    ))}
                </div>
            </div>

            <div className="snowflakes">
                {[...Array(15)].map((_, i) => <div key={i} className="snowflake">❅</div>)}
            </div>

            {showCard && (
                <div style={styles.overlay}>
                    <div style={styles.vibeCard}>
                        <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                        <div style={styles.messageArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                const isGift = clean && selectedTiles.includes(clean);
                                return <React.Fragment key={i}>{isGift ? <GiftBoxTile word={token} onOpen={() => setOpenedCount(prev => prev + 1)} /> : token}</React.Fragment>;
                            })}
                        </div>
                        <button onClick={() => window.location.href = '/'} style={styles.hugBtn}>Send a Secret Message Back</button>
                        
                        {/* RECENTLY RECEIVED HISTORY */}
                        {history.length > 1 && (
                            <div style={styles.historyBox}>
                                <h4 style={{ fontSize: '0.7rem', color: '#999', marginBottom: '10px' }}>PAST HUGS</h4>
                                {history.map((item, i) => (
                                    <div key={i} style={styles.historyItem} onClick={() => window.location.href = item.url}>
                                        <span>✉️ {item.msg}</span>
                                        <span style={{ fontSize: '0.6rem' }}>{item.date}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx global>{`
                .snowflake { color: #fff; font-size: 1.5em; position: fixed; top: -10%; z-index: 1; animation: snow 10s linear infinite; }
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
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 },
    restoreBtn: { position: 'absolute', top: '20px', left: '20px', zIndex: 100, padding: '10px 20px', borderRadius: '50px', background: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
    gridContainer: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '25px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,215,0,0.3)' },
    gridHeader: { color: 'gold', fontSize: '0.6rem', marginBottom: '10px', textAlign: 'center' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' },
    gridItem: { width: '55px', height: '55px', color: 'white', borderRadius: '10px', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    vibeCard: { background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '40px', border: '8px solid #ffd700', width: '90%', maxWidth: '750px', textAlign: 'center', transition: 'opacity 1s ease' },
    vibeHeader: { color: '#ff4500', fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' },
    messageArea: { fontSize: '2rem', color: '#333', lineHeight: '2.5' },
    boxBody: { width: '80px', height: '60px', background: 'linear-gradient(135deg, #8b4513, #a0522d)', borderRadius: '12px', border: '2px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
    hugBtn: { background: '#ff6600', color: 'white', padding: '15px 40px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px' },
    historyBox: { marginTop: '25px', borderTop: '1px solid #ddd
