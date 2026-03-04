'use client';

import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { gtagAddToCart } from '@/lib/gtag';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  slug: string;
  image?: string;
  category?: string;
  className?: string;
}

export default function AddToCartButton({
  productId,
  productName,
  price,
  slug,
  image,
  category,
  className = '',
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.id === productId));
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: productId, slug, nameEn: productName, price, image, category });
    gtagAddToCart({ id: productId, name: productName, price, category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
        added
          ? 'bg-green-500 text-white'
          : inCart
          ? 'bg-brand text-dark hover:bg-brand-dark'
          : 'bg-brand/10 hover:bg-brand text-brand hover:text-dark'
      } ${className}`}
      title={inCart ? `${productName} is in cart` : `Add ${productName} to cart`}
    >
      {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
    </button>
  );
}
