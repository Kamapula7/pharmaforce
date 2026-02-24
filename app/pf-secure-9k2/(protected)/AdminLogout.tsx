'use client';

export default function AdminLogout() {
  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.href = '/pf-secure-9k2/login';
  }
  return (
    <button onClick={handleLogout} className="text-xs text-muted hover:text-red-400 transition-colors">
      Logout
    </button>
  );
}
