'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { apiRequest } from '@/lib/api';

interface AuditRow {
  id: string;
  module: string;
  action: string;
  entity?: string;
  entityId?: string;
  createdAt: string;
  user?: { username: string; fullName: string };
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditRow[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest<AuditRow[]>('/audit-logs')
      .then(setLogs)
      .catch(() => setError('No se pudo cargar auditoría.'));
  }, []);

  return (
    <AppShell>
      <h1>Auditoría</h1>
      <div className="card">
        {error && <p className="error">{error}</p>}
        <table className="table">
          <thead>
            <tr><th>Fecha</th><th>Usuario</th><th>Módulo</th><th>Acción</th><th>Entidad</th></tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
                <td>{log.user?.username ?? 'Sistema'}</td>
                <td>{log.module}</td>
                <td>{log.action}</td>
                <td>{log.entity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
