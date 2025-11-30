'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ParticleSphere from '../visuals/ParticleSphere';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. SETUP RINGAN
    const scene = new THREE.Scene();
    
    // Kabut hitam agar batas partikel menyatu halus dengan background
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100; // Posisi kamera agak mundur
    camera.position.y = 50;  // Agak naik dikit
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Masukkan canvas ke container
    if (containerRef.current) {
      // Hapus canvas lama jika ada (cleanup)
      while(containerRef.current.firstChild){
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.domElement);
    }

    // 2. MEMBUAT GELOMBANG PARTIKEL (DATA WAVE)
    // Kita buat grid titik-titik (misal 100x100 titik)
    const SEPARATION = 40;
    const AMOUNTX = 60;
    const AMOUNTY = 60;
    
    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3); // x, y, z
    const scales = new Float32Array(numParticles);
    
    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Mengatur posisi grid di tengah layar
        positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
        positions[i + 1] = 0; // y (nanti digerakkan ombaknya)
        positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z
        
        scales[j] = 1;
        
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Material Titik (Simpel & Ringan)
    const material = new THREE.PointsMaterial({
      color: 0x3b82f6, // Warna Biru BRI (Tailwind blue-500)
      size: 3.5,       // Ukuran titik
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. LOGIKA ANIMASI & INTERAKSI
    let count = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
    };
    // Menggunakan passive: true agar scrolling halaman tetap lancar
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      requestAnimationFrame(animate);

      // Gerakan Kamera Halus mengikuti mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 + 50 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Gerakan Ombak (Sine Wave)
      const positions = particles.geometry.attributes.position.array;
      let i = 0, j = 0;
      
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Rumus Matematika Ombak Data
          positions[i + 1] = (Math.sin((ix + count) * 0.3) * 30) + (Math.sin((iy + count) * 0.5) * 30);
          
          i += 3;
          j++;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true; // Wajib update posisi

      count += 0.05; // Kecepatan ombak
      renderer.render(scene, camera);
    };

    animate();

    // 4. CLEANUP (Penting!)
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // --- HTML BUTTON HOVER LOGIC (Sama kayak sebelumnya) ---
  const handleButtonMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--x', `${x}%`);
    btn.style.setProperty('--y', `${y}%`);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 1. BACKGROUND 3D RINGAN */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* 2. KONTEN OVERLAY */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center text-white w-full px-4 pointer-events-none">
        
        <p className="tagline font-sans text-sm md:text-lg font-light tracking-[0.3em] uppercase mb-4 text-blue-400 drop-shadow-md">
          Rusydi Balfas &mdash; IPB University
        </p>

        <div className="flex flex-col items-center mix-blend-difference">
          <h1 className="hero-title leading-none">FRONTEND DEV</h1>
        </div>
      </div>

      <style jsx>{`
        /* TYPOGRAPHY */
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          color: white;
        }

        /* GLASS BUTTON (Sama seperti sebelumnya) */
        .glass-button {
          position: relative;
          padding: 16px 40px;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          backdrop-filter: blur(10px);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.5); /* Blue Shadow */
        }

        /* SHIMMER */
        .shimmer {
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(30deg);
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(30deg); }
          100% { transform: translateX(100%) rotate(30deg); }
        }
      `}</style>
    </section>
  );
}