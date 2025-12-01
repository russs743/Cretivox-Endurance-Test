'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


export default function LoginPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  
  // State Input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- ANIMASI BACKGROUND & CARD ---
  useGSAP(() => {
    // 1. Animasi Blob Cahaya (Ambient Light)
    // Bergerak random pelan-pelan biar hidup
    gsap.to(".glow-blob", {
      x: "random(-50, 50)",
      y: "random(-50, 50)",
      scale: "random(0.8, 1.2)",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1
    });

    // 2. Animasi Card Muncul
    gsap.from(".login-card", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });

    // 3. Animasi Elemen Form (Stagger)
    gsap.from(".form-item", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.5
    });

  }, { scope: containerRef });

  // --- LOGIKA LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('https://dummyjson.com/auth/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        // Animasi Keluar sebelum pindah
        gsap.to(".login-card", { scale: 0.9, opacity: 0, duration: 0.5, onComplete: () => router.push('/dashboard') });
      } else {
        setErrorMsg('Username / Password salah. (Coba: emilys / emilyspass)');
        // Efek getar kalau salah
        gsap.fromTo(".login-card", { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
      }
    } catch (error) {
      setErrorMsg('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center bg-neutral-950 overflow-hidden text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* === DEKORASI BACKGROUND (AMBIENT LIGHT) === */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blob Biru */}
        <div className="glow-blob absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
        {/* Blob Ungu */}
        <div className="glow-blob absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]"></div>
        {/* Blob Cyan Kecil */}
        <div className="glow-blob absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]"></div>
      </div>

      {/* === LOGIN CARD (GLASSMORPHISM) === */}
      <div className="login-card relative z-10 w-full max-w-md p-8 md:p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
        
        {/* Header Card */}
        <div className="text-center mb-10 form-item">
          <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">Username & Pass sesuai yang dikasih</p>
          <h1 className="font-syne text-4xl font-bold text-white">Login.</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Username Input */}
          <div className="form-item space-y-2">
            <label className="text-sm text-gray-400 ml-1">Username</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-black/40 transition-all duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-item space-y-2">
            <label className="text-sm text-gray-400 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-black/40 transition-all duration-300"
              required
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg border border-red-500/20 form-item">
              {errorMsg}
            </p>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="form-item w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        {/* Footer Kecil */}
        <p className="form-item text-center text-gray-500 text-xs mt-8">
          Endurance Test Batch 4 &copy; Rusydi Balfas
        </p>

      </div>

    </main>
  );
}
