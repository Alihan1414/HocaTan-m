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
