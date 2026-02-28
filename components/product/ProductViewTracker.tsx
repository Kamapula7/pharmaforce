'use client';

import { useEffect } from 'react';
import { trackProductView } from './RecentlyViewed';
import { gtagViewItem } from '@/lib/gtag';

interface Props {
  slug: string;
  id?: string;
  name?: string;
  brand?: string;
  category?: string;
  price?: number;
}

export default function ProductViewTracker({ slug, id, name, brand, category, price }: Props) {
  useEffect(() => {
    trackProductView(slug);
    if (id && name && price) {
      gtagViewItem({ id, name, brand, category, price });
    }
  }, [slug, id, name, brand, category, price]);
  return null;
}
