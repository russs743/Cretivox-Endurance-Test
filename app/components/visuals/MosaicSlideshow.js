'use client';

import React, { useEffect, useRef } from 'react';

// Kumpulan Gambar untuk Mosaic
const images = [
  "/mosaic/IPB12.jpg", // Foto 1
  "/mosaic/IPB1.jpg", // Foto 2
  "/mosaic/IPB2.jpg", // Foto 3
  "/mosaic/IPB3.jpg", // Foto 4
  "/mosaic/IPB4.jpg", // Foto 5
  "/mosaic/IPB5.jpg", // Foto 6
  "/mosaic/IPB6.jpg", // Foto 7
  "/mosaic/IPB7.jpg", // Foto 8
  "/mosaic/IPB8.jpg", // Foto 9
  "/mosaic/IPB9.jpg", // Foto 10
  "/mosaic/IPB10.jpg", // Foto 11
  "/mosaic/IPB11.jpg", // Foto 12
];

export default function MosaicSlideshow() {
  const containerRef = useRef(null);
  const tilesRef = useRef([]);

  useEffect(() => {
    const tiles = tilesRef.current;
    if (tiles.length === 0) return;

    let index = 0;
    let intervalId;

    // Fungsi Acak Array
    const shuffleArray = (array) => {
      let arr = array.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    // Fungsi Animasi Satu Tile
    const animateTile = (tile, imgIndex, delay) => {
      setTimeout(() => {
        if (!tile) return;
        
        // Fade Out
        tile.style.opacity = 0;
        tile.style.transform = "scale(0.8)";

        // Ganti Gambar & Fade In
        setTimeout(() => {
          if (!tile) return;
          tile.style.backgroundImage = `url(${images[imgIndex % images.length]})`;
          tile.style.opacity = 1;
          tile.style.transform = "scale(1)";
        }, 500); // Waktu ganti gambar

      }, delay);
    };

    // Fungsi Animasi Grid Berkelanjutan
    const animateGridContinuously = () => {
      // Buat urutan acak tile mana yang mau diganti
      const order = shuffleArray([...Array(tiles.length).keys()]);
      
      // Ambil beberapa tile saja untuk diganti
      const tilesToUpdate = order.slice(0, 6); 

      tilesToUpdate.forEach((i, idx) => {
        animateTile(tiles[i], index + idx, idx * 300);
      });

      index = (index + tilesToUpdate.length) % images.length;
    };

    // Jalankan Loop
    animateGridContinuously(); // Jalankan sekali di awal
    intervalId = setInterval(animateGridContinuously, 3000); // Ulang setiap 3 detik

    return () => clearInterval(intervalId); // Cleanup saat pindah halaman
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full grid grid-cols-3 md:grid-cols-4 gap-1 p-1 bg-black/20">
      {/* buat 12 kotak (Tiles) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (tilesRef.current[i] = el)}
          className="w-full h-full rounded-md bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${images[i % images.length]})`,
            opacity: 1,
            transform: 'scale(1)'
          }}
        />
      ))}
    </div>
  );
}
