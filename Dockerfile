# Usar imagen base de Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000
ENV MONGODB_URI=mongodb://mongodb:27017/userdb
ENV GOOGLE_MAPS_API_KEY=AIzaSyD8oulOzAbzu9QsIKVs2X61H17HEpT6uZs
ENV TOKEN_DEV=123

# Comando para iniciar la aplicación
CMD ["npm", "start"] 