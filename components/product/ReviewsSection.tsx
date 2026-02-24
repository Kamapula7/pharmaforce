'use client';

import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import type { Review } from '@/lib/reviews';

const PAGE_SIZE = 5;

interface ReviewsSectionProps {
  reviews: Review[];
  total: number;
  title: string;
  showAll: string;
  showLess: string;
}

export default function ReviewsSection({ reviews, total, title, showAll, showLess }: ReviewsSectionProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shownReviews = reviews.slice(0, visible);
  const hasMore = visible < reviews.length;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <h2 className="text-white font-bold text-lg mb-5">{title} ({total})</h2>
      <div className="space-y-4">
        {shownReviews.map((r) => (
          <div key={r.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-brand/20 rounded-full flex items-center justify-center text-brand font-bold text-sm">
                  {r.name[0]}
                </div>
                <span className="text-white font-medium text-sm">
                  {r.name} {r.country}
                </span>
              </div>
              <span className="text-muted text-xs">{r.date}</span>
            </div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i <= r.rating ? 'fill-brand text-brand' : 'fill-border text-border'}`}
                />
              ))}
            </div>
            <p className="text-muted text-sm leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length > PAGE_SIZE && (
        <button
          onClick={() => setVisible(hasMore ? reviews.length : PAGE_SIZE)}
          className="mt-5 flex items-center gap-1.5 text-brand text-sm font-medium hover:text-brand/80 transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${!hasMore ? 'rotate-180' : ''}`}
          />
          {hasMore ? showAll : showLess}
        </button>
      )}
    </div>
  );
}
