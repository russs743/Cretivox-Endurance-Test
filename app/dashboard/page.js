'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// === PERBAIKAN JALUR IMPORT DI SINI ===

// 1. Layout (Navigation ada di folder layout)
import Navigation from '../components/layout/Navigation'; 

// 2. Sections (Hero, About, Outro ada di folder sections)
import Hero from '../components/sections/Hero';
import About from '../components/sections/About'; 
import OutroSection from '../components/sections/OutroSection';

// 3. Story (Menu & Wrapper ada di folder story)
// Pastikan nama filenya sudah kamu ubah jadi ThreeDMenu.js & StoryWrapper.js
// Kalau belum di-rename, sesuaikan nama filenya (misal: ThreeDScroll)
import ThreeDMenu from '../components/story/ThreeDMenu'; 
import StoryWrapper from '../components/story/StoryWrapper'; 
import GrandFinale from '../components/sections/GrandFinale';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardPage() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(() => {
    // REVISI ANIMASI HERO
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: "#content-wrapper", // Pemicu: Konten hitam yang naik
        start: "top bottom",         // Mulai saat konten baru nongol di bawah
        end: "top top",              // Selesai saat konten nutupin layar full
        scrub: true,                 // Halus
      },
      y: -100,             // Geser ke atas dikit (Parallax)
      scale: 0.9,          // Mengecil (Kedalaman)
      filter: "blur(15px)",// Blur makin kuat (tanpa opacity 0, jadi blur-nya kerasa)
      ease: "none"
    });
  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="bg-neutral-950 text-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVIGASI */}
      <Navigation />

      {/* 2. HERO (FIXED DI BELAKANG) */}
      <div ref={heroRef} className="fixed top-0 left-0 w-full h-screen z-0">
        <Hero />
      </div>

      {/* 3. KONTEN WRAPPER (NAIK MENUTUPI HERO) */}
      {/* Background hitam solid ini yang akan 'memakan' Hero */}
      <div id="content-wrapper" className="relative z-10 mt-[100vh] bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        
        {/* About Me */}
        <About /> 
        
        {/* Menu 3D */}
        <ThreeDMenu /> 

        {/* Story Detail & Project Gallery (Ada di dalam sini) */}
        <StoryWrapper /> 

        {/* Outro (Putih) */}
      <div className="relative z-50"> 
           <OutroSection />
        </div>
        {/* FINAL SECTION (HITAM) */}
        {/* Tidak perlu margin negatif, biarkan muncul setelah Outro selesai */}
        <div className="relative z-50">
           <GrandFinale />
        </div>

      </div>

    </main>
  );
}