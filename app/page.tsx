// ... (keep your existing imports and SCENES at the top)

export default function SenderPage() {
    // ... (keep your existing state and functions)

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* Background Video */}
            <video ref={videoRef} key={selectedScene.id} autoPlay loop playsInline muted={isMuted} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* SOUND BUTTON */}
            <button onClick={toggleAudio} style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '1.2rem' }}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    
                    {/* TITLE 1 */}
                    <div style={{ background: '#0070f3', color: '#fff', padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '10px', fontSize: '0.9rem' }}>SEND A HEART IN A BOX</div>

                    {/* BOX & LETTERS */}
                    <div style={{ width: '95%', maxWidth: '450px', background: 'rgba(0,0,0,0.4)', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(0,112,243,0.5)', paddingBottom: '20px' }}>
                        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '70%' }} alt="Box" />
                            
                            {/* RHOMBOID LETTERS */}
                            {selectedTiles.length > 0 && (
                                <div style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                    {selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '4px', transform: 'rotateX(10deg) rotateY(-10deg)' }}>
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '55px', border: '2px solid #0070f3', borderRadius: '8px' }} alt="L" />
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '55px', border: '2px solid #0070f3', borderRadius: '8px' }} alt="R" />
                                            </div>
                                            {/* ENGLISH WORD UNDER LETTER */}
                                            <span style={{ color: '#0070f3', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '5px', textTransform: 'uppercase' }}>{tile}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TITLE 2 */}
                    <button onClick={handlePaymentAndSend} style={{ width: '90%', maxWidth: '400px', marginTop: '10px', background: '#0070f3', color: '#fff', padding: '12px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        TRY TO CLICK ON SOME WORDS BELOW
                    </button>

                    {/* INPUT AREA */}
                    <div style={{ width: '95%', maxWidth: '600px', marginTop: '15px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '12px', borderRadius: '15px', border: '1px solid #333', marginBottom: '10px' }}>
                            {tokens.map((t, i) => {
                                const clean = t.trim().replace(/[.,!?;:]/g, "");
                                const isSel = selectedTiles.includes(clean);
                                return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 5px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent' }}>{t}</span>
                            })}
                        </div>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '70px', borderRadius: '15px', padding: '12px', border: '1px solid #333', background: '#111', color: '#fff', resize: 'none' }} />
                    </div>

                    {/* SCENE PICKER & EYE BUTTON */}
                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '300px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '35px', height: '35px', borderRadius: '8px', border: '1px solid #333', background: selectedScene.id === s.id ? '#0070f3' : '#111', color: '#fff', fontSize: '0.7rem' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCinematicView(true)} style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '50px', height: '50px', fontSize: '1.5rem', cursor: 'pointer' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}
