import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin', '/api/', '/pf-secure-9k2/',
          '/en/cart', '/en/checkout', '/en/account', '/en/order-confirmation',
          '/de/cart', '/de/checkout', '/de/account', '/de/order-confirmation',
          '/fr/cart', '/fr/checkout', '/fr/account', '/fr/order-confirmation',
          '/it/cart', '/it/checkout', '/it/account', '/it/order-confirmation',
          '/pl/cart', '/pl/checkout', '/pl/account', '/pl/order-confirmation',
        ],
      },
    ],
    sitemap: 'https://pharmaforce-store.com/sitemap.xml',
    host: 'https://pharmaforce-store.com',
  };
}
