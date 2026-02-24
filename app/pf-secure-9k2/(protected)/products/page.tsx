import { PRODUCTS } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function AdminProductsPage() {
  const byCategory = PRODUCTS.reduce((acc: Record<string, typeof PRODUCTS>, p) => {
    const cat = p.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white font-bold text-2xl">Products</h1>
        <p className="text-muted text-sm mt-1">{PRODUCTS.length} total products</p>
      </div>

      {Object.entries(byCategory).map(([cat, products]) => (
        <div key={cat} className="bg-[#111118] border border-white/8 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">{cat}</h2>
            <span className="text-muted text-xs">{products.length} items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['', 'Name', 'Brand', 'Subcategory', 'Price', 'Stock'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-muted text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.slug} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-2">
                      <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-white/5">
                        <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-white text-xs max-w-[200px]">
                      <p className="font-medium truncate">{p.name}</p>
                      <p className="text-muted text-[11px] font-mono">{p.slug}</p>
                    </td>
                    <td className="px-4 py-2 text-muted text-xs">{p.brand}</td>
                    <td className="px-4 py-2 text-muted text-xs">{p.subcategory ?? '—'}</td>
                    <td className="px-4 py-2 text-white text-xs font-semibold">{formatPrice(p.price)}</td>
                    <td className="px-4 py-2">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        p.inStock ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                      }`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
