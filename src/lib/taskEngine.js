export const TASK_KEYWORDS = {
  K: {
    words: ['kurban', 'pazarlık', 'hızlı', 'acil', 'kriz', 'çözüm', 'karar', 'yönet', 'yönetim', 'satın', 'satış', 'risk', 'cesaret', 'hedef', 'aksiyon', 'inşa'],
    reason: 'Kolerikler sonuç odaklıdır ve inisiyatif almaktan çekinmezler. Hızlı karar alma, pazarlık yapma veya kriz yönetimi gerektiren görevlerde en yüksek performansı gösterirler. Hedefe kilitlenir ve işi koparırlar.'
  },
  M: {
    words: ['detay', 'hesap', 'analiz', 'rapor', 'plan', 'kalite', 'kontrol', 'mükemmel', 'düzenle', 'araştır', 'bütçe', 'sistem', 'denetle', 'hata'],
    reason: 'Melankolikler yüksek standartlara sahip, analitik ve detaycıdır. Bir işin hatasız, planlı ve en ince ayrıntısına kadar düşünülerek yapılması gerekiyorsa (örn: hesap, raporlama) en güvenilir kişiler onlardır.'
  },
  S: {
    words: ['iletişim', 'sunum', 'etkinlik', 'misafir', 'yaratıcı', 'fikir', 'sosyal', 'ikna', 'tanıtım', 'eğlence', 'konuş', 'motivasyon', 'toplantı', 'ara', 'tasarım'],
    reason: 'Sanguinler dışa dönük, enerjik ve ikna kabiliyeti yüksektir. İnsanlarla sıcak iletişim kurma, bir fikri satma, misafir karşılama veya etkinlik organize etme gibi sosyal görevlerde doğal olarak parlarlar.'
  },
  F: {
    words: ['rutin', 'destek', 'sabır', 'uyum', 'sakin', 'yardım', 'takip', 'düzen', 'taşı', 'yerleştir', 'arka plan', 'arabulucu', 'dinle'],
    reason: 'Flegmatikler sakin, tutarlı ve güvenilirdir. Stres ve baskı altında soğukkanlılıklarını korurlar. Sabır gerektiren, uzun vadeli takip veya arka plan destek görevlerinde ekibin en sağlam taşıyıcısıdırlar.'
  }
};

export function analyzeTask(taskText) {
  if (!taskText || taskText.trim().length < 3) return null;
  
  // Türkçe karakterleri de destekleyen basit bir küçük harf dönüşümü
  const text = taskText.toLowerCase();
  
  let scores = { K: 0, M: 0, S: 0, F: 0 };
  let matchedKeywords = { K: [], M: [], S: [], F: [] };
  
  Object.keys(TASK_KEYWORDS).forEach(type => {
    TASK_KEYWORDS[type].words.forEach(word => {
      // Kelime bazlı basit arama
      if (text.includes(word)) {
        scores[type] += 1;
        matchedKeywords[type].push(word);
      }
    });
  });
  
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  if (totalScore === 0) {
    return { status: 'no_match' };
  }
  
  // Skorlara göre sırala
  const sortedTypes = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const bestType = sortedTypes[0];
  
  return {
    status: 'success',
    bestMatch: bestType,
    scores: scores,
    matchedKeywords: matchedKeywords[bestType],
    reason: TASK_KEYWORDS[bestType].reason
  };
}
