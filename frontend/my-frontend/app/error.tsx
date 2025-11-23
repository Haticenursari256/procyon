"use client"; // <--- İŞTE EKSİK OLAN SİHİRLİ SATIR BU!

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: '50px', textAlign: 'center', background: '#000', color: '#fff', height: '100vh' }}>
      <h2 style={{ color: 'red' }}>Bir şeyler ters gitti! 💥</h2>
      <p style={{ color: '#ccc' }}>{error.message || "Bilinmeyen bir hata oluştu."}</p>
      
      <button
        onClick={() => reset()}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Tekrar Dene
      </button>
    </div>
  );
}