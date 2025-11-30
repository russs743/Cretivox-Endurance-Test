'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%", // Animasi mulai saat section masuk 70% viewport
      }
    });

    // 1. Animasi Foto Muncul (Clip Path Effect)
    tl.fromTo(imgRef.current, 
      { clipPath: "inset(0 100% 0 0)" }, // Mulai tertutup dari kanan
      { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power4.out" }
    )
    // 2. Animasi Teks (Stagger)
    .from(".about-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=1"); // Jalan barengan dikit sama foto

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="min-h-screen flex items-center justify-center bg-black px-6 md:px-12 py-20 relative z-10">
      
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* === KOLOM KIRI: FOTO === */}
        <div className="relative group">
          {/* Frame Hiasan di Belakang */}
          <div className="absolute -inset-4 rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
          
          {/* Container Foto */}
          <div ref={imgRef} className="relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[4/5]">
            {/* GANTI src DENGAN NAMA FILE FOTO KAMU DI FOLDER PUBLIC */}
            <img 
              src="/img/IMG-20250909-WA0146 (2).jpg" 
              alt="Rusydi Balfas" 
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
            />
            
            {/* Overlay Gradient Halus */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply"></div>
          </div>

          {/* Label Floating */}
          <div className="absolute -bottom-6 -right-6 bg-blue-600 px-6 py-4 rounded-xl shadow-xl about-text">
             <p className="font-syne font-bold text-white text-lg">IPB University</p>
             <p className="font-sans text-blue-200 text-xs tracking-widest uppercase">Computer Science</p>
          </div>
        </div>

        {/* === KOLOM KANAN: BIO & STATS === */}
        <div className="flex flex-col justify-center">
          <p className="about-text font-sans text-blue-500 font-bold tracking-widest uppercase mb-4">
            About Me
          </p>
          
          <h2 className="about-text font-syne text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tukang Ngoding <br/> yang <span className="text-gray-500 italic">asik.</span>
          </h2>
          
          <div className="about-text space-y-6 text-gray-400 font-sans text-lg leading-relaxed">
            <p>
              Halo, gue <strong>Rusydi Balfas</strong>. Mahasiswa Ilmu Komputer tingkat akhir di IPB University
            </p>
            <p>
              Saya tidak hanya menulis kode; saya membangun solusi. Dengan latar belakang Fullstack Development (React, Node.js) dan kepekaan desain UI/UX, saya menjembatani kesenjangan antara 
              <em>data yang kompleks</em> dan <em>tampilan yang interaktif</em>.
            </p>
          </div>

          {/* Stats / Skill Tags */}
          <div className="about-text mt-10 grid grid-cols-2 gap-6">
            <div className="border-l-2 border-white/20 pl-4">
              <h4 className="text-white font-syne font-bold text-2xl">4+ Years</h4>
              <p className="text-sm text-gray-500">Coding Experience</p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <h4 className="text-white font-syne font-bold text-2xl">BRI</h4>
              <p className="text-sm text-gray-500">Latest Internship</p>
            </div>
          </div>

          {/* Interest Tags (Sesuai CV: Musik, Game, Travel) */}
          <div className="about-text mt-8 flex flex-wrap gap-3">
             {['Musician', 'Gamer', 'Traveler', 'Leader'].map((tag, i) => (
               <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white hover:text-black transition-colors duration-300 cursor-default">
                 {tag}
               </span>
             ))}
          </div>

        </div>

      </div>
    </section>
  );
}