'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
  "https://images.unsplash.com/photo-1557682223-ed07b7e2960d?w=800&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&q=80",
  "https://images.unsplash.com/photo-1620641788427-b11e6422bac6?w=800&q=80"
];

export default function ThreeDScroll() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const slides = gsap.utils.toArray('.three-d-card');

    // Hitung total lebar pergeseran (Total lebar semua slide - Lebar layar)
    const totalScroll = containerRef.current.scrollWidth - window.innerWidth;

    gsap.to(slides, {
      xPercent: -100 * (slides.length - 1), // Geser semua slide ke kiri
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,          // Kunci halaman saat scroll
        scrub: 1,           // Haluskan gerakan (1 detik delay)
        snap: 1 / (slides.length - 1), // Opsional: Biar berhenti pas di tengah gambar
        end: () => "+=" + containerRef.current.offsetWidth, // Durasi scroll sepanjang lebar container
      }
    });

    // Tambahan: Efek 3D Rotasi saat scroll (Biar makin dramatis)
    slides.forEach((slide) => {
      gsap.fromTo(slide, 
        { rotateY: -15, scale: 0.9 }, // Kondisi awal (miring ke kiri)
        { 
          rotateY: 0, scale: 1, // Kondisi tengah (lurus)
          duration: 0.5,
          scrollTrigger: {
            trigger: slide,
            containerAnimation: gsap.getById("scrollTween"), // Sinkron dengan scroll horizontal
            start: "left center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-black flex items-center relative perspective-container">
      
      {/* Teks Intro (Opsional) */}
      <div className="absolute top-10 left-10 text-white z-10 pointer-events-none">
        <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500">Scroll Down</h2>
        <p className="text-4xl font-bold">3D Gallery</p>
      </div>

      {/* Container Horizontal */}
      <div ref={containerRef} className="flex gap-20 px-[50vw] w-fit">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="three-d-card w-[400px] h-[550px] flex-shrink-0 relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
            // CSS Transform Manual untuk efek 3D dasar
            style={{ 
              transform: 'perspective(1000px) rotateY(25deg)', // Miring 3D default
              transition: 'transform 0.5s ease'
            }}
          >
            <img 
              src={img} 
              alt={`Gallery ${index}`} 
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <h3 className="text-white text-3xl font-bold">Art {index + 1}</h3>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* CSS Tambahan buat efek ruang 3D */
        .perspective-container {
          perspective: 2000px; /* Semakin kecil angka, semakin ekstrim efek 3D-nya */
        }
        .three-d-card {
            /* Efek pantulan di lantai (opsional, keren buat 3D) */
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0,0,0,0.4));
        }
      `}</style>
    </section>
  );
}