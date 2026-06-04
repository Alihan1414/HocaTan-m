import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'HocaTanım - Personel Gelişim ve Profil Takip Sistemi',
  description: 'İdare ve personel ortak hedef belirleme ve gelişim takip aracı.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
