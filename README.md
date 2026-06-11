# Módulo A - Plataforma Base

Repositorio base para el **Grupo A / Equipo 1 - Plataforma base** del proyecto de comercialización de productos.

Este repositorio entrega la capa común mínima para que los demás equipos puedan clonar, ejecutar y extender el sistema sin crear desde cero autenticación, roles, layout, configuración, auditoría ni catálogos maestros.

## Objetivo del módulo

El Módulo A habilita a los demás equipos. No implementa lógica de negocio de catálogo, precios, carrito, pedidos, pagos, promociones, inventario ni reacondicionados.

Incluye solamente:

- Autenticación de usuarios.
- Autorización con roles y permisos, RBAC.
- Menú principal y layout base.
- Configuración centralizada.
- Utilitarios compartidos.
- Auditoría básica.
- Catálogo maestro de estados.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js + React + TypeScript |
| Backend | NestJS + TypeScript |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Contenedores | Docker + Docker Compose |
| Autenticación | JWT Bearer Token |
| Validación | class-validator / class-transformer |

## Estructura general

```text
modulo-a-plataforma-base/
├── apps/
│   ├── api/                 # Backend NestJS
│   └── web/                 # Frontend Next.js
├── docs/                    # Documentación técnica del módulo
├── scripts/                 # Scripts de apoyo para desarrollo local
├── docker-compose.yml       # Ambiente local completo
├── .env.example             # Variables de entorno de referencia
├── CONTRIBUTING.md          # Reglas para equipos que extienden la base
└── README.md
```

## Inicio rápido

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO> modulo-a-plataforma-base
cd modulo-a-plataforma-base
```

### 2. Crear archivo de variables

```bash
cp .env.example .env
```

### 3. Levantar todo con Docker

```bash
docker compose up --build
```

El proceso levantará:

- Frontend: <http://localhost:3000>
- API: <http://localhost:3001/api>
- PostgreSQL: localhost:5432

### 4. Usuario inicial

El seed crea un usuario administrador de prueba:

```text
Usuario: admin
Correo: admin@example.com
Clave: Admin123*
Rol: ADMIN
```

> Cambiar estas credenciales antes de publicar cualquier ambiente fuera de desarrollo.

## Comandos útiles

Desde la raíz:

```bash
./scripts/dev.sh
./scripts/reset-db.sh
```

Desde `apps/api`:

```bash
npm run start:dev
npm run db:push
npm run db:seed
npm run prisma:studio
```

Desde `apps/web`:

```bash
npm run dev
```

## Endpoints principales del Módulo A

| Método | Ruta | Uso |
|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener perfil autenticado |
| GET | `/api/users` | Listar usuarios, requiere permiso |
| POST | `/api/users` | Crear usuario, requiere permiso |
| GET | `/api/settings` | Consultar configuraciones |
| PUT | `/api/settings/:key` | Actualizar configuración |
| GET | `/api/statuses/:domain` | Consultar estados por dominio |
| POST | `/api/statuses` | Crear estado maestro |
| GET | `/api/audit-logs` | Consultar auditoría |
| GET | `/api/health` | Salud del servicio |

## Cómo lo usan otros equipos

Los demás equipos deben agregar sus módulos dentro de una carpeta propia y consumir lo común por API o componentes compartidos.

Ejemplo recomendado:

```text
apps/api/src/modules/catalog/        # Equipo B
apps/api/src/modules/commercial/     # Equipo C
apps/api/src/modules/orders/         # Equipo D
apps/web/src/features/catalog/       # Equipo B
apps/web/src/features/commercial/    # Equipo C
apps/web/src/features/orders/        # Equipo D
```

Cada equipo puede registrar nuevas rutas de menú en `apps/web/src/components/navigation/menu.ts`, pero debe controlar visibilidad usando permisos.

## Reglas de alcance

Antes de agregar algo al Módulo A, responder:

> ¿Esto habilita a otros equipos o pertenece al dominio de negocio de otro módulo?

Si pertenece a catálogo, precios, stock, carrito, pedidos, pagos, promociones, combos, recomendaciones o reacondicionados, **no va en Módulo A**.

## Documentación

- [Arquitectura y límites](docs/architecture.md)
- [Contratos API](docs/api-contracts.md)
- [Guía de extensión para equipos](docs/extension-guide.md)
- [Checklist de entrega](docs/delivery-checklist.md)
