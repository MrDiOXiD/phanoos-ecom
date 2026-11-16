import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Secure endpoint for NestJS to invalidate storefront routes after product changes.
 * Configure REVALIDATE_SECRET on the frontend and send it as x-revalidate-secret.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let body: { productId?: number | string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  revalidatePath('/');
  revalidatePath('/shop');
  revalidatePath('/sitemap.xml');
  if (body.productId !== undefined && /^\d+$/.test(String(body.productId))) {
    revalidatePath(`/shop/${body.productId}`);
  }

  return NextResponse.json({ revalidated: true });
}
