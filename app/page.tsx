import { redirect } from 'next/navigation';

/**
 * Fallback: middleware redirects / to /{locale} first.
 * This runs only if middleware doesn't handle the request.
 */
export default function RootPage() {
  redirect('/en');
}
