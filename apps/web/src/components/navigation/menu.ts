export interface MenuItem {
  label: string;
  href: string;
  requiredPermission?: string;
}

export const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard', requiredPermission: 'dashboard.read' },
  { label: 'Usuarios', href: '/users', requiredPermission: 'users.read' },
  { label: 'Estados maestros', href: '/statuses', requiredPermission: 'statuses.read' },
  { label: 'Configuración', href: '/settings', requiredPermission: 'settings.read' },
  { label: 'Auditoría', href: '/audit', requiredPermission: 'audit.read' },
];
