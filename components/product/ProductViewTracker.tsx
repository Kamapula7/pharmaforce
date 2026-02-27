'use client';

import { useEffect } from 'react';
import { trackProductView } from './RecentlyViewed';

export default function ProductViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackProductView(slug);
  }, [slug]);
  return null;
}
