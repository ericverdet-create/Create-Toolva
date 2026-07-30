import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import SkipLink from '@/components/SkipLink';
import { siteJsonLd } from '@/lib/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://toolva.com'),
  title: {
    default: 'Toolva — Herramientas Online Gratuitas',
    template: '%s | Toolva',
  },
  description: 'Más de 40 herramientas online gratuitas: calculadoras, conversores, utilidades de texto, criptografía y más. Rápido, sin registro.',
  keywords: ['herramientas online', 'calculadora', 'conversor', 'utilidades gratuitas'],
  authors: [{ name: 'Toolva' }],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Toolva',
    title: 'Toolva — Herramientas Online Gratuitas',
    description: 'Más de 40 herramientas online gratuitas: calculadoras, conversores y más.',
  },
  twitter: {
    card: 'summary',
    title: 'Toolva — Herramientas Online Gratuitas',
    description: 'Más de 40 herramientas online gratuitas.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4F46E5' },
    { media: '(prefers-color-scheme: dark)', color: '#3730A3' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = siteJsonLd();
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Dark mode: apply before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('toolva-theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (t === 'dark' || (!t && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e){}
          })();
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* PWA service worker */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        ` }} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SkipLink />
        <Header />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Toolva — Herramientas online gratuitas
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
