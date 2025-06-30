# CutURL - Encurtador de URLs Completo

CutURL é uma aplicação full-stack que permite aos usuários encurtar URLs longas, protegê-las com senha e acompanhar suas estatísticas de acesso. É construído com o stack MERN (MongoDB, Express, React, Node.js).

## Funcionalidades

### Core
- **Encurtamento de URLs:** Converte URLs longas em links curtos e fáceis de compartilhar.
- **Redirecionamento Rápido:** Redireciona os usuários para a URL original de forma eficiente.
- **Contas de Usuário:** Sistema completo de autenticação com registro e login.
- **Proteção de Rotas:** Rotas de frontend e backend protegidas para garantir que apenas usuários autenticados possam acessar seus dados.

### Segurança e Acesso
- **Proteção por Senha:** Permite que os usuários adicionem uma senha a uma URL encurtada. O acesso só é liberado após a inserção da senha correta.
- **Expiração de Links:** Define uma data e hora para que um link encurtado expire automaticamente.
- **Tratamento de Sessão Expirada:** Se o token de autenticação de um usuário expirar, a aplicação o desconecta automaticamente e o redireciona para a página de login para evitar erros.

### Analytics
- **Dashboard de Links:** Uma página onde os usuários logados podem ver, gerenciar e analisar todas as URLs que encurtaram.
- **Contador de Cliques:** Rastreia o número total de cliques para cada URL encurtada.
- **Análise de Cliques:** Registra informações básicas sobre cada clique, como endereço IP e User-Agent.

### Planos de Assinatura (Modelo)
- **Controle por Role:** O sistema possui uma base para diferentes tipos de usuários (ex: 'free', 'premium').
- **Limite de URLs:** Usuários do plano 'free' têm um limite no número de URLs que podem encurtar.

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - Redux Toolkit (para gerenciamento de estado)
  - React Router (para navegação)
  - Axios (para requisições HTTP)
  - Vite (como ambiente de desenvolvimento)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (com Mongoose)
  - JSON Web Tokens (JWT) para autenticação
  - Bcrypt.js (para hashing de senhas)

## Como Executar o Projeto

### Pré-requisitos
- Node.js e npm instalados
- Uma instância do MongoDB em execução (local ou em um serviço como o MongoDB Atlas)

### 1. Configurar o Backend

```bash
# Navegue até a pasta do servidor
cd server

# Instale as dependências
npm install

# Crie um arquivo .env e adicione as seguintes variáveis
# (Substitua pelos seus próprios valores)
MONGO_URI=mongodb://localhost:27017/cuturl
JWT_SECRET=your_secret_key

# Inicie o servidor
npm start
```

O servidor backend estará rodando em `http://localhost:3000`.

### 2. Configurar o Frontend

```bash
# Navegue até a pasta do cliente
cd client

# Instale as dependências
npm install

# Inicie o cliente de desenvolvimento
npm run dev
```

A aplicação React estará disponível em `http://localhost:5173`.
