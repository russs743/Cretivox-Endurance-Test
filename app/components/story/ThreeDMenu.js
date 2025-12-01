'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// DATA NAVIGASI
const storySlides = [
  {
    id: 1,
    title: "Computer Science", 
    desc: "Web & UI/UX enthusiast.",
    src: "/AllAbout/IPB6.jpg",
    color: "from-emerald-600 to-green-900",
    targetId: "ipb-section" 
  },
  {
    id: 2,
    title: "Tukang Ngegame",
    desc: "Strategy, Reflex, and Problem Solving.",
    src: "/AllAbout/game.jpg",
    color: "from-blue-600 to-cyan-900",
    targetId: "gaming-section"
  },
  {
    id: 3,
    title: "Tukang Suruh Suruh",
    desc: "Chairman of Socio Techno & IT Today.",
    src: "/AllAbout/SocioTechno.jpg",
    color: "from-red-600 to-orange-900",
    targetId: "leader-section"
  },
  {
    id: 4,
    title: "Project", 
    desc: "Fullstack Development & Data Analysis.",
    src: "/AllAbout/Project.png",
    color: "from-purple-600 to-indigo-900",
    targetId: "project-section"
  }
];

export default function ThreeDScroll() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
    const totalWidth = sectionRef.current.offsetWidth;
    const amountToScroll = totalWidth - window.innerWidth;

    // MASTER TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current, 
        start: "top top",            
        end: "+=4000", 
        pin: true,     
        scrub: 1,      
        snap: 1 / (storySlides.length - 1 + 1), // Snap biar berhenti pas di kartu
      }
    });

    // SCROLL SAMPING
    tl.to(sectionRef.current, {
      x: -amountToScroll, 
      ease: "none",
      duration: 3 
    })

    // PAUSE (DIAM SEBENTAR DI KARTU TERAKHIR)
    .to({}, { duration: 0.5 }) 

    // ZOOM OUT / EXIT (MASUK KE SECTION BAWAHNYA)
    .to(triggerRef.current, {
      scale: 1.5,          
      opacity: 0,          
      filter: "blur(20px)",
      duration: 1,         
      pointerEvents: "none"
    });

  }, { scope: triggerRef });

  const handleCardClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={triggerRef} className="overflow-hidden bg-neutral-950 text-white relative">
      
      {/* Background Text */}
      <div className="absolute top-20 left-10 z-10 opacity-20 pointer-events-none">
        <h2 className="font-syne text-[15vw] leading-none font-bold text-gray-800">
          STORY
        </h2>
      </div>

      <div className="absolute top-10 left-10 z-20 mix-blend-difference">
        <p className="font-syne text-3xl font-bold">All About Rusydi</p>
      </div>

      {/* Cards Container */}
      <div ref={sectionRef} className="h-screen flex items-center px-[10vw] w-max gap-12 md:gap-24">
        {storySlides.map((item, index) => (
          
          <div 
            key={index} 
            onClick={() => handleCardClick(item.targetId)}
            className="group relative w-[320px] md:w-[450px] h-[500px] md:h-[600px] flex-shrink-0 rounded-[40px] overflow-hidden border border-white/10 transition-transform duration-500 hover:scale-105 hover:z-50 cursor-pointer"
            style={{
              transform: "perspective(1000px) rotateY(15deg)",
              boxShadow: "-20px 20px 60px rgba(0,0,0,0.8)"
            }}
          >
            <img 
              src={item.src} 
              alt={item.title} 
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
            />
            
            <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-500`}></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 bg-gradient-to-t from-black via-transparent to-transparent">
              <span className="font-syne text-6xl font-bold text-white/10 absolute top-6 right-6 select-none">
                0{index + 1}
              </span>
              
              <h3 className="font-syne text-3xl md:text-4xl font-bold mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.title}
              </h3>
              
              <p className="font-sans text-sm md:text-base text-gray-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                 <span className="text-xs font-bold uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                   Click to Go ↘
                 </span>
              </div>
            </div>
          </div>

        ))}
        
        {/* Closing Text */}
        <div className="w-[50vw] h-full flex flex-col justify-center items-center text-center">
            <h2 className="font-syne text-6xl md:text-8xl font-bold text-white mb-6">
              Scroll Lagi<br/>Donggg.
            </h2>
            <div className="w-24 h-1 bg-blue-500 animate-pulse"></div>
        </div>

      </div>
    </section>
  );
}
