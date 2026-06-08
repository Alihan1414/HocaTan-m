'use client';

import { useStore } from '@/store/useStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, TYPES, calculatePersonality } from '@/lib/personalityEngine';

export default function Dashboard() {
  const { personnel, meetings } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalPersonnel = personnel.length;
  
  // Test çözen personel sayısı
  const testedPersonnel = personnel.filter(p => p.quizAnswers && Object.keys(p.quizAnswers).length === QUIZ_QUESTIONS.length);
  const totalTested = testedPersonnel.length;

  // En yaygın mizaç tipini bul
  let commonTypeDisplay = 'Veri Yok';
  if (totalTested > 0) {
    const typeCounts = { K: 0, M: 0, F: 0, S: 0 };
    testedPersonnel.forEach(p => {
      const res = calculatePersonality(p.quizAnswers);
      typeCounts[res.primaryType]++;
    });
    const mostCommonTypeKey = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b);
    commonTypeDisplay = TYPES[mostCommonTypeKey].name;
  }

  const upcomingMeetings = meetings
    .filter(m => m.status === 'Planlandı' && new Date(m.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));
    
  const upcomingMeetingsCount = upcomingMeetings.length;

  return (
    <>
      <header className="top-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="header-actions">
          <Link href="/personel" className="btn btn-primary">+ Yeni Personel Ekle</Link>
        </div>
      </header>

      <section className="grid-4" style={{ marginTop: '2rem' }}>
        <div className="card">
          <div className="card-title">Toplam Personel</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{totalPersonnel}</div>
        </div>
        <div className="card">
          <div className="card-title">Analizi Bitenler</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{totalTested}</div>
        </div>
        <div className="card">
          <div className="card-title">Baskın Mizaç Tipi</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#8b5cf6' }}>{commonTypeDisplay}</div>
        </div>
        <div className="card">
          <div className="card-title">Yaklaşan Görüşmeler</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{upcomingMeetingsCount}</div>
        </div>
      </section>

      <section className="grid-2" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h2 className="card-title">Son Eklenen Profiller</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {personnel.slice(-5).map(person => (
              <li key={person.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500 }}>{person.name}</span>
                <span className={`badge ${person.status?.startsWith('G4') ? 'badge-success' : person.status?.startsWith('G2') ? 'badge-danger' : person.status?.startsWith('G3') ? 'badge-warning' : 'badge-info'}`}>
                  {person.status?.split(' (')[0]}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h2 className="card-title">Yaklaşan Kariyer Görüşmeleri</h2>
          {upcomingMeetings.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Yaklaşan bir görüşme bulunmuyor.</p>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingMeetings.map(meeting => {
                const person = personnel.find(p => p.id === meeting.personnelId);
                const dateObj = new Date(meeting.date);
                const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
                
                return (
                  <li key={meeting.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{person ? person.name : 'Silinmiş Personel'}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{meeting.topic}</div>
                    </div>
                    <span className="badge badge-warning" style={{ height: 'fit-content' }}>{dateStr}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
