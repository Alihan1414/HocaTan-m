'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { QUIZ_QUESTIONS, TYPES, calculatePersonality } from '@/lib/personalityEngine';

// ───────────────────────────────────────────────────────────────
//  ALT BİLEŞEN: Kişilik Analizi (Quiz + Sonuç)
// ───────────────────────────────────────────────────────────────
function PersonalityTab({ person, onSave }) {
  const hasQuiz = person.quizAnswers && Object.keys(person.quizAnswers).length === QUIZ_QUESTIONS.length;
  const result = hasQuiz ? calculatePersonality(person.quizAnswers) : null;
  const [answers, setAnswers] = useState(person.quizAnswers || {});
  const [showQuiz, setShowQuiz] = useState(!hasQuiz);

  const handleAnswer = (questionId, type) => {
    setAnswers(prev => ({ ...prev, [questionId]: type }));
  };

  const handleSubmitQuiz = () => {
    onSave({ quizAnswers: answers });
    setShowQuiz(false);
  };

  const allAnswered = QUIZ_QUESTIONS.every(q => answers[q.id]);

  if (showQuiz) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Kişilik Analiz Testi</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Her soruya en uygun cevabı seçin. Sistem mizaç tipini otomatik hesaplayacak.</p>
          </div>
          {hasQuiz && (
            <button onClick={() => setShowQuiz(false)} className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
              ← Sonuçlara Dön
            </button>
          )}
        </div>

        {QUIZ_QUESTIONS.map((q, idx) => (
          <div key={q.id} style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--accent-color)' }}>{idx + 1}.</span> {q.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {q.options.map(opt => {
                const type = TYPES[opt.type];
                const isSelected = answers[q.id] === opt.type;
                return (
                  <button
                    key={opt.type}
                    onClick={() => handleAnswer(q.id, opt.type)}
                    style={{
                      textAlign: 'left', padding: '0.875rem 1.25rem', borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? type.color : 'var(--border-color)'}`,
                      backgroundColor: isSelected ? type.bgColor : 'transparent',
                      color: isSelected ? type.color : 'var(--text-secondary)',
                      fontWeight: isSelected ? 600 : 400, cursor: 'pointer',
                      transition: 'all 0.2s ease', fontSize: '0.9rem',
                      display: 'flex', alignItems: 'center', gap: '0.75rem'
                    }}
                  >
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${isSelected ? type.color : 'var(--text-muted)'}`,
                      backgroundColor: isSelected ? type.color : 'transparent',
                      flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {isSelected && <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>}
                    </span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={handleSubmitQuiz}
            disabled={!allAnswered}
            className="btn btn-primary"
            style={{ padding: '0.875rem 2.5rem', opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? 'pointer' : 'not-allowed' }}
          >
            Analizi Tamamla →
          </button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const primary = result.primaryInfo;
  const secondary = result.secondaryInfo;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Birincil Tip */}
      <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: `2px solid ${primary.borderColor}`, backgroundColor: primary.bgColor }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>{primary.emoji}</span>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary.color, fontWeight: 700 }}>Baskın Mizaç</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: primary.color }}>{primary.name}</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px' }}>{primary.description}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: primary.color }}>{result.percentages[primary.key]}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>baskın eğilim</div>
          </div>
        </div>
      </div>

      {/* Tüm Puanlar */}
      <div className="grid-2" style={{ gap: '1rem' }}>
        {Object.values(TYPES).map(t => (
          <div key={t.key} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: `1px solid ${t.borderColor}`, backgroundColor: t.bgColor }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: t.color }}>{t.emoji} {t.name}</span>
              <span style={{ fontWeight: 700, color: t.color }}>{result.percentages[t.key]}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', borderRadius: '99px', backgroundColor: 'var(--border-color)' }}>
              <div style={{ width: `${result.percentages[t.key]}%`, height: '100%', borderRadius: '99px', backgroundColor: t.color, transition: 'width 1s ease' }} />
            </div>
            {t.key === result.secondaryType && result.percentages[t.key] > 0 && (
              <div style={{ fontSize: '0.7rem', color: t.color, marginTop: '0.25rem', fontWeight: 600 }}>İkincil eğilim</div>
            )}
          </div>
        ))}
      </div>

      {/* Güçlü / Zayıf */}
      <div className="grid-2" style={{ gap: '1rem' }}>
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(34,197,94,0.2)', backgroundColor: 'rgba(34,197,94,0.05)' }}>
          <div style={{ fontWeight: 700, color: '#16a34a', marginBottom: '0.75rem' }}>💪 Güçlü Yönler</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {primary.strengths.map((s, i) => <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>→ {s}</li>)}
          </ul>
        </div>
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.05)' }}>
          <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: '0.75rem' }}>⚡ Dikkat Edilmesi Gerekenler</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {primary.weaknesses.map((w, i) => <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>→ {w}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setShowQuiz(true)} className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
          🔄 Testi Yeniden Yap
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
//  ALT BİLEŞEN: Yönetici Rehberi
// ───────────────────────────────────────────────────────────────
function ManagerHandbookTab({ person }) {
  const hasQuiz = person.quizAnswers && Object.keys(person.quizAnswers).length === QUIZ_QUESTIONS.length;
  if (!hasQuiz) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '3rem' }}>📋</span>
        <h3 style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Henüz Kişilik Analizi Yapılmadı</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '400px' }}>
          Yönetici Rehberi oluşturmak için önce "Kişilik Analizi" sekmesinden 6 soruluk testi tamamlayın.
        </p>
      </div>
    );
  }

  const result = calculatePersonality(person.quizAnswers);
  if (!result) return null;
  const primary = result.primaryInfo;
  const secondary = result.secondaryInfo;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Başlık */}
      <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: `linear-gradient(135deg, ${primary.bgColor}, transparent)`, border: `1px solid ${primary.borderColor}` }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary.color, fontWeight: 700, marginBottom: '0.5rem' }}>
          Yönetici Rehberi
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          {person.name} ile Nasıl Çalışılır?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {primary.emoji} <strong>{primary.name}</strong> baskın mizaç / {secondary.emoji} <strong>{secondary.name}</strong> ikincil eğilim
        </p>
      </div>

      {/* İletişim Stili */}
      <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>💬</span> İletişim Stili
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{primary.communicationStyle}</p>
      </div>

      {/* Eylem Tavsiyeleri */}
      <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🎯</span> Yönetici Eylem Tavsiyeleri
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {primary.managerTips.map((tip, i) => (
            <div key={i} style={{
              padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)',
              backgroundColor: tip.icon === '✅' ? 'rgba(34,197,94,0.06)' : tip.icon === '⚠️' ? 'rgba(245,158,11,0.06)' : 'rgba(239,68,68,0.06)',
              border: `1px solid ${tip.icon === '✅' ? 'rgba(34,197,94,0.2)' : tip.icon === '⚠️' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)'}`,
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{tip.icon}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{tip.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stres Yanıtı */}
      <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245,158,11,0.25)', backgroundColor: 'rgba(245,158,11,0.05)' }}>
        <div style={{ fontWeight: 700, color: '#b45309', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>⚡</span> Stres Altında Nasıl Davranır?
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{primary.stressResponse}</p>
      </div>

      {/* Motivasyon Anahtarları */}
      <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🔑</span> Motivasyon Anahtarları
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {primary.motivationKeys.map((k, i) => (
            <span key={i} style={{
              padding: '0.375rem 0.875rem', borderRadius: '99px',
              backgroundColor: primary.bgColor, color: primary.color,
              border: `1px solid ${primary.borderColor}`, fontSize: '0.875rem', fontWeight: 600
            }}>
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* İdeal Roller */}
      <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🏆</span> Yapısına En Uygun Roller
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {primary.idealRoles.map((r, i) => (
            <span key={i} style={{
              padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(79,70,229,0.08)', color: 'var(--accent-color)',
              border: '1px solid rgba(79,70,229,0.2)', fontSize: '0.875rem', fontWeight: 600
            }}>
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
//  ALT BİLEŞEN: Transfer Kartı (Yazdırılabilir)
// ───────────────────────────────────────────────────────────────
function TransferCardTab({ person }) {
  const hasQuiz = person.quizAnswers && Object.keys(person.quizAnswers).length === QUIZ_QUESTIONS.length;
  const result = hasQuiz ? calculatePersonality(person.quizAnswers) : null;
  const primary = result?.primaryInfo;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Dijital Transfer Kartı</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Yeni idareciye iletilmek üzere kişinin tüm profilini özetler.</p>
        </div>
        <button onClick={handlePrint} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🖨️ Yazdır / PDF
        </button>
      </div>

      {/* KARTın KENDİSİ */}
      <div id="transfer-card" style={{
        padding: '2.5rem', borderRadius: 'var(--radius-lg)',
        border: `2px solid ${primary ? primary.borderColor : 'var(--border-color)'}`,
        background: primary ? `linear-gradient(160deg, ${primary.bgColor} 0%, var(--card-bg) 50%)` : 'var(--card-bg)'
      }}>
        {/* Üst Şerit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>HocaTanım — Personel Transfer Kartı</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{person.name}</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{person.department} {person.experience ? `· ${person.experience}` : ''}</div>
          </div>
          {primary && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2.5rem' }}>{primary.emoji}</div>
              <div style={{ fontWeight: 700, color: primary.color, fontSize: '1rem' }}>{primary.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Baskın Mizaç</div>
            </div>
          )}
        </div>

        {/* İçerik Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* İlgi & Hobiler */}
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>İlgi Alanları & Hobiler</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{person.interests || '—'} {person.hobbies ? `· ${person.hobbies}` : ''}</p>
          </div>

          {/* Stres & Deşarj */}
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>Stres Kaynakları & Deşarj</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{person.stressTriggers || '—'} {person.reliefMethods ? `→ ${person.reliefMethods}` : ''}</p>
          </div>

          {/* Kariyer */}
          {person.careerPlan && (
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>Kariyer Planı</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{person.careerPlan}</p>
            </div>
          )}

          {/* Hedefler */}
          {(person.goalsShort || person.goalsMid || person.goalsLong) && (
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>Hedefler</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {person.goalsShort && <span>🔹 Kısa: {person.goalsShort}<br /></span>}
                {person.goalsMid && <span>🔸 Orta: {person.goalsMid}<br /></span>}
                {person.goalsLong && <span>🔶 Uzun: {person.goalsLong}</span>}
              </p>
            </div>
          )}

          {/* SWOT Özet */}
          {person.swot && (person.swot.strengths || person.swot.weaknesses) && (
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 700 }}>SWOT Özeti</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {person.swot.strengths && <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', marginBottom: '0.25rem' }}>GÜÇLÜ YÖNLER</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{person.swot.strengths}</p>
                </div>}
                {person.swot.weaknesses && <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.25rem' }}>GELİŞİM ALANLARI</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{person.swot.weaknesses}</p>
                </div>}
              </div>
            </div>
          )}

          {/* Yönetici Notu (Personality Summary) */}
          {primary && (
            <div style={{ gridColumn: 'span 2', padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: primary.bgColor, border: `1px solid ${primary.borderColor}` }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: primary.color, marginBottom: '0.5rem', fontWeight: 700 }}>
                🧠 YÖNETİCİ İÇİN ÖZET NOT
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {person.name} baskın olarak <strong style={{ color: primary.color }}>{primary.name}</strong> mizaç yapısına sahiptir. {primary.communicationStyle} En uygun roller: <strong>{primary.idealRoles.join(', ')}</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
//  ANA SAYFA
// ───────────────────────────────────────────────────────────────
export default function PersonelPage() {
  const { personnel, addPersonnel, removePersonnel, updatePersonnel } = useStore();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [activeTab, setActiveTab] = useState('kisisel');
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (personnel.length > 0 && !selectedPerson) {
      setSelectedPerson(personnel[0]);
    }
    // Seçili kişinin güncel verisini yansıt
    if (selectedPerson) {
      const updated = personnel.find(p => p.id === selectedPerson.id);
      if (updated) setSelectedPerson(updated);
    }
  }, [personnel]);

  const [formData, setFormData] = useState({
    name: '', department: '', status: 'Yeni Başlayan', experience: '',
    interests: '', hobbies: '', phobias: '', stressTriggers: '', reliefMethods: '',
    careerPlan: '', goalsShort: '', goalsMid: '', goalsLong: '', masterPlan: '',
    swot: { strengths: '', weaknesses: '', opportunities: '', threats: '' },
  });

  if (!mounted) return null;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addPersonnel(formData);
    setIsAdding(false);
    setFormData({
      name: '', department: '', status: 'Yeni Başlayan', experience: '',
      interests: '', hobbies: '', phobias: '', stressTriggers: '', reliefMethods: '',
      careerPlan: '', goalsShort: '', goalsMid: '', goalsLong: '', masterPlan: '',
      swot: { strengths: '', weaknesses: '', opportunities: '', threats: '' },
    });
  };

  const handleDelete = () => {
    if (confirm('Bu personeli silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      removePersonnel(selectedPerson.id);
      setSelectedPerson(null);
    }
  };

  const handleSavePersonalityData = (data) => {
    updatePersonnel(selectedPerson.id, data);
  };

  const TABS = [
    { key: 'kisisel', label: 'Kişisel & Deneyim' },
    { key: 'psikolojik', label: 'Psikolojik Profil' },
    { key: 'kariyer', label: 'Kariyer & Hedefler' },
    { key: 'swot', label: 'SWOT Analizi' },
    { key: 'analiz', label: '🧠 Kişilik Analizi' },
    { key: 'rehber', label: '📋 Yönetici Rehberi' },
    { key: 'transfer', label: '🪪 Transfer Kartı' },
  ];

  return (
    <>
      <header className="top-header">
        <h1 className="page-title">Personel Profili & Yönetimi</h1>
        <div className="header-actions">
          {isAdding ? (
            <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>İptal Et</button>
          ) : (
            <button className="btn btn-primary" onClick={() => { setIsAdding(true); setSelectedPerson(null); }}>+ Yeni Personel Ekle</button>
          )}
        </div>
      </header>

      <div className="split-layout">
        {/* Sol Liste */}
        <div className="card split-sidebar">
          <h2 className="card-title">Personel Listesi</h2>
          {personnel.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Henüz kayıtlı personel yok.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {personnel.map(p => {
                const hasQuiz = p.quizAnswers && Object.keys(p.quizAnswers).length === QUIZ_QUESTIONS.length;
                const result = hasQuiz ? calculatePersonality(p.quizAnswers) : null;
                const primary = result?.primaryInfo;
                const isActive = selectedPerson?.id === p.id && !isAdding;
                return (
                  <div
                    key={p.id}
                    onClick={() => { setSelectedPerson(p); setIsAdding(false); setActiveTab('kisisel'); }}
                    style={{
                      padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      backgroundColor: isActive ? 'rgb(79 70 229 / 0.1)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--accent-color)' : 'var(--border-color)'}`,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{p.name}</div>
                      {primary && <span title={primary.name} style={{ fontSize: '1.1rem' }}>{primary.emoji}</span>}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>{p.department}</div>
                    {!hasQuiz && <div style={{ fontSize: '0.7rem', color: '#f59e0b', marginTop: '0.25rem' }}>⚠ Analiz eksik</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sağ İçerik */}
        <div className="card split-content">
          {isAdding ? (
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Yeni Personel Ekle</h2>

              <div className="grid-2">
                <div className="form-group"><label className="form-label">Ad Soyad</label><input required className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Departman / Kurum</label><input required className="form-input" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} /></div>
                <div className="form-group">
                  <label className="form-label">Durum</label>
                  <select className="form-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option>Yeni Başlayan</option><option>Değerlendirmede</option><option>Yüksek Performans</option><option>Riskli</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Deneyim (Örn: 5 Yıl)</label><input className="form-input" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">İlgi Alanları</label><textarea className="form-input" value={formData.interests} onChange={e => setFormData({ ...formData, interests: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Hobileri</label><textarea className="form-input" value={formData.hobbies} onChange={e => setFormData({ ...formData, hobbies: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Fobileri</label><textarea className="form-input" value={formData.phobias} onChange={e => setFormData({ ...formData, phobias: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Strese Sokan Haller</label><textarea className="form-input" value={formData.stressTriggers} onChange={e => setFormData({ ...formData, stressTriggers: e.target.value })} /></div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Deşarj Yöntemleri</label><textarea className="form-input" value={formData.reliefMethods} onChange={e => setFormData({ ...formData, reliefMethods: e.target.value })} /></div>
              </div>

              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Kariyer & Hedefler</h3>
              <div className="grid-2">
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Kariyer Planlaması</label><textarea className="form-input" value={formData.careerPlan} onChange={e => setFormData({ ...formData, careerPlan: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Kısa Vade</label><input className="form-input" value={formData.goalsShort} onChange={e => setFormData({ ...formData, goalsShort: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Orta Vade</label><input className="form-input" value={formData.goalsMid} onChange={e => setFormData({ ...formData, goalsMid: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Uzun Vade</label><input className="form-input" value={formData.goalsLong} onChange={e => setFormData({ ...formData, goalsLong: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Master Plan</label><input className="form-input" value={formData.masterPlan} onChange={e => setFormData({ ...formData, masterPlan: e.target.value })} /></div>
              </div>

              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>SWOT Analizi</h3>
              <div className="grid-2">
                <div className="form-group"><label className="form-label" style={{ color: '#16a34a' }}>S — Güçlü Yönler</label><textarea className="form-input" value={formData.swot.strengths} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, strengths: e.target.value } })} /></div>
                <div className="form-group"><label className="form-label" style={{ color: '#dc2626' }}>W — Zayıf Yönler</label><textarea className="form-input" value={formData.swot.weaknesses} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, weaknesses: e.target.value } })} /></div>
                <div className="form-group"><label className="form-label" style={{ color: '#0284c7' }}>O — Fırsatlar</label><textarea className="form-input" value={formData.swot.opportunities} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, opportunities: e.target.value } })} /></div>
                <div className="form-group"><label className="form-label" style={{ color: '#ca8a04' }}>T — Tehditler</label><textarea className="form-input" value={formData.swot.threats} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, threats: e.target.value } })} /></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem 2.5rem' }}>Kaydet & Ekle</button>
              </div>
            </form>

          ) : selectedPerson ? (
            <>
              {/* Profil Başlığı */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedPerson.name}</h2>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span className={`badge ${selectedPerson.status === 'Yüksek Performans' ? 'badge-success' : selectedPerson.status === 'Riskli' ? 'badge-danger' : selectedPerson.status === 'Değerlendirmede' ? 'badge-warning' : 'badge-info'}`}>{selectedPerson.status}</span>
                    {selectedPerson.department && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>· {selectedPerson.department}</span>}
                    {selectedPerson.experience && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>· {selectedPerson.experience}</span>}
                  </div>
                </div>
                <button onClick={handleDelete} className="btn" style={{ backgroundColor: 'rgb(239 68 68 / 0.1)', color: '#dc2626', flexShrink: 0 }}>
                  🗑 Sil
                </button>
              </div>

              {/* Sekmeler */}
              <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', overflowX: 'auto', flexShrink: 0 }}>
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: '0.5rem 0.875rem', background: 'none', border: 'none', whiteSpace: 'nowrap',
                      borderBottom: `2px solid ${activeTab === tab.key ? 'var(--accent-color)' : 'transparent'}`,
                      color: activeTab === tab.key ? 'var(--accent-color)' : 'var(--text-secondary)',
                      fontWeight: activeTab === tab.key ? 700 : 400, cursor: 'pointer', fontSize: '0.875rem'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sekme İçerikleri */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeTab === 'kisisel' && (
                  <div className="grid-2">
                    <div><span className="form-label">Deneyim</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.experience || '—'}</p></div>
                    <div><span className="form-label">İlgi Alanları</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.interests || '—'}</p></div>
                    <div><span className="form-label">Hobileri</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.hobbies || '—'}</p></div>
                    <div><span className="form-label">Fobileri</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.phobias || '—'}</p></div>
                  </div>
                )}
                {activeTab === 'psikolojik' && (
                  <div className="grid-2">
                    <div><span className="form-label">Strese Sokan Haller</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.stressTriggers || '—'}</p></div>
                    <div><span className="form-label">Deşarj & Rahatlama</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.reliefMethods || '—'}</p></div>
                  </div>
                )}
                {activeTab === 'kariyer' && (
                  <div className="grid-2">
                    <div style={{ gridColumn: 'span 2' }}><span className="form-label">Kariyer Planlaması</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.careerPlan || '—'}</p></div>
                    <div><span className="form-label">Kısa Vade</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.goalsShort || '—'}</p></div>
                    <div><span className="form-label">Orta Vade</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.goalsMid || '—'}</p></div>
                    <div><span className="form-label">Uzun Vade</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.goalsLong || '—'}</p></div>
                    <div><span className="form-label">Master Plan</span><p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedPerson.masterPlan || '—'}</p></div>
                  </div>
                )}
                {activeTab === 'swot' && (
                  <div className="grid-2">
                    <div style={{ padding: '1rem', backgroundColor: 'rgb(34 197 94 / 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgb(34 197 94 / 0.2)' }}>
                      <span className="form-label" style={{ color: '#16a34a', fontWeight: 700 }}>S — Güçlü Yönler</span>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{selectedPerson.swot?.strengths || '—'}</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'rgb(239 68 68 / 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgb(239 68 68 / 0.2)' }}>
                      <span className="form-label" style={{ color: '#dc2626', fontWeight: 700 }}>W — Zayıf Yönler</span>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{selectedPerson.swot?.weaknesses || '—'}</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'rgb(56 189 248 / 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgb(56 189 248 / 0.2)' }}>
                      <span className="form-label" style={{ color: '#0284c7', fontWeight: 700 }}>O — Fırsatlar</span>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{selectedPerson.swot?.opportunities || '—'}</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'rgb(234 179 8 / 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgb(234 179 8 / 0.2)' }}>
                      <span className="form-label" style={{ color: '#ca8a04', fontWeight: 700 }}>T — Tehditler</span>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{selectedPerson.swot?.threats || '—'}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'analiz' && <PersonalityTab person={selectedPerson} onSave={handleSavePersonalityData} />}
                {activeTab === 'rehber' && <ManagerHandbookTab person={selectedPerson} />}
                {activeTab === 'transfer' && <TransferCardTab person={selectedPerson} />}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '3rem' }}>👤</span>
              <p>Sol taraftan bir personel seçin veya yeni ekleyin.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
