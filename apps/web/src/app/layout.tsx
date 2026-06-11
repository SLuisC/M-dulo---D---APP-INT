import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Módulo A - Plataforma Base',
  description: 'Base técnica para el proyecto web de comercialización',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
