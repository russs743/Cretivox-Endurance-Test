'use client';

import React, { useState } from 'react';
import styles from './ProjectGallery.module.css';

// DATA PROJECT
const projects = [
  { id: 1, title: "Playfair Cipher", tech: "C++ • React.js", img: "/Project/playfair-cipher.png" },
  { id: 2, title: "E-Lung", tech: "FrontEnd • UI/UX", img: "/Project/e-lung.png" },
  { id: 3, title: "Snaptask", tech: "PHP • MySQL", img: "/Project/snaptask.png" },
  { id: 4, title: "Personal Website", tech: "React.js • GSAP • Typescript", img: "/Project/PersonalWeb.png"},
  { id: 5, title: "Catatan Harian", tech: "Fullstack • React • Node", img: "/Project/catatan-harian.png" },
  { id: 6, title: "SPARRING", tech: "UI/UX • Figma", img: "/Project/Sparring.png" },
  { id: 7, title: "IPB Mobile Feature", tech: "UI Design • Presensi", img: "/Project/IPBMobile.png" },
];

export default function ProjectGallery() {
  const [activePic, setActivePic] = useState(1);
  const [activeZone, setActiveZone] = useState(5);
  const hoverZones = 9;

  return (
    <div className={styles.galleryContainer}>
      
      {/* --- JUDUL BARU (HEADER) --- */}
      {/* Posisinya absolute di atas biar rapi */}
      <div className="absolute top-12 left-0 w-full text-center z-20 pointer-events-none">
        <p className="font-sans text-blue-400 font-bold tracking-[0.3em] text-sm md:text-base mb-2 uppercase">
          Portfolio
        </p>
        <h2 className="font-syne text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
          Completed Project
        </h2>
      </div>

      <nav 
        className={styles.nav}
        style={{
          '--max-p': projects.length,
          '--max-z': hoverZones,
          '--p': activePic,
          '--z': activeZone
        }}
        onMouseLeave={() => {
           setActivePic(Math.ceil(projects.length / 2));
           setActiveZone(5);
        }}
      >
        {projects.map((project, index) => {
          return (
            <a 
              key={project.id} 
              href={project.link}
              className={styles.card}
              style={{ '--i': index }} 
              data-active={activePic === index + 1}
            >
              <div 
                className={styles.img} 
                style={{ backgroundImage: `url(${project.img})` }} 
              />

              <div className={styles.cardInfo}>
                <h3 className="text-xl font-bold text-white font-syne">{project.title}</h3>
                <p className="text-sm text-blue-300 font-sans">{project.tech}</p>
              </div>

              <div className={styles.hoverZone}>
                {Array.from({ length: hoverZones }).map((_, zIndex) => (
                  <div 
                    key={zIndex}
                    className={styles.zoneSensor}
                    onMouseEnter={() => {
                      setActivePic(index + 1);
                      setActiveZone(zIndex + 1);
                    }}
                  />
                ))}
              </div>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
