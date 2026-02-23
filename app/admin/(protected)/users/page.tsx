async function getUsers() {
  try {
    const { prisma } = await import('@/lib/prisma');
    return await prisma.user.findMany({
      include: { _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-white font-bold text-2xl">Users</h1>
        <p className="text-muted text-sm mt-1">{users.length} registered</p>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-xl overflow-hidden">
        {users.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm">No users yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Email', 'Name', 'Role', 'Orders', 'Joined'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-muted text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-white text-xs">{user.email}</td>
                    <td className="px-4 py-3 text-muted text-xs">{user.name ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        user.role === 'ADMIN' ? 'bg-brand/15 text-brand' : 'bg-white/8 text-muted'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{user._count.orders}</td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
