'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { QUIZ_QUESTIONS, TYPES, calculatePersonality } from '@/lib/personalityEngine';
import { getSynergyData, getScoreInfo } from '@/lib/synergyEngine';

export default function UyumPage() {
  const { personnel } = useStore();
  const [mounted, setMounted] = useState(false);
  const [personAId, setPersonAId] = useState('');
  const [personBId, setPersonBId] = useState('');

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // Sadece testi tamamlamış personelleri filtrele
  const eligiblePersonnel = personnel.filter(
    p => p.quizAnswers && Object.keys(p.quizAnswers).length === QUIZ_QUESTIONS.length
  );

  const personA = eligiblePersonnel.find(p => p.id === parseInt(personAId));
  const personB = eligiblePersonnel.find(p => p.id === parseInt(personBId));

  const resultA = personA ? calculatePersonality(personA.quizAnswers) : null;
  const resultB = personB ? calculatePersonality(personB.quizAnswers) : null;

  const synergyData = (resultA && resultB)
    ? getSynergyData(resultA.primaryType, resultB.primaryType)
    : null;

  const scoreInfo = synergyData ? getScoreInfo(synergyData.score) : null;

  return (
    <>
      <header className="top-header">
        <h1 className="page-title">🤝 Ekip Uyumu Simülatörü</h1>
        <div className="header-actions">
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {eligiblePersonnel.length} kişide analiz mevcut
          </span>
        </div>
      </header>

      {/* Boş durum */}
      {eligiblePersonnel.length < 2 && (
        <section className="card" style={{ marginTop: '2rem', textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧪</div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Yeterli Analiz Yok</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto', lineHeight: 1.6 }}>
            Ekip uyumu simülatörünü kullanabilmek için en az <strong>2 personelin</strong> kişilik analizini tamamlamış olması gerekiyor.
            Personel Profili sayfasından anket linkini ilgili kişilere gönderin.
          </p>
        </section>
      )}

      {eligiblePersonnel.length >= 2 && (
        <>
          {/* Personel Seçim Kartları */}
          <section className="grid-2" style={{ marginTop: '2rem', gap: '1.5rem' }}>
            {/* Kişi A */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              {resultA && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  background: `linear-gradient(90deg, ${TYPES[resultA.primaryType].color}, transparent)`
                }} />
              )}
              <h2 className="card-title" style={{ marginBottom: '1rem' }}>1. Personel</h2>
              <select
                className="form-input"
                value={personAId}
                onChange={e => { setPersonAId(e.target.value); if (e.target.value === personBId) setPersonBId(''); }}
              >
                <option value="">— Personel Seçin —</option>
                {eligiblePersonnel.map(p => (
                  <option key={p.id} value={p.id} disabled={p.id === parseInt(personBId)}>
                    {p.name} {p.department ? `(${p.department})` : ''}
                  </option>
                ))}
              </select>

              {personA && resultA && (
                <div style={{
                  marginTop: '1.25rem', padding: '1.25rem', borderRadius: 'var(--radius-md)',
                  backgroundColor: TYPES[resultA.primaryType].bgColor,
                  border: `1px solid ${TYPES[resultA.primaryType].borderColor}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{TYPES[resultA.primaryType].emoji}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', color: TYPES[resultA.primaryType].color }}>
                        {personA.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {TYPES[resultA.primaryType].name} · {TYPES[resultA.primaryType].subtitle}
                      </div>
                      {personA.department && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          {personA.department}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {Object.entries(resultA.percentages)
                      .sort((a, b) => b[1] - a[1])
                      .map(([key, pct]) => pct > 0 && (
                        <span key={key} style={{
                          padding: '0.25rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                          backgroundColor: TYPES[key].bgColor, color: TYPES[key].color, border: `1px solid ${TYPES[key].borderColor}`
                        }}>
                          {TYPES[key].emoji} {TYPES[key].name} %{pct}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kişi B */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              {resultB && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  background: `linear-gradient(90deg, ${TYPES[resultB.primaryType].color}, transparent)`
                }} />
              )}
              <h2 className="card-title" style={{ marginBottom: '1rem' }}>2. Personel</h2>
              <select
                className="form-input"
                value={personBId}
                onChange={e => { setPersonBId(e.target.value); if (e.target.value === personAId) setPersonAId(''); }}
              >
                <option value="">— Personel Seçin —</option>
                {eligiblePersonnel.map(p => (
                  <option key={p.id} value={p.id} disabled={p.id === parseInt(personAId)}>
                    {p.name} {p.department ? `(${p.department})` : ''}
                  </option>
                ))}
              </select>

              {personB && resultB && (
                <div style={{
                  marginTop: '1.25rem', padding: '1.25rem', borderRadius: 'var(--radius-md)',
                  backgroundColor: TYPES[resultB.primaryType].bgColor,
                  border: `1px solid ${TYPES[resultB.primaryType].borderColor}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{TYPES[resultB.primaryType].emoji}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', color: TYPES[resultB.primaryType].color }}>
                        {personB.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {TYPES[resultB.primaryType].name} · {TYPES[resultB.primaryType].subtitle}
                      </div>
                      {personB.department && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          {personB.department}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {Object.entries(resultB.percentages)
                      .sort((a, b) => b[1] - a[1])
                      .map(([key, pct]) => pct > 0 && (
                        <span key={key} style={{
                          padding: '0.25rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                          backgroundColor: TYPES[key].bgColor, color: TYPES[key].color, border: `1px solid ${TYPES[key].borderColor}`
                        }}>
                          {TYPES[key].emoji} {TYPES[key].name} %{pct}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Boş seçim mesajı */}
          {(!personAId || !personBId) && (
            <div style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👆</div>
              <p>Analiz başlatmak için yukarıdan iki farklı personel seçin.</p>
            </div>
          )}

          {/* SONUÇ RAPORU */}
          {synergyData && personA && personB && resultA && resultB && (
            <section style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Uyum Skoru Başlık Kartı */}
              <div className="card" style={{
                background: `linear-gradient(135deg, ${scoreInfo.bg} 0%, var(--card-bg) 60%)`,
                border: `2px solid ${scoreInfo.border}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: scoreInfo.color, fontWeight: 700, marginBottom: '0.5rem' }}>
                      Uyum Analizi
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {personA.name} × {personB.name}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 600 }}>
                      {TYPES[resultA.primaryType].emoji} {TYPES[resultA.primaryType].name} &nbsp;+&nbsp; {TYPES[resultB.primaryType].emoji} {TYPES[resultB.primaryType].name}
                      &nbsp;→&nbsp; <span style={{ color: scoreInfo.color }}>{synergyData.title}</span>
                    </p>
                  </div>

                  {/* Skor Göstergesi */}
                  <div style={{ textAlign: 'center', minWidth: '120px' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900, color: scoreInfo.color, lineHeight: 1 }}>
                      {synergyData.score}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>/ 100 Puan</div>
                    <div style={{
                      marginTop: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '99px',
                      backgroundColor: scoreInfo.bg, color: scoreInfo.color, border: `1px solid ${scoreInfo.border}`,
                      fontSize: '0.8rem', fontWeight: 700, display: 'inline-block'
                    }}>
                      {scoreInfo.emoji} {scoreInfo.label}
                    </div>
                  </div>
                </div>

                {/* Puan Çubuğu */}
                <div style={{ marginTop: '1.5rem', width: '100%', height: '8px', borderRadius: '99px', backgroundColor: 'var(--border-color)' }}>
                  <div style={{
                    width: `${synergyData.score}%`, height: '100%', borderRadius: '99px',
                    background: `linear-gradient(90deg, ${scoreInfo.color}, ${scoreInfo.color}aa)`,
                    transition: 'width 1s ease'
                  }} />
                </div>

                {/* Özet */}
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '1.25rem', fontSize: '0.95rem' }}>
                  {synergyData.summary}
                </p>
              </div>

              {/* Sinerji ve Çatışma yan yana */}
              <div className="grid-2" style={{ gap: '1.5rem' }}>
                {/* Güç Birliği */}
                <div className="card" style={{ border: '1px solid rgba(34,197,94,0.25)', backgroundColor: 'rgba(34,197,94,0.03)' }}>
                  <h3 style={{ fontWeight: 700, color: '#16a34a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💪 Güç Birliği (Sinerji)
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {synergyData.synergies.map((s, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{ color: '#16a34a', fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Potansiyel Çatışmalar */}
                <div className="card" style={{ border: '1px solid rgba(239,68,68,0.25)', backgroundColor: 'rgba(239,68,68,0.03)' }}>
                  <h3 style={{ fontWeight: 700, color: '#dc2626', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚡ Potansiyel Çatışmalar
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {synergyData.conflicts.map((c, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{ color: '#dc2626', fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>⚠</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* İdareci Tavsiyeleri */}
              <div className="card">
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🎯 İdareci Eylem Tavsiyeleri
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {synergyData.managerAdvice.map((tip, i) => (
                    <div key={i} style={{
                      padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)',
                      backgroundColor: tip.icon === '✅' ? 'rgba(34,197,94,0.06)' : tip.icon === '⚠️' ? 'rgba(245,158,11,0.06)' : 'rgba(239,68,68,0.06)',
                      border: `1px solid ${tip.icon === '✅' ? 'rgba(34,197,94,0.2)' : tip.icon === '⚠️' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)'}`,
                      display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
                    }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{tip.icon}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Karşılaştırma: Motivasyon ve Güçlü Yönler */}
              <div className="grid-2" style={{ gap: '1.5rem' }}>
                {[personA, personB].map((person, idx) => {
                  const result = idx === 0 ? resultA : resultB;
                  const type = TYPES[result.primaryType];
                  return (
                    <div key={idx} className="card" style={{
                      border: `1px solid ${type.borderColor}`,
                      background: `linear-gradient(160deg, ${type.bgColor} 0%, var(--card-bg) 60%)`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '1.75rem' }}>{type.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 700, color: type.color }}>{person.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{type.name}</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '0.875rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          🔑 Motivasyon Anahtarları
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                          {type.motivationKeys.map((k, i) => (
                            <span key={i} style={{
                              padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                              backgroundColor: type.bgColor, color: type.color, border: `1px solid ${type.borderColor}`
                            }}>{k}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          💬 İletişim Stili
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{type.communicationStyle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </section>
          )}
        </>
      )}
    </>
  );
}
