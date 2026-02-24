'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImage: string;
  gallery?: string[];
  name: string;
  badge?: string;
  oldPrice?: number;
  price?: number;
}

export default function ProductGallery({ mainImage, gallery, name, badge, oldPrice, price }: ProductGalleryProps) {
  const images = gallery && gallery.length > 0 ? gallery : [mainImage, mainImage, mainImage, mainImage];
  const [active, setActive] = useState(0);

  const discount = oldPrice && price ? Math.round((1 - price / oldPrice) * 100) : null;

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className={`relative aspect-square rounded-2xl overflow-hidden border border-border ${images[active].includes('-bg') ? '' : 'bg-[#f5f5f5]'}`}>
        <Image
          src={images[active]}
          alt={name}
          fill
          className={`transition-opacity duration-200 ${images[active].includes('-bg') ? 'object-cover' : 'object-contain p-4'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-black px-3 py-1 rounded-lg">
            -{discount}% OFF
          </div>
        )}
        {badge && !oldPrice && (
          <div className={`absolute top-4 left-4 text-sm font-black px-3 py-1 rounded-lg ${
            badge === 'TOP RATED' ? 'bg-success text-white' : 'bg-brand text-dark'
          }`}>
            {badge}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer ${
              active === i ? 'border-brand ring-2 ring-brand/40' : 'border-border hover:border-brand/50'
            } ${src.includes('-bg') ? '' : 'bg-[#f5f5f5]'}`}
          >
            <Image
              src={src}
              alt={`${name} photo ${i + 1}`}
              fill
              className={src.includes('-bg') ? 'object-cover' : 'object-contain p-1'}
              sizes="10vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
