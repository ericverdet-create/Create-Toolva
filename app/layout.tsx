import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import SkipLink from '@/components/SkipLink';
import { siteJsonLd } from '@/lib/structured-data';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Herramientas Online Gratuitas`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['herramientas online gratuitas', 'calculadora online', 'conversor online', 'calculadora financiera', 'herramientas gratis España'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Herramientas Online Gratuitas`,
    description: 'Más de 175 herramientas gratuitas: calculadoras de finanzas, salud, conversores y más. Sin registro.',
  },
  twitter: {
    card: 'summary',
    title: `${SITE_NAME} — Herramientas Online Gratuitas`,
    description: 'Más de 175 herramientas online gratuitas. Sin registro.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'UAU2Yox2-4eQAbI8yAGNSFwJ_zAeLVdgOEFCmcmib2Q',
  },
  alternates: {
    canonical: SITE_URL,
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
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = siteJsonLd();
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Dark mode: apply before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('toolva-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense ca-pub-7353067433806430 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7353067433806430"
          crossOrigin="anonymous"
        />
        {/* PWA service worker */}
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js');});}` }} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SkipLink />
        <Header />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="/herramientas" className="hover:text-indigo-600 transition-colors">Herramientas</a>
              <a href="/blog" className="hover:text-indigo-600 transition-colors">Blog</a>
              <a href="/sobre-nosotros" className="hover:text-indigo-600 transition-colors">Sobre Toolva</a>
              <a href="/privacidad" className="hover:text-indigo-600 transition-colors">Privacidad</a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Toolva — Herramientas online gratuitas
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
