'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { QUIZ_QUESTIONS, TYPES, calculatePersonality } from '@/lib/personalityEngine';
import { useParams } from 'next/navigation';

export default function AnketPage() {
  const params = useParams();
  const { personnel, updatePersonnel } = useStore();
  
  const [mounted, setMounted] = useState(false);
  const [person, setPerson] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    interests: '', hobbies: '', phobias: '', stressTriggers: '', reliefMethods: '',
    careerPlan: '', goalsShort: '', goalsMid: '', goalsLong: '', masterPlan: '',
    swot: { strengths: '', weaknesses: '', opportunities: '', threats: '' },
    quizAnswers: {}
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (personnel.length > 0 && params?.id) {
      const found = personnel.find(p => p.id === parseInt(params.id));
      if (found) {
        setPerson(found);
        setFormData({
          interests: found.interests || '',
          hobbies: found.hobbies || '',
          phobias: found.phobias || '',
          stressTriggers: found.stressTriggers || '',
          reliefMethods: found.reliefMethods || '',
          careerPlan: found.careerPlan || '',
          goalsShort: found.goalsShort || '',
          goalsMid: found.goalsMid || '',
          goalsLong: found.goalsLong || '',
          masterPlan: found.masterPlan || '',
          swot: found.swot || { strengths: '', weaknesses: '', opportunities: '', threats: '' },
          quizAnswers: found.quizAnswers || {}
        });
        
        // Eğer daha önce doldurmuşsa veya testi tamamlamışsa kontrol edilebilir.
        // Şimdilik üstüne yazmasına izin veriyoruz.
      }
    }
  }, [personnel, params]);

  if (!mounted) return null;

  if (!person) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <h2 style={{ color: 'var(--text-primary)' }}>Personel bulunamadı veya link geçersiz.</h2>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Teşekkürler, {person.name}!</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.6 }}>
          Formunuz ve kişilik analiz testiniz başarıyla kaydedildi. Verileriniz yönetici panelinize iletilmiştir. Bu sekmeyi kapatabilirsiniz.
        </p>
      </div>
    );
  }

  const handleAnswer = (questionId, type) => {
    setFormData(prev => ({ ...prev, quizAnswers: { ...prev.quizAnswers, [questionId]: type } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // G1-G4 atamasını otomatikleştirebiliriz ama idarecinin inisiyatifinde kalması daha iyi.
    // Biz sadece doldurulan form verilerini güncelliyoruz.
    updatePersonnel(person.id, formData);
    setIsSubmitted(true);
  };

  const allQuizAnswered = QUIZ_QUESTIONS.every(q => formData.quizAnswers[q.id]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Personel Tanım Formu</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Hoş geldiniz, <strong>{person.name}</strong>. Lütfen aşağıdaki bilgileri eksiksiz doldurun.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* KİŞİSEL BİLGİLER */}
        <section className="card">
          <h2 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Kişisel Bilgiler & Psikoloji</h2>
          <div className="grid-2">
            <div className="form-group"><label className="form-label">İlgi Alanları</label><textarea className="form-input" value={formData.interests} onChange={e => setFormData({ ...formData, interests: e.target.value })} placeholder="Nelerle ilgilenirsiniz?" /></div>
            <div className="form-group"><label className="form-label">Hobiler</label><textarea className="form-input" value={formData.hobbies} onChange={e => setFormData({ ...formData, hobbies: e.target.value })} placeholder="Boş zamanlarınızda neler yaparsınız?" /></div>
            <div className="form-group"><label className="form-label">Fobiler</label><textarea className="form-input" value={formData.phobias} onChange={e => setFormData({ ...formData, phobias: e.target.value })} placeholder="Çekindiğiniz / korktuğunuz şeyler?" /></div>
            <div className="form-group"><label className="form-label">Sizi Strese Sokan Haller</label><textarea className="form-input" value={formData.stressTriggers} onChange={e => setFormData({ ...formData, stressTriggers: e.target.value })} placeholder="İş ortamında sizi en çok ne gerer?" /></div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Deşarj Yöntemleri</label><textarea className="form-input" value={formData.reliefMethods} onChange={e => setFormData({ ...formData, reliefMethods: e.target.value })} placeholder="Stresli olduğunuzda nasıl rahatlarsınız?" /></div>
          </div>
        </section>

        {/* KARİYER & HEDEFLER */}
        <section className="card">
          <h2 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Kariyer & Hedefler</h2>
          <div className="grid-2">
            <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Kariyer Planlaması</label><textarea className="form-input" value={formData.careerPlan} onChange={e => setFormData({ ...formData, careerPlan: e.target.value })} placeholder="Kendinizi nerede görüyorsunuz?" /></div>
            <div className="form-group"><label className="form-label">Kısa Vadeli Hedef</label><input className="form-input" value={formData.goalsShort} onChange={e => setFormData({ ...formData, goalsShort: e.target.value })} placeholder="Örn: 6 Ay" /></div>
            <div className="form-group"><label className="form-label">Orta Vadeli Hedef</label><input className="form-input" value={formData.goalsMid} onChange={e => setFormData({ ...formData, goalsMid: e.target.value })} placeholder="Örn: 1-2 Yıl" /></div>
            <div className="form-group"><label className="form-label">Uzun Vadeli Hedef</label><input className="form-input" value={formData.goalsLong} onChange={e => setFormData({ ...formData, goalsLong: e.target.value })} placeholder="Örn: 5+ Yıl" /></div>
            <div className="form-group"><label className="form-label">Master Plan (Nihai Hayal)</label><input className="form-input" value={formData.masterPlan} onChange={e => setFormData({ ...formData, masterPlan: e.target.value })} placeholder="Zirve noktanız" /></div>
          </div>
        </section>

        {/* SWOT ANALİZİ */}
        <section className="card">
          <h2 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Kişisel SWOT Analizi (Öz Değerlendirme)</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Kendinizi nasıl görüyorsunuz? Güçlü yönleriniz, eksiklikleriniz neler?</p>
          <div className="grid-2">
            <div className="form-group"><label className="form-label" style={{ color: '#16a34a' }}>S — Güçlü Yönler</label><textarea className="form-input" value={formData.swot.strengths} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, strengths: e.target.value } })} placeholder="Nelerde iyisiniz?" /></div>
            <div className="form-group"><label className="form-label" style={{ color: '#dc2626' }}>W — Zayıf (Gelişim) Yönler</label><textarea className="form-input" value={formData.swot.weaknesses} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, weaknesses: e.target.value } })} placeholder="Neleri geliştirmelisiniz?" /></div>
            <div className="form-group"><label className="form-label" style={{ color: '#0284c7' }}>O — Fırsatlar</label><textarea className="form-input" value={formData.swot.opportunities} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, opportunities: e.target.value } })} placeholder="Dışarıdaki fırsatlarınız?" /></div>
            <div className="form-group"><label className="form-label" style={{ color: '#ca8a04' }}>T — Tehditler</label><textarea className="form-input" value={formData.swot.threats} onChange={e => setFormData({ ...formData, swot: { ...formData.swot, threats: e.target.value } })} placeholder="Karşılaşabileceğiniz riskler?" /></div>
          </div>
        </section>

        {/* KİŞİLİK ANALİZ TESTİ */}
        <section className="card" style={{ border: '2px solid var(--accent-color)' }}>
          <h2 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>🧠 Kişilik Analiz Testi</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Lütfen aşağıdaki 6 soruda kendinize en yakın hissettiğiniz seçeneği işaretleyin.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div key={q.id} style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--accent-color)' }}>{idx + 1}.</span> {q.question}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {q.options.map(opt => {
                    const type = TYPES[opt.type];
                    const isSelected = formData.quizAnswers[q.id] === opt.type;
                    return (
                      <button
                        type="button"
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
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={!allQuizAnswered}
            style={{ 
              padding: '1rem 3rem', fontSize: '1.1rem', 
              opacity: allQuizAnswered ? 1 : 0.5, 
              cursor: allQuizAnswered ? 'pointer' : 'not-allowed' 
            }}
          >
            {allQuizAnswered ? 'Gönder ve Tamamla' : 'Tüm Test Sorularını Cevaplayın'}
          </button>
        </div>
        {!allQuizAnswered && (
          <p style={{ textAlign: 'right', color: '#dc2626', fontSize: '0.875rem', marginTop: '-1.5rem' }}>
            * Gönderebilmek için kişilik testindeki tüm soruları işaretlemelisiniz.
          </p>
        )}
      </form>
    </div>
  );
}
