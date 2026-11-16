'use client';

import ProductBuyBox from '@/components/product/ProductBuyBox';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import ProductTrustBar from '@/components/product/ProductTrustBar';
import type { ApiProduct } from '@/interfaces/ProductApi/types';
import { useAddToCart } from '@/hooks/useAddToCart';

const defaultTrustItems = [
  {
    icon: 'shield' as const,
    title: 'پرداخت امن',
    text: 'درگاه بانکی امن — پرداخت در محل، امکان پرداخت اقساطی با کارت',
    linkLabel: 'روش‌های پرداخت',
  },
  {
    icon: 'return' as const,
    title: 'ضمانت بازگشت',
    text: '۷ روز فرصت بازگشت بدون قید و شرط، هزینه ارسال برگشت رایگان است',
    linkLabel: 'قوانین بازگشت',
  },
  {
    icon: 'shipping' as const,
    title: 'ارسال سریع',
    text: 'تهران: ارسال همان روز (سفارش تا ۱۴:۰۰) — شهرستان: ۲ تا ۳ روز کاری',
    linkLabel: 'اطلاعات بیشتر',
  },
];

const getBadgeVariant = (badge: string): 'discount' | 'new' | 'bestseller' => {
  if (badge === 'discount' || badge === 'new' || badge === 'bestseller') return badge;
  return 'new';
};

export default function ProductPageClient({ product }: { product: ApiProduct }) {
  const { handleAddToCart } = useAddToCart();
  const numericPrice = Number(product.price);
  const numericDiscount = Number(product.discount || '0');
  const oldPrice = numericDiscount > 0
    ? Math.round(numericPrice / (1 - numericDiscount / 100))
    : undefined;

  const gallery = Array.isArray(product.gallery) ? product.gallery : [];
  const images = [
    { id: 'main', src: product.productImage || '/placeholder.jpg', alt: product.title },
    ...gallery.map((image, index) => ({
      id: `gal-${index}`,
      src: typeof image === 'string' ? image : image.secure_url,
      alt: `${product.title} - تصویر ${index + 1}`,
    })),
  ];

  const badges = product.badge
    ? [{ label: product.badge === 'new' ? 'جدید' : product.badge, variant: getBadgeVariant(product.badge) }]
    : [];
  const specGroups = product.attributes && Object.keys(product.attributes).length > 0
    ? [{
        title: 'مشخصات کلی',
        rows: Object.entries(product.attributes).map(([label, value]) => ({ label, value: String(value) })),
      }]
    : [];

  const inStock = product.stock > 0;
  const highDemand = inStock && product.stock <= 5;
  const sellerInfo = { name: 'فروشگاه', rating: 5, salesCount: 0, href: '/' };
  const perks = ['ارسال سریع', 'پرداخت امن', 'ضمانت اصالت کالا'];

  return (
    <div className="prd-page" dir="rtl">
      <div className="prd-container">
        <section className="prd-hero">
          <ProductGallery images={images} badges={badges} />
          <ProductInfo
            seller="فروشگاه اصلی"
            sku={`SKU-${product.id}`}
            title={product.title}
            titleHighlight={product.brand || undefined}
            rating={0}
            reviewCount={0}
            salesCount={0}
            inStock={inStock}
            stockLeft={product.stock}
            highDemand={highDemand}
            colors={[]}
            types={[]}
            warrantyLabel="تضمین سلامت فیزیکی کالا"
          />
          <ProductBuyBox
            id={product.id}
            title={product.title}
            brand={product.brand ?? undefined}
            price={numericPrice}
            oldPrice={oldPrice}
            discountPercent={numericDiscount || undefined}
            currency="تومان"
            maxQty={product.stock}
            perks={perks}
            sellerInfo={sellerInfo}
            onBuyNow={(quantity) => handleAddToCart(product, quantity)}
          />
        </section>
        <ProductTrustBar items={defaultTrustItems} />
        <ProductTabs
          specGroups={specGroups}
          reviewsCount={0}
          qaCount={0}
          description={product.description || 'توضیحاتی ثبت نشده است.'}
        />
      </div>
    </div>
  );
}
