'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

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
  const removeItem = useCartStore((s) => s.removeItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.id === productId));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeItem(productId);
    } else {
      addItem({ id: productId, slug, nameEn: productName, price, image, category });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
        inCart
          ? 'bg-brand text-dark hover:bg-red-500'
          : 'bg-brand/10 hover:bg-brand text-brand hover:text-dark'
      } ${className}`}
      title={inCart ? `Remove ${productName} from cart` : `Add ${productName} to cart`}
    >
      <ShoppingCart className="w-4 h-4" />
    </button>
  );
}
