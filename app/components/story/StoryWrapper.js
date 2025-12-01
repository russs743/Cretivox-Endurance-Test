'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IPBSection from './parts/IPBSection';
import GamerSection from './parts/GamerSection';
import LeaderSection from './parts/LeaderSection';
import ProjectGallery from '../Projects/ProjectGallery'; 

gsap.registerPlugin(ScrollTrigger);

export default function StoryWrapper() {
  const containerRef = useRef(null);
  const projectRef = useRef(null);

  useGSAP(() => {
    // LOGIKA PINNING PROJECT GALLERY
    ScrollTrigger.create({
      trigger: projectRef.current, // Targetnya pembungkus Project
      start: "top top",            // Mulai Pin saat bagian atas Project nyentuh atas layar
      end: "+=100%",               // Tahan selama 1x tinggi layar
      pin: true,                   // KUNCI LAYAR
      pinSpacing: false,           // section berikutnya (Outro) naik menumpuk (Overlay)
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-neutral-950 text-white w-full relative">
      
      {/* IPB */}
      <IPBSection />
      
      {/* GAMER */}
      <div className="relative z-0">
        <GamerSection />
      </div>

      {/* LEADER */}
      <div className="relative z-10 -mt-[200vh]">
        <LeaderSection />
      </div>

      {/* TRANSISI + PROJECT GALLERY */}
      <div id="project-section" ref={projectRef} className="relative z-20 bg-black min-h-screen">
           <div className="w-full min-h-screen bg-neutral-900 pt-20 flex items-center justify-center">
              <ProjectGallery />
           </div>
      </div>

    </div>
  );
}
