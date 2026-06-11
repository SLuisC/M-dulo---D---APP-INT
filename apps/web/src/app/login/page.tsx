'use client';

import { FormEvent, useState } from 'react';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('admin');
  const [password, setPassword] = useState('Admin123*');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      await login(usernameOrEmail, password);
      window.location.href = '/dashboard';
    } catch {
      setError('No se pudo iniciar sesión. Revise usuario y contraseña.');
    }
  }

  return (
    <main className="container" style={{ maxWidth: 460 }}>
      <div className="card">
        <h1>Iniciar sesión</h1>
        <p style={{ color: 'var(--muted)' }}>Acceso al panel base del proyecto.</p>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Usuario o correo
            <input className="input" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
          </label>
          <label className="label">
            Contraseña
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </main>
  );
}
