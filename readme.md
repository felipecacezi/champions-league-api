#  Projeto Boilerplate Docker + TypeScript

Este projeto é um boilerplate básico para construir aplicações **Node.js** com **TypeScript** e **Docker**. Ele fornece uma estrutura inicial com configuração otimizada para desenvolvimento e produção.

---

##  Tecnologias Utilizadas

-   **Node.js**
-   **TypeScript**
-   **Docker**
-   **ts-node-dev** (para desenvolvimento)

---

##  Estrutura do Projeto

my-node-app/
├── src/
│   └── index.ts
├── dist/
├── package.json
├── package-lock.json
├── tsconfig.json
├── Dockerfile
└── docker-compose.yml


---

##  Scripts Disponíveis

-   **`npm run build`**
    
    Compila o código TypeScript para JavaScript na pasta `dist`.
    
-   **`npm run dev`**
    
    Executa a aplicação em modo desenvolvimento com `ts-node-dev`, reiniciando automaticamente ao detectar mudanças no código.
    
-   **`npm run start`**
    
    Executa a versão compilada da aplicação a partir da pasta `dist`.

---

##  Executando com Docker

Para rodar a aplicação utilizando Docker, siga os passos abaixo:

1.  **Build da imagem Docker:**
    
    ```bash
    docker build -t my-node-app .
    ```
    
2.  **Executar o container com Docker Compose (recomendado):**
    
    ```bash
    docker-compose up --build
    ```
    
    Ou, se preferir executar diretamente com `docker run`:
    
    ```bash
    docker run -p 3000:3000 my-node-app
    ```

---

##  Arquivos de Configuração

### `package.json`

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "npx tsc",
    "dev": "npx ts-node-dev --respawn src/index.ts",
    "start": "node dist/index.js"
  },
  "dependencies": {},
  "devDependencies": {
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
docker-compose.yml
YAML

version: '3.9'

services:
  app:
    build: .
    container_name: championsApi
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
Dockerfile
Dockerfile

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

CMD ["node", "dist/index.js"]
Notas
Certifique-se de que a pasta src e o arquivo src/index.ts existam antes de executar o build do Docker.
O docker-compose.yml facilita o desenvolvimento, permitindo montar o volume do projeto no container e utilizar o ts-node-dev para hot-reload.
O Dockerfile é otimizado para produção, copiando apenas os arquivos necessários e utilizando multi-stage builds para reduzir o tamanho da imagem final.