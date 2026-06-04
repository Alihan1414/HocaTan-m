'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function HedeflerPage() {
  const { goals, personnel, addGoal, removeGoal } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    status: 'Devam Ediyor',
    assigneeId: ''
  });

  if (!mounted) return null;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addGoal({ ...formData, assigneeId: parseInt(formData.assigneeId) });
    setIsAdding(false);
    setFormData({ title: '', status: 'Devam Ediyor', assigneeId: '' });
  };

  const handleDelete = (id) => {
    if (confirm('Bu hedefi silmek istediğinize emin misiniz?')) {
      removeGoal(id);
    }
  };

  return (
    <>
      <header className="top-header">
        <h1 className="page-title">Hedef Yönetimi</h1>
        <div className="header-actions">
          {isAdding ? (
            <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>İptal Et</button>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsAdding(true)}>+ Yeni Hedef Ata</button>
          )}
        </div>
      </header>

      {isAdding && (
        <section className="card" style={{ marginTop: '2rem' }}>
          <h2 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Yeni Hedef Ekle</h2>
          <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Hedef Başlığı</label>
                <input required className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Sorumlu Personel</label>
                <select required className="form-input" value={formData.assigneeId} onChange={e => setFormData({...formData, assigneeId: e.target.value})}>
                  <option value="">Seçiniz...</option>
                  {personnel.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Durum</label>
                <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option>Devam Ediyor</option>
                  <option>Ulaşıldı</option>
                  <option>Riskli</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Kaydet</button>
            </div>
          </form>
        </section>
      )}

      <section style={{ marginTop: '2rem' }}>
        <div className="card">
          <h2 className="card-title">Ortak Hedefler</h2>
          {goals.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Henüz kayıtlı hedef yok.</p>
          ) : (
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '1rem 0' }}>Hedef</th>
                  <th>Sorumlu Personel</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {goals.map(goal => {
                  const person = personnel.find(p => p.id === goal.assigneeId);
                  return (
                    <tr key={goal.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-primary)' }}>{goal.title}</td>
                      <td>{person ? person.name : 'Atanmadı (veya Silinmiş)'}</td>
                      <td>
                        <span className={`badge ${goal.status === 'Ulaşıldı' ? 'badge-success' : goal.status === 'Riskli' ? 'badge-danger' : 'badge-warning'}`}>
                          {goal.status}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(goal.id)} className="btn" style={{ padding: '0.25rem 0.75rem', backgroundColor: 'rgb(239 68 68 / 0.1)', color: '#dc2626' }}>Sil</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
