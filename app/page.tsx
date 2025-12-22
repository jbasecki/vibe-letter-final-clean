// ... (keep SCENES and imports as they are)

export default function SenderPage() {
    // ... (keep state and functions)

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video ref={videoRef} key={selectedScene.id} autoPlay loop playsInline muted={isMuted} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* SOUND BUTTON */}
            <button onClick={toggleAudio} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '44px', height: '44px', color: '#fff' }}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    
                    <div style={{ background: '#0070f3', color: '#fff', padding: '6px 20px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '10px', fontSize: '0.8rem' }}>SEND A HEART IN A BOX</div>

                    {/* FLOATING HALF-OPEN BOX AREA */}
                    <div style={{ width: '95%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px', position: 'relative' }}>
                        
                        {/* YOUR ALPHABET (Horizontal, Glowing, Rhomboid) */}
                        {selectedTiles.length > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '10px', zIndex: 20 }}>
                                {selectedTiles.map((tile, idx) => (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ fontSize: '1.5rem', marginBottom: '-5px' }}>🎀</div>
                                        <div style={{ 
                                            display: 'flex', gap: '4px', 
                                            transform: 'rotateZ(-5deg) skewX(-15deg)', 
                                            filter: 'drop-shadow(0 0 10px rgba(0, 112, 243, 0.9))' 
                                        }}>
                                            <img src={getLetterUrl(tile.charAt(0))} style={{ width: '60px', border: '1px solid #0070f3', borderRadius: '4px' }} />
                                            <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '60px', border: '1px solid #0070f3', borderRadius: '4px' }} />
                                        </div>
                                        <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '8px' }}>{tile.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* BOX BASE (Set to 40% opacity for transparency) */}
                        <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '60%', opacity: 0.6, marginTop: '-20px' }} alt="Half-open Gift Box" />
                    </div>

                    {/* CONTROLS */}
                    <div style={{ width: '95%', maxWidth: '500px', textAlign: 'center' }}>
                        <div style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '10px' }}>Try to click on a few of your words below:</div>
                        <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '10px', borderRadius: '12px', border: '1px solid #333', marginBottom: '8px', minHeight: '35px' }}>
                            {tokens.map((t, i) => {
                                const clean = t.trim().replace(/[.,!?;:]/g, "");
                                const isSel = selectedTiles.includes(clean);
                                return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 4px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', borderRadius: '3px' }}>{t}</span>
                            })}
                        </div>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '60px', borderRadius: '12px', padding: '10px', background: '#111', border: '1px solid #0070f3', color: '#fff', fontSize: '0.95rem', resize: 'none' }} />
                        <button onClick={handlePaymentAndSend} style={{ width: '100%', marginTop: '8px', background: '#0070f3', color: '#fff', padding: '12px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>SEND (0.99¢)</button>
                    </div>

                    {/* SCENE PICKER */}
                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #333', background: selectedScene.id === s.id ? '#0070f3' : '#111', color: '#fff', fontSize: '0.7rem' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCinematicView(true)} style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '44px', height: '44px', fontSize: '1.2rem' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}
