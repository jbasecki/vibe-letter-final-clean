'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const alphabetMap: { [key: string]: string } = {
    'A': 'https://storage.googleapis.com/simple-bucket-27/A.png',
    'B': 'https://storage.googleapis.com/simple-bucket-27/B.png',
    'C': 'https://storage.googleapis.com/simple-bucket-27/C.png',
    'D': 'https://storage.googleapis.com/simple-bucket-27/D.png',
    'E': 'https://storage.googleapis.com/simple-bucket-27/E.png',
    'F': 'https://storage.googleapis.com/simple-bucket-27/F.png',
    'G': 'https://storage.googleapis.com/simple-bucket-27/G.png',
    'H': 'https://storage.googleapis.com/simple-bucket-27/H.png',
    'I': 'https://storage.googleapis.com/simple-bucket-27/I.png',
    'J': 'https://storage.googleapis.com/simple-bucket-27/J.png',
    'K': 'https://storage.googleapis.com/simple-bucket-27/K.png',
    'L': 'https://storage.googleapis.com/simple-bucket-27/L.png',
    'M': 'https://storage.googleapis.com/simple-bucket-27/M.png',
    'N': 'https://storage.googleapis.com/simple-bucket-27/N.png',
    'O': 'https://storage.googleapis.com/simple-bucket-27/O.png',
    'P': 'https://storage.googleapis.com/simple-bucket-27/P.png',
    'Q': 'https://storage.googleapis.com/simple-bucket-27/Q.png',
    'R': 'https://storage.googleapis.com/simple-bucket-27/R.png',
    'S': 'https://storage.googleapis.com/simple-bucket-27/S.png',
    'T': 'https://storage.googleapis.com/simple-bucket-27/T.png',
    'U': 'https://storage.googleapis.com/simple-bucket-27/U.png',
    'V': 'https://storage.googleapis.com/simple-bucket-27/V.png',
    'W': 'https://storage.googleapis.com/simple-bucket-27/W.png',
    'X': 'https://storage.googleapis.com/simple-bucket-27/X.png',
    'Y': 'https://storage.googleapis.com/simple-bucket-27/Y.png',
    'Z': 'https://storage.googleapis.com/simple-bucket-27/Z.png',
};

function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const firstL = word[0]?.toUpperCase() || '';
    const lastL = word[word.length - 1]?.toUpperCase() || '';
    const firstImg = alphabetMap[firstL] || '';
    const lastImg = alphabetMap[lastL] || '';

    return (
        <span onClick={() => setIsOpen(!isOpen)} style={styles.giftWrapper}>
            {isOpen ? (
                <span style={styles.revealedWord}>{word}</span>
            ) : (
                <div style={styles.boxContainer} className="wobble">
                    <div style={styles.bowKnot}></div>
                    <div style={styles.bowLoopLeft}></div>
                    <div style={styles.bowLoopRight}></div>
                    <div style={styles.boxBody}>
                        <div style={styles.alphabetGrid}>
                            {firstImg && <img src={firstImg} alt={firstL} style={styles.glyph} />}
                            <span style={styles.plusSign}>+</span>
                            {lastImg && <img src={lastImg} alt={lastL} style={styles.glyph} />}
                        </div>
                    </div>
                </div>
            )}
        </span>
    );
}

function ReceiverContent({ id }: { id: string }) {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg') || "";
    const tilesStr = searchParams.get('tiles') || "";
    const selectedTiles = tilesStr.split(',');

    const message = decodeURIComponent(id); 
    const tokens = message.split(/(\s+)/);

    return (
        <main style={styles.container}>
            {/* Standard background logic - can be upgraded to specific scenes */}
            <video autoPlay loop muted style={styles.video}>
                <source src="https://storage.googleapis.com/simple-bucket-27/loveisall.mp4" type="video/mp4" />
            </video>
            <div style={styles.overlay}>
                <div style={styles.fullPreviewCard}>
                    <p style={{fontSize: '1.8rem', color: '#333', lineHeight: '3.8'}}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            const isGift = clean && selectedTiles.includes(clean);
                            return (
                                <React.Fragment key={i}>
                                    {isGift ? <GiftBoxTile word={clean} /> : token}
                                </React.Fragment>
                            );
                        })}
                    </p>
                </div>
            </div>
            <style jsx global>{`
                @keyframes wobble { 0% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } 100% { transform: rotate(0deg); } }
                .wobble { cursor: pointer; }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
            `}</style>
        </main>
    );
}

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<div>Opening your vibe...</div>}>
            <ReceiverContent id={params.id} />
        </Suspense>
    );
}

// RESTORING HER SPECIFIC "MAGIC" STYLES
const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' },
    fullPreviewCard: { background: 'rgba(255,255,255,0.95)', padding: '40px', borderRadius: '35px', width: '92%', maxWidth: '650px', textAlign: 'center', border: '6px solid #ffd700', minHeight: '400px' },
    giftWrapper: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px', verticalAlign: 'middle' },
    boxContainer: { position: 'relative', width: '115px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    bowKnot: { position: 'absolute', top: '-6px', width: '16px', height: '16px', background: 'white', borderRadius: '50%', zIndex: 3 },
    bowLoopLeft: { position: 'absolute', top: '-15px', left: '26px', width: '32px', height: '26px', border: '3px solid white', borderRadius: '50% 50% 0 50%', transform: 'rotate(-20deg)', zIndex: 2 },
    bowLoopRight: { position: 'absolute', top: '-15px', right: '26px', width: '32px', height: '26px', border: '3px solid white', borderRadius: '50% 50% 50% 0', transform: 'rotate(20deg)', zIndex: 2 },
    boxBody: { width: '100%', height: '100%', background: 'linear-gradient(135deg, #8b4513, #a0522d)', border: '2px solid #ffd700', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    alphabetGrid: { display: 'flex', alignItems: 'center', gap: '8px' },
    glyph: { width: '40px', height: '40px', objectFit: 'contain' },
    plusSign: { color: '#ffd700', fontWeight: 'bold', fontSize: '20px' },
    revealedWord: { fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700', padding: '0 10px' }
};
