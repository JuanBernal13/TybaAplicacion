# 👤 API de Usuarios - Documentación

## Base URL
```
http://localhost:3000/api/v1/usuarios
```

## 🔗 Endpoints Disponibles

### 1. **Registro de Usuario**
Registra un nuevo usuario en el sistema.

**Endpoint:** `POST /registro`  
**Método:** POST  
**Content-Type:** application/json

#### Request Body:
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "miPassword123"
}
```

#### Parámetros:
- `nombre` (required): Nombre completo del usuario
- `email` (required): Email único del usuario
- `password` (required): Contraseña del usuario

#### Response Exitoso (201):
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "usuario": {
    "id": "user_123",
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### Response Error (409 - Email ya registrado):
```json
{
  "error": "El email ya está registrado",
  "message": "Ya existe un usuario con este email"
}
```

---

### 2. **Login de Usuario**
Autentica un usuario y devuelve un token JWT.

**Endpoint:** `POST /login`  
**Método:** POST  
**Content-Type:** application/json

#### Request Body:
```json
{
  "email": "juan@example.com",
  "password": "miPassword123"
}
```

#### Parámetros:
- `email` (required): Email del usuario
- `password` (required): Contraseña del usuario

#### Response Exitoso (200):
```json
{
  "mensaje": "Login exitoso",
  "usuario": {
    "id": "user_123",
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

#### Response Error (401 - Credenciales incorrectas):
```json
{
  "error": "Credenciales incorrectas",
  "message": "Email o contraseña incorrectos"
}
```

---

### 3. **Logout de Usuario** 🆕
Invalida el token JWT del usuario cerrando su sesión.

**Endpoint:** `POST /logout`  
**Método:** POST  
**Autenticación:** Bearer Token requerido

#### Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Response Exitoso (200):
```json
{
  "mensaje": "Logout exitoso",
  "message": "Sesión cerrada correctamente"
}
```

#### Response Error (401 - Token requerido):
```json
{
  "error": "Token requerido",
  "message": "Se requiere un token de autenticación para realizar el logout"
}
```

#### Response Error (401 - Token inválido):
```json
{
  "error": "Token inválido",
  "message": "El token proporcionado no es válido"
}
```

---

### 4. **Obtener Todos los Usuarios** 🔒
Obtiene la lista de todos los usuarios registrados (requiere autenticación).

**Endpoint:** `GET /`  
**Método:** GET  
**Autenticación:** Bearer Token requerido

#### Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Response Exitoso (200):
```json
{
  "usuarios": [
    {
      "id": "user_123",
      "nombre": "Juan Pérez",
      "email": "juan@example.com"
    },
    {
      "id": "user_456",
      "nombre": "María García",
      "email": "maria@example.com"
    }
  ],
  "total": 2
}
```

---

### 5. **Obtener Usuario por Email** 🔒
Obtiene los datos de un usuario específico por su email (requiere autenticación).

**Endpoint:** `GET /:email`  
**Método:** GET  
**Autenticación:** Bearer Token requerido

#### Parámetros de URL:
- `email` (required): Email del usuario a buscar

#### Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Ejemplo:
```
GET /juan@example.com
```

#### Response Exitoso (200):
```json
{
  "id": "user_123",
  "nombre": "Juan Pérez",
  "email": "juan@example.com"
}
```

#### Response Error (404 - Usuario no encontrado):
```json
{
  "error": "Usuario no encontrado",
  "message": "No existe un usuario con ese email"
}
```

---

## 🔐 Autenticación

Los endpoints marcados con 🔒 requieren autenticación mediante token JWT.

### Cómo usar el token:
1. Realiza login para obtener el token
2. Incluye el token en el header `Authorization` con el formato: `Bearer <token>`
3. El token expira en 24 horas

### Ejemplo de header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTIzIiwiZW1haWwiOiJqdWFuQGV4YW1wbGUuY29tIiwibm9tYnJlIjoiSnVhbiBQw6lyZXoiLCJpYXQiOjE3MDUzMjAwMDAsImV4cCI6MTcwNTQwNjQwMH0.signature
```

---

## 🚨 Códigos de Error

### 400 - Bad Request
Datos de entrada inválidos o faltantes.

### 401 - Unauthorized
Token faltante, inválido o expirado.

### 403 - Forbidden
Token válido pero sin permisos suficientes.

### 404 - Not Found
Recurso no encontrado.

### 409 - Conflict
Conflicto con el estado actual del recurso (ej: email ya registrado).

### 500 - Internal Server Error
Error interno del servidor.

---

## 📝 Notas Importantes

- Todos los endpoints devuelven JSON
- Los tokens JWT expiran en 24 horas
- Los tokens invalidados por logout no pueden ser reutilizados
- Las contraseñas se almacenan en texto plano (⚠️ solo para desarrollo)
- La base de datos es en memoria y se reinicia al reiniciar el servidor 