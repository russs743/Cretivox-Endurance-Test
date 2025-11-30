'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function ParticleSphere() {
  const containerRef = useRef();

  useEffect(() => {
    // 1. SETUP THREE.JS (Kamera, Scene, Renderer)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 22; // Mengatur jarak kamera biar objek terlihat pas

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Masukkan hasil render ke div container
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // 2. MEMBUAT TITIK-TITIK BOLA (GEOMETRY)
    const count = 400; // Jumlah titik partikel
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const colorObj = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Rumus Matematika Spherical Distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = 9 * Math.cos(theta) * Math.sin(phi);
      const y = 9 * Math.sin(theta) * Math.sin(phi);
      const z = 9 * Math.cos(phi);

      positions.push(x, y, z);

      // Warnai Partikel (Gradient Biru ke Ungu)
      const vx = (x / 10) + 0.5;
      colorObj.setHSL(0.6 + vx * 0.1, 0.8, 0.6); 
      colors.push(colorObj.r, colorObj.g, colorObj.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.06,          // Ukuran titik
      vertexColors: true,  // Pakai warna custom
      transparent: true,
      opacity: 0.9,
    });

    const sphere = new THREE.Points(geometry, material);
    
    // Set ukuran awal 0 (Supaya bisa di-animasi membesar nanti)
    sphere.scale.set(0, 0, 0); 
    scene.add(sphere);

    // --- ANIMASI GSAP & INTERAKSI ---
    
    // 3. ANIMASI INTRO (Meledak Membesar)
    gsap.to(sphere.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 3,
      ease: "elastic.out(1, 0.3)", // Efek memantul kenyal
      delay: 0.5 
    });

    // 4. ANIMASI ROTASI MENGIKUTI MOUSE
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      // Normalisasi koordinat mouse (-1 sampai 1)
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotasi Otomatis (Pelan)
      sphere.rotation.y += 0.002;

      // Rotasi Interaktif (Smooth Follow Mouse pakai GSAP)
      gsap.to(sphere.rotation, {
        x: mouseY * 0.5, // Miring atas-bawah
        z: mouseX * 0.3, // Miring kiri-kanan
        duration: 1,     
        ease: "power2.out"
      });

      // Di dalam fungsi animate()
    gsap.to(sphere.rotation, {
    x: mouseY * 0.5, // Miring ke atas/bawah sesuai mouse Y
    z: mouseX * 0.3, // Miring ke kiri/kanan sesuai mouse X
    duration: 1,     // Durasi 1 detik biar gerakannya smooth (tidak kaku)
    ease: "power2.out"
    });

      renderer.render(scene, camera);
    };
    animate();

    // 5. BERSIH-BERSIH MEMORY (Cleanup)
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none" // Posisi di belakang layar
      style={{ width: '100%', height: '100%' }}
    />
  );
}