'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

interface SearchInputProps {
  locale: string;
  initialQuery?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export default function SearchInput({ locale, initialQuery = '', placeholder = 'Search products, brands...', autoFocus = false, onClose }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const suggestions = query.trim().length >= 1
    ? PRODUCTS.filter((p) => {
        const s = query.trim().toLowerCase();
        return (
          p.name.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s)
        );
      }).slice(0, 8)
    : [];

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  const handleSelect = (slug: string) => {
    setShowSuggestions(false);
    setQuery('');
    onClose?.();
    router.push(`/${locale}/products/${slug}`);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center bg-surface border border-border rounded-xl overflow-hidden focus-within:border-brand/60 transition-colors">
        <div className="pl-4 text-muted">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white text-sm px-3 py-3.5 outline-none placeholder:text-muted/50"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setShowSuggestions(false); inputRef.current?.focus(); }}
            className="pr-3 text-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-3.5 bg-brand text-dark font-bold text-sm hover:bg-brand/90 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Suggestions dropdown — приоритет названиям */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-[#111118] border border-white/10 rounded-xl shadow-2xl overflow-hidden w-[min(100%,calc(100vw-24px))] sm:w-full min-w-[280px] max-w-[500px]">
          {suggestions.map((product) => (
            <button
              key={product.id}
              type="button"
              onMouseDown={() => handleSelect(product.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
            >
              <div className="w-9 h-9 rounded overflow-hidden shrink-0 relative flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-white text-sm font-semibold line-clamp-2 leading-snug">{product.name}</p>
                <p className="text-muted text-xs mt-0.5 truncate">{product.brand} · {product.category}</p>
              </div>
              <p className="text-brand font-semibold text-sm shrink-0 ml-1">{formatPrice(product.price)}</p>
            </button>
          ))}

          {/* View all results */}
          <button
            type="button"
            onMouseDown={() => {
              setShowSuggestions(false);
              onClose?.();
              router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-brand text-sm font-semibold hover:bg-brand/10 transition-colors border-t border-white/10"
          >
            <Search className="w-4 h-4" />
            View all results for &ldquo;{query}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}
