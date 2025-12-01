'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MosaicSlideshow from '../../visuals/MosaicSlideshow';

gsap.registerPlugin(ScrollTrigger);

export default function IPBSection() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=150%", 
        
        pin: true,   // KUNCI LAYAR
        scrub: 1,    // Kasih angka 1 biar ada efek 'berat/delay
      }
    });

    // --- TIMELINE ANIMASI ---
    
    // 1. Tahan dulu sebentar (Dummy Tween)
    tl.to({}, { duration: 0.5 }) 

    // 2. Mulai Blur & Gelapkan Background
    .to(overlayRef.current, {
      backdropFilter: "blur(12px)",
      backgroundColor: "rgba(0,0,0,0.8)",
      duration: 2,
      ease: "none"
    })
    
    // 3. Teks Muncul pelan-pelan SETELAH background mulai gelap
    .fromTo(textRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 
      "-=1.5" // Mulai muncul pas animasi background jalan 75% (overlap dikit)
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="ipb-section" className="relative h-screen w-full overflow-hidden bg-neutral-950">
      
      {/* LAYER 1: MOSAIC (Background) */}
      <div className="absolute inset-0 z-0">
         <MosaicSlideshow />
      </div>

      {/* LAYER 2: OVERLAY (Awalnya bening) */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 z-10 bg-black/0 backdrop-blur-none"
      ></div>

      {/* LAYER 3: TEKS (Tengah) */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        
        <div ref={textRef} className="max-w-4xl opacity-0">
          <h2 className="font-syne text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-900 mb-6 drop-shadow-2xl">
            Computer Science.
          </h2>
          
          <h3 className="font-sans text-2xl md:text-3xl font-bold text-white mb-8">
            IPB University (2022 - 2026 AAMIINN)
          </h3>

          <p className="font-sans text-gray-200 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-lg">
            Perjalanan gue di kampus kagak kupu kupu lahh, gua ikut banyak kegiatan lain, nongkrong juga sih'-'
            tapi tetep gue mendalami <strong className="text-emerald-400">Web Develop</strong> dan <strong className="text-emerald-400">UI/UX Design</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <span className="px-6 py-3 bg-emerald-950/80 border border-emerald-500/50 rounded-full text-emerald-200 text-sm md:text-base backdrop-blur-md shadow-lg">
               Backend Competent
             </span>
             <span className="px-6 py-3 bg-emerald-950/80 border border-emerald-500/50 rounded-full text-emerald-200 text-sm md:text-base backdrop-blur-md shadow-lg">
               Frontend Competent
             </span>
             <span className="px-6 py-3 bg-emerald-950/80 border border-emerald-500/50 rounded-full text-emerald-200 text-sm md:text-base backdrop-blur-md shadow-lg">
               UI/UX Design
             </span>
          </div>
        </div>

      </div>

    </section>
  );
}
