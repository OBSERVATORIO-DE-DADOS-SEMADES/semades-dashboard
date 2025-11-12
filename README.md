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
/semades-dashboard/server
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

# Ferramentas Python para provisionar Node.js/NPM e permitir rodar `npm run *`
npm install express mongoose bcryptjs jsonwebtoken dotenv nodemon

## Autores
- Bianca Sabka
- Magnum Abreu
- Roberto Neto
- Pedro Antonio

## Deploy da API na Google Cloud (Cloud Run)
1. **Pré-requisitos**
   - Conta/projeto ativo no Google Cloud.
   - `gcloud CLI` instalado e autenticado (`gcloud auth login`).
   - Projeto configurado: `gcloud config set project SEU_PROJECT_ID`.
   - Habilite serviços uma vez:  
     `gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com`

2. **Build da imagem (executar na raiz do repositório)**
   ```bash
   gcloud builds submit \
     --tag gcr.io/SEU_PROJECT_ID/semades-auth-api \
     ./api_auth_node
   ```
   O Dockerfile dentro de `api_auth_node/` instala dependências (via `npm ci --omit=dev`) e inicia com `node server.js`.

3. **Deploy no Cloud Run**
   ```bash
   gcloud run deploy semades-auth-api \
     --image gcr.io/SEU_PROJECT_ID/semades-auth-api \
     --region southamerica-east1 \
     --allow-unauthenticated \
     --set-env-vars MONGO_URI="sua-string",JWT_KEY="sua-chave"
   ```
   - Use os mesmos valores que estavam no `.env` local (ou configure novos segredos).
   - O Cloud Run injeta a variável `PORT`, já suportada pelo `server.js`

### Script automatizado (Windows/PowerShell)
Para evitar digitar cada comando, rode (a partir da raiz do projeto):
```powershell
.\scripts\deploy_api.ps1 `
  -MongoUri "sua-string" `
  -JwtKey "sua-chave" `
  [-ProjectId "215168468499"] `
  [-Region "southamerica-east1"] `
  [-ServiceName "semades-auth-api"]
```
> Por padrão o script usa o projeto `215168468499` (o número funciona; o script resolve o ID real automaticamente). Informe `-ProjectId` se precisar trocar.
> Se `-MongoUri`/`-JwtKey` não forem passados, ele tenta ler `MONGO_URI` e `JWT_KEY` do arquivo `api_auth_node/.env`.

O script verifica o `gcloud`, define o projeto, habilita serviços, faz o `gcloud builds submit` em `api_auth_node/` e publica no Cloud Run com `--allow-unauthenticated`. Para ver a URL final ele chama `gcloud run services describe`.

4. **Atualizar o frontend**
   - Crie/edite `c:\Users\astma\Documents\prefeitura\semades-dashboard\.env`:
     ```
     VITE_AUTH_API_URL=https://SEU_ENDPOINT_RUN/usuarios
     ```
   - Rode `npm run build` ou `npm run dev` para apontar para a nova API.

5. **Validar**
   - Acesse o domínio do Cloud Run e confirme `/usuarios/lista-usuarios`.
   - Faça login/cadastro pelo frontend e verifique se as requisições vão para o endpoint público (DevTools → Network).
