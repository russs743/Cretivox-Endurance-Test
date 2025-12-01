'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  
  // State untuk menampung input user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk loading dan error message
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Aktifkan loading saat tombol ditekan
    setErrorMsg('');    // Reset pesan error

    try {
      // KIRIM DATA KE API
      const res = await fetch('https://dummyjson.com/auth/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username, // Kirim username dari input
          password: password, // Kirim password dari input
        })
      });

      const data = await res.json();

      // CEK HASILNYA
      if (res.ok) {
        // --- JIKA SUKSES ---
        console.log("Login Berhasil:", data);
        
        // Simpan token
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data)); // Opsional: simpan info user

        // Pindah ke Dashboard
        router.push('/dashboard');
      } else {
        // --- JIKA GAGAL (Password Salah / Error lain) ---
        console.log("Login Gagal:", data);
        setErrorMsg(data.message || 'Login gagal, periksa username/password.');
      }

    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setErrorMsg('Terjadi kesalahan koneksi server.');
    } finally {
      setIsLoading(false); // Matikan loading selesai atau gagal
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Halaman Login</h1>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        
        {/* Tampilkan Error jika ada */}
        {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}

        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ padding: '10px' }}
        />
        
        <button 
          type="submit" 
          disabled={isLoading} // Tombol mati saat loading
          style={{ 
            padding: '10px', 
            backgroundColor: isLoading ? '#ccc' : 'blue', 
            color: 'white', 
            cursor: isLoading ? 'not-allowed' : 'pointer', 
            border: 'none' 
          }}
        >
          {isLoading ? 'Sedang Masuk...' : 'Login'}
        </button>
      
      </form>
    </div>
  );
}
