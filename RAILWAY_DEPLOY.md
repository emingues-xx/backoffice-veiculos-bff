# 🚀 Deploy no Railway - Backoffice Veículos BFF

## 📋 Pré-requisitos

1. **Conta no Railway**: [railway.app](https://railway.app)
2. **Repositório no GitHub**: Código commitado e pushado
3. **Railway CLI** (opcional): `npm install -g @railway/cli`

## 🚀 Deploy via Railway Dashboard

### 1. Conectar Repositório

1. Acesse [railway.app](https://railway.app)
2. Faça login com sua conta GitHub
3. Clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Escolha o repositório `backoffice-veiculos-bff`
6. Clique em **"Deploy Now"**

### 2. Configurar Variáveis de Ambiente

No dashboard do Railway, vá em **"Variables"** e adicione:

```env
# Server Configuration
NODE_ENV=production
PORT=3002

# API Backend Configuration
API_BASE_URL=https://sua-api-backend.railway.app
API_TIMEOUT=15000

# JWT Configuration
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=https://seu-frontend.railway.app

# Logging
LOG_LEVEL=warn
```

### 3. Configurar Domínio (Opcional)

1. Vá em **"Settings"** → **"Domains"**
2. Clique em **"Generate Domain"** ou adicione um domínio customizado
3. O Railway gerará uma URL como: `https://backoffice-veiculos-bff-production.up.railway.app`

## 🚀 Deploy via Railway CLI

### 1. Instalar Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login no Railway

```bash
railway login
```

### 3. Inicializar Projeto

```bash
railway init
```

### 4. Configurar Variáveis de Ambiente

```bash
# Configurar variáveis uma por uma
railway variables set NODE_ENV=production
railway variables set API_BASE_URL=https://sua-api-backend.railway.app
railway variables set JWT_SECRET=seu-jwt-secret-super-seguro-aqui
railway variables set CORS_ORIGIN=https://seu-frontend.railway.app

# Ou configurar todas de uma vez
railway variables set NODE_ENV=production API_BASE_URL=https://sua-api-backend.railway.app JWT_SECRET=seu-jwt-secret-super-seguro-aqui CORS_ORIGIN=https://seu-frontend.railway.app
```

### 5. Deploy

```bash
railway up
```

## 🔧 Configurações Avançadas

### Health Check

O Railway automaticamente detecta o health check em `/health` configurado no `railway.json`.

### Build e Start

O Railway usa os scripts do `package.json`:
- **Build**: `npm run build` (executado automaticamente no `postinstall`)
- **Start**: `npm start`

### Logs

Para ver os logs em tempo real:

```bash
railway logs
```

### Variáveis de Ambiente Importantes

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NODE_ENV` | Ambiente de execução | `production` |
| `PORT` | Porta do servidor | `3002` |
| `API_BASE_URL` | URL da API backend | `https://api-backend.railway.app` |
| `JWT_SECRET` | Chave secreta JWT | `sua-chave-super-segura` |
| `CORS_ORIGIN` | Origem permitida CORS | `https://frontend.railway.app` |

## 🧪 Testando o Deploy

### 1. Health Check

```bash
curl https://seu-app.railway.app/health
```

### 2. Testar Endpoints

```bash
# Listar veículos
curl https://seu-app.railway.app/api/veiculos

# Criar veículo (com token)
curl -X POST https://seu-app.railway.app/api/veiculos \
  -H "Authorization: Bearer seu-token-jwt" \
  -H "Content-Type: application/json" \
  -d '{"marca":"Toyota","modelo":"Corolla","ano":2023,"preco":85000,"quilometragem":0,"combustivel":"flex","cor":"Branco","cambio":"automatico","categoria":"carro"}'
```

## 🔄 Deploy Automático

O Railway automaticamente faz deploy quando você faz push para a branch principal do GitHub.

### Workflow Recomendado

1. **Desenvolvimento local**: `npm run dev`
2. **Testes**: `npm test`
3. **Commit e Push**: `git add . && git commit -m "feat: nova feature" && git push`
4. **Deploy automático**: Railway detecta o push e faz deploy

## 🐛 Troubleshooting

### Erro de Build

```bash
# Ver logs de build
railway logs --build

# Verificar se todas as dependências estão no package.json
npm install
```

### Erro de Runtime

```bash
# Ver logs de runtime
railway logs

# Verificar variáveis de ambiente
railway variables
```

### Erro de CORS

- Verifique se `CORS_ORIGIN` está configurado corretamente
- Certifique-se de que a URL do frontend está correta

### Erro de Conexão com API

- Verifique se `API_BASE_URL` está correto
- Certifique-se de que a API backend está rodando e acessível

## 📊 Monitoramento

### Métricas Disponíveis

- **CPU Usage**: Uso de CPU
- **Memory Usage**: Uso de memória
- **Network**: Tráfego de rede
- **Response Time**: Tempo de resposta

### Logs

- **Build Logs**: Logs do processo de build
- **Runtime Logs**: Logs da aplicação em execução
- **Error Logs**: Logs de erro

## 🔒 Segurança

### Variáveis Sensíveis

- **JWT_SECRET**: Use uma chave forte e única
- **API_BASE_URL**: Use HTTPS em produção
- **CORS_ORIGIN**: Configure apenas domínios confiáveis

### Recomendações

1. **Nunca commite** arquivos `.env` ou chaves secretas
2. **Use HTTPS** para todas as URLs em produção
3. **Configure CORS** adequadamente
4. **Monitore logs** regularmente

## 🎯 Próximos Passos

1. **Configurar domínio customizado** (opcional)
2. **Configurar CI/CD** com GitHub Actions
3. **Implementar monitoramento** avançado
4. **Configurar backup** de dados
5. **Implementar rate limiting** se necessário

## 📞 Suporte

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: Abra uma issue no repositório
