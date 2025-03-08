🚀 my-node-app
Boilerplate para iniciar projetos Node.js com TypeScript usando Docker.

🛠️ Tecnologias Utilizadas
Node.js + TypeScript
Docker + Docker Compose
📦 Instalação
1. Clone o Repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/my-node-app.git
cd my-node-app
2. Instale as Dependências
bash
Copiar
Editar
npm install
🐳 Executando com Docker
1. Construir a Imagem
bash
Copiar
Editar
docker build -t my-node-app .
2. Rodar o Contêiner
bash
Copiar
Editar
docker run -p 3000:3000 my-node-app
📜 Scripts Disponíveis
npm run build — Transpila o código TypeScript para JavaScript na pasta dist.
npm run dev — Executa o projeto em modo de desenvolvimento com recarga automática.
npm start — Inicia o projeto a partir dos arquivos transpilados.
🗂️ Estrutura do Projeto
perl
Copiar
Editar
my-node-app/
├── src/
│   ├── index.ts          # Arquivo principal
├── dist/                 # Arquivos transpilados
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
🐳 Exemplo de Dockerfile
Dockerfile
Copiar
Editar
# Etapa 1: Construção
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Execução
FROM node:18
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev
CMD ["node", "dist/index.js"]
⚙️ Configuração TypeScript (tsconfig.json)
json
Copiar
Editar
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
🛡️ Boa Prática: .dockerignore
bash
Copiar
Editar
node_modules
dist
🛠️ Para Desenvolver
Use npm run dev para desenvolvimento contínuo.
Altere os arquivos em src/ e veja as mudanças sem precisar recompilar manualmente.
🖥️ Acessando a Aplicação
Após rodar o contêiner, acesse:

arduino
Copiar
Editar
http://localhost:3000
🧩 Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Faça o commit (git commit -m 'Adiciona nova feature').
Faça o push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.
📜 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Feito com ❤️ por Felipe Cacezi 🚀