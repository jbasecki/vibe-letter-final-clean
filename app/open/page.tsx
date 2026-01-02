"use client";

import React from 'react';

export default function OpenPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4">
      {/* 1. Maximized Background Video Visibility */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-80" // High opacity to keep video vibrant
        >
          <source src="/videos/misty-forest.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to help text pop without hiding the video */}
        <div className="absolute inset-0 bg-black/20" /> 
      </div>

      {/* 2. Glassmorphism Form Container */}
      <div className="w-full max-w-xl p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-light text-white mb-6 tracking-widest text-center uppercase">
          A Harmonica for Thoughtful Words
        </h1>

        <div className="space-y-6">
          {/* 3. Updated Placeholder Text */}
          <textarea
            placeholder="paste your favorite quote, a curious question, or write a personal message here..."
            className="w-full h-48 p-4 bg-transparent border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-gold-500 transition-all resize-none"
          />

          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Add a video link (optional)" 
              className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none"
            />
            
            {/* 4. Mini-Payment Placeholder (Future Stripe Element) */}
            <div className="p-4 rounded-xl border border-dashed border-white/30 bg-black/20 text-center">
              <p className="text-white/50 text-sm italic">
                Secure payment will appear here once the Stripe handshake completes.
              </p>
            </div>

            <button className="w-full py-4 bg-white/20 hover:bg-white/30 border border-white/40 text-white rounded-full tracking-[0.2em] uppercase transition-all">
              Produce & Open Harmonica
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
