// app/shop/page.tsx — Server Component
import ShopClientShell from '@/components/shop/ShopClientShell';
import '@/styles/components/shop.css';

export const metadata = {
  title: 'فروشگاه لوازم برقی',
  description: 'خرید آنلاین لامپ، کلید و پریز، ابزار، کابل و تجهیزات برقی از فانوس الکتریک.',
  alternates: { canonical: 'https://fanoselectric.ir/shop' },
};

export default function ShopPage() {
  return <ShopClientShell />;
}
