// Inside your return() block on the Sender Page
<div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
  
  {/* PREVIEW BUTTON: Solve the intuition gap */}
  <button 
    onClick={() => window.open(`/receiver/preview?message=${encodeURIComponent(message)}`, '_blank')}
    style={{ padding: '10px 20px', backgroundColor: '#555', color: '#fff', borderRadius: '5px' }}
  >
    PREVIEW
  </button>

  {/* SEND BUTTON: Stays the same */}
  <button 
    onClick={handlePaymentAndSend}
    style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '5px' }}
  >
    SEND (0.99¢)
  </button>
</div>
