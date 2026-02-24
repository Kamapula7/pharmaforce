import { PRODUCTS } from '../lib/products.ts';

const byCategory = {};
PRODUCTS.forEach(p => {
  if (!byCategory[p.category]) byCategory[p.category] = [];
  byCategory[p.category].push(p.name);
});
Object.entries(byCategory).forEach(([cat, products]) => {
  console.log('\n=== ' + cat + ' (' + products.length + ') ===');
  products.forEach(p => console.log('  - ' + p));
});
