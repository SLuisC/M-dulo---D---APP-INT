# Contratos API del Módulo A

Base URL local:

```text
http://localhost:3001/api
```

## Auth

### POST /auth/login

Request:

```json
{
  "usernameOrEmail": "admin",
  "password": "Admin123*"
}
```

Response:

```json
{
  "accessToken": "jwt-token",
  "tokenType": "Bearer",
  "expiresIn": "1d",
  "user": {
    "id": "uuid",
    "username": "admin",
    "email": "admin@example.com",
    "fullName": "Administrador del sistema",
    "roles": ["ADMIN"],
    "permissions": ["users.read", "settings.update"]
  }
}
```

### GET /auth/me

Headers:

```text
Authorization: Bearer <token>
```

Response:

```json
{
  "id": "uuid",
  "username": "admin",
  "email": "admin@example.com",
  "fullName": "Administrador del sistema",
  "roles": ["ADMIN"],
  "permissions": ["users.read"]
}
```

## Users

### GET /users

Requiere permiso: `users.read`.

### POST /users

Requiere permiso: `users.create`.

Request:

```json
{
  "username": "operador",
  "email": "operador@example.com",
  "fullName": "Operador General",
  "password": "Operador123*",
  "roleCodes": ["OPERATOR"]
}
```

## Settings

### GET /settings/public

Devuelve configuraciones públicas.

### GET /settings

Requiere permiso: `settings.read`.

### PUT /settings/:key

Requiere permiso: `settings.update`.

Request:

```json
{
  "value": "Portal Comercial",
  "description": "Nombre mostrado del portal",
  "isPublic": true
}
```

## Master Status

### GET /statuses/:domain

Consulta estados por dominio.

Ejemplo:

```text
GET /statuses/order
GET /statuses/user
GET /statuses/general
```

### POST /statuses

Requiere permiso: `statuses.create`.

Request:

```json
{
  "domain": "order",
  "code": "PENDING_PAYMENT",
  "name": "Pendiente de pago",
  "description": "Pedido creado y pendiente de comprobante",
  "sortOrder": 10
}
```

## Audit Logs

### GET /audit-logs

Requiere permiso: `audit.read`.

Parámetros opcionales:

```text
?module=auth&action=login&take=50
```
