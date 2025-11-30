'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GrandFinale() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=250%", 
        pin: true,        
        scrub: 1, 
      }
    });

    // 1. TRANSISI BACKGROUND (PUTIH -> HITAM)
    tl.to(bgRef.current, {
      backgroundColor: "#000000",
      duration: 2,
      ease: "power1.inOut"
    }, 0)

    // 2. TEXT "AND NOW" MUNDUR & HILANG
    .to(textRef.current, {
      scale: 0.1,       // Mengecil
      z: -1000,         // Mundur jauh
      opacity: 0,       
      duration: 3,
      ease: "power1.in"
    }, 0)

    // 3. LOGO CRETIVOX MUNCUL (ZOOM IN)
    .fromTo(logoRef.current, 
      { 
        scale: 0, 
        opacity: 0, 
        z: -500 
      },
      { 
        scale: 1, 
        opacity: 1, 
        z: 0, 
        duration: 2,
        ease: "back.out(1.2)" // Efek membal (impact)
      }, 
      "-=1" // Muncul beririsan saat teks mau hilang
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen w-full relative overflow-hidden perspective-container">
      
      {/* BACKGROUND LAYER */}
      <div ref={bgRef} className="absolute inset-0 bg-white z-0"></div>

      {/* LAYER 1: TEXT "AND NOW" */}
      <div 
        ref={textRef} 
        className="absolute inset-0 flex items-center justify-center z-10 will-change-transform"
      >
        <h1 className="font-syne text-[15vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black stroke-text">
          AND NOW,
        </h1>
      </div>

      {/* LAYER 2: LOGO CRETIVOX (FINALE) */}
      <div 
        ref={logoRef} 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 will-change-transform opacity-0"
      >
        {/* LOGO IMAGE */}
        {/* Class 'invert' & 'brightness-0' akan mengubah logo Hitam kamu menjadi Putih bersih */}
        <img 
          src="/img/cretivox.png" 
          alt="Cretivox Logo" 
          className="w-[80vw] md:w-[50vw] object-contain filter invert brightness-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        />
        
        {/* Pesan Kecil di Bawah Logo */}
        <p className="font-sans text-gray-500 mt-8 text-sm md:text-lg tracking-[0.5em] uppercase animate-pulse">
          Ready for the next chapter.
        </p>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 1000px;
        }
        .stroke-text {
           -webkit-text-stroke: 2px black;
           color: transparent; 
        }
      `}</style>

    </section>
  );
}