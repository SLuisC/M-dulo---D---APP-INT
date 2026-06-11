'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { apiRequest } from '@/lib/api';

interface SettingRow {
  id: string;
  key: string;
  value: string;
  description?: string;
  isPublic: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingRow[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest<SettingRow[]>('/settings')
      .then(setSettings)
      .catch(() => setError('No se pudo cargar configuración.'));
  }, []);

  return (
    <AppShell>
      <h1>Configuración</h1>
      <div className="card">
        {error && <p className="error">{error}</p>}
        <table className="table">
          <thead>
            <tr><th>Clave</th><th>Valor</th><th>Pública</th><th>Descripción</th></tr>
          </thead>
          <tbody>
            {settings.map((setting) => (
              <tr key={setting.id}>
                <td>{setting.key}</td>
                <td>{setting.value}</td>
                <td>{setting.isPublic ? 'Sí' : 'No'}</td>
                <td>{setting.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
