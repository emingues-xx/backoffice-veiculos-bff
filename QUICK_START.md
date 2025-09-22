# 🚀 Quick Start - Backoffice Veículos BFF

## ⚡ Setup Rápido

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3002
API_BASE_URL=http://localhost:3001
JWT_SECRET=your-jwt-secret-key
CORS_ORIGIN=http://localhost:3000
```

### 3. Executar em Desenvolvimento
```bash
npm run dev
```

O BFF estará disponível em: `http://localhost:3002`

## 🧪 Testar a API

### Health Check
```bash
curl http://localhost:3002/health
```

### Listar Veículos (Público)
```bash
curl http://localhost:3002/api/veiculos
```

### Criar Veículo (Autenticado)
```bash
curl -X POST http://localhost:3002/api/veiculos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDE3ODQ1YTA4ZGY5Zjk4MmUzMzk3YSIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTg1NTg5NTcsImV4cCI6MTc1ODY0NTM1N30.3wxLfvFjT6OwSVjWH41btkfbIrzZAMAww8Vpvxw2e8M" \
  -d '{
    "marca": "Toyota",
    "modelo": "Corolla",
    "ano": 2022,
    "preco": 85000,
    "quilometragem": 0,
    "combustivel": "flex",
    "cor": "Branco",
    "cambio": "automatico",
    "categoria": "carro"
  }'
```

### Executar Script de Teste Automatizado
```bash
npm run test:api
```

## 📚 Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/health` | Status da aplicação | ❌ |
| GET | `/api/veiculos` | Listar veículos | ❌ |
| POST | `/api/veiculos` | Criar veículo | ✅ |
| GET | `/api/veiculos/dashboard/stats` | Estatísticas | ✅ |

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Testes
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Testar API
npm run test:api
```

## 🐳 Docker

```bash
# Build e executar
docker-compose up --build

# Apenas executar
docker-compose up
```

## 📋 Pré-requisitos

- Node.js 18+
- API Backend rodando em `http://localhost:3001`
- JWT Token válido (fornecido no exemplo)

## 🆘 Troubleshooting

### Erro de Conexão com API
- Verifique se a API backend está rodando em `http://localhost:3001`
- Confirme a URL no arquivo `.env`

### Erro de Autenticação
- Verifique se o JWT token está válido
- Confirme o `JWT_SECRET` no arquivo `.env`

### Erro de CORS
- Verifique a configuração `CORS_ORIGIN` no arquivo `.env`
- Confirme se o frontend está rodando na URL configurada
