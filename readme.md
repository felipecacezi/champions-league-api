# Projeto Boilerplate Docker + TypeScript

Inicie projetos Node.js com TypeScript e Docker de forma rápida.

## Tecnologias

- Node.js
- TypeScript
- Docker

## Scripts

- `npm run build`: Compila o código.
- `npm run dev`: Executa em desenvolvimento (hot-reload).
- `npm run start`: Inicia a aplicação compilada.

## Docker

1. `docker build -t nome-da-imagem .`
2. `docker-compose up --build` (recomendado) ou `docker run -p 3000:3000 nome-da-imagem`

## Estrutura
my-node-app/
├── src/
│   └── index.ts
├── dist/
├── package.json
├── docker-compose.yml
└── Dockerfile

## Detalhes
- `docker-compose.yml`: Facilita o desenvolvimento.
- `Dockerfile`: Otimizado para produção.