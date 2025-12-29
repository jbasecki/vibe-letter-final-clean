'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const vibes = [
  { id: '14', name: 'Rainforest', color: '#004d00' },
  { id: '11', name: 'Winter Night', color: '#001a33' },
  { id: '13', name: 'Enchanted Gold', color: '#332b00' },
  { id: '15', name: 'Crimson Sanctuary', color: '#4d0000' }
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', fontFamily: 'sans-serif', padding: '60px 20px' }}>
      
      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ color: 'gold', fontSize: '2.5rem', letterSpacing: '12px', fontWeight: '200' }}>HARMONICA</h1>
        <p style={{ color: '#888', letterSpacing: '4px', fontSize: '0.9rem', marginTop: '10px' }}>A Sanctuary for Stashed Cognition</p>
      </div>

      {/* VIBE SELECTION GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto 100px' }}>
        {vibes.map((v) => (
          <div 
            key={v.id} 
            onClick={() => router.push(`/success?vibe=${v.id}`)}
            style={{ 
              height: '350px', borderRadius: '40px', cursor: 'pointer', overflow: 'hidden', position: 'relative',
              border: '1px solid rgba(255,215,0,0.2)', transition: 'transform 0.4s ease'
            }}
          >
            <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
              <source src={`https://storage.googleapis.com/simple-bucket-27/${v.id}.mp4`} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center' }}>
              <p style={{ color: 'gold', letterSpacing: '5px', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '2px 2px 4px black' }}>SELECT {v.name.toUpperCase()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* THE GIFTING PROTOCOL (Instruction Section) */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '50px', border: '1.5px solid rgba(255, 215, 0, 0.25)', borderRadius: '45px', background: 'rgba(25, 0, 0, 0.7)', textAlign: 'center' }}>
        <h3 style={{ color: 'gold', letterSpacing: '6px', fontSize: '1.3rem', marginBottom: '40px', fontWeight: '300' }}>HOW TO GIFT A HARMONICA</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '30px', textAlign: 'left' }}>
          <div>
            <h4 style={{ color: 'gold', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>1. COMPOSE</h4>
            <p style={{ color: '#bbb', fontSize: '0.8rem', lineHeight: '1.7' }}>Write your prose in the sanctuary workspace. Your words remain private until stashed.</p>
          </div>
          <div>
            <h4 style={{ color: 'gold', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>2. STASH</h4>
            <p style={{ color: '#bbb', fontSize: '0.8rem', lineHeight: '1.7' }}>Touch your words to convert them into Golden Vibes. They appear in your horizontal preview.</p>
          </div>
          <div>
            <h4 style={{ color: 'gold', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>3. PRODUCE</h4>
            <p style={{ color: '#bbb', fontSize: '0.8rem', lineHeight: '1.7' }}>Click the gold button. Your unique Harmonica link is automatically copied to your clipboard.</p>
          </div>
          <div>
            <h4 style={{ color: 'gold', fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '2px' }}>4. SHARE</h4>
            <p style={{ color: '#bbb', fontSize: '0.8rem', lineHeight: '1.7' }}>Paste the link to a friend. They will receive the Orb, the sound, and the golden reveal.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: '100px', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '3px' }}>© 2026 HARMONICA.DESIGN | STASHED IN LIGHT</p>
      </footer>
    </main>
  );
}
