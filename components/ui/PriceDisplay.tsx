'use client';

import { useRegionStore, convertPrice } from '@/store/regionStore';
import { formatPrice } from '@/lib/utils';

interface PriceDisplayProps {
  priceEur: number;
  oldPriceEur?: number;
  className?: string;
  oldClassName?: string;
}

export default function PriceDisplay({ priceEur, oldPriceEur, className, oldClassName }: PriceDisplayProps) {
  const region = useRegionStore((s) => s.region);
  const currency = region === 'US' ? 'USD' : 'EUR';
  const price = convertPrice(priceEur, region);
  const oldPrice = oldPriceEur != null ? convertPrice(oldPriceEur, region) : undefined;

  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={className}>{formatPrice(price, currency)}</span>
      {oldPrice != null && (
        <span className={oldClassName ?? 'text-muted line-through text-sm'}>
          {formatPrice(oldPrice, currency)}
        </span>
      )}
    </span>
  );
}
