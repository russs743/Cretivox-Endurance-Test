'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- UPDATE MENU DI SINI ---
const navLinks = [
  { name: "About", id: "about" },
  { name: "Computer Science", id: "ipb-section" },
  { name: "Gamer", id: "gaming-section" },
  { name: "Organization", id: "leader-section" },
  { name: "Projects", id: "project-section" },
];

export default function Navigation() {
  const navRef = useRef(null);
  const btnTopRef = useRef(null);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(() => {
    // 1. ANIMASI HEADER (Smart Hide/Show)
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100, // Sembunyi di atas
      paused: true,
      duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });

    // 2. BACK TO TOP
    gsap.fromTo(btnTopRef.current, 
      { scale: 0, opacity: 0 },
      {
        scale: 1, 
        opacity: 1,
        duration: 0.3,
        scrollTrigger: {
          trigger: document.body,
          start: "500px top", 
          toggleActions: "play none none reverse",
        }
      }
    );

  }, []);

  return (
    <>
      <nav 
        ref={navRef} 
        className="fixed top-0 left-0 w-full z-50 px-4 py-4 flex justify-center pointer-events-none mix-blend-difference"
      >
        <div className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-4 md:gap-8 shadow-lg">
          <div 
            onClick={scrollToTop}
            className="font-syne font-bold text-white cursor-pointer hover:text-blue-400 transition"
          >
            RB.
          </div>

          <ul className="flex gap-4 md:gap-6 text-[10px] md:text-sm font-sans font-medium text-gray-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button 
                  onClick={() => scrollTo(link.id)}
                  className="hover:text-white transition relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <button
        ref={btnTopRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
}