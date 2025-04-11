# — Etapa 1: build del frontend Next.js —
FROM node:18 AS builder
WORKDIR /app/frontend

# Copiamos package.json y lock, instalamos dependencias
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copiamos el resto y build
COPY frontend ./
RUN npm run build

# — Etapa 2: imagen de producción —
FROM node:18-alpine
WORKDIR /app

# Instalamos sólo deps de producción del backend
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install --production

# Copiamos el código del backend
COPY backend ./backend

# Copiamos el build del frontend
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/next.config.js ./frontend/

# Exponemos el puerto que usa tu Express
EXPOSE 5000

# Arrancamos el servidor
CMD ["node", "backend/server.js"]
