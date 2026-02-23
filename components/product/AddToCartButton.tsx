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
  const inCart = useCartStore((s) => s.items.some((i) => i.id === productId));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: productId, slug, nameEn: productName, price, image, category });
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
        inCart
          ? 'bg-brand text-dark'
          : 'bg-brand/10 hover:bg-brand text-brand hover:text-dark'
      } ${className}`}
      title={`Add ${productName} to cart`}
    >
      <ShoppingCart className="w-4 h-4" />
    </button>
  );
}
