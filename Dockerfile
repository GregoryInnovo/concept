# ----------  Etapa de dependencias ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci                     # instala deps con package-lock.json

# ----------  Etapa de runtime / desarrollo ----------
FROM node:20-alpine
WORKDIR /app

# Copiamos código y dependencias ya instaladas
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Puertos que abrirán tus 3 apps
EXPOSE 4200 4201 4202

# Lanza los tres proyectos; si alguno deja de correr, el contenedor termina
CMD ["npm", "run", "run:all"]
