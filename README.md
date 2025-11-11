# SEMADES Dashboard
Portal de indicadores da SEMADES com telas públicas (login/cadastro) e área autenticada integrada à API `api_auth_node`.

## Pré-requisitos
- Node.js 18+
- npm 10+
- MongoDB Atlas (credenciais configuradas em `api_auth_node/.env`)

## Como rodar

### 1. Frontend (Vite)
```bash
cd c:\Users\astma\Documents\prefeitura\semades-dashboard
npm install
npm run dev
# abre em http://localhost:5173
```

> Use um `.env` na raiz se precisar apontar para outro backend:
> ```
> VITE_AUTH_API_URL=http://localhost:3000/usuarios
> ```

### 2. API de autenticação
```bash
cd c:\Users\astma\Documents\prefeitura\semades-dashboard\api_auth_node
npm install
npm run dev  # nodemon
# ou npm start
# expõe http://localhost:3000/usuarios/*
```
O `server.js` já está com `cors` habilitado para aceitar chamadas do Vite.

### 3. (Opcional) Serviço de notícias
```bash
cd c:\Users\astma\Documents\prefeitura\semades-dashboard\server
npm install
npm start  # porta 4000, rota /api/noticias
```

## Fluxo de autenticação
- `/` → tela de login (`src/components/Login.jsx`)
- `/cadastro` → tela de cadastro com validações (`src/components/Register.jsx`)
- `/dashboard` → área protegida por `PrivateRoute`, exige `localStorage.auth === "true"`
- API (`api_auth_node/routes/auth_routes.js`):
  - `POST /usuarios/cadastro` – cria usuário (validações do frontend + validação de e-mail único)
  - `POST /usuarios/login` – retorna `{ user, token }`
  - `GET /usuarios/lista-usuarios` – consulta (sem senha)

Configure o Mongo em `api_auth_node/.env` (`MONGODB_URI`, `JWT_SECRET`, etc.) antes de rodar.

## Autores
- Bianca Sabka
- Magnum Abreu
- Roberto Neto
- Pedro Antonio
