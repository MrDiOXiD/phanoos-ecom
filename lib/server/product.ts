import type { ApiProduct } from '@/interfaces/ProductApi/types';

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3020';

/** Fetches the public product representation directly from NestJS on the server. */
export async function getPublicProduct(id: string): Promise<ApiProduct | null> {
  if (!/^\d+$/.test(id)) return null;

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, '')}/products/${encodeURIComponent(id)}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Product API request failed with status ${response.status}`);
  }

  const payload: unknown = await response.json();
  const product =
    payload && typeof payload === 'object' && 'data' in payload
      ? (payload as { data: ApiProduct }).data
      : (payload as ApiProduct);

  if (!product || product.isActive === false) return null;
  return product;
}

export function toPlainDescription(value: string | null | undefined): string {
  return (value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 170);
}
