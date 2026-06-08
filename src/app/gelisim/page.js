'use client';

import { useState, useEffect } from 'react';
import { TYPES } from '@/lib/personalityEngine';

// ─── Her mizaç için gelişim rehberi ───────────────────────────────────────
const DEVELOPMENT_GUIDE = {
  K: {
    intro: 'Kolerik yapın sana güçlü liderlik, hız ve kararlılık kazandırıyor. Ama tam bu güçler, köreltilmeden yönetilmezse seni çevrendeki insanlardan uzaklaştırabilir. İşte bu 4 alanda çalışmak, hem güçlü hem de bütünsel bir lider seni ortaya çıkaracak.',
    areas: [
      {
        weakness: 'Sabırsızlık & Tepkisellik',
        emoji: '⚡',
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.06)',
        border: 'rgba(239,68,68,0.2)',
        why: 'Hızlı hareket etme isteğin büyük bir güç — ama aynı zamanda aceleden doğan hatalar ve kırılan ilişkiler demek.',
        technique: '"10 Saniye Kural" Tekniği',
        steps: [
          'Bir sonraki aksiyona geçmeden önce tam 10 saniye bekle ve şunu sor: "Bu karar geri alınabilir mi?"',
          'Bir toplantıda söz almadan önce en az 2 kişinin konuşmasını bekle — not al, düşün.',
          'Öfkeni hissedince yüksek sesle saymak yerine "Bunu şimdi değil, 1 saat sonra konuşalım" cümlesini kullan.',
          '21 gün boyunca her gün "Bugün ne zaman sabırsızlandım ve ne oldu?" sorusunu yaz.',
        ],
        result: 'Sabırla kaplanan kararlar daha kalıcı, ekibin ise çok daha motive olacak.',
      },
      {
        weakness: 'Kontrolcülük Eğilimi',
        emoji: '🎮',
        color: '#f97316',
        bg: 'rgba(249,115,22,0.06)',
        border: 'rgba(249,115,22,0.2)',
        why: 'Her şeyi kontrol etmek güvenli hissettiriyor — ama bu hem seni yoruyor hem de ekibini büyümekten alıkoyuyor.',
        technique: '"Güvenli Delege" Sistemi',
        steps: [
          'Delege ettiğin görevi sadece başlangıç ve bitiş noktasında kontrol et — aradaki süreci tamamen o kişiye bırak.',
          'Haftada 1 görev için şunu söyle: "Nasıl yaptığını sormayacağım, sadece sonucu birlikte değerlendireceğiz."',
          'Birisi senden farklı bir yol denediğinde önce sonucu gör, sonra yorum yap. Farklı = yanlış değildir.',
          'Her hafta "Kontrol etmekten vazgeçtiğim ve iyi sonuç veren 1 şey" yaz — pattern\'i göreceksin.',
        ],
        result: 'Delege edebildikçe zaman kazanırsın, ekibin ise sana olan güveni artar.',
      },
      {
        weakness: 'Başkalarını Dinleme Güçlüğü',
        emoji: '👂',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.06)',
        border: 'rgba(139,92,246,0.2)',
        why: 'Zihnin zaten çözümü üretirken bedenin hâlâ dinliyormuş gibi yapıyor — ve diğerleri bunu hissediyor.',
        technique: '"Yansıtma" Alıştırması',
        steps: [
          'Biri sana bir şey anlattıktan sonra cevap vermeden önce şunu söyle: "Seni doğru anladım mı, diyorsun ki..."',
          'Konuşma sırasında telefonu ya da kalemi bırak — aktif dinlemenin fiziksel bir eylemi var.',
          'Karşındakine cevap verirken kendi görüşünden önce onun bakış açısını 1 cümleyle tekrar et.',
          'Bir hafta boyunca her görüşme sonrası sor: "Bu kişiden ne öğrendim?" — Cevap bulamazsan gerçekten dinlememişsindir.',
        ],
        result: 'Duyulduğunu hisseden ekip, sana çok daha güçlü geri bildirim verir.',
      },
      {
        weakness: 'Empati Eksikliği',
        emoji: '❤️',
        color: '#ec4899',
        bg: 'rgba(236,72,153,0.06)',
        border: 'rgba(236,72,153,0.2)',
        why: 'Sonuç odaklı yapın bazen insanları "araç" olarak görmeni sağlıyor — bu en büyük liderlik zayıflıklarından biri.',
        technique: '"Duygusal Dedektif" Yöntemi',
        steps: [
          'Biri seni sinir ettiğinde sor: "Bu kişinin benim bilmediğim ne korkusu veya endişesi olabilir?"',
          'Ekibinle yalnızca iş konuşmadığın, "nasılsın" dediğin haftalık 5 dakikalık bire bir anlar planla.',
          'Birinin hata yapmasında tepki vermeden önce 1 soru sor: "Seni anlıyorum — tam olarak ne oldu?"',
          'Ay sonunda ekibinden her birini birer cümleyle tanımla. Yalnızca performans değil, insan olarak.',
        ],
        result: 'Empati kuran lider, sadakat ve bağlılık oluşturur — bunu para ile satın alamazsın.',
      },
    ],
  },

  M: {
    intro: 'Melankolik yapın sana derin analiz, yüksek kalite standartları ve güvenilirlik kazandırıyor. Ama bu güçlerin gölgesinde kalan 4 zayıflık, hem seni hem de çevreni yavaşlatıyor. Her biri için gerçekçi, uygulanabilir teknikler burada.',
    areas: [
      {
        weakness: 'Aşırı Öz-Eleştiri',
        emoji: '🪞',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.06)',
        border: 'rgba(139,92,246,0.2)',
        why: 'Standartların yüksek — ama kendinle bu kadar sert olmak, zamanla özgüvenini eritiyor ve hareketsizliğe dönüşüyor.',
        technique: '"Arkadaş Testi" Egzersizi',
        steps: [
          'Bir hatanı kendinle konuşurken dur ve sor: "Yakın arkadaşım benim yerimde olsaydı, ona ne söylerdim?"',
          'Hata günlüğü tut — ama her hatanın yanına mutlaka o gün yaptığın 1 başarıyı da ekle.',
          'Olumsuz iç sesi fark ettiğinde "Dur" de ve şu soruyu sor: "Bu düşünce gerçek mi, yoksa korku mu?"',
          '21 gün boyunca her gece 3 şeyi yaz: Bugün iyi yaptığım şeyler. Büyük de küçük de olsa.',
        ],
        result: 'Kendine nazik olmak zayıflık değil — daha uzun süre yüksek performans göstermenin koşulu.',
      },
      {
        weakness: 'Analysis Paralysis (Aşırı Analiz)',
        emoji: '🔄',
        color: '#0ea5e9',
        bg: 'rgba(14,165,233,0.06)',
        border: 'rgba(14,165,233,0.2)',
        why: 'Mükemmel kararı aramak, çoğu zaman zamanında alınan iyi karardan çok daha maliyetli sonuçlar doğurur.',
        technique: '"İyi Yeter" Karar Çerçevesi',
        steps: [
          'Karar için maksimum 3 seçenek belirle — 3\'ten fazla seçenek beynini felç eder.',
          'Şu soruyu sor: "Yarın sabaha kadar bu kararı almak zorunda olsaydım ne yapardım?" — ilk akla geleni yaz.',
          'Küçük kararlar için max 5 dakika, orta kararlar için 24 saat, büyük kararlar için 1 hafta limiti koy.',
          'Kararından sonra geri dönme — uygulama sırasında öğrendiğini o kararı anında düzeltmekten daha değerli say.',
        ],
        result: 'Zamanında alınan %80 doğru karar, geç alınan %100 doğru karardan her zaman daha değerlidir.',
      },
      {
        weakness: 'Sosyal Ortamlarda Çekingenlik',
        emoji: '🤝',
        color: '#16a34a',
        bg: 'rgba(34,197,94,0.06)',
        border: 'rgba(34,197,94,0.2)',
        why: 'İçinde söylemek istediğin çok şey var — ama ses çıkarmak çok büyük bir risk gibi hissettiriyor.',
        technique: '"Kademeli Maruz Kalma" Planı',
        steps: [
          'Hafta 1: Gün içinde tanımadığın birine ya da az tanıdığına sadece 1 yorum yap — hava, bir detay, herhangi bir şey.',
          'Hafta 2: Bir toplantıda elini kaldır ve bir soru sor. Görüş değil, soru — çok daha güvenli hissettiriyor.',
          'Hafta 3: Bir tartışmada "Bence..." diye başlayan bir cümle kur. Haklı olup olmadığın önemli değil.',
          'Her sosyal adımdan sonra ne hissettini yaz — iyi veya kötü. Pattern\'i görmek cesaret inşa eder.',
        ],
        result: 'Sosyal özgüven büyük sıçramalarla değil, küçük ama düzenli adımlarla büyür.',
      },
      {
        weakness: 'Karar Vermekte Gecikme',
        emoji: '⏱️',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.06)',
        border: 'rgba(245,158,11,0.2)',
        why: 'Yanlış karar vermekten korkmak, bazen hiç karar vermemenden bile kötü sonuçlar doğurur.',
        technique: '"Süre Limiti & Taahhüt" Tekniği',
        steps: [
          'Her kararın başına süre koy ve bunu başkasına söyle — sosyal taahhüt ertelemeyi önler.',
          '"Bozuk Para" deneyi: Zor bir karar için yazı-tura at. Para havadayken ne istediğini içgüdüsel hissedeceksin.',
          'Kararını verdikten sonra 48 saat boyunca o konuyu kafanda "açık sekme" olarak tutma.',
          'Geri dönüp baktığında "daha iyi olabilirdi" dediğin kararları analiz et — gerçekten daha kötü mü çıktı?',
        ],
        result: 'Geciktirilen kararlar her gün maliyetini artırır — zamanında karar vermek bir beceri, alıştıkça kolaylaşır.',
      },
    ],
  },

  F: {
    intro: 'Flegmatik yapın sana sakinlik, uzlaşma gücü ve tutarlılık kazandırıyor. Bu özellikler ekibin bütünleyicisidir. Ama aynı yapı, hareketsizlik, sesini yitirme ve değişime kapanma riskini de taşıyor. İşte bu 4 alanda büyümek, zaten sahip olduğun güçleri katlar.',
    areas: [
      {
        weakness: 'Değişime Direnç',
        emoji: '🔄',
        color: '#0ea5e9',
        bg: 'rgba(14,165,233,0.06)',
        border: 'rgba(14,165,233,0.2)',
        why: 'Değişim gerçek bir tehdit gibi hissettiriyor — çünkü güvenli ve öngörülebilir olanı seviyorsun. Ama bu his, seni geride bırakıyor.',
        technique: '"Değişim Defteri" Egzersizi',
        steps: [
          'Hayatında zorla değiştirildiğin ve sonradan faydalı bulduğun 3 şeyi yaz — beynini "değişim = fırsat" olarak yeniden programla.',
          'Yeni bir değişiklik duyduğunda hemen tepki verme — 24 saat bekle ve sonra "Bu bana ne öğretebilir?" sor.',
          'Küçük hayatsal değişikliklerle başla: Farklı bir yoldan git işe, farklı bir şey sipariş et. Kaslara esneklik kazandır.',
          'Her ay bilerek 1 küçük yeni şey dene — değişimle arkadaşlık etmek istikrar duygunla çelişmez.',
        ],
        result: 'Değişime açıklık kazanınca hem kariyer hem ilişkilerde çok daha büyük kapılar açılacak.',
      },
      {
        weakness: 'Pasiflik & Motivasyon Eksikliği',
        emoji: '🚀',
        color: '#16a34a',
        bg: 'rgba(34,197,94,0.06)',
        border: 'rgba(34,197,94,0.2)',
        why: '"Birileri halleder" ya da "Zaten bir şey değişmez" düşüncesi, sahip olduğun katkı gücünü gizliyor.',
        technique: '"Günlük Micro-Taahhüt" Sistemi',
        steps: [
          'Her sabah sadece 1 şey seç: "Bugün X kişisine proaktif olarak 1 öneri sunacağım." Büyük değil, sadece 1.',
          'Bir problemle karşılaştığında bekleme — "Bu konuda benim yapabileceğim en küçük şey ne?" sorusunu sor.',
          'Kendi motivasyon kaynağını bul: Ekip uyumu mu? Huzurlu ortam mı? Onunla bağlantılı hedefler belirle.',
          'Haftalık olarak: "Bu hafta kendi inisiyatifimle yaptığım 1 şey ne?" sorusunu cevapla.',
        ],
        result: 'Küçük proaktif adımlar birikince, hem kendi özgüvenin hem de başkalarının sana güveni katlanır.',
      },
      {
        weakness: 'Karar Vermekten Kaçınma',
        emoji: '⚖️',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.06)',
        border: 'rgba(245,158,11,0.2)',
        why: 'Yanlış karar vermekten korkuyorsun — ama karar vermemek de aslında bir karar. Ve çoğu zaman en kötüsü.',
        technique: '"İçgüdü & Sınır" Yöntemi',
        steps: [
          '"Bozuk Para" deneyi: Zor bir karar için yazı-tura at. Para havadayken ne istediğini içgüdüsel olarak hissedeceksin.',
          'Başkasının onayına ihtiyaç duymadan vereceğin kararları listele — küçük şeylerden başla, büyüklere doğru git.',
          'Her kararın için zaman limiti koy ve bu süreyi birine söyle — sosyal taahhüt ertelemeyi önler.',
          'Aldığın kararlara geri dönüp bak — genellikle beklediğin kadar kötü sonuçlar vermediğini göreceksin.',
        ],
        result: 'Karar kasını küçük kararlarla güçlendirince, büyük kararlar da zamanla daha kolay gelecek.',
      },
      {
        weakness: 'Çatışmadan Kaçınma',
        emoji: '💬',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.06)',
        border: 'rgba(139,92,246,0.2)',
        why: 'Barışçıl olmak güçlü bir özellik — ama sorunları söylemeyip biriktirmek, patlama anında herkesi şaşırtıyor.',
        technique: '"Ben Dili" İletişim Sistemi',
        steps: [
          '"Sen bunu yanlış yaptın" yerine "Ben bu yaklaşımda şunu eksik hissediyorum" de — bu çatışma değil, iletişim başlatır.',
          'Haftada 1 kez rahatsızlığını "ben dili" ile ifade etmeyi hedefle — büyük şey değil, küçük bir his bile yeter.',
          'Bir rahatsızlığı dile getirmeden önce şunu sor: "Eğer bunu söylemezsem, 3 ay sonra nasıl hissederim?"',
          'Söyledikten sonra ne olduğunu gözlemle — çoğu zaman dünya altüst olmaz, ilişki daha sağlamlaşır.',
        ],
        result: 'Sesini kullanan Flegmatik, ekibin en güvenilir ve saygın ismi haline gelir.',
      },
    ],
  },

  S: {
    intro: 'Sanguin yapın sana yüksek enerji, yaratıcılık ve sosyal zeka kazandırıyor — bu özellikler çok değerli. Ama aynı yapı, dağınıklık, organizasyon eksikliği ve yarım kalan işler anlamına da gelebilir. Bu 4 alanda küçük alışkanlıklar inşa etmek, güçlerini katlar.',
    areas: [
      {
        weakness: 'Odaklanma Güçlüğü & Dağınıklık',
        emoji: '🎯',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.06)',
        border: 'rgba(245,158,11,0.2)',
        why: 'Her şey ilginç geliyor — ama dikkat bir kaynaktır ve bölündükçe hiçbir şeyi tam gücünle yapamıyorsun.',
        technique: '"Sesli Taahhüt + Pomodoro" Sistemi',
        steps: [
          'Çalışmaya başlamadan önce sesli söyle: "Şimdi 25 dakika boyunca SADECE X yapacağım." Sesini duymak taahhüdü güçlendiriyor.',
          'Telefonunu fiziksel olarak başka bir odaya koy — göz önünden uzak olan, zihinten de uzaklaşır.',
          '25 dakika çalış, 5 dakika tam serbestlik. Bu döngüyü 4 kez tekrarla. Basit ama kanıtlanmış.',
          'Bir işe başlamadan önce "Bu 25 dakikada ulaşmak istediğim tek çıktı ne?" sorusunu sor ve yaz.',
        ],
        result: 'Odaklanabildiğinde yaratıcı zekan patlama yapar — eksik olan güç değil, yön.',
      },
      {
        weakness: 'Organizasyon Eksikliği',
        emoji: '📋',
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.06)',
        border: 'rgba(239,68,68,0.2)',
        why: 'Karmaşık sistemler kuruyorsun, 2 gün sonra bırakıyorsun. Çünkü sistemin kendisi seni bunaltıyor.',
        technique: '"Üç İş" Sabah Ritüeli',
        steps: [
          'Her sabah sadece 1 kağıda şunu yaz: "Bugün mutlaka bitireceğim 3 şey." Yalnızca 3. Fazlası yok.',
          'Bu 3 şeyi bitirince üstünü çiz — bu küçük eylem dopamin salgılatır ve devam ettirir.',
          'Dijital değil, fiziksel yaz — kalem ve kağıt Sanguin için çok daha somut ve bağlayıcı.',
          'Akşam 1 dakika: "Bu 3 şeyden kaçını tamamladım?" Sadece say, yargılama. Zamanla pattern görürsün.',
        ],
        result: 'Sadelik, Sanguin için en güçlü organizasyon aracıdır. Az ama tam.',
      },
      {
        weakness: 'İşleri Yarım Bırakma Eğilimi',
        emoji: '✅',
        color: '#16a34a',
        bg: 'rgba(34,197,94,0.06)',
        border: 'rgba(34,197,94,0.2)',
        why: 'Yeni şeyler başlamak heyecan veriyor — tamamlamak değil. Ama yarım kalan işler hem güvenilirliğini hem enerjini tüketiyor.',
        technique: '"Kapatma Ritüeli" Yöntemi',
        steps: [
          'Yeni bir işe başlamadan önce bir sözleşme yap: "Bu işi bitirene kadar yeni bir iş başlatmayacağım."',
          'Haftada 1 "Yarım Kalan Listesi" yap ve o listeden 1 şeyi tamamla — büyük tatmin verir.',
          'İşi bölümlere ayır ve her bölüm için ayrı "başarı" ritüeli koy — küçük tamamlamalar büyük motivasyon.',
          'Tamamlanan işlerin listesini bir yerde tut ve sık sık bak — "Ben bunları yaptım" hissi çok güçlüdür.',
        ],
        result: 'Tamamlama alışkanlığı kazanan Sanguin, güvenilirlik + enerji kombinasyonuyla rakipsiz olur.',
      },
      {
        weakness: 'Aşırı İyimserlik & Gerçekçi Olmayan Hedefler',
        emoji: '🔭',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.06)',
        border: 'rgba(139,92,246,0.2)',
        why: 'İyimserlik güçlü bir özellik — ama gerçekçi olmayan planlar hayal kırıklığına ve motivasyon kaybına yol açıyor.',
        technique: '"Ön Mortem" Düşünce Egzersizi',
        steps: [
          'Yeni bir plan yapmadan önce sor: "Bu proje 6 ay sonra başarısız olsaydı, neden olurdu?" Beyin fırtınası yap.',
          'Tahminlerine %30 ekstra süre ekle — Sanguin\'ler süreleri sistematik olarak küçümsüyor.',
          'Büyük hedefleri haftalık alt hedeflere böl ve her haftanın gerçekçiliğini Melankolik veya Flegmatik birine sor.',
          'Geçmişteki planları gözden geçir: Tahmin ile gerçek ne kadar örtüştü? Bu boşluk gelecek planlamana ışık tutar.',
        ],
        result: 'Gerçekçilik iyimserliğini yok etmez — onu çok daha güçlü ve sürdürülebilir yapar.',
      },
    ],
  },
};

export default function GelisimPage() {
  const [selectedType, setSelectedType] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const guide = selectedType ? DEVELOPMENT_GUIDE[selectedType] : null;
  const typeInfo = selectedType ? TYPES[selectedType] : null;

  return (
    <>
      <header className="top-header">
        <h1 className="page-title">🌱 Kişisel Gelişim Rehberi</h1>
        <div className="header-actions">
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Mizacına göre zayıf yönlerini güçlü yanına dönüştür</span>
        </div>
      </header>

      {/* Mizaç Seçim Kartları */}
      <section style={{ marginTop: '2rem' }}>
        <div className="grid-2" style={{ gap: '1rem' }}>
          {Object.values(TYPES).map(t => (
            <button
              key={t.key}
              onClick={() => setSelectedType(selectedType === t.key ? '' : t.key)}
              style={{
                padding: '1.5rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer', textAlign: 'left',
                border: `2px solid ${selectedType === t.key ? t.color : 'var(--border-color)'}`,
                backgroundColor: selectedType === t.key ? t.bgColor : 'var(--card-bg)',
                transition: 'all 0.25s ease', position: 'relative', overflow: 'hidden',
              }}
            >
              {selectedType === t.key && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${t.color}, ${t.color}55)` }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '2rem' }}>{t.emoji}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: selectedType === t.key ? t.color : 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.subtitle}</div>
                </div>
                {selectedType === t.key && (
                  <span style={{ marginLeft: 'auto', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: t.bgColor, color: t.color, border: `1px solid ${t.borderColor}` }}>
                    Seçildi ✓
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {t.weaknesses.map((w, i) => (
                  <span key={i} style={{
                    padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.7rem',
                    backgroundColor: selectedType === t.key ? 'rgba(239,68,68,0.1)' : 'var(--surface-color)',
                    color: selectedType === t.key ? '#dc2626' : 'var(--text-muted)',
                    border: `1px solid ${selectedType === t.key ? 'rgba(239,68,68,0.2)' : 'var(--border-color)'}`,
                  }}>
                    {w}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Seçilmedi durumu */}
      {!selectedType && (
        <div style={{ marginTop: '3rem', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☝️</div>
          <p style={{ fontSize: '1rem' }}>Yukarıdan kendi mizaç tipini seçerek kişisel gelişim rehberini aç.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Hangi mizaç tipi olduğundan emin değilsen önce Personel Profili sayfasından kişilik testini tamamla.</p>
        </div>
      )}

      {/* Geliştirme Rehberi */}
      {guide && typeInfo && (
        <section style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Giriş Kartı */}
          <div className="card" style={{
            background: `linear-gradient(135deg, ${typeInfo.bgColor} 0%, var(--card-bg) 60%)`,
            border: `2px solid ${typeInfo.borderColor}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{typeInfo.emoji}</span>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: typeInfo.color, fontWeight: 700 }}>
                  Kişisel Gelişim Rehberi
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {typeInfo.name} — {typeInfo.subtitle}
                </h2>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{guide.intro}</p>
          </div>

          {/* Gelişim Alanları */}
          {guide.areas.map((area, idx) => (
            <div key={idx} className="card" style={{ border: `1px solid ${area.border}`, background: area.bg, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', backgroundColor: area.color }} />
              <div style={{ paddingLeft: '0.5rem' }}>

                {/* Başlık */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{area.emoji}</span>
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: area.color, fontWeight: 700, marginBottom: '0.2rem' }}>
                        Geliştirme Alanı {idx + 1}
                      </div>
                      <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{area.weakness}</h3>
                    </div>
                  </div>
                  <span style={{ padding: '0.3rem 0.875rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'var(--card-bg)', color: area.color, border: `1px solid ${area.border}` }}>
                    {area.technique}
                  </span>
                </div>

                {/* Neden Önemli */}
                <div style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--card-bg)', border: `1px solid ${area.border}`, marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: area.color, marginBottom: '0.375rem' }}>
                    💡 Neden önemli?
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{area.why}</p>
                </div>

                {/* Pratik Adımlar */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    🪜 Pratik Adımlar
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {area.steps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                        <span style={{
                          minWidth: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
                          backgroundColor: area.color, color: '#fff',
                        }}>
                          {i + 1}
                        </span>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sonuç */}
                <div style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🎯</span>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#16a34a', marginBottom: '0.25rem' }}>Beklenen Sonuç</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{area.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
