'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OutroSection() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useGSAP(() => {
    // TRANSISI MASUK
    gsap.fromTo(containerRef.current, 
      { clipPath: "circle(0% at 50% 50%)" },
      { 
        clipPath: "circle(150% at 50% 50%)",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", 
          end: "top top",      
          scrub: 1,
        }
      }
    );

    // 2. PINNING LOGIC
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
      scrub: 1,
    });

    // 3. HIGHLIGHT TEXT
    const items = gsap.utils.toArray(".outro-item");
    items.forEach((item) => {
      gsap.fromTo(item, 
        { color: "#d1d5db", scale: 0.9, opacity: 0.3 }, 
        { 
          color: "#000000",
          scale: 1.1, 
          opacity: 1,
          duration: 0.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: item,
            start: "top 55%",
            end: "bottom 45%",   
            scrub: true,
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-white text-black z-50"
      style={{ clipPath: "circle(0% at 50% 50%)" }} 
    >
      
      {/* GRID CONTAINER */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start relative">
        
        {/* --- KOLOM KIRI --- */}
        <div ref={leftColRef} className="w-full md:w-1/2 h-screen flex flex-col justify-center px-6 md:pl-12">
          <div>
            <h1 className="font-syne text-[15vw] md:text-[6vw] font-bold leading-none tracking-tighter text-black">
              Pengalaman<br/>Gue
            </h1>
          </div>
        </div>

        {/* --- KOLOM KANAN --- */}
        <div ref={rightColRef} className="w-full md:w-1/2 py-[70vh] px-20 flex flex-col justify-center min-h-[200vh]"> 
          <ul className="space-y-24 md:space-y-38">
            {[
              "UI/UX.", 
              "Web.", 
              "Lead.", 
              "Organization.", 
              "Programming.", 
            ].map((text, i) => (
              <li 
                key={i} 
                className="outro-item font-syne text-[10vw] md:text-[4vw] font-bold leading-none tracking-tight transition-colors cursor-default"
              >
                {text}
              </li>
            ))}
          </ul>

        </div>

      </div>

    </section>
  );
}
