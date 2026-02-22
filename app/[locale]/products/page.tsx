import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/product/AddToCartButton';
import { PRODUCTS, CATEGORIES_NAV, BRANDS_NAV } from '@/lib/products';
import { getTranslations } from 'next-intl/server';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sub?: string; brand?: string; sort?: string }>;
}

const BADGE_COLORS: Record<string, string> = {
  'BESTSELLER': 'bg-brand text-dark',
  'TOP RATED':  'bg-success text-white',
};

const AAS_SUBS = [
  { key: 'injections', label: 'Injections' },
  { key: 'tablets',    label: 'Tablets / Capsules' },
];

const PEPTIDES_SUBS = [
  { key: 'secretagogues', label: 'Growth Hormone Stimulants' },
  { key: 'hormones',      label: 'Hormones & Growth Factors' },
];

const MODULATORS_SUBS = [
  { key: 'sarms',                  label: 'SARMs' },
  { key: 'aromatase-inhibitors',   label: 'Aromatase Inhibitors' },
  { key: 'serms',                  label: 'SERMs / PCT' },
  { key: 'metabolic',              label: 'Metabolic Modulators' },
];


export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const { category, sub, brand, sort } = await searchParams;
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tSub = await getTranslations({ locale, namespace: 'subcategories' });

  const isAAS        = category === 'aas';
  const isPeptides   = category === 'peptides';
  const isModulators = category === 'modulators';

  /* filter */
  const filtered = PRODUCTS.filter((p) => {
    const catMatch = !category || category === 'all'
      || p.category.toLowerCase().replace(/\s+/g, '-') === category;
    const subMatch = !sub || p.subcategory.toLowerCase() === sub;
    const brandMatch = !brand
      || p.brand.toLowerCase().replace(/\s+/g, '-') === brand;
    return catMatch && subMatch && brandMatch;
  });

  /* sort */
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating')     return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  /* count helpers */
  const catCount = (key: string) =>
    key === 'all' ? PRODUCTS.length
      : PRODUCTS.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === key).length;

  const subCount = (s: string, cat: string) =>
    PRODUCTS.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === cat && p.subcategory?.toLowerCase() === s).length;

  const brandCount = (b: string) =>
    PRODUCTS.filter(p => p.brand === b).length;

  return (
    <div>

      {/* ─── Page Banner ─── */}
      <div className="relative bg-gradient-to-r from-dark via-surface to-dark border-b border-border overflow-hidden min-h-[180px]">
        {/* Background fitness images */}
        <div className="absolute inset-0 flex">
          <div className="absolute right-0 top-0 h-full w-[55%] flex">
            <div className="relative flex-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85"
                alt=""
                fill
                className="object-cover object-center"
                sizes="50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
            </div>
            <div className="relative w-52 overflow-hidden hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=85"
                alt=""
                fill
                className="object-cover object-top"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/80" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-brand/8 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-1">PharmaForce Store</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">All Products</h1>
            <p className="text-muted text-sm max-w-lg">
              Pharmaceutical-grade supplements, AAS, peptides and performance modulators — shipped discreetly across Europe.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-brand/80 bg-brand/10 border border-brand/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
              No prescription required · Everything available for order
            </p>
          </div>
          <div className="flex gap-6 shrink-0 relative z-10">
            {[
              { value: `${PRODUCTS.length}+`, label: 'Products' },
              { value: '30+', label: 'EU Countries' },
              { value: '100%', label: 'Lab Tested' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold text-brand">{value}</p>
                <p className="text-muted text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex gap-6">

        {/* ─── SIDEBAR ─── */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-4">

          {/* Categories */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand" />
              <span className="text-white font-semibold text-sm">Category</span>
            </div>
            <div className="p-2">
              {CATEGORIES_NAV.map(({ key }) => {
                const active = (!category && key === 'all') || category === key;
                const count = catCount(key);
                if (count === 0 && key !== 'all') return null;
                return (
                  <div key={key}>
                    <Link
                      href={key === 'all' ? `/${locale}/products` : `/${locale}/products?category=${key}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? 'bg-brand/15 text-brand font-semibold'
                          : 'text-muted hover:text-white hover:bg-surface-2'
                      }`}
                    >
                      <span>{tCat(key as Parameters<typeof tCat>[0])}</span>
                      <span className={`text-xs ${active ? 'text-brand' : 'text-muted/50'}`}>
                        {count}
                      </span>
                    </Link>

                    {/* AAS subcategories */}
                    {key === 'aas' && isAAS && (
                      <div className="ml-3 mt-1 mb-1 space-y-0.5">
                        {AAS_SUBS.map(({ key: sk }) => {
                          const subActive = sub === sk;
                          const href = subActive
                            ? `/${locale}/products?category=aas`
                            : `/${locale}/products?category=aas&sub=${sk}`;
                          return (
                            <Link key={sk} href={href}
                              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${subActive ? 'bg-brand/20 text-brand font-semibold' : 'text-muted hover:text-white hover:bg-surface-2'}`}
                            >
                              <span>{tSub(sk as Parameters<typeof tSub>[0])}</span>
                              <span className={`text-[10px] ${subActive ? 'text-brand' : 'text-muted/50'}`}>{subCount(sk, 'aas')}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Modulators subcategories */}
                    {key === 'modulators' && isModulators && (
                      <div className="ml-3 mt-1 mb-1 space-y-0.5">
                        {MODULATORS_SUBS.map(({ key: sk }) => {
                          const subActive = sub === sk;
                          const href = subActive
                            ? `/${locale}/products?category=modulators`
                            : `/${locale}/products?category=modulators&sub=${sk}`;
                          return (
                            <Link key={sk} href={href}
                              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${subActive ? 'bg-brand/20 text-brand font-semibold' : 'text-muted hover:text-white hover:bg-surface-2'}`}
                            >
                              <span>{tSub(sk as Parameters<typeof tSub>[0])}</span>
                              <span className={`text-[10px] ${subActive ? 'text-brand' : 'text-muted/50'}`}>{subCount(sk, 'modulators')}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Peptides subcategories */}
                    {key === 'peptides' && isPeptides && (
                      <div className="ml-3 mt-1 mb-1 space-y-0.5">
                        {PEPTIDES_SUBS.map(({ key: sk }) => {
                          const subActive = sub === sk;
                          const href = subActive
                            ? `/${locale}/products?category=peptides`
                            : `/${locale}/products?category=peptides&sub=${sk}`;
                          return (
                            <Link key={sk} href={href}
                              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${subActive ? 'bg-brand/20 text-brand font-semibold' : 'text-muted hover:text-white hover:bg-surface-2'}`}
                            >
                              <span>{tSub(sk as Parameters<typeof tSub>[0])}</span>
                              <span className={`text-[10px] ${subActive ? 'text-brand' : 'text-muted/50'}`}>{subCount(sk, 'peptides')}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>


          {/* Price */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <span className="text-white font-semibold text-sm">Price, €</span>
            </div>
            <div className="p-3 space-y-2.5">
              {['Up to €20', '€20 – €40', '€40 – €60', 'Over €60'].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-border group-hover:border-brand/60 transition-colors shrink-0" />
                  <span className="text-xs text-muted group-hover:text-white transition-colors">{r}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ─── MAIN ─── */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <p className="text-muted text-sm">
              Found: <span className="text-white font-semibold">{sorted.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <span className="text-muted text-sm hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  className="appearance-none bg-surface border border-border text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-brand cursor-pointer"
                  defaultValue={sort || 'popular'}
                >
                  <option value="popular">Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          {/* AAS subcategory pills */}
          {isAAS && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=aas`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat('aas')}</Link>
              {AAS_SUBS.map(({ key: sk }) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=aas` : `/${locale}/products?category=aas&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* Modulators subcategory pills */}
          {isModulators && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=modulators`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat('modulators')}</Link>
              {MODULATORS_SUBS.map(({ key: sk }) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=modulators` : `/${locale}/products?category=modulators&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* Peptides subcategory pills */}
          {isPeptides && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=peptides`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat('peptides')}</Link>
              {PEPTIDES_SUBS.map(({ key: sk }) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=peptides` : `/${locale}/products?category=peptides&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {sorted.map((product) => (
              <div
                key={product.id}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link href={`/${locale}/products/${product.slug}`} className="relative bg-[#f5f5f5] aspect-square overflow-hidden block">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {product.oldPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </div>
                  )}
                  {product.badge && !product.oldPrice && (
                    <div className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded ${BADGE_COLORS[product.badge] ?? 'bg-brand text-dark'}`}>
                      {product.badge}
                    </div>
                  )}

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </Link>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-brand text-[11px] font-semibold mb-0.5 truncate">{product.brand}</p>

                  <Link href={`/${locale}/products/${product.slug}`}>
                    <h3 className="text-white text-xs font-medium leading-snug mb-2 line-clamp-2 group-hover:text-brand transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className={`w-2.5 h-2.5 ${i <= Math.round(product.rating) ? 'fill-brand text-brand' : 'fill-border text-border'}`} />
                      ))}
                    </div>
                    <span className="text-muted text-[10px]">({product.reviews})</span>
                  </div>

                  {product.weight && (
                    <p className="text-muted text-[10px] mb-2">{product.weight}</p>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-1">
                    <div>
                      <p className="text-white font-bold text-base leading-none">{formatPrice(product.price)}</p>
                      {product.oldPrice && (
                        <p className="text-muted text-[11px] line-through">{formatPrice(product.oldPrice)}</p>
                      )}
                    </div>
                    {product.inStock && (
                      <AddToCartButton
                        productId={product.id}
                        productName={product.name}
                        price={product.price}
                        slug={product.slug}
                        image={product.image}
                        category={product.category}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {sorted.length === 0 && (
            <div className="text-center py-20 text-muted">
              <p className="text-lg font-semibold text-white mb-2">No products found</p>
              <Link href={`/${locale}/products`} className="text-brand hover:underline text-sm">
                Clear filters
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
    </div>
  );
}
