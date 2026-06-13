import './globals.css';
import AppWrapper from '@/components/AppWrapper';

export const metadata = {
  title: 'PersoneliniTanı - Personel Gelişim ve Profil Takip Sistemi',
  description: 'İdare ve personel ortak hedef belirleme ve gelişim takip aracı.',
  manifest: '/manifest.json',
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
