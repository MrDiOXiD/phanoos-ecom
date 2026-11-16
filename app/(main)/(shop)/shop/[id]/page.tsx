import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import { getPublicProduct, toPlainDescription } from '@/lib/server/product';

const SITE_URL = 'https://fanoselectric.ir';
type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getPublicProduct(id);

  if (!product) {
    return {
      title: 'محصول یافت نشد',
      robots: { index: false, follow: false },
    };
  }

  const title = product.seoTitle?.trim() || product.title;
  const description =
    toPlainDescription(product.seoDescription) ||
    toPlainDescription(product.description);

  const canonical = `${SITE_URL}/shop/${product.id}`;
  const image = product.productImage?.startsWith('http')
    ? product.productImage
    : undefined;

  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'fa_IR',
      url: canonical,
      siteName: 'الکتریکی فانوس',
      title,
      ...(description ? { description } : {}),
      ...(image ? { images: [{ url: image, alt: product.title }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getPublicProduct(id);
  if (!product) notFound();

  const canonical = `${SITE_URL}/shop/${product.id}`;
  const description =
    toPlainDescription(product.seoDescription) ||
    toPlainDescription(product.description);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    ...(description ? { description } : {}),
    sku: String(product.id),
    url: canonical,
    ...(product.productImage ? { image: [product.productImage] } : {}),
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ProductPageClient product={product} />
    </>
  );
}

