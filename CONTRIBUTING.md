# Guía de contribución

Este repositorio funciona como base común. La prioridad es mantenerlo pequeño, estable y fácil de clonar.

## Reglas principales

1. No agregar lógica de negocio de otros módulos.
2. No escribir directamente sobre tablas de otro dominio.
3. Toda ruta protegida debe usar JWT y RBAC.
4. Toda acción crítica debe generar auditoría básica.
5. Toda configuración debe documentarse en `.env.example`.
6. Toda migración o cambio de modelo debe ser comunicado al Arquitecto/Integración.

## Convención de ramas

```text
feature/modulo-a-auth
feature/modulo-a-layout
fix/modulo-a-roles-guard
chore/docker-compose
```

## Convención de commits

```text
feat(auth): agrega login con JWT
feat(rbac): agrega guard de roles y permisos
fix(settings): valida actualización de parámetros
chore(docker): configura postgres local
```

## Criterio de aceptación mínimo para Pull Request

- El backend compila.
- El frontend compila.
- Docker levanta sin pasos manuales adicionales.
- La documentación se actualiza cuando cambia una ruta, variable o contrato.
- El cambio no introduce dependencias innecesarias con dominios de negocio.
