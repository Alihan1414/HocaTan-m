'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { QUIZ_QUESTIONS, TYPES, calculatePersonality } from '@/lib/personalityEngine';
import { analyzeTask } from '@/lib/taskEngine';

export default function GorevAtamaPage() {
  const { personnel } = useStore();
  const [mounted, setMounted] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Sadece analizi bitmiş personeller
  const eligiblePersonnel = personnel.filter(
    p => p.quizAnswers && Object.keys(p.quizAnswers).length === QUIZ_QUESTIONS.length
  ).map(p => ({
    ...p,
    result: calculatePersonality(p.quizAnswers)
  }));

  const handleAnalyze = () => {
    if (taskText.trim().length < 3) return;
    const result = analyzeTask(taskText);
    setAnalysisResult(result);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAnalyze();
    }
  };

  return (
    <>
      <header className="top-header">
        <h1 className="page-title">🎯 Akıllı Görev Atama Motoru</h1>
        <div className="header-actions">
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Görevi yazın, yapay zeka en uygun mizaç tipini bulsun
          </span>
        </div>
      </header>

      <section style={{ marginTop: '2rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Görev Tanımı
          </h2>
          <textarea
            className="form-input"
            rows="4"
            placeholder="Örn: Kurban bayramına yakın büyükbaş kurban alınma ve satıcıyla pazarlık yapma görevi..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ resize: 'vertical', fontSize: '1rem', padding: '1rem', lineHeight: 1.6 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              İpucu: Görevin gerektirdiği aksiyonları net bir şekilde yazın. (Analiz, iletişim, pazarlık vb.)
            </span>
            <button
              onClick={handleAnalyze}
              disabled={taskText.trim().length < 3}
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: taskText.trim().length < 3 ? 'not-allowed' : 'pointer',
                opacity: taskText.trim().length < 3 ? 0.5 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              Görevi Analiz Et ✨
            </button>
          </div>
        </div>
      </section>

      {/* Sonuç Alanı */}
      {analysisResult && (
        <section style={{ marginTop: '2rem' }}>
          {analysisResult.status === 'no_match' ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤔</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Yeterli İpucu Bulunamadı
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, marginBottom: '2rem' }}>
                Girdiğiniz görev tanımından hangi becerilerin gerektiğini tam çıkaramadık. Daha isabetli sonuç için <strong>hız, detay, pazarlık, iletişim, rutin, analiz</strong> gibi anahtar eylemleri eklemeyi deneyin.
              </p>
              
              <div className="grid-2" style={{ gap: '1rem', textAlign: 'left' }}>
                {Object.values(TYPES).map(t => (
                  <div key={t.key} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: t.bgColor, border: `1px solid ${t.borderColor}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{t.emoji}</span>
                      <strong style={{ color: t.color }}>{t.name} Seçin Eğer:</strong>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {t.key === 'K' && 'Görev acilse, karar alma veya pazarlık gerektiriyorsa.'}
                      {t.key === 'M' && 'Görev sıfır hata, bütçe veya detaylı hesap gerektiriyorsa.'}
                      {t.key === 'S' && 'Görev sunum, ikna, etkinlik veya sosyallik gerektiriyorsa.'}
                      {t.key === 'F' && 'Görev sabır, uyum, tekrarlayan süreç veya destek gerektiriyorsa.'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Kazanan Mizaç Kartı */}
              <div className="card" style={{ 
                background: `linear-gradient(135deg, ${TYPES[analysisResult.bestMatch].bgColor} 0%, var(--card-bg) 70%)`,
                border: `2px solid ${TYPES[analysisResult.bestMatch].borderColor}` 
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ fontSize: '4rem', lineHeight: 1 }}>{TYPES[analysisResult.bestMatch].emoji}</div>
                  <div>
                    <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: TYPES[analysisResult.bestMatch].color, marginBottom: '0.25rem' }}>
                      Bu Görev İçin En Uygun Profil
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                      {TYPES[analysisResult.bestMatch].name}
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {analysisResult.reason}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Yakalanan İpuçları:</span>
                      {analysisResult.matchedKeywords.map((kw, i) => (
                        <span key={i} style={{ 
                          padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                          backgroundColor: 'var(--card-bg)', border: `1px solid ${TYPES[analysisResult.bestMatch].borderColor}`,
                          color: TYPES[analysisResult.bestMatch].color
                        }}>
                          "{kw}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bu Mizaçtaki Personeller */}
              <div className="card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  👥 Ekibinizdeki {TYPES[analysisResult.bestMatch].name} Personeller
                </h3>
                
                {eligiblePersonnel.filter(p => p.result.primaryType === analysisResult.bestMatch).length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Şu anda ekibinizde bu mizaç tipine sahip personel bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="grid-3">
                    {eligiblePersonnel
                      .filter(p => p.result.primaryType === analysisResult.bestMatch)
                      .sort((a, b) => b.result.percentages[analysisResult.bestMatch] - a.result.percentages[analysisResult.bestMatch])
                      .map(p => (
                        <div key={p.id} style={{ 
                          padding: '1rem', borderRadius: 'var(--radius-md)', border: `1px solid var(--border-color)`,
                          display: 'flex', flexDirection: 'column', gap: '0.5rem'
                        }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                          {p.department && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.department}</div>}
                          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ flex: 1, height: '6px', borderRadius: '99px', backgroundColor: 'var(--border-color)' }}>
                              <div style={{ width: `${p.result.percentages[analysisResult.bestMatch]}%`, height: '100%', borderRadius: '99px', backgroundColor: TYPES[analysisResult.bestMatch].color }} />
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: TYPES[analysisResult.bestMatch].color }}>
                              %{p.result.percentages[analysisResult.bestMatch]}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </section>
      )}
    </>
  );
}
