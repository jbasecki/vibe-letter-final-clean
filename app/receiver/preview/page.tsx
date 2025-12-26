'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ReceiverContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || "";
    const sceneId = searchParams.get('scene') || "eleven";
    const tiles = searchParams.get('tiles')?.split(',').filter(t => t) || [];
    const dim = searchParams.get('dim') || "0.6";

    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
            <video key={sceneId} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: parseFloat(dim) }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                
                {/* MEDITATIVE TILES WITH TRANSLATIONS */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '50px' }}>
                    {tiles.map((tile, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <img src={getLetterUrl(tile[0])} style={{ width: '75px', border: '2px solid gold', borderRadius: '8px', boxShadow: '0 0 15px gold' }} />
                                <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '75px', border: '2px solid gold', borderRadius: '8px', boxShadow: '0 0 15px gold' }} />
                            </div>
                            {/* THE TRANSLATION: Restoring the meditative link */}
                            <span style={{ marginTop: '10px', color: 'gold', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '2px 2px 4px #000' }}>
                                {tile}
                            </label>
                        </div>
                    ))}
                </div>

                <h1 style={{ color: 'white', fontSize: '3.2rem', fontWeight: '300', textShadow: '0 0 25px rgba(0,0,0,0.9)', maxWidth: '85%', lineHeight: '1.2' }}>
                    {message}
                </h1>
            </div>
        </div>
    );
}

export default function ReceiverPreviewPage() {
    return <Suspense><ReceiverContent /></Suspense>;
}
