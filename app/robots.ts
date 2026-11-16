import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Keep noindex pages crawlable so search engines can read their robots metadata.
      allow: '/',
    },
    sitemap: 'https://fanoselectric.ir/sitemap.xml',
    host: 'https://fanoselectric.ir',
  };
}
