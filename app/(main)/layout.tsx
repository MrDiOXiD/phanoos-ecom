import type { Metadata } from 'next';
import '../../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'فروشگاه آنلاین لوازم برقی',
  description: 'خرید آنلاین لوازم و تجهیزات برقی از فانوس الکتریک.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
   
 <>
      <Header />
      <Suspense>

        {children}
      </Suspense>
        <Footer />
 </>
 
  );
}
