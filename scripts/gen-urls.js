const fs = require('fs');
const path = require('path');

// Dynamic import for ES modules
async function main() {
  const { PRODUCTS } = await import('../lib/products.ts');
  const { BLOG_POSTS } = await import('../lib/blog-content.ts');
  const LOCALES = ['en','de','pl','fr','it','es'];
  const BASE = 'https://pharmaforce-store.com';
  const out = [];
  for (const p of PRODUCTS) {
    for (const l of LOCALES) out.push(`${BASE}/${l}/products/${p.slug}`);
  }
  for (const b of BLOG_POSTS) {
    for (const l of LOCALES) out.push(`${BASE}/${l}/blog/${b.slug}`);
  }
  fs.writeFileSync(path.join(__dirname, '../urls-products-blog.txt'), out.join('\n'));
  console.log('Generated', out.length, 'URLs');
}
main().catch(console.error);
