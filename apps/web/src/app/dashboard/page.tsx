import { AppShell } from '@/components/layout/AppShell';

export default function DashboardPage() {
  return (
    <AppShell>
      <h1>Dashboard base</h1>
      <div className="card">
        <p>Este panel confirma que la plataforma común está funcionando.</p>
        <p>Los demás equipos deben agregar sus módulos sin modificar la lógica base de autenticación ni RBAC.</p>
      </div>
    </AppShell>
  );
}
