import './globals.css';
import AppWrapper from '@/components/AppWrapper';

export const metadata = {
  title: 'PersoneliniTanı - Personel Gelişim ve Profil Takip Sistemi',
  description: 'İdare ve personel ortak hedef belirleme ve gelişim takip aracı.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PersoneliniTanı',
  },
  icons: {
    apple: '/icon-192x192.png',
  },
  openGraph: {
    title: 'PersoneliniTanı',
    description: 'Personel Gelişim ve Profil Takip Sistemi',
    url: 'https://personelinitani.com',
    siteName: 'PersoneliniTanı',
    images: [
      {
        url: '/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'PersoneliniTanı Kapak Fotoğrafı',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
