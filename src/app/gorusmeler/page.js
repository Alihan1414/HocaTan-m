'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function GorusmelerPage() {
  const { meetings, personnel, addMeeting, removeMeeting, updateMeeting } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    personnelId: '',
    date: '',
    topic: '',
    status: 'Planlandı'
  });

  if (!mounted) return null;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addMeeting({ ...formData, personnelId: parseInt(formData.personnelId) });
    setIsAdding(false);
    setFormData({ personnelId: '', date: '', topic: '', status: 'Planlandı' });
  };

  const handleDelete = (id) => {
    if (confirm('Bu görüşmeyi silmek istediğinize emin misiniz?')) {
      removeMeeting(id);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateMeeting(id, { status: newStatus });
  };

  return (
    <>
      <header className="top-header">
        <h1 className="page-title">Kariyer Görüşmeleri</h1>
        <div className="header-actions">
          {isAdding ? (
            <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>İptal Et</button>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsAdding(true)}>+ Yeni Görüşme Planla</button>
          )}
        </div>
      </header>

      {isAdding && (
        <section className="card" style={{ marginTop: '2rem' }}>
          <h2 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Yeni Görüşme Planla</h2>
          <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Personel</label>
                <select required className="form-input" value={formData.personnelId} onChange={e => setFormData({...formData, personnelId: e.target.value})}>
                  <option value="">Seçiniz...</option>
                  {personnel.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tarih ve Saat</label>
                <input type="datetime-local" required className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Görüşme Konusu (Örn: Q3 Performans, Kariyer Hedefleri vb.)</label>
                <input required className="form-input" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Durum</label>
                <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option>Planlandı</option>
                  <option>Tamamlandı</option>
                  <option>İptal Edildi</option>
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
          <h2 className="card-title">Görüşme Takvimi</h2>
          {meetings.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Henüz planlanmış bir görüşme bulunmuyor.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', textAlign: 'left', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <th style={{ padding: '1rem 0' }}>Tarih & Saat</th>
                    <th>Personel</th>
                    <th>Konu</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map(meeting => {
                    const person = personnel.find(p => p.id === meeting.personnelId);
                    const dateObj = new Date(meeting.date);
                    const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                    
                    return (
                      <tr key={meeting.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-primary)' }}>{dateStr}</td>
                        <td>{person ? person.name : 'Silinmiş Personel'}</td>
                        <td>{meeting.topic}</td>
                        <td>
                          <select 
                            className="form-input" 
                            style={{ padding: '0.25rem 0.5rem', width: 'auto', fontSize: '0.875rem' }}
                            value={meeting.status} 
                            onChange={(e) => handleStatusChange(meeting.id, e.target.value)}
                          >
                            <option>Planlandı</option>
                            <option>Tamamlandı</option>
                            <option>İptal Edildi</option>
                          </select>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(meeting.id)} className="btn" style={{ padding: '0.25rem 0.75rem', backgroundColor: 'rgb(239 68 68 / 0.1)', color: '#dc2626' }}>Sil</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
