'use client';

import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useEffect, useState } from 'react';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function WishlistButton({ productId, className = '', size = 'sm' }: WishlistButtonProps) {
  const toggle = useWishlistStore((s) => s.toggle);
  const has = useWishlistStore((s) => s.has);
  const [active, setActive] = useState(false);

  useEffect(() => {
    useWishlistStore.persist.rehydrate();
    setActive(has(productId));
  }, [productId, has]);

  useEffect(() => {
    const unsub = useWishlistStore.subscribe((state) => {
      setActive(state.ids.includes(productId));
    });
    return unsub;
  }, [productId]);

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`p-2 rounded-full transition-all duration-200 backdrop-blur-sm ${
        active
          ? 'bg-red-500/20 text-red-500 hover:text-red-400'
          : 'bg-black/50 text-white/70 hover:text-red-400 hover:bg-black/70'
      } ${className}`}
    >
      <Heart className={`${iconSize} ${active ? 'fill-current' : ''}`} />
    </button>
  );
}
