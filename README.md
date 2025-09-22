# Backoffice Veículos BFF

Backend for Frontend (BFF) para o sistema de E-commerce de Veículos - Backoffice.

## 📋 Descrição

Este BFF atua como uma camada intermediária entre o frontend do backoffice e a API principal, fornecendo:

- **Otimização de dados**: Agregação e transformação de dados para o frontend
- **Autenticação**: Middleware JWT para controle de acesso
- **Validação**: Validação de entrada e saída de dados
- **Cache**: Otimização de performance
- **Rate Limiting**: Controle de taxa de requisições

## 🏗️ Arquitetura

```
Frontend (React) → BFF (Node.js/Express) → API Backend (Node.js)
```

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express.js** - Framework web
- **JWT** - Autenticação
- **Joi** - Validação de dados
- **Axios** - Cliente HTTP
- **Jest** - Testes unitários
- **ESLint** - Linting

## 📦 Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd backoffice-veiculos-bff

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp env.example .env
```

## ⚙️ Configuração

Edite o arquivo `.env` com suas configurações:

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# API Backend Configuration
API_BASE_URL=http://localhost:3001
API_TIMEOUT=10000

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

## 🏃‍♂️ Executando

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test

# Linting
npm run lint
npm run lint:fix
```

## 📚 API Endpoints

### 📖 Documentação Interativa

Acesse a documentação completa da API em: **http://localhost:3002/docs**

A documentação Swagger inclui:
- ✅ **Todos os endpoints** com exemplos
- ✅ **Schemas de dados** completos
- ✅ **Autenticação JWT** configurada
- ✅ **Testes interativos** dos endpoints
- ✅ **Códigos de resposta** e erros

### Veículos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/veiculos` | Listar veículos | ❌ |
| GET | `/api/veiculos/search` | Buscar veículos | ❌ |
| GET | `/api/veiculos/:id` | Obter veículo por ID | ❌ |
| POST | `/api/veiculos` | Criar veículo | ✅ (Admin/Vendedor) |
| PUT | `/api/veiculos/:id` | Atualizar veículo | ✅ (Admin/Vendedor) |
| DELETE | `/api/veiculos/:id` | Remover veículo | ✅ (Admin) |
| PATCH | `/api/veiculos/:id/status` | Atualizar status | ✅ (Admin/Vendedor) |
| GET | `/api/veiculos/dashboard/stats` | Estatísticas do dashboard | ✅ (Admin/Vendedor) |
| GET | `/api/veiculos/vendedor/:vendedorId` | Veículos por vendedor | ✅ (Admin/Vendedor) |

### Sistema

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status da aplicação |
| GET | `/docs` | Documentação da API |

## 🔐 Autenticação

O BFF utiliza JWT para autenticação. Inclua o token no header:

```
Authorization: Bearer <jwt-token>
```

### Exemplo de Token

```javascript
// Token de exemplo fornecido
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDE3ODQ1YTA4ZGY5Zjk4MmUzMzk3YSIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTg1NTg5NTcsImV4cCI6MTc1ODY0NTM1N30.3wxLfvFjT6OwSVjWH41btkfbIrzZAMAww8Vpvxw2e8M";
```

## 📊 Filtros de Consulta

### Parâmetros Suportados

- `marca` - Filtrar por marca
- `modelo` - Filtrar por modelo
- `anoMin` / `anoMax` - Faixa de anos
- `precoMin` / `precoMax` - Faixa de preços
- `combustivel` - Tipo de combustível
- `categoria` - Categoria do veículo
- `status` - Status do veículo
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)
- `sortBy` - Campo para ordenação
- `sortOrder` - Ordem (asc/desc)

### Exemplo de Uso

```bash
GET /api/veiculos?marca=Toyota&anoMin=2020&precoMax=50000&page=1&limit=20
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
src/
├── config/           # Configurações da aplicação
├── controllers/      # Controladores das rotas
├── middleware/       # Middlewares (auth, validation, error)
├── routes/          # Definição das rotas
├── services/        # Serviços de integração com APIs
├── types/           # Definições TypeScript
├── validators/      # Schemas de validação
├── __tests__/       # Testes unitários
└── index.ts         # Ponto de entrada da aplicação
```

## 🔧 Desenvolvimento

### Adicionando Novos Endpoints

1. Crie o controller em `src/controllers/`
2. Defina as rotas em `src/routes/`
3. Adicione validações em `src/validators/`
4. Implemente testes em `src/__tests__/`

### Integração com API Backend

O BFF se conecta com a API principal em `http://localhost:3001`. Certifique-se de que a API esteja rodando antes de iniciar o BFF.

## 🚀 Deploy

### Railway (Recomendado)

O BFF está configurado para deploy automático no Railway:

```bash
# Deploy automático via script
npm run deploy:railway

# Ou deploy manual via Railway CLI
railway login
railway init
railway up
```

**Configuração no Railway Dashboard:**
1. Conecte o repositório GitHub
2. Configure as variáveis de ambiente:
   - `NODE_ENV=production`
   - `JWT_SECRET=sua-chave-secreta`
   - `API_BASE_URL=https://sua-api.railway.app`
   - `CORS_ORIGIN=https://seu-frontend.railway.app`

📖 **Guia completo**: [RAILWAY_DEPLOY.md](./RAILWAY_DEPLOY.md)

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3002
CMD ["npm", "start"]
```

### Variáveis de Ambiente de Produção

```env
NODE_ENV=production
PORT=3002
API_BASE_URL=https://api-backend.com
JWT_SECRET=your-production-secret
CORS_ORIGIN=https://backoffice-frontend.com
```

## 📝 Logs

O BFF utiliza Morgan para logging:

- **Desenvolvimento**: Logs detalhados
- **Produção**: Logs em formato combined

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👥 Squad

- **Squad Backoffice** - Time responsável pelo backoffice de veículos
- **Tribo E-commerce** - Grupo responsável pelo domínio completo
