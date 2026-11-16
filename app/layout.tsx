import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';  // ← swap <link> for this
import '@/styles/globals.css';
import Goftino from '@/components/goftino/Goftino';
import QueryProvider from '@/hooks/reactQuery/provider-reactQuery/QueryProvider';
import StoreProvider from '@/store-redux/StoreProvider';
import { Suspense } from 'react';
import Providers from '@/context/providers';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fanoselectric.ir'),
  title: {
    default: 'فانوس الکتریک | فروشگاه آنلاین تجهیزات و لوازم برقی',
    template: '%s | فانوس الکتریک',
  },
  description: 'خرید آنلاین لوازم و تجهیزات برقی از فروشگاه فانوس الکتریک.',
  applicationName: 'فانوس الکتریک',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: 'فانوس الکتریک',
    title: 'فانوس الکتریک | فروشگاه آنلاین تجهیزات و لوازم برقی',
    description: 'خرید آنلاین لوازم و تجهیزات برقی از فروشگاه فانوس الکتریک.',
    url: 'https://fanoselectric.ir',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa-IR" dir="rtl" className={vazirmatn.variable}>
      <body
        className="bg-gray-100 min-h-screen"
        style={{ fontFamily: 'var(--font-vazirmatn), sans-serif', margin: 0 }}
      >
        <Suspense fallback={null}>

          <StoreProvider>
            <QueryProvider>
              <Providers>
                {children}
              </Providers>
            </QueryProvider>
          </StoreProvider>
        </Suspense>
        <Goftino />
      </body>
    </html>
  );
}