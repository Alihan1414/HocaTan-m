'use client';

import { useState, useEffect } from 'react';
import { subscribeToUserStore } from '@/store/useStore';
import Sidebar from '@/components/Sidebar';

export default function AppWrapper({ children }) {
  const [userName, setUserName] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('personeltanim_user');
    if (storedUser) {
      setUserName(storedUser);
      subscribeToUserStore();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const normalizedUser = inputValue.trim().toLowerCase();
    localStorage.setItem('personeltanim_user', normalizedUser);
    setUserName(normalizedUser);
    subscribeToUserStore();
  };

  if (!mounted) return null;

  if (!userName) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '3rem',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#fbbf24', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>PersoneliniTanı</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Çalışma alanınıza giriş yapın</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="İsminiz (Örn: Bayram)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#fbbf24',
                color: '#0f172a',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none',
                marginTop: '1rem'
              }}
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar userName={userName} onLogout={() => {
        localStorage.removeItem('personeltanim_user');
        window.location.reload();
      }} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
