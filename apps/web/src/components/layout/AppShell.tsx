'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthUser, getStoredUser, hasPermission, logout } from '@/lib/auth';
import { menuItems } from '@/components/navigation/menu';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) {
      window.location.href = '/login';
      return;
    }
    setUser(stored);
  }, []);

  const visibleItems = menuItems.filter((item) => hasPermission(user, item.requiredPermission));

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '260px 1fr' }}>
      <aside style={{ background: '#111827', color: 'white', padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>Módulo A</h2>
        <p style={{ color: '#cbd5e1', fontSize: 14 }}>Plataforma base</p>
        <nav style={{ display: 'grid', gap: 10, marginTop: 24 }}>
          {visibleItems.map((item) => (
            <Link key={item.href} href={item.href} style={{ padding: 10, borderRadius: 10, background: '#1f2937' }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="btn" style={{ marginTop: 24, background: '#374151' }} onClick={logout}>
          Cerrar sesión
        </button>
      </aside>
      <main>
        <header style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '16px 24px' }}>
          <strong>{user?.fullName ?? 'Cargando...'}</strong>
          <span style={{ color: 'var(--muted)', marginLeft: 10 }}>{user?.roles.join(', ')}</span>
        </header>
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
