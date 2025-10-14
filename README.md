# 🚀 Backoffice Veículos BFF

Backend for Frontend (BFF) para o sistema de E-commerce de Veículos - Backoffice.

## 📋 Descrição

Este BFF atua como uma camada intermediária entre o frontend do backoffice e a API principal, fornecendo:

- **Proxy transparente**: Todas as chamadas passam pelo BFF
- **Autenticação automática**: Token JWT configurado automaticamente
- **Validação**: Validação de entrada e saída de dados com Joi
- **Documentação**: Swagger/OpenAPI para documentação interativa
- **CORS configurado**: Funciona com qualquer frontend
- **Logs centralizados**: Facilita debugging e monitoramento
- **✅ 100% funcional**: Veículos e vendas operacionais

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
- **Swagger/OpenAPI** - Documentação da API
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
cp .env.example .env
```

## ⚙️ Configuração

Edite o arquivo `.env` com suas configurações:

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# API Backend Configuration
API_BASE_URL=https://backoffice-veiculos-api-production.up.railway.app
API_TIMEOUT=15000

# JWT Configuration
JWT_SECRET=63f3ad853e32818c80e7c4f9374d70ac3370a166c7bc8b64bebd67c690e55b46
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=*

# Logging
LOG_LEVEL=warn
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

Acesse a documentação completa da API em: **https://backoffice-veiculos-bff-production.up.railway.app/docs**

A documentação Swagger inclui:
- ✅ **Todos os endpoints** com exemplos
- ✅ **Schemas de dados** completos
- ✅ **Autenticação JWT** configurada
- ✅ **Testes interativos** dos endpoints
- ✅ **Códigos de resposta** e erros

### 🚗 Veículos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/vehicles` | Listar veículos | ❌ |
| GET | `/api/vehicles/search` | Buscar veículos | ❌ |
| GET | `/api/vehicles/:id` | Obter veículo por ID | ❌ |
| POST | `/api/vehicles` | Criar veículo | ✅ (Admin/Seller) |
| PUT | `/api/vehicles/:id` | Atualizar veículo | ✅ (Admin/Seller) |
| DELETE | `/api/vehicles/:id` | Remover veículo | ✅ (Admin) |
| PATCH | `/api/vehicles/:id/status` | Atualizar status | ✅ (Admin/Seller) |
| GET | `/api/vehicles/dashboard/stats` | Estatísticas do dashboard | ✅ (Admin/Seller) |
| GET | `/api/vehicles/seller/:sellerId` | Veículos por vendedor | ✅ (Admin/Seller) |

### 💰 Vendas

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/sales` | Listar vendas | ❌ |
| GET | `/api/sales/:id` | Obter venda por ID | ❌ |
| POST | `/api/sales` | Criar venda | ✅ (Admin/Seller) |
| PUT | `/api/sales/:id` | Atualizar venda | ✅ (Admin/Seller) |
| DELETE | `/api/sales/:id` | Remover venda | ✅ (Admin) |
| GET | `/api/sales/stats` | Estatísticas de vendas | ✅ (Admin/Seller) |
| GET | `/api/sales/my-sales` | Minhas vendas | ✅ (Admin/Seller) |

### 🔐 Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login de usuário |
| POST | `/api/login` | Login alternativo |

### 🔧 Sistema

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status da aplicação |
| GET | `/docs` | Documentação da API |

## 🔐 Autenticação

O BFF utiliza JWT para autenticação. Inclua o token no header:

```
Authorization: Bearer <jwt-token>
```

### Credenciais de Acesso
- **Email**: `admin@backoffice.com`
- **Senha**: `Admin123!@#`

### Exemplo de Login

```bash
curl -X POST "https://backoffice-veiculos-bff-production.up.railway.app/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@backoffice.com",
    "password": "Admin123!@#"
  }'
```

## 📊 Filtros de Consulta

### Parâmetros Suportados - Veículos

- `brand` - Filtrar por marca
- `vehicleModel` - Filtrar por modelo
- `yearMin` / `yearMax` - Faixa de anos
- `priceMin` / `priceMax` - Faixa de preços
- `fuelType` - Tipo de combustível (gasoline, ethanol, diesel, electric, hybrid)
- `category` - Categoria (car, motorcycle, truck, van)
- `condition` - Condição (new, used)
- `status` - Status (active, inactive, sold)
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)
- `sortBy` - Campo para ordenação (price, year, mileage, createdAt)
- `sortOrder` - Ordem (asc/desc)

### Parâmetros Suportados - Vendas

- `status` - Status da venda (pending, completed, cancelled)
- `paymentMethod` - Método de pagamento (cash, financing, trade-in)
- `dateFrom` / `dateTo` - Período da venda
- `sellerId` - ID do vendedor
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)

### Exemplo de Uso

```bash
GET /api/vehicles?brand=Toyota&yearMin=2020&priceMax=100000&page=1&limit=20
GET /api/sales?status=completed&paymentMethod=cash&page=1&limit=10
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
│   ├── index.ts      # Configurações principais
│   ├── production.ts # Configurações de produção
│   └── swagger.ts    # Configuração do Swagger
├── controllers/      # Controladores das rotas
│   ├── authController.ts
│   ├── vehicleController.ts
│   └── saleController.ts
├── middleware/       # Middlewares (auth, validation, error)
│   ├── auth.ts
│   ├── errorHandler.ts
│   └── validation.ts
├── routes/          # Definição das rotas
│   ├── authRoutes.ts
│   ├── vehicleRoutes.ts
│   └── saleRoutes.ts
├── services/        # Serviços de integração com APIs
│   ├── apiClient.ts
│   ├── vehicleService.ts
│   └── saleService.ts
├── types/           # Definições TypeScript
│   └── index.ts
├── validators/      # Schemas de validação
│   ├── authValidators.ts
│   ├── vehicleValidators.ts
│   └── saleValidators.ts
├── __tests__/       # Testes unitários
│   └── veiculoController.test.ts
└── index.ts         # Ponto de entrada da aplicação
```

## 🔧 Desenvolvimento

### Adicionando Novos Endpoints

1. Crie o controller em `src/controllers/`
2. Defina as rotas em `src/routes/`
3. Adicione validações em `src/validators/`
4. Implemente testes em `src/__tests__/`
5. Atualize a documentação Swagger em `src/config/swagger.ts`

### Integração com API Backend

O BFF se conecta com a API principal em `https://backoffice-veiculos-api-production.up.railway.app`. A comunicação é feita através do `apiClient` que gerencia:

- Headers de autenticação
- Timeout de requisições
- Tratamento de erros
- SSL/TLS em produção

## 🚀 Deploy

### Railway (Produção)

O BFF está configurado para deploy automático no Railway:

**URL de Produção**: https://backoffice-veiculos-bff-production.up.railway.app

**Configuração no Railway Dashboard:**
1. Conecte o repositório GitHub
2. Configure as variáveis de ambiente:
   - `NODE_ENV=production`
   - `PORT=3002`
   - `API_BASE_URL=https://backoffice-veiculos-api-production.up.railway.app`
   - `JWT_SECRET=63f3ad853e32818c80e7c4f9374d70ac3370a166c7bc8b64bebd67c690e55b46`
   - `CORS_ORIGIN=*`
   - `LOG_LEVEL=warn`

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

## 📝 Logs

O BFF utiliza Morgan para logging:

- **Desenvolvimento**: Logs detalhados
- **Produção**: Logs em formato combined

## 📚 Documentação Adicional

- **Exemplos de cURL**: [API_CURL_EXAMPLES.md](./API_CURL_EXAMPLES.md)
- **Documentação de Sales**: [SALES_API_DOCUMENTATION.md](./SALES_API_DOCUMENTATION.md)
- **Documentação de Veículos**: [BFF_API_DOCUMENTATION.md](./BFF_API_DOCUMENTATION.md)

## 🌐 URLs de Produção

- **API**: https://backoffice-veiculos-bff-production.up.railway.app/
- **Documentação**: https://backoffice-veiculos-bff-production.up.railway.app/docs
- **Health Check**: https://backoffice-veiculos-bff-production.up.railway.app/health

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

---

**Última atualização**: 13 de Janeiro de 2025  
**Versão**: 1.0.0  
**Status**: ✅ **FUNCIONANDO EM PRODUÇÃO**