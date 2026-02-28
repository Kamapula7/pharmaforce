'use client';

import { useState } from 'react';
import { Star, ChevronDown, Send } from 'lucide-react';
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
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const shownReviews = reviews.slice(0, visible);
  const hasMore = visible < reviews.length;

  const handleSubmit = () => {
    if (!formName.trim() || !formComment.trim()) return;
    setSubmitted(true);
    setShowForm(false);
    setFormName('');
    setFormRating(5);
    setFormComment('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-lg">{title} ({total})</h2>
        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="text-brand text-sm font-medium hover:text-brand/80 transition-colors cursor-pointer"
          >
            Write a review
          </button>
        )}
      </div>

      {submitted && (
        <div className="mb-5 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-medium">
          Thank you! Your review has been submitted for moderation.
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-4 bg-surface-2 border border-border rounded-xl space-y-3">
          <div>
            <label className="text-muted text-xs mb-1 block">Your name</label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand"
              placeholder="John"
            />
          </div>
          <div>
            <label className="text-muted text-xs mb-1 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => setFormRating(i)}
                  className="cursor-pointer"
                >
                  <Star className={`w-5 h-5 transition-colors ${i <= formRating ? 'fill-brand text-brand' : 'fill-border text-border'}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-muted text-xs mb-1 block">Your review</label>
            <textarea
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              rows={3}
              className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand resize-none"
              placeholder="Share your experience..."
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!formName.trim() || !formComment.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-dark font-semibold text-sm rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-muted text-sm hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
