{/* HIGH-VISIBILITY VIBE PICKER */}
<div style={{ minHeight: '40px', textAlign: 'center', marginBottom: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {tokens.map((t, i) => {
        const clean = t.trim().replace(/[.,!?;:]/g, "");
        const isSel = selectedTiles.includes(clean);
        return (
            <span key={i} onClick={() => toggleTile(t)} 
                style={{ 
                    color: '#fff', // Pure white text for clarity
                    padding: '6px 12px', 
                    cursor: 'pointer', 
                    background: isSel ? '#0070f3' : 'rgba(255,255,255,0.2)', // Semi-transparent grey back
                    borderRadius: '10px', 
                    margin: '3px',
                    fontSize: '1rem',
                    fontWeight: 'bold', // Bold for better readability
                    border: isSel ? '2px solid white' : '1px solid rgba(255,255,255,0.3)'
                }}>
                {t}
            </span>
        )
    })}
</div>
