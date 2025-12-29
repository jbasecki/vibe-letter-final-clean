'use client';
import React, { useState } from 'react';

const vibes = [
  { id: '14', name: 'Rainforest' },
  { id: '11', name: 'Winter Night' },
  { id: '13', name: 'Enchanted Gold' },
  { id: '15', name: 'Crimson Sanctuary' },
  { id: '19', name: 'The Golden Clearing' }, // Your favorite Background 19
  // Add IDs for the rest of your 19 assets here
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVibe = () => setCurrentIndex((prev) => (prev + 1) % vibes.length);
  const prevVibe = () => setCurrentIndex((prev) => (prev - 1 + vibes.length) % vibes.length);

  const handlePayAndEnter = () => {
    // This stitches your specific Stripe link to the Confirm button
    const stripeUrl = "https://buy.stripe.com/aFaaEYf5ybtzg3173ofnO08";
    // We append the vibe ID so we know which one you picked when you return
    window.location.href = `${stripeUrl}?client_reference_id=${vibes[currentIndex].id}`;
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', padding: '40px 20px' }}>
      
      {/* GIFTING PROTOCOL AT THE TOP */}
      <section style={{ maxWidth: '900px', margin: '0 auto 60px', padding: '30px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>
        <h2 style={{ color: 'gold', textAlign: 'center', letterSpacing: '6px', fontSize: '1.1rem', marginBottom: '25px' }}>HOW TO GIFT A HARMONICA</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#bbb' }}>
          <div><b style={{color:'gold'}}>1. COMPOSE</b><br/>Write in the sanctuary.</div>
          <div><b style={{color:'gold'}}>2. STASH</b><br/>Touch words into gold.</div>
          <div><b style={{color:'gold'}}>3. PRODUCE</b><br/>Seal your unique link.</div>
          <div><b style={{color:'gold'}}>4. SHARE</b><br/>Send the unfolding light.</div>
        </div>
      </section>

      {/* 19-VIBE SLIDER WITH ARROWS */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
        <h1 style={{ color: 'gold', fontSize: '2.5rem', letterSpacing: '12px', marginBottom: '10px' }}>HARMONICA</h1>
        <p style={{ color: '#888', marginBottom: '40px', letterSpacing: '2px' }}>A Sanctuary for Stashed Cognition</p>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* LEFT ARROW */}
          <button onClick={prevVibe} style={{ background: 'none', border: 'none', color: 'gold', fontSize: '4rem', cursor: 'pointer', padding: '20px', transition: '0.3s' }}>‹</button>
          
          <div style={{ width: '100%', height: '500px', borderRadius: '50px', overflow: 'hidden', border: '2px solid gold', position: 'relative', boxShadow: '0 0 30px rgba(255,215,0,0.1)' }}>
            <video key={vibes[currentIndex].id} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={`https://storage.googleapis.com/simple-bucket-27/${vibes[currentIndex].id}.mp4`} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center' }}>
              <p style={{ color: 'gold', letterSpacing: '5px', fontWeight: 'bold', textShadow: '2px 2px 8px black', fontSize: '1.2rem' }}>
                {vibes[currentIndex].name.toUpperCase()}
              </p>
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button onClick={nextVibe} style={{ background: 'none', border: 'none', color: 'gold', fontSize: '4rem', cursor: 'pointer', padding: '20px', transition: '0.3s' }}>›</button>
        </div>

        <button onClick={handlePayAndEnter} style={{ marginTop: '50px', background: 'gold', color: 'black', padding: '18px 60px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
          CONFIRM SELECTION & ENTER
        </button>
      </div>
    </main>
  );
}
