# Imagen base de Node
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias primero
COPY package*.json ./

# Instalamos dependencias de producción
RUN npm ci --omit=dev

# Copiamos el resto del proyecto
COPY src ./src
COPY public ./public
COPY README.md ./

# Exponemos el puerto donde correrá la app
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "src/index.js"]
