'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// DATA GAME
const games = [
  // --- LAYER DEPAN ---
  // x/y kecil biar ga terlalu minggir
  // z besar biar deket muka
  { id: 1, title: "Elden Ring", src: "/games/elden ring.jpg", x: -25, y: -15, z: 400 },
  { id: 2, title: "Valorant", src: "/games/valorant.jpg", x: 25, y: 10, z: 350 },
  
  // --- LAYER TENGAH ---
  { id: 3, title: "Sekiro", src: "/games/Sekiro.jpg", x: -15, y: 25, z: 250 },
  { id: 4, title: "Geometry Dash", src: "/games/geometry dash.jpg", x: 20, y: -20, z: 200 },
  
  // --- LAYER BELAKANG ---
  { id: 5, title: "Zenless Zone Zero", src: "/games/zzz.jpg", x: -30, y: 0, z: 100 },
  { id: 6, title: "Genshin Impact", src: "/games/genshin impact.jpg", x: 30, y: -10, z: 50 },

  // --- LAYER BELAKANG BANGET ---
  { id: 7, title: "Final Fantasy XV", src: "/games/FFXV.jpg", x: 10, y: 30, z: 0 },
  { id: 8, title: "Mobile Legends", src: "/games/ML.jpg", x: -10, y: -30, z: -50 },
  
  // --- LAYER BELAKANG BANGET UDEH ---
  { id: 9, title: "Delta Force", src: "/games/Delta Force.jpg", x: 35, y: 35, z: 150 },
  { id: 10, title: "Clone Hero", src: "/games/clone hero.jpg", x: -35, y: -35, z: 120 },
];

export default function GamerSection() {
  const containerRef = useRef(null);
  const worldRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=1000%",
        pin: true,        
        scrub: 1, 
      }
    });

    // WORLD MUNDUR
    tl.to(worldRef.current, {
      z: -4500, // Mundur lebih jauh biar semua kartu lewat
      duration: 10, 
      ease: "none",
      force3D: true 
    }, 0)

    // KARTU GAME FLY-IN
    .fromTo(".game-card", 
      { 
        z: 2000,        
        scale: 1.5,     
        opacity: 0,     
        x: (i) => (games[i].x * 3) + "vw", 
        y: (i) => (games[i].y * 3) + "vh", 
      }, 
      { 
        opacity: 1, 
        scale: 1, 
        z: (i) => games[i].z, 
        x: (i) => games[i].x + "vw", 
        y: (i) => games[i].y + "vh", 
        duration: 4,          
        stagger: 0.6, // Stagger agak cepat biar ga kosong
        ease: "power3.out",
        force3D: true 
      }, 
      0.2
    )

    // FADE OUT
    .to(worldRef.current, {
      opacity: 0, 
      duration: 2
    }, 8) 

    // TEXT REVEAL
    .fromTo(textRef.current, 
      { opacity: 0, scale: 2, z: -500 }, 
      { opacity: 1, scale: 1, z: 0, duration: 2, ease: "power3.out" },
      8.5
    )

    // HOLD
    .to({}, { duration: 5 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="gaming-section" className="h-screen w-full overflow-hidden bg-black perspective-container">
      
      <div 
        ref={worldRef}
        className="relative w-full h-full transform-style-3d flex items-center justify-center will-change-transform"
      >
        
        <h1 className="font-syne text-[15vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-black z-0 leading-none">
          EXPLORE<br/>GAME
        </h1>

        {games.map((game) => (
          <div 
            key={game.id}
            className="game-card opacity-0 absolute p-1 bg-blue-900/40 border border-blue-500/50 rounded-xl overflow-hidden z-10 will-change-transform"
            style={{
              // PERBESAR UKURAN KARTU
              width: '350px',  
              height: '480px', 
              // Transform
              transform: `translate3d(${game.x}vw, ${game.y}vh, 0px)`, 
            }}
          >
            <img 
              src={game.src} 
              alt={game.title} 
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/80 p-4 pt-6">
              <p className="font-syne font-bold text-blue-200 text-2xl">{game.title}</p>
            </div>
          </div>
        ))}

      </div>

      <div 
        ref={textRef} 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 pointer-events-none"
      >
        <h2 className="font-syne text-6xl md:text-8xl font-bold text-white mb-8">
          Game Over? <span className="text-blue-500">Ya Kagak Lah</span>
        </h2>
        
        <div className="max-w-2xl bg-black/80 border border-blue-500/30 p-8 rounded-3xl pointer-events-auto">
          <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
            Gue udah mulai main game dari umur gue 3 tahun dari game <strong className="text-blue-400">PS2, PS3, PS4, Nintendo, Mobile </strong>
            sampe sekarang gue pake <strong className="text-blue-400">PC</strong>.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
             <span className="px-4 py-2 border border-blue-500 rounded-full text-blue-300 text-sm">Reflex</span>
              <span className="px-4 py-2 border border-blue-500 rounded-full text-blue-300 text-sm">Pengangguran</span>
             <span className="px-4 py-2 border border-blue-500 rounded-full text-blue-300 text-sm">Strategy</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 1200px; /* Perspective diperbesar dikit biar ga terlalu distorsi */
          overflow: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .will-change-transform {
          will-change: transform, opacity;
        }
      `}</style>

    </section>
  );
}
