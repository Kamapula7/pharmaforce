import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/en/cart', '/en/checkout', '/en/account', '/en/order-confirmation'],
      },
    ],
    sitemap: 'https://pharmaforce-store.com/sitemap.xml',
    host: 'https://pharmaforce-store.com',
  };
}
