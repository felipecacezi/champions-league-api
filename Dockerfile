# Etapa 1: Build
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json antes para otimizar cache
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos do projeto
COPY . .

# **Garantir que a pasta src exista e tenha arquivos**
RUN ls -la src

# Compilar o TypeScript
RUN npx tsc

# Etapa 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copiar apenas os arquivos compilados e node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/server.js"]
