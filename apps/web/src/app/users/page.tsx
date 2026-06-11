'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { apiRequest } from '@/lib/api';

interface UserRow {
  id: string;
  username: string;
  email: string;
  fullName: string;
  userRoles: { role: { code: string; name: string } }[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest<UserRow[]>('/users')
      .then(setUsers)
      .catch(() => setError('No se pudo cargar usuarios.'));
  }, []);

  return (
    <AppShell>
      <h1>Usuarios</h1>
      <div className="card">
        {error && <p className="error">{error}</p>}
        <table className="table">
          <thead>
            <tr><th>Usuario</th><th>Nombre</th><th>Correo</th><th>Roles</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.userRoles.map((item) => item.role.code).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
