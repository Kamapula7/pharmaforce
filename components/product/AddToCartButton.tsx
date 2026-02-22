'use client';

import { ShoppingCart, Check } from 'lucide-react';
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
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: productId, slug, nameEn: productName, price, image, category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
        added
          ? 'bg-success text-white scale-95'
          : 'bg-brand/10 hover:bg-brand text-brand hover:text-dark hover:scale-110'
      } ${className}`}
      title={`Add ${productName} to cart`}
    >
      {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
    </button>
  );
}
