'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// This sub-component handles the actual message display
function PreviewContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || "Your message will appear here...";
    
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.4,
                }}
            >
                <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
            </video>

            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '40px',
                textAlign: 'center'
            }}>
                <h1 style={{
                    color: 'white',
                    fontSize: '3.5rem',
                    fontWeight: '300',
                    textShadow: '0px 0px 30px rgba(0,0,0,0.9)',
                    maxWidth: '900px',
                    lineHeight: '1.2'
                }}>
                    {message}
                </h1>
            </div>
        </div>
    );
}

// The main page wraps everything in Suspense to fix the Vercel error
export default function ReceiverPreview() {
    return (
        <Suspense fallback={<div style={{color: 'white'}}>Loading Preview...</div>}>
            <PreviewContent />
        </Suspense>
    );
}
