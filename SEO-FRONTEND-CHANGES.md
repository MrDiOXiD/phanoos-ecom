# Phanoos SEO frontend changes

## Product detail rendering

- `/shop/[id]` is now a Server Component and fetches the public NestJS product API on the server.
- Product content is rendered into the initial HTML; cart interactions remain in `ProductPageClient.tsx`.
- A missing or inactive product calls Next.js `notFound()` and returns a real 404 response.
- `generateMetadata` uses `seoTitle` / `seoDescription`, falling back to the product title / description, and emits a self-referencing canonical URL.
- Product JSON-LD is emitted without an Offer until the API's monetary unit (rial vs toman) is confirmed. Do not invent a currency or multiply/divide the price without verifying the stored unit.

## Crawl files and index controls

- `/sitemap.xml` is generated from `GET /products/seo-index`; only active products are included.
- `/robots.txt` points to the sitemap and leaves URLs crawlable. Noindex pages are intentionally not blocked in robots.txt so crawlers can read their robots metadata.
- Cart, checkout, payment result, authentication, and dashboard routes are marked `noindex, nofollow`.
- Existing product URL structure remains `/shop/{numericId}`. No locale prefix or fake hreflang pages were added.

## Revalidation

The secured `POST /api/revalidate` route requires `x-revalidate-secret` to match `REVALIDATE_SECRET`. The backend can call it after product create/update/status/stock/delete operations.

Configure:

- Frontend: `API_URL` (preferred server-side NestJS base URL), `REVALIDATE_SECRET`
- Backend: `FRONTEND_REVALIDATE_URL=https://fanoselectric.ir/api/revalidate`, `FRONTEND_REVALIDATE_SECRET` (same secret)

`NEXT_PUBLIC_API_URL` can be used as the fallback API base, but a private server-side `API_URL` is preferred.

## Operational checks still required

1. Install dependencies and run `npm run build` in both repositories.
2. Apply the backend TypeORM migration before deploying code that selects the new SEO columns.
3. Confirm the production API URL is reachable from the Next.js server.
4. Confirm the database `price` unit. Add `Offer` JSON-LD only after this is known.
5. Test active product 200, inactive/missing product 404, public listing exclusion, sitemap exclusion, and admin visibility of inactive products.
