import type { MetadataRoute } from 'next';

const SITE_URL = 'https://fanoselectric.ir';
const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3020';

type SitemapProduct = {
  id: number;
  updatedAt: string;
};

async function getProducts(): Promise<SitemapProduct[]> {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/products/seo-index`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Sitemap product feed failed: ${response.status}`);
  const payload: unknown = await response.json();
  return (payload && typeof payload === 'object' && 'data' in payload
    ? (payload as { data: SitemapProduct[] }).data
    : payload) as SitemapProduct[];
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  return [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: 'daily', priority: 0.9 },
    ...products.map((product) => ({
      url: `${SITE_URL}/shop/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
