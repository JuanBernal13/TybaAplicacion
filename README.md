# Express User API

API RESTful con Node.js, Express, MongoDB y Google Maps para gestión de usuarios, transacciones y geolocalización.

## Características

- Autenticación JWT (registro, login, logout)
- Gestión de usuarios
- Transacciones automáticas al registrar usuarios
- Búsqueda de restaurantes con Google Maps API
- Contenedorización con Docker
- Pruebas automatizadas con CI/CD

## Estructura

```
├── config/           # Configuración DB y JWT
├── models/           # Esquemas MongoDB
├── services/         # Lógica de negocio
├── routes/           # Endpoints API
├── middlewares/      # Autenticación y validaciones
├── tests/            # Pruebas automatizadas
└── utils/            # Utilidades
```

## Instalación

### Docker
```bash
docker-compose up --build
```

### Local
```bash
npm install
npm start
```

## Pruebas

### Ejecutar tests
```bash
npm test                # Ejecutar todos los tests
npm run test:watch      # Ejecutar en modo watch
```

### CI/CD Automatizado
- ✅ Tests automáticos en cada commit
- ✅ Pruebas en Node.js 18.x y 20.x
- ✅ Base de datos MongoDB en CI
- ✅ Reporte de cobertura de código

## Variables de Entorno

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/userdb
JWT_SECRET=key_secreta
GOOGLE_MAPS_API_KEY=api_key
```

## Endpoints

### Usuarios
- `POST /api/v1/usuarios/registro` - Registrar usuario
- `POST /api/v1/usuarios/login` - Login
- `POST /api/v1/usuarios/logout` - Logout (requiere auth)
- `GET /api/v1/usuarios` - Listar usuarios (requiere auth)
- `GET /api/v1/usuarios/:email` - Usuario por email (requiere auth)

### Transacciones
- `GET /api/v1/transactions/my-transactions` - Mis transacciones (requiere auth)
- `GET /api/v1/transactions/user/:userId` - Transacciones por usuario (requiere auth)
- `POST /api/v1/transactions/create` - Crear transacción (requiere auth)

### Restaurantes
- `POST /api/v1/restaurants/nearby` - Restaurantes cercanos
- `POST /api/v1/restaurants/search` - Buscar restaurantes
- `GET /api/v1/restaurants/details/:placeId` - Detalles de restaurante

### Sistema
- `GET /api/v1/health` - Estado del servidor

## Servicios

### UserService
- Registro con hash de contraseñas
- Login con JWT
- Genera 1-10 transacciones automáticas al registrar

### TransactionService
- CRUD de transacciones
- Cálculo de estadísticas por usuario

### LocationService
- Integración con Google Maps API
- Búsqueda de lugares por coordenadas
- Búsqueda por texto

## Ejemplos

### Registro
```bash
curl -X POST http://localhost:3000/api/v1/usuarios/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","email":"juan@test.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@test.com","password":"123456"}'
```

### Restaurantes Cercanos
```bash
curl -X POST http://localhost:3000/api/v1/restaurants/nearby \
  -H "Content-Type: application/json" \
  -d '{"latitud":4.7110,"longitud":-74.0721,"radius":1000}'
```

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Google Maps API
- Docker
- Jest + Pruebas automatizadas mediante GitHub Actions. (Por cada commit, se corre el pipeline de pruebas) 
