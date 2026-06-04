// =============================================================
//  HocaTanım — Kişilik Analiz Motoru
//  Hippokrates'in 4 mizaç teorisi (Kolerik / Melankolik / Flegmatik / Sanguin)
//  Sisteme girilen quiz cevaplarına göre otomatik puanlama yapar,
//  idareciye doğrudan aksiyon tavsiyeleri üretir.
// =============================================================

export const TYPES = {
  K: {
    key: 'K',
    name: 'Kolerik',
    emoji: '🔥',
    subtitle: 'Doğuştan Lider',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.25)',
    tagColor: '#fef2f2',
    description:
      'Kararlı, hızlı ve hedef odaklı. Sonuç almak için harekete geçer, zorluklardan yılmaz. ' +
      'Liderlik içgüdüsü güçlüdür; gerektiğinde her rolü üstlenebilir.',
    strengths: [
      'Güçlü liderlik ve inisiyatif alma',
      'Hızlı ve kararlı karar verme',
      'Yüksek motivasyon ve enerji',
      'Hedef odaklılık ve sonuç alma',
    ],
    weaknesses: [
      'Sabırsızlık ve tepkisellik',
      'Kontrolcülük eğilimi',
      'Başkalarını dinlemekte güçlük',
      'Empati eksikliği',
    ],
    managerTips: [
      { icon: '✅', text: 'Sorumluluk ve yetki verin; sonuçları takip edin ama sürece karışmayın.' },
      { icon: '✅', text: 'İletişimde doğrudan ve net olun. Dolaylı ya da muğlak konuşmaktan kaçının.' },
      { icon: '✅', text: 'Başarılarını herkese açıkça ve zamanında takdir edin.' },
      { icon: '⚠️', text: 'Eleştiriyi her zaman birebir, özel ortamda yapın. Topluluk önünde asla küçük düşürmeyin.' },
      { icon: '⚠️', text: 'Hedefsiz bırakmayın; net görev tanımları ve son tarihler motivasyonunu artırır.' },
      { icon: '❌', text: 'Uzun süreli rutin ve tekrar gerektiren görevlerde bırakmayın; verimlilik düşer.' },
    ],
    idealRoles: ['Takım Lideri', 'Proje Yöneticisi', 'Satış Direktörü', 'Kriz Yöneticisi'],
    communicationStyle: 'Kısa, net ve sonuç odaklı. "Neden?" den önce "Ne yapacağız?" sorusunu sever.',
    stressResponse:
      'Stres altında aktif kalır, çözüm üretir. Ancak kontrolü kaybedince saldırganlaşabilir. ' +
      'Onu sakinleştirmek yerine "Bunu çözmek için sana güveniyorum" deyin.',
    motivationKeys: ['Başarı ve tanınma', 'Yetki ve özerklik', 'Rekabet ve zorluk'],
  },

  M: {
    key: 'M',
    name: 'Melankolik',
    emoji: '🎯',
    subtitle: 'Derin Düşünür & Analist',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.25)',
    tagColor: '#faf5ff',
    description:
      'Analitik, mükemmeliyetçi ve derinlemesine düşünen. Detaylara son derece dikkat eder. ' +
      'Kaliteden ödün vermez; güvenilirliği ve özeni ile fark yaratır.',
    strengths: [
      'Derin analitik düşünce',
      'Mükemmeliyetçilik ve kalite odağı',
      'Güvenilirlik ve bağlılık',
      'Detaylı ve sistematik çalışma',
    ],
    weaknesses: [
      'Aşırı öz-eleştiri',
      'Karar vermekte gecikme',
      'Sosyal ortamlarda çekingenlik',
      'Aşırı analiz — "Analysis Paralysis"',
    ],
    managerTips: [
      { icon: '✅', text: 'Net görev tanımları ve beklentiler belirleyin. Belirsizlik onu felç eder.' },
      { icon: '✅', text: 'Eleştiriyi her zaman özel, yapıcı ve destekleyici şekilde yapın.' },
      { icon: '✅', text: 'Çalışmasının kalitesini ve özenini fark ettiğinizi gösterin.' },
      { icon: '⚠️', text: 'Aceleci kararlar almaya zorlamayın; analiz için yeterli süre tanıyın.' },
      { icon: '⚠️', text: 'Kaotik, plansız ve değişken ortamlardan koruyun; istikrar verimini artırır.' },
      { icon: '❌', text: 'Topluluk önünde eleştirmeyin ya da küçük düşürmeyin; etkileri çok derin ve uzun süreli olur.' },
    ],
    idealRoles: ['Kalite Kontrol Uzmanı', 'Ar-Ge Uzmanı', 'Finans/Muhasebe', 'Veri Analisti', 'Teknik Danışman'],
    communicationStyle: 'Yazılı ve detaylı iletişimi sever. E-posta veya belgeler konuşmadan daha etkilidir.',
    stressResponse:
      'Stres altında içe kapanır ve aşırı analiz yapar. Kendini suçlama eğilimi artar. ' +
      '"Sen çok değerlisin, hata herkesin başına gelir" tarzında güvence verin.',
    motivationKeys: ['Kalite standartları', 'Uzmanlık geliştirme', 'Takdir ve güvence'],
  },

  F: {
    key: 'F',
    name: 'Flegmatik',
    emoji: '🌊',
    subtitle: 'Uzlaştırıcı & Ekip Tutkalı',
    color: '#0ea5e9',
    bgColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: 'rgba(14, 165, 233, 0.25)',
    tagColor: '#f0f9ff',
    description:
      'Sakin, sabırlı ve diplomatik. Ekip içindeki çatışmaları doğal arabulucu rolüyle çözer. ' +
      'Tutarlı ve güvenilirdir; değişim yerine sürdürülebilirliği tercih eder.',
    strengths: [
      'Üstün sabır ve dinleme becerisi',
      'Doğal uzlaştırıcılık ve diplomasi',
      'Tutarlılık ve güvenilirlik',
      'Sakin kriz yönetimi',
    ],
    weaknesses: [
      'Değişime direnç',
      'Pasiflik ve motivasyon eksikliği',
      'Karar vermekten kaçınma',
      'Çatışmadan kaçınma (sorunları görmezden gelme)',
    ],
    managerTips: [
      { icon: '✅', text: 'Güvenli, istikrarlı ve öngörülebilir bir çalışma ortamı sunun.' },
      { icon: '✅', text: 'Sabır, güvenilirlik ve tutarlılığını açıkça ve samimiyetle takdir edin.' },
      { icon: '✅', text: 'Ekip içi uyum ve arabuluculuk gerektiren görevlerde öne çıkarın.' },
      { icon: '⚠️', text: 'Büyük değişiklikleri önceden haber verin ve yavaş yavaş tanıtın.' },
      { icon: '⚠️', text: 'Harekete geçmesi için kişisel motivasyon kaynağını bulun.' },
      { icon: '❌', text: 'Yoğun çatışma ortamlarına ya da sürekli baskı altındaki pozisyonlara atamayın.' },
    ],
    idealRoles: ['İK Uzmanı', 'Müşteri İlişkileri', 'Eğitim Koordinatörü', 'İdari Uzman', 'Kalite Güvence'],
    communicationStyle: 'Sıcak, destekleyici ve kişisel. "Nasılsın?" diye sormayı gerçekten takdir eder.',
    stressResponse:
      'Stres altında geri çekilir, sessizleşir ve sorunların kendiliğinden çözülmesini bekler. ' +
      '"Seninle konuşmak istiyorum, nasıl yardımcı olabilirim?" yaklaşımı kapıyı açar.',
    motivationKeys: ['Ekip uyumu ve huzur', 'Takdir ve güvence', 'Düzenli ve istikrarlı ortam'],
  },

  S: {
    key: 'S',
    name: 'Sanguin',
    emoji: '⚡',
    subtitle: 'Enerji Kaynağı & Yaratıcı',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    tagColor: '#fffbeb',
    description:
      'Enerjik, sosyal ve yaratıcı. Çevresiyle hızla bağ kurar, grubu motive eder. ' +
      'Yeni fikirlere açık; uyum sağlama hızı çok yüksektir.',
    strengths: [
      'Yüksek sosyal zeka ve karizmatik iletişim',
      'Yaratıcılık ve yenilikçilik',
      'Enerji, heves ve grup motivasyonu',
      'Hızlı uyum sağlama',
    ],
    weaknesses: [
      'Odaklanma güçlüğü ve dağınıklık',
      'Organizasyon eksikliği',
      'Aşırı iyimserlik ve gerçekçi olmayan hedefler',
      'İşleri yarım bırakma eğilimi',
    ],
    managerTips: [
      { icon: '✅', text: 'Çeşitlilik ve yenilik içeren görevler verin. Rutin, motivasyonu öldürür.' },
      { icon: '✅', text: 'Başarılarını herkese açıkça, coşkuyla ve zamanında kutlayın.' },
      { icon: '✅', text: 'Sosyal etkileşim ve temsil gerektiren rollerde öne çıkarın.' },
      { icon: '⚠️', text: 'Uzun vadeli görevlerde sık kontrol noktaları koyun; kaybolmadan yönlendirin.' },
      { icon: '⚠️', text: 'Organizasyon için sistemler ve hatırlatıcılar oluşturmasına yardımcı olun.' },
      { icon: '❌', text: 'Uzun süreli izole, rutin ve tekrara dayalı görevlere atamayın; performans çöker.' },
    ],
    idealRoles: ['Halkla İlişkiler', 'Eğitimci / Koç', 'Yaratıcı Direktör', 'Satış & Pazarlama', 'Etkinlik Yöneticisi'],
    communicationStyle: 'Yüz yüze, enerjik ve pozitif. Kısa mesajlardan çok sohbeti sever.',
    stressResponse:
      'Stres altında aşırı konuşkan ve dağınık hale gelir, dikkatini toparlayamaz. ' +
      '"Seninle beyin fırtınası yapalım" yaklaşımı onu rahatlatır ve çözüme odaklar.',
    motivationKeys: ['Sosyal tanınma ve övgü', 'Yeni deneyimler ve çeşitlilik', 'Özgürlük ve yaratıcılık'],
  },
};

// ---- Quiz Soruları (6 Soru) ----
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'Bir sorunla karşılaştığınızda ilk tepkiniz nedir?',
    options: [
      { type: 'K', text: 'Hemen harekete geçer, çözüm üretirim.' },
      { type: 'M', text: 'Durur, tüm detayları analiz eder, en doğru yolu ararım.' },
      { type: 'F', text: 'Sakinliğimi korur, acele etmeden adım adım düşünürüm.' },
      { type: 'S', text: 'Başkalarıyla konuşur, fikir alışverişiyle çözüm ararım.' },
    ],
  },
  {
    id: 'q2',
    question: 'Boş zamanınızda en çok ne yapmaktan keyif alırsınız?',
    options: [
      { type: 'K', text: 'Spor, rekabetçi oyunlar veya fiziksel aktivite.' },
      { type: 'M', text: 'Kitap okuma, müzik, sanat veya derin düşünme.' },
      { type: 'F', text: 'Aile veya yakın arkadaşlarla huzurlu, sakin vakit.' },
      { type: 'S', text: 'Sosyal ortamlar, yeni insanlarla tanışmak ve eğlenmek.' },
    ],
  },
  {
    id: 'q3',
    question: 'Bir ekip projesinde genellikle hangi rolü üstlenirsiniz?',
    options: [
      { type: 'K', text: 'Lider — yönlendiren ve nihai kararları veren.' },
      { type: 'M', text: 'Uzman — kaliteyi ve detayları kontrol eden.' },
      { type: 'F', text: 'Arabulucu — uyumu ve dengeyi koruyan.' },
      { type: 'S', text: 'Motivasyon kaynağı — enerji ve yaratıcılık katan.' },
    ],
  },
  {
    id: 'q4',
    question: 'Sizi en çok ne strese sokar?',
    options: [
      { type: 'K', text: 'Başkalarının yavaşlığı ve kontrolümü kaybetmek.' },
      { type: 'M', text: 'Belirsizlik, kaos ve kalitesiz ya da özensiz iş.' },
      { type: 'F', text: 'Çatışma ortamı ve ani, beklenmedik değişiklikler.' },
      { type: 'S', text: 'Monoton rutin ve uzun süre yalnız çalışmak.' },
    ],
  },
  {
    id: 'q5',
    question: 'Eleştiri aldığınızda nasıl tepki verirsiniz?',
    options: [
      { type: 'K', text: 'Savunmaya geçer ve kendi bakış açımı hemen dile getiririm.' },
      { type: 'M', text: 'Çok etkiler beni; uzun süre üzerinde düşünürüm.' },
      { type: 'F', text: 'Sakinlikle karşılarım, ama içimde taşıyabilirim.' },
      { type: 'S', text: 'Çabuk geçer; fazla takılmadan ilerlerim.' },
    ],
  },
  {
    id: 'q6',
    question: 'Kendinizi en iyi hangi sıfat(lar) tanımlar?',
    options: [
      { type: 'K', text: 'Kararlı, güçlü ve sonuç odaklı.' },
      { type: 'M', text: 'Hassas, düzenli ve mükemmeliyetçi.' },
      { type: 'F', text: 'Sakin, anlayışlı ve sabırlı.' },
      { type: 'S', text: 'Enerjik, neşeli ve yaratıcı.' },
    ],
  },
];

// ---- Analiz Fonksiyonu ----
export function calculatePersonality(quizAnswers) {
  const scores = { K: 0, M: 0, F: 0, S: 0 };

  Object.values(quizAnswers).forEach((type) => {
    if (type && scores[type] !== undefined) scores[type]++;
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const percentages = {};
  Object.keys(scores).forEach((k) => {
    percentages[k] = Math.round((scores[k] / total) * 100);
  });

  const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
  const primaryType = sorted[0][0];
  const secondaryType = sorted[1][0];

  return {
    scores,
    percentages,
    primaryType,
    secondaryType,
    primaryInfo: TYPES[primaryType],
    secondaryInfo: TYPES[secondaryType],
  };
}
