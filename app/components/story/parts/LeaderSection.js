'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// DATA LEADERSHIP + FOTO
// Ganti 'img' dengan foto dokumentasi asli kamu agar lebih personal!
const experiences = [
  {
    id: 1,
    role: "Chairman",
    event: "Socio Techno 2024",
    desc: "saya dipercaya untuk bertanggung jawab penuh di acara socio techno 2024. Socio Techno adalah acara seminar yang diselenggarakan oleh himalkom ipb, tetapi dalam masa kepemimpinan saya, sociotechno sudah berevolusi, karena saya berhasil menggabungkan kinerja 2 divisi yaitu divisi media branding dan juga divisi entrepreneur,",
    year: "2024",
    color: "#ef4444", // Red
    img: "/Leader/SocioTechno.jpg" // Foto Event/Podcast
  },
  {
    id: 2,
    role: "Vice Chairman",
    event: "IT TODAY 2024",
    desc: "Saya telah berperan sebagai staff di ITTODAY 2023 sebagai staff kompetisi dan untuk ITTODAY 2024 saya menjabat sebagai competition leader dan saya bertanggung jawab atas keseluruhan kompetisi yang ada di ittoday 2024.",
    year: "2024",
    color: "#3b82f6", // Blue
    img: "/Leader/ITTODAY.jpg" // Foto Rapat/Seminar
  },
  {
    id: 3,
    role: "Staff Entrepreneur",
    event: "Himalkom IPB",
    desc: "Saya berperan sebagai staff entrepreneur yang bertanggung jawab sebagai pengelola keuangan himalkom dan juga menaikkan pemasukan himalkom.",
    year: "2024",
    color: "#10b981", // Emerald
    img: "/Leader/Entre.jpg" // Foto Bisnis/Uang
  },
  {
    id: 4,
    role: "Chairman",
    event: "Eid Fitri",
    desc: "Saya bertanggung jawab dalam pendistribusian zakat fitrah dan mal di masjid al mardhiyyah.",
    year: "2022",
    color: "#f59e0b", // Amber
    img: "/Leader/Idul_Fitri.jpg" // Foto Public Speaking/Team
  }
];

export default function LeaderSection() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [activeId, setActiveId] = useState(1); // Default panel aktif

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=150%",    
        pin: true,        
        scrub: 1,         
      }
    });

    // 1. ANIMASI MASKING
    tl.to(containerRef.current, {
      '--mask-size': '150%', 
      duration: 3,
      ease: "power2.inOut"
    })

    // 2. TEXT REVEAL
    .from(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 0.5);

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="leader-section" 
      className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        '--mask-size': '0%', 
        maskImage: `radial-gradient(circle at center, black var(--mask-size), transparent calc(var(--mask-size) + 20%))`,
        WebkitMaskImage: `radial-gradient(circle at center, black var(--mask-size), transparent calc(var(--mask-size) + 20%))`
      }}
    >
      
      {/* Background Dasar */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#450a0a_0%,_#000000_100%)]"></div>
      
      {/* KONTEN UTAMA */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center h-full justify-center">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-sans text-red-500 font-bold tracking-[0.5em] uppercase mb-2">
            From Console to Stage
          </p>
          <h2 className="font-syne text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            THE LEADER
          </h2>
        </div>

        {/* ACCORDION CONTAINER (DIPERBESAR) */}
        {/* h-[600px] -> Membuat area foto lebih tinggi dan lega */}
        <div className="flex w-full h-[500px] md:h-[600px] gap-2 md:gap-4">
          
          {experiences.map((exp) => {
            const isActive = activeId === exp.id;
            
            return (
              <div 
                key={exp.id}
                // GANTI INTERAKSI: KLIK BARU AKTIF
                onClick={() => setActiveId(exp.id)}
                className={`relative overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-2xl border border-white/10 group ${
                  isActive ? 'flex-[4]' : 'flex-[1] hover:flex-[1.2]' // Hover cuma nambah lebar dikit (efek intip)
                }`}
              >
                
                {/* BACKGROUND IMAGE (FOTO PENGALAMAN) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${exp.img})` }}
                />
                
                {/* OVERLAY GELAP (Agar teks terbaca) */}
                {/* Kalau aktif: agak terang. Kalau tidak aktif: gelap. */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-70 group-hover:opacity-50'}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                {/* 1. LABEL VERTIKAL (SAAT TERTUTUP) */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                   <h3 
                     className="font-syne font-bold text-xl md:text-3xl text-white/80 whitespace-nowrap tracking-wider group-hover:text-white"
                     style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                   >
                     {exp.role}
                   </h3>
                </div>

                {/* 2. KONTEN DETAIL (SAAT TERBUKA/AKTIF) */}
                <div 
                  className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-end transition-all duration-700 delay-100 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                   {/* Tag Role & Tahun */}
                   <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-1 rounded-full text-white text-sm font-bold shadow-md backdrop-blur-md" style={{ backgroundColor: exp.color }}>
                        {exp.role}
                      </span>
                      <span className="text-white font-mono text-sm border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">
                        {exp.year}
                      </span>
                   </div>

                   {/* Judul Event Besar */}
                   <h2 className="font-syne text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                     {exp.event}
                   </h2>

                   {/* Deskripsi */}
                   <p className="font-sans text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-md">
                     {exp.desc}
                   </p>
                </div>

                {/* Indikator Klik (Icon Jari/Panah) */}
                {!isActive && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-2xl animate-bounce">
                    
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}