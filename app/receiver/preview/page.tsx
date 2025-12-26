'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PreviewDisplay() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || "Merry Christmas!";
    const sceneId = searchParams.get('scene') || "1"; // Gets the number from the grid

    // Map your grid numbers to the actual filenames in your bucket
    const videoMap: { [key: string]: string } = {
        "1": "eleven.mp4",      // Snowman & Kitten (current default)
        "4": "four.mp4",        //
        "5": "five.mp4",        //
        "8": "eight.mp4",       //
        "11": "eleven.mp4"      //
    };

    const videoFile = videoMap[sceneId] || "eleven.mp4";
    const videoUrl = `https://storage.googleapis.com/simple-bucket-27/${videoFile}`;

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
            <video
                key={videoUrl} // Forces video to reload when scene changes
                autoPlay
                loop
                muted
                playsInline
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
            >
                <source src={videoUrl} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px', textAlign: 'center' }}>
                <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: '300', textShadow: '0px 0px 30px rgba(0,0,0,0.9)', maxWidth: '900px', lineHeight: '1.2' }}>
                    {message}
                </h1>
            </div>
        </div>
    );
}

export default function ReceiverPreview() {
    return (
        <Suspense fallback={<div style={{color: 'white', padding: '20px'}}>Loading your choice...</div>}>
            <PreviewDisplay />
        </Suspense>
    );
}
