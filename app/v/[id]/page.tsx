// Inside the 'isUnfolded' true section:
<div style={{ textAlign: 'center' }}>
    <h1 style={{ color: 'white' }}>Your Vibe has Unfolded.</h1>
    <p style={{ color: 'gold' }}>Feeling the peace? Keep the energy moving.</p>
    
    {/* THE INCENTIVE BUTTON */}
    <button 
        onClick={() => window.location.href = '/'} 
        style={{ 
            marginTop: '20px', 
            background: 'gold', 
            color: 'black', 
            padding: '15px 30px', 
            borderRadius: '30px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            border: 'none' 
        }}
    >
        SEND A VIBE BACK
    </button>
</div>
