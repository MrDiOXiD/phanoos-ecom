import type { Metadata } from 'next';
// app/cart/page.tsx — Server Component

import CartClientShell from '@/components/cart/CartClientShell';
import '@/styles/components/cart.css';

export default function CartPage() {
  return <CartClientShell initialItems={[]} />;
}
export const metadata: Metadata = { robots: { index: false, follow: false } };
