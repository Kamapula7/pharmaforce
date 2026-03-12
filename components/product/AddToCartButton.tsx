'use client';

import { ShoppingCart, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { gtagAddToCart, gtagRemoveFromCart } from '@/lib/gtag';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  slug: string;
  image?: string;
  category?: string;
  badge?: string;
  className?: string;
}

export default function AddToCartButton({
  productId,
  productName,
  price,
  slug,
  image,
  category,
  badge,
  className = '',
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const inCartRaw = useCartStore((s) => s.items.some((i) => i.id === productId));
  const [flash, setFlash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const inCart = mounted && inCartRaw;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const state = useCartStore.getState();
    const currently = state.items.some((i) => i.id === productId);
    if (currently) {
      removeItem(productId);
      gtagRemoveFromCart({ id: productId, name: productName, price });
    } else {
      addItem({ id: productId, slug, nameEn: productName, price, image, category, badge });
      gtagAddToCart({ id: productId, name: productName, price, category });
      setFlash(true);
      setTimeout(() => setFlash(false), 1000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
        flash
          ? 'bg-green-500 text-white'
          : inCart
          ? 'bg-brand text-dark hover:bg-red-500'
          : 'bg-brand/10 hover:bg-brand text-brand hover:text-dark'
      } ${className}`}
      title={inCart ? `Remove ${productName} from cart` : `Add ${productName} to cart`}
    >
      {flash ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
    </button>
  );
}
