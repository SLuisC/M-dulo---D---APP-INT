'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { apiRequest } from '@/lib/api';

interface StatusRow {
  id: string;
  domain: string;
  code: string;
  name: string;
  description?: string;
}

export default function StatusesPage() {
  const [statuses, setStatuses] = useState<StatusRow[]>([]);
  const [domain, setDomain] = useState('user');
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest<StatusRow[]>(`/statuses/${domain}`)
      .then(setStatuses)
      .catch(() => setError('No se pudo cargar estados.'));
  }, [domain]);

  return (
    <AppShell>
      <h1>Estados maestros</h1>
      <div className="card">
        <label className="label">
          Dominio
          <select className="input" value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="user">user</option>
            <option value="general">general</option>
            <option value="order">order</option>
          </select>
        </label>
        {error && <p className="error">{error}</p>}
        <table className="table">
          <thead>
            <tr><th>Dominio</th><th>Código</th><th>Nombre</th><th>Descripción</th></tr>
          </thead>
          <tbody>
            {statuses.map((status) => (
              <tr key={status.id}>
                <td>{status.domain}</td>
                <td>{status.code}</td>
                <td>{status.name}</td>
                <td>{status.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
