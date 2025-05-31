# 📍 API de Restaurantes - Documentación

## Base URL
```
http://localhost:3000/api/v1/restaurants
```

## 🔗 Endpoints Disponibles

### 1. **Obtener Restaurantes Cercanos**
Busca restaurantes cerca de una ubicación específica.

**Endpoint:** `POST /nearby`  
**Método:** POST  
**Content-Type:** application/json

#### Request Body:
```json
{
  "latitud": 4.7110,
  "longitud": -74.0721,
  "radius": 1000
}
```

#### Parámetros:
- `latitud` (required): Latitud de la ubicación (-90 a 90)
- `longitud` (required): Longitud de la ubicación (-180 a 180)
- `radius` (optional): Radio de búsqueda en metros (100-50000, default: 1000)

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "ChIJVQRX6yiFP44RjLO0mQxzamc",
      "nombre": "Kokoriko Las Villas",
      "latitud": 4.710988599999999,
      "longitud": -74.072092,
      "distancia": 2,
      "tipo": "point_of_interest",
      "rating": 3.9,
      "precio": 2,
      "direccion": "Calle 128 Bis A No. 59 B 50",
      "abierto": true
    }
  ],
  "meta": {
    "count": 10,
    "coordinates": { "latitud": 4.7110, "longitud": -74.0721 },
    "radius": 1000,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. **Buscar Restaurantes por Texto**
Busca restaurantes por nombre o tipo de comida.

**Endpoint:** `POST /search`  
**Método:** POST  
**Content-Type:** application/json

#### Request Body:
```json
{
  "query": "McDonald",
  "latitud": 4.7110,
  "longitud": -74.0721,
  "radius": 5000
}
```

#### Parámetros:
- `query` (required): Texto de búsqueda (nombre del restaurante, tipo de comida, etc.)
- `latitud` (optional): Latitud para búsqueda localizada
- `longitud` (optional): Longitud para búsqueda localizada
- `radius` (optional): Radio de búsqueda en metros (100-50000, default: 5000)

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "ChIJ_ZpH_SuFP44RKb8Z1oKrOwI",
      "nombre": "McDonald's",
      "latitud": 4.7122033,
      "longitud": -74.07159879999999,
      "distancia": 145,
      "tipo": "point_of_interest",
      "rating": 4,
      "precio": 2,
      "direccion": "Dirección no disponible",
      "abierto": true
    }
  ],
  "meta": {
    "count": 10,
    "query": "McDonald",
    "coordinates": { "latitud": 4.7110, "longitud": -74.0721 },
    "radius": 5000,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 3. **Obtener Detalles de Restaurante**
Obtiene información detallada de un restaurante específico.

**Endpoint:** `GET /details/:placeId`  
**Método:** GET

#### Parámetros de URL:
- `placeId` (required): ID del lugar de Google Places

#### Ejemplo:
```
GET /details/ChIJVQRX6yiFP44RjLO0mQxzamc
```

#### Response:
```json
{
  "success": true,
  "data": {
    "name": "Kokoriko Las Villas",
    "rating": 3.9,
    "formatted_phone_number": "+57 1 234 5678",
    "website": "https://kokoriko.com",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "lunes: 6:00 a.m.–11:00 p.m.",
        "martes: 6:00 a.m.–11:00 p.m."
      ]
    },
    "price_level": 2,
    "reviews": [...]
  },
  "meta": {
    "placeId": "ChIJVQRX6yiFP44RjLO0mQxzamc",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. **Probar Conexión API**
Verifica que la conexión con Google Places API funciona correctamente.

**Endpoint:** `GET /test`  
**Método:** GET

#### Response:
```json
{
  "success": true,
  "data": {
    "apiStatus": "OK",
    "message": "API funcionando correctamente",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 5. **Endpoint Legacy (Deprecated)**
Mantiene compatibilidad con versiones anteriores.

**Endpoint:** `POST /`  
**Método:** POST  
**⚠️ Deprecated:** Usar `/nearby` en su lugar

---

## 🚨 Códigos de Error

### 400 - Bad Request
```json
{
  "success": false,
  "error": "Coordenadas inválidas",
  "message": "Las coordenadas deben estar entre -90 y 90 para latitud, y entre -180 y 180 para longitud",
  "received": { "latitud": 95, "longitud": -74 },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "error": "Error interno del servidor",
  "message": "Error al buscar restaurantes: API Key inválida",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Buscar restaurantes cerca de Bogotá
```bash
curl -X POST http://localhost:3000/api/v1/restaurants/nearby \
  -H "Content-Type: application/json" \
  -d '{
    "latitud": 4.7110,
    "longitud": -74.0721,
    "radius": 2000
  }'
```

### Ejemplo 2: Buscar pizzerías
```bash
curl -X POST http://localhost:3000/api/v1/restaurants/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "pizza",
    "latitud": 4.7110,
    "longitud": -74.0721,
    "radius": 5000
  }'
```

### Ejemplo 3: Obtener detalles de un restaurante
```bash
curl -X GET http://localhost:3000/api/v1/restaurants/details/ChIJVQRX6yiFP44RjLO0mQxzamc
```

### Ejemplo 4: Probar conexión
```bash
curl -X GET http://localhost:3000/api/v1/restaurants/test
```

---

## 🔧 Notas Técnicas

- **Radio máximo:** 50,000 metros (50 km)
- **Radio mínimo:** 100 metros
- **Límite de resultados:** 10 restaurantes por consulta
- **Formato de coordenadas:** Decimal (ej: 4.7110, -74.0721)
- **Ordenamiento:** Los resultados se ordenan por distancia (más cercano primero)

---

## 🌍 Coordenadas de Ejemplo para Colombia

- **Bogotá:** `4.7110, -74.0721`
- **Medellín:** `6.2442, -75.5812`
- **Cali:** `3.4516, -76.5320`
- **Barranquilla:** `10.9685, -74.7813`
- **Cartagena:** `10.3910, -75.4794` 