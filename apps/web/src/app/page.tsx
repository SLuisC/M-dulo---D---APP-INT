import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Módulo A - Plataforma Base</h1>
        <p>Base técnica para autenticación, RBAC, layout, configuración, auditoría y estados maestros.</p>
        <Link className="btn" href="/login">
          Iniciar sesión
        </Link>
      </div>
    </main>
  );
}
