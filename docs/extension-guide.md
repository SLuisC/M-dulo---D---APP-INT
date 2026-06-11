# Guía para equipos que extienden el repositorio

## Cómo agregar un módulo backend

Crear una carpeta dentro de:

```text
apps/api/src/modules/<nombre-modulo>
```

Ejemplo para catálogo:

```text
apps/api/src/modules/catalog/
├── catalog.module.ts
├── catalog.controller.ts
├── catalog.service.ts
└── dto/
```

Registrar el módulo en `apps/api/src/app.module.ts`.

## Cómo proteger endpoints

```ts
@UseGuards(JwtAuthGuard, RbacGuard)
@Permissions('catalog.create')
@Post()
create() {}
```

## Cómo agregar permisos nuevos

1. Agregar el permiso en `apps/api/prisma/seed.ts`.
2. Asociarlo al rol correspondiente.
3. Usarlo en backend con `@Permissions()`.
4. Usarlo en frontend para mostrar u ocultar menú.

## Cómo agregar rutas al menú

Editar:

```text
apps/web/src/components/navigation/menu.ts
```

Ejemplo:

```ts
{
  label: 'Catálogo',
  href: '/catalog',
  requiredPermissions: ['catalog.read'],
}
```

## Qué no deben modificar otros equipos sin coordinación

- Estructura de tablas de usuarios, roles, permisos y auditoría.
- Forma del token JWT.
- Guardias globales de seguridad.
- Contratos base de autenticación.
- Variables comunes de entorno.
