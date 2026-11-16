import type { Metadata } from 'next';
import ShopClientShell from '@/components/shop/ShopClientShell';
import '@/styles/components/shop.css';

export const metadata: Metadata = {
  title: 'فروشگاه لوازم برقی',
  description: 'خرید آنلاین لامپ، کلید و پریز، ابزار، کابل و تجهیزات برقی از الکتریکی فانوس.',
  alternates: { canonical: 'https://fanoselectric.ir/shop' },
};

export default function ShopPage() {
  return <ShopClientShell />;
}

