// =============================================================
//  Personel Tanım — Sinerji & Uyum Analiz Motoru
//  İki mizaç tipi arasındaki dinamiği, uyumu ve çatışma risklerini hesaplar.
//  K=Kolerik, M=Melankolik, F=Flegmatik, S=Sanguin
// =============================================================

// Her iki tipin kombinasyonu için analiz verileri.
// Key formatı: küçükten büyüğe alfabetik sırada (örn: 'FK' değil de 'FK' ama 'KF' değil)
// Her kombinasyon bir kez yazılır, her iki sıralamayı da desteklemek için lookup kullanılır.

const SYNERGY_DATA = {

  // ── KOLERİK + MELANKOLİK ──────────────────────────────────────
  KM: {
    score: 72,
    title: 'Güç & Hassasiyet',
    summary:
      'Kolerik\'in hız ve kararlılığı, Melankolik\'in derinlik ve kalite odağıyla birleşince güçlü bir tamamlayıcılık ortaya çıkar. Ancak Kolerik\'in "Yeter kadar iyi" anlayışı ile Melankolik\'in "Mükemmel olmadan bitmez" eğilimi büyük bir gerilim kaynağıdır.',
    synergies: [
      'Kolerik hızla karar alır, Melankolik ise bu kararların risklerini titizce analiz eder — sağlam bir kontrol dengesi oluşur.',
      'Birlikte hem hızlı hem de kaliteli iş üretebilirler.',
      'Melankolik, Kolerik\'in gözden kaçırdığı detayları yakalar; Kolerik ise Melankolik\'i harekete geçirir.',
    ],
    conflicts: [
      'Kolerik\'in aceleyle verdiği kararlar Melankolik\'i derinden rahatsız eder.',
      'Melankolik\'in uzun analiz süreçleri Kolerik\'i sinir eder ve çatışmaya yol açar.',
      'Kolerik çok doğrudan konuşur; Melankolik bunu bazen kaba veya kırıcı bulur.',
      'Eleştiri tarzları tamamen zıttır: Kolerik güçlü ve açıkça söyler, Melankolik ise hassas ve özenle.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Bu ikiliyi bir projede birleştirmeden önce netleştirilmiş roller belirleyin: Kolerik projeyi yönetsin, Melankolik kalite kontrolü yapsın.' },
      { icon: '✅', text: 'Melankolik\'e yeterli analiz süresi tanıyın; Kolerik\'e ise bu sürenin neden kritik olduğunu açıklayın.' },
      { icon: '⚠️', text: 'Eleştiri toplantılarına ikisini aynı anda dahil etmekten kaçının; ayrı brifinglerle yönetin.' },
      { icon: '❌', text: 'Kolerik\'in Melankolik\'in işini "yavaş" diye nitelendireceği baskı ortamlarından kaçının.' },
    ],
  },

  // ── KOLERİK + FLEGMATİK ──────────────────────────────────────
  KF: {
    score: 58,
    title: 'Hız & Denge',
    summary:
      'Kolerik\'in sert ve hızlı hareketi ile Flegmatik\'in sakin ve dirençli yapısı arasında güçlü bir gerilim alanı bulunur. Flegmatik\'in yumuşatıcı etkisi Kolerik\'i frenleyebilirse bu ikilinin büyük potansiyeli vardır; ancak yönetimsiz bırakılırsa Kolerik baskın olur ve Flegmatik çekilir.',
    synergies: [
      'Flegmatik, Kolerik\'in ani kararlarına karşı doğal bir "acele etme" freni işlevi görür.',
      'Kolerik ekibi harekete geçirir; Flegmatik arkadaki uyumu ve morali korur.',
      'Stres anında Flegmatik\'in sakinliği Kolerik\'in gerilimini düşürür.',
    ],
    conflicts: [
      'Kolerik\'in baskıcı yönetim tarzı Flegmatik\'i susturur ve pasifleştirir.',
      'Flegmatik\'in değişime direnci Kolerik\'i öfkelendirir.',
      'Karar alma hızları tamamen zıttır; bu ikili aynı sorunun önünde uzun süre takılı kalabilir.',
      'Kolerik\'in topluluk önündeki eleştirileri Flegmatik\'i derinden kırabilir.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Kolerik\'in inisiyatif aldığı, Flegmatik\'in uyumu ve güveni koruduğu roller belirleyin.' },
      { icon: '✅', text: 'Flegmatik\'in fikirlerini güvende hissedebileceği birebir ortamlar oluşturun; Kolerik\'in gölgesinde kalmasın.' },
      { icon: '⚠️', text: 'Kolerik\'e, Flegmatik\'in sakinliğinin tembellik değil doğası olduğunu hatırlatın.' },
      { icon: '❌', text: 'Flegmatik\'i Kolerik\'in doğrudan raporlama zincirinde alt sıraya koymayın.' },
    ],
  },

  // ── KOLERİK + SANGUİN ──────────────────────────────────────
  KS: {
    score: 65,
    title: 'İki Güç Merkezi',
    summary:
      'Bu iki dominant ve enerjik kişilik bir arada büyük işler başarabilir — ya da birbirinin liderlik alanını işgal ederek ciddi çatışmalara girebilir. Sinerji için çok net rol sınırlarına ihtiyaç vardır. Lider olarak ikisi de konuşmak, yönlendirmek ve tanınmak ister.',
    synergies: [
      'İkisi de yüksek enerjili ve motivasyonu yüksek; ortak bir hedefte patlama gücü oluşturabilirler.',
      'Kolerik\'in stratejik yönü, Sanguin\'in insanları etkileme gücüyle birleşince güçlü bir liderlik ikilisi oluşur.',
      'İkisi de değişime açık ve risk alabilir; yenilikçi projelerde mükemmel iş çıkarırlar.',
    ],
    conflicts: [
      'İkisi de lider olmak ister; bu nedenle kimin yetkili olduğu konusunda sürtüşme kaçınılmazdır.',
      'Sanguin\'in dağınıklığı ve tamamlanmamış işleri Kolerik\'i çıldırtır.',
      'Kolerik odak isterken Sanguin onu başka bir konuya çekmeye çalışır.',
      'İkisi de egolarını ön plana çıkarır; birinin eleştirisi diğerini savunmaya geçirir.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Görev dağılımını net yapın: Kolerik karar alıcı, Sanguin ise dış iletişim ve motivasyon sorumlusu olsun.' },
      { icon: '✅', text: 'Başarıyı her ikisi için de eşit şekilde takdir edin; "sahiplenme" rekabetini önler.' },
      { icon: '⚠️', text: 'Ortak proje toplantılarını moderatörlü yapın; ikisi de konuşmayı domine etmeye çalışabilir.' },
      { icon: '❌', text: 'İkisini aynı anda lider pozisyonuna koymayın; biri mutlaka net yetkili olmalı.' },
    ],
  },

  // ── MELANKOLİK + FLEGMATİK ──────────────────────────────────────
  MF: {
    score: 85,
    title: 'Mükemmellik & Huzur',
    summary:
      'Bu ikili, sistemin içindeki en uyumlu kombinasyonlardan biridir. Melankolik\'in detay odağı ve Flegmatik\'in sakin güvenilirliği harika bir çalışma ortamı oluşturur. Ancak ikisi de çatışmadan kaçınır; bu yüzden sorunları fark edilmeden biriktirebilirler.',
    synergies: [
      'İkisi de dikkatli, titiz ve güvenilir; birlikte yüksek kaliteli, tutarlı iş çıkarırlar.',
      'Flegmatik\'in sakinliği, Melankolik\'in aşırı stresini dengelemeye yardımcı olur.',
      'İkisi de sistematik; birlikte uzun vadeli, detaylı projeleri sabırla yürütebilirler.',
      'Birbirlerini dinlerler ve empati kurarlar; ilişkileri sağlıklı ve saygılıdır.',
    ],
    conflicts: [
      'İkisi de değişimden hoşlanmaz; yeni bir duruma uyum sağlamaları zaman alabilir.',
      'Melankolik\'in yüksek standartları bazen Flegmatik üzerinde baskı yaratabilir.',
      'İkisi de harekete geçmekte yavaştır; çok kritik anlarda "kim adım atacak?" sorusu belirsiz kalabilir.',
      'Sorunları söylemek yerine biriktirirler; yönetici fark etmezse geç patlayabilir.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Bu ikiliye analiz, kalite kontrol veya sistem geliştirme gibi derinlik isteyen projeler verin.' },
      { icon: '✅', text: 'Düzenli kontrol toplantıları koyun; sorunları kendiliğinden getirmeyebilirler.' },
      { icon: '⚠️', text: 'Değişim durumunda ikisine de önceden hazırlık süresi verin ve gerekçeyi açıklayın.' },
      { icon: '❌', text: 'Bu ikiliyi satış, hızlı kriz müdahalesi veya sürekli değişen önceliklerin olduğu rollere koymayın.' },
    ],
  },

  // ── MELANKOLİK + SANGUİN ──────────────────────────────────────
  MS: {
    score: 48,
    title: 'Zıt Kutuplar',
    summary:
      'Bu iki kişilik neredeyse her konuda zıt kutuplardadır. Melankolik derinlik, sessizlik ve mükemmellik isterken; Sanguin çeşitlilik, sosyallik ve hız ister. Doğru yönetimle birbirlerini tamamlayabilirler, ancak bu ikilinin uyumlu çalışması en çok yönetici müdahalesi gerektiren kombinasyondur.',
    synergies: [
      'Sanguin\'in yaratıcı fikirlerini Melankolik detaylandırıp hayata geçirilebilir hale getirebilir.',
      'Melankolik\'in kalite filtresi, Sanguin\'in fazla iyimser hedeflerini gerçekçi kılar.',
      'Birbirlerinin kör noktalarını kapatırlar: Sanguin sosyal zeka, Melankolik teknik derinlik katar.',
    ],
    conflicts: [
      'Sanguin\'in dağınıklığı ve yarım kalan işleri Melankolik\'i derinden rahatsız eder.',
      'Melankolik\'in yavaş ve titiz çalışma temposu Sanguin\'i sıkar ve onu düşürerek yorar.',
      'İletişim tarzları zıttır: Sanguin yüzeysel ama neşeli, Melankolik derin ama ağır.',
      'Sanguin\'in sürekli koyu ve "haydi yapalım!" yaklaşımı Melankolik\'i bunaltır.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Ayrı çalışma süreçleri tasarlayın: Sanguin ideasyon/yaratıcılık, Melankolik uygulama/kalite kısmında olsun.' },
      { icon: '✅', text: 'Melankolik\'e sessiz çalışma süresi ve özerklik tanıyın; Sanguin ile sürekli aynı masada çalıştırmayın.' },
      { icon: '⚠️', text: 'Toplantılarda her ikisine de söz hakkı verin; Sanguin genellikle Melankolik\'i sustururlar.' },
      { icon: '❌', text: 'Bu ikiliyi birinin diğerini direkt denetleyeceği bir hiyerarşiye koymayın; her ikisi de zarar görür.' },
    ],
  },

  // ── FLEGMATİK + SANGUİN ──────────────────────────────────────
  FS: {
    score: 78,
    title: 'Dengeleyici & Enerjik',
    summary:
      'Bu ikili genellikle çok iyi anlaşır. Sanguin\'in enerjisi, Flegmatik\'i harekete geçirirken; Flegmatik\'in sakinliği, Sanguin\'in aşırı enerji ve dağınıklığını dengeleyebilir. Aralarında doğal bir sempatik bağ kurulur. Ancak her ikisi de çatışmaktan kaçındığı için sorunlar gecikebilir.',
    synergies: [
      'Sanguin enerji ve yeni fikirler getirir; Flegmatik bu enerjiyi sürdürülebilir ritme dönüştürür.',
      'İkisi de sosyal ve empati becerileri yüksek; ekiple ilişkileri çok güçlüdür.',
      'Flegmatik, Sanguin\'in heyecanının taşmasını dengeler ve onu pratik tutar.',
      'Birlikte çalışmak keyiflidir; ekip moralini olumlu etkilerler.',
    ],
    conflicts: [
      'Sanguin\'in sürekli yeni fikirlere atlayışı Flegmatik\'i bunaltır ve yorar.',
      'İkisi de sorunları net dile getirmekte zorlanır; yüzeysel bir barış sürdürülebilir.',
      'Sanguin karar verirken Flegmatik hâlâ düşünüyordur; hız farkı birikimli hayal kırıklığı yaratır.',
      'İkisi de önemli kararları erteleyebilir; projelerde "kim topu atacak?" boşluğu oluşur.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Bu ikiliye müşteri ilişkileri, ekip gelişimi veya toplulukla temas gerektiren görevler verin.' },
      { icon: '✅', text: 'Net iş teslim tarihleri ve kilometre taşları koyun; ikisi de süreci uzatabilir.' },
      { icon: '⚠️', text: 'Sanguin\'in aşırı heyecanının Flegmatik üzerinde stres yaratıp yaratmadığını kontrol edin.' },
      { icon: '❌', text: 'Kritik analitik veya stratejik karar alma süreçlerini bu ikiliyle yürütmeyin; güçlü bir analitik destek gerekir.' },
    ],
  },

  // ── KOLERİK + KOLERİK ──────────────────────────────────────
  KK: {
    score: 45,
    title: 'İki Lider, Bir Sahne',
    summary:
      'İki Kolerik bir arada olduğunda muazzam bir enerji ve hız ortaya çıkar — ancak "kim lider?" sorusu yanıtsız kalırsa çatışma kaçınılmazdır. Bu ikili ya harika bir eşgüdüm kurar ya da sürekli güç mücadelesi içinde olur.',
    synergies: [
      'İkisi de hızlı, kararlı ve sonuç odaklı; acil ve kritik görevlerde patlama gücü oluştururlar.',
      'Birbirlerinin direkt ve net iletişimini anlayarak rahatsız olmazlar.',
      'Rekabetçi ortamlarda birbirlerini motive ederler.',
    ],
    conflicts: [
      'Her ikisi de lider olmak ister; yetki çatışması kaçınılmazdır.',
      'Birinin hatası diğeri tarafından hızla eleştirilir; bu kırgınlık yaratır.',
      'Dinleme yetenekleri zayıftır; ikisi de konuşmak ister.',
      'Stres altında ikisi de saldırganlaşabilir; çatışmalar yüksek sesli olabilir.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Net rol ve yetki tanımları yapın; kim hangi alanda karar alabilir belirsiz olmasın.' },
      { icon: '✅', text: 'Her birine ayrı sorumluluk alanları verin; mümkün olduğunca aynı çatışma noktasından uzak tutun.' },
      { icon: '⚠️', text: 'Toplantılarda moderatör olun; ikisi de konuşmayı domine etmek isteyecektir.' },
      { icon: '❌', text: 'Birini diğerinin altında bir pozisyona koymayın; bunu kabullenmekte ikisi de zorlanır.' },
    ],
  },

  // ── MELANKOLİK + MELANKOLİK ──────────────────────────────────────
  MM: {
    score: 70,
    title: 'Derinlik & Mükemmellik Döngüsü',
    summary:
      'İki Melankolik harika derecede birbirini anlayan, aynı standartlara sahip bir ikilisi oluşturur. Ancak ikisi de aşırı analiz etme, karar vermeyi erteleme ve içe kapanma eğilimindedir. Bu ikilide harekete geçirici bir "Kolerik dokunuşu" eksik kalır.',
    synergies: [
      'İkisi de aynı kalite standardına sahip; çıkan iş son derece titiz ve güvenilir olur.',
      'Birbirlerinin hassasiyetlerini anlayarak destekleyici ve nazik bir ilişki kurabilirler.',
      'Uzun vadeli, derinlemesine araştırma ve analiz projelerinde eşsiz bir uyum yakalarlar.',
    ],
    conflicts: [
      '"Analysis Paralysis" riski ikiye katlanır; karar almak çok zorlaşabilir.',
      'İkisi de öz-eleştiri eğiliminde; birinin olumsuz havası diğerini de aşağı çekebilir.',
      'Hareket yavaştır; zaman baskısı altında ikilinin verimliliği düşer.',
      'İkisi de sessiz; sorunlar konuşulmadan birikir.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Bu ikiliye derinlik, araştırma veya kalite odaklı projeler verin; burada parlayacaklar.' },
      { icon: '✅', text: 'Net teslim tarihleri ve "yeterince iyi" standartlarını açıkça belirleyin; mükemmeliyetçilik döngüsüne girmesinler.' },
      { icon: '⚠️', text: 'Moral düşüşlerini yakından izleyin; iki Melankolik birbirini aşağı çekme riski taşır.' },
      { icon: '❌', text: 'Bu ikiliye iletişim, satış veya hız gerektiren görevler vermeyin.' },
    ],
  },

  // ── FLEGMATİK + FLEGMATİK ──────────────────────────────────────
  FF: {
    score: 68,
    title: 'Huzurlu Durgunluk',
    summary:
      'İki Flegmatik son derece uyumlu ve çatışmasız bir ikilisi oluşturur. Ortam sakin ve güvenlidir. Ancak bu sakinlik, hareketsizliğe dönüşebilir. Birbirlerine çok nazik davranırlar ama gerektiğinde birbirini itmek yerine beklerler.',
    synergies: [
      'İkisi de sakin, sabırlı ve güvenilir; çatışmasız bir çalışma ortamı oluşturur.',
      'Birbirlerini yargılamadan dinleyip desteklerler; ekip içi huzuru güçlü tutarlar.',
      'Uzun vadeli, istikrarlı görevlerde tutarlı iş çıkarırlar.',
    ],
    conflicts: [
      'İkisi de harekete geçmekte yavaştır; kritik anlarda "kim adım atacak?" belirsiz kalır.',
      'Değişim her ikisini de zorlayabilir; birden biri diğerini motive edemez.',
      'Her ikisi de sorunları dile getirmekte çekinir; sorunlar geç fark edilir.',
      'Yeni fikirlere veya dışarıdan gelen baskılara direnç her iki taraftan da gelir.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Bu ikiliye net adım adım görev planları verin; kendi kendilerine yol çizmekte zorlanabilirler.' },
      { icon: '✅', text: 'Düzenli birebir toplantılar yapın; sorunları kendiliğinden getirmezler.' },
      { icon: '⚠️', text: 'Değişimler için yeterli önceden haber verin ve gerekçeleri açıklayın.' },
      { icon: '❌', text: 'Bu ikiliden hız, yenilik veya rekabetçi bir ortam gerektiren projeler için liderlik beklemeyin.' },
    ],
  },

  // ── SANGUİN + SANGUİN ──────────────────────────────────────
  SS: {
    score: 62,
    title: 'Enerjinin Çarpması',
    summary:
      'İki Sanguin bir arada olduğunda ortam son derece hareketli, yaratıcı ve eğlencelidir. Ancak ikisi de dağınık, odaklanmakta zorlanan ve organizasyonu zayıf bireylerdir. Birbirlerinin dikkatini sürekli dağıtır ve işleri yarım kalabilir.',
    synergies: [
      'İkisi de enerjik ve yaratıcı; beyin fırtınası ve ideation gibi süreçlerde olağanüstü iş çıkarırlar.',
      'Birbirlerini motive ederler ve ortamın enerjisini yüksek tutarlar.',
      'Sosyal etkileşim ve takım motivasyonu gerektiren görevlerde parlayabilirler.',
    ],
    conflicts: [
      'İkisi de dağınık ve organize değil; birbirlerini bu konuda düzeltemezler.',
      'Sürekli yeni konulara atlayabilirler; projeler yarım kalma riskiyle karşılaşır.',
      'Her ikisi de konuşmayı sever; birbirlerini gerçekten dinlemeyebilirler.',
      'Organizasyon ve takip işleri tamamen sahipsiz kalır.',
    ],
    managerAdvice: [
      { icon: '✅', text: 'Yaratıcı, kısa vadeli ve sosyal etkileşim gerektiren görevlerde kullanın.' },
      { icon: '✅', text: 'Yanlarına organizasyon becerileri güçlü biri (Melankolik/Flegmatik) ekleyin.' },
      { icon: '⚠️', text: 'Net son teslim tarihleri ve takip mekanizmaları kurun; bırakırsanız ikisi de başka konuya geçer.' },
      { icon: '❌', text: 'Bu ikiliye uzun vadeli, titiz ve sistematik gerektiren projeler vermeyin.' },
    ],
  },
};

// Skoru renk/rozet olarak döndürür
export function getScoreInfo(score) {
  if (score >= 80) return { label: 'Mükemmel Uyum', color: '#16a34a', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', emoji: '🌟' };
  if (score >= 65) return { label: 'İyi Uyum', color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.25)', emoji: '✅' };
  if (score >= 50) return { label: 'Orta Uyum', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', emoji: '⚠️' };
  return { label: 'Zorlu Uyum', color: '#dc2626', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', emoji: '🔴' };
}

// İki mizaç tipinden sinerji verisini getirir
export function getSynergyData(typeA, typeB) {
  if (!typeA || !typeB) return null;
  if (typeA === typeB) {
    const key = `${typeA}${typeA}`;
    return SYNERGY_DATA[key] || null;
  }
  // Alfabetik sıraya göre anahtar oluştur
  const key = [typeA, typeB].sort().join('');
  return SYNERGY_DATA[key] || null;
}
