# Arquitectura del Módulo A

## Propósito

El Módulo A es la plataforma base del sistema. Su trabajo es entregar una base técnica común que permita a los equipos B, C, D, E y F desarrollar sin repetir autenticación, roles, layout, configuración, auditoría ni estados maestros.

## Principio central

El módulo debe ser deliberadamente pequeño.

No debe absorber lógica comercial. Su función es habilitar a los equipos, no reemplazarlos.

## Componentes incluidos

```text
Frontend Next.js
├── Layout principal
├── Menú RBAC
├── Login
├── Dashboard base
├── Pantallas base de configuración, estados y auditoría
└── Utilitario de consumo API

Backend NestJS
├── Auth
├── Users
├── Roles / Permissions
├── Settings
├── Master Status Catalog
├── Audit Logs
├── Healthcheck
└── Prisma/PostgreSQL
```

## Límites del módulo

| Pertenece al Módulo A | No pertenece al Módulo A |
|---|---|
| Login | Catálogo de productos |
| Roles y permisos | Precios comerciales |
| Layout base | Inventario comercial |
| Menú principal | Carrito y checkout |
| Parámetros globales | Pedidos y pagos |
| Auditoría básica | Promociones y combos |
| Estados maestros | Reacondicionados |

## Decisión de arquitectura

Se usa un monorepo simple con dos aplicaciones:

- `apps/api`: API NestJS.
- `apps/web`: interfaz Next.js.

Esta estructura permite que otros equipos clonen el proyecto y agreguen sus módulos sin romper la base.

## Modelo de permisos

El sistema usa RBAC:

- Un usuario puede tener varios roles.
- Un rol puede tener varios permisos.
- Las rutas de API se protegen con guardias de JWT, roles y permisos.
- El menú del frontend oculta opciones no permitidas.

## Auditoría

La auditoría registra acciones críticas como:

- Inicio de sesión.
- Creación de usuarios.
- Cambios de configuración.
- Creación de estados maestros.

La auditoría inicial es intencionalmente básica para evitar complejidad prematura.
