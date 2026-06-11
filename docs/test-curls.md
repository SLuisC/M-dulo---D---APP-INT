# Pruebas rápidas con cURL

## Login

```bash
curl -s -X POST http://localhost:3001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"usernameOrEmail":"admin","password":"Admin123*"}' | jq
```

## Guardar token

```bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"usernameOrEmail":"admin","password":"Admin123*"}' | jq -r .accessToken)
```

## Perfil

```bash
curl -s http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq
```

## Usuarios

```bash
curl -s http://localhost:3001/api/users \
  -H "Authorization: Bearer $TOKEN" | jq
```

## Estados

```bash
curl -s http://localhost:3001/api/statuses/user | jq
```
