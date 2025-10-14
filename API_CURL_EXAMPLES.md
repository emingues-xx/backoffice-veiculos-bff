# 🚀 API Backoffice Veículos - Comandos cURL para Produção

**URL Base:** `https://backoffice-veiculos-api-production.up.railway.app`

## 📋 **ÍNDICE**
- [🔐 Autenticação](#-autenticação)
- [🚗 CRUD de Veículos](#-crud-de-veículos)
- [💰 CRUD de Vendas](#-crud-de-vendas)
- [📊 Estatísticas](#-estatísticas)
- [🔧 Endpoints Utilitários](#-endpoints-utilitários)
- [📝 Exemplos Completos](#-exemplos-completos)

---

## 🔧 **USANDO O BFF (RECOMENDADO)**

### Por que usar o BFF?
- **Proxy automático:** Todas as chamadas passam pelo BFF
- **Autenticação transparente:** Token configurado automaticamente
- **CORS configurado:** Funciona com qualquer frontend
- **Validação:** Dados validados antes de enviar para API
- **Logs centralizados:** Facilita debugging

### Exemplo com BFF
```bash
# Em vez de chamar a API diretamente:
curl -X GET "https://backoffice-veiculos-api-production.up.railway.app/api/vehicles" \
  -H "Authorization: Bearer TOKEN"

# Use o BFF:
curl -X GET "https://bff-production-cae3.up.railway.app/api/vehicles" \
  -H "Authorization: Bearer TOKEN"
```

### URLs do BFF
- **Produção:** https://bff-production-cae3.up.railway.app/
- **Local:** http://localhost:3017/
- **Documentação:** https://bff-production-cae3.up.railway.app/docs

---

## 🔐 **AUTENTICAÇÃO**

### Login
```bash
curl -X POST 'https://backoffice-veiculos-api-production.up.railway.app/api/users/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "admin@backoffice.com",
    "password": "Admin123!@#"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "68ed57a3572e134dd39350ce",
      "name": "Administrador",
      "email": "admin@backoffice.com",
      "role": "admin"
    }
  }
}
```

---

## 🚗 **CRUD DE VEÍCULOS**

### 1. Listar Veículos
```bash
# Via BFF (Recomendado)
curl -X GET 'https://bff-production-cae3.up.railway.app/api/vehicles' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'

# Via API direta
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### 2. Listar Veículos com Filtros
```bash
# Por status
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles?status=active' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'

# Por marca
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles?brand=Toyota' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'

# Por categoria
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles?category=car' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'

# Com paginação
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles?page=1&limit=10' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### 3. Buscar Veículo por ID
```bash
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles/VEHICLE_ID_AQUI' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### 4. Criar Veículo
```bash
curl -X POST 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI' \
  -H 'Content-Type: application/json' \
  -d '{
    "brand": "Toyota",
    "vehicleModel": "Corolla",
    "year": 2023,
    "mileage": 15000,
    "price": 95000,
    "fuelType": "gasoline",
    "transmission": "automatic",
    "color": "Branco",
    "doors": 4,
    "category": "car",
    "condition": "used",
    "description": "Veiculo em excelente estado, unico dono, revisoes em dia.",
    "images": ["https://example.com/corolla1.jpg"],
    "features": ["Ar condicionado", "Direcao eletrica"],
    "location": {
      "city": "Sao Paulo",
      "state": "SP",
      "zipCode": "01234-567"
    },
    "seller": {
      "id": "SEU_USER_ID_AQUI",
      "name": "Concessionaria Toyota",
      "phone": "(11) 9999-9999",
      "email": "vendas@toyota.com"
    },
    "status": "active"
  }'
```

### 5. Atualizar Veículo
```bash
curl -X PUT 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles/VEHICLE_ID_AQUI' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI' \
  -H 'Content-Type: application/json' \
  -d '{
    "price": 98000,
    "description": "Preco promocional - veiculo atualizado"
  }'
```

### 6. Deletar Veículo
```bash
curl -X DELETE 'https://backoffice-veiculos-api-production.up.railway.app/api/vehicles/VEHICLE_ID_AQUI' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

---

## 💰 **CRUD DE VENDAS**

### 1. Listar Vendas
```bash
# Via BFF (Recomendado) - ⚠️ Use token fresco
curl -X GET 'https://bff-production-cae3.up.railway.app/api/sales' \
  -H 'Authorization: Bearer SEU_TOKEN_FRESCO_AQUI'

# Via API direta
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/sales' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### 2. Listar Vendas com Filtros
```bash
# Por status
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/sales?status=completed' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'

# Por método de pagamento
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/sales?paymentMethod=cash' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'

# Com paginação
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/sales?page=1&limit=10' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### 3. Buscar Venda por ID
```bash
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/sales/SALE_ID_AQUI' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### 4. Criar Venda
```bash
# Via BFF (Recomendado) - ⚠️ Use token fresco
curl -X POST 'https://bff-production-cae3.up.railway.app/api/sales' \
  -H 'Authorization: Bearer SEU_TOKEN_FRESCO_AQUI' \
  -H 'Content-Type: application/json' \
  -d '{
    "vehicleId": "VEHICLE_ID_AQUI",
    "buyer": {
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "11999999999",
      "document": "12345678900"
    },
    "salePrice": 95000,
    "paymentMethod": "cash",
    "notes": "Venda de teste",
    "commission": 0
  }'

# Via API direta
curl -X POST 'https://backoffice-veiculos-api-production.up.railway.app/api/sales' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI' \
  -H 'Content-Type: application/json' \
  -d '{...mesmo payload...}'
```

### 5. Atualizar Venda
```bash
curl -X PUT 'https://backoffice-veiculos-api-production.up.railway.app/api/sales/SALE_ID_AQUI' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI' \
  -H 'Content-Type: application/json' \
  -d '{
    "status": "completed",
    "notes": "Venda finalizada com sucesso"
  }'
```

### 6. Deletar Venda (Admin apenas)
```bash
curl -X DELETE 'https://backoffice-veiculos-api-production.up.railway.app/api/sales/SALE_ID_AQUI' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

### 7. Vendas do Vendedor
```bash
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/sales/my-sales' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

---

## 📊 **ESTATÍSTICAS**

### Estatísticas de Vendas
```bash
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/api/sales/stats' \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "totalSales": 25,
    "completedSales": 20,
    "pendingSales": 3,
    "cancelledSales": 2,
    "totalRevenue": 1250000,
    "averageSalePrice": 50000
  }
}
```

---

## 🔧 **ENDPOINTS UTILITÁRIOS**

### Health Check
```bash
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/health'
```

### Informações da API
```bash
curl -X GET 'https://backoffice-veiculos-api-production.up.railway.app/'
```

### Documentação Swagger
```
https://backoffice-veiculos-api-production.up.railway.app/docs
```

---

## 📝 **EXEMPLOS COMPLETOS**

### Script Bash Completo
```bash
#!/bin/bash

# Configurações
BASE_URL="https://backoffice-veiculos-api-production.up.railway.app"
EMAIL="admin@backoffice.com"
PASSWORD="Admin123!@#"

echo "🚀 Testando API Backoffice Veículos"

# 1. Login
echo "🔐 Fazendo login..."
TOKEN=$(curl -s -X POST "$BASE_URL/api/users/login" \
  -H 'Content-Type: application/json' \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}" | \
  jq -r '.data.token')

if [ "$TOKEN" = "null" ]; then
  echo "❌ Erro no login"
  exit 1
fi

echo "✅ Token obtido: ${TOKEN:0:50}..."

# 2. Listar veículos
echo "🚗 Listando veículos..."
VEHICLE_ID=$(curl -s -X GET "$BASE_URL/api/vehicles?limit=1" \
  -H "Authorization: Bearer $TOKEN" | \
  jq -r '.data[0]._id')

echo "✅ Veículo selecionado: $VEHICLE_ID"

# 3. Criar venda
echo "💰 Criando venda..."
SALE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/sales" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{
    \"vehicleId\": \"$VEHICLE_ID\",
    \"buyer\": {
      \"name\": \"João Silva\",
      \"email\": \"joao@email.com\",
      \"phone\": \"11999999999\",
      \"document\": \"12345678900\"
    },
    \"salePrice\": 95000,
    \"paymentMethod\": \"cash\",
    \"notes\": \"Venda de teste via script\",
    \"commission\": 0
  }")

SALE_ID=$(echo $SALE_RESPONSE | jq -r '.data._id')
echo "✅ Venda criada com ID: $SALE_ID"

# 4. Buscar venda criada
echo "🔍 Buscando venda criada..."
curl -s -X GET "$BASE_URL/api/sales/$SALE_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 5. Estatísticas
echo "📊 Obtendo estatísticas..."
curl -s -X GET "$BASE_URL/api/sales/stats" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo "🎉 Teste completo realizado com sucesso!"
```

### Script PowerShell (Usando BFF)
```powershell
# Configurações
$bffUrl = "https://bff-production-cae3.up.railway.app"
$apiUrl = "https://backoffice-veiculos-api-production.up.railway.app"
$email = "admin@backoffice.com"
$password = "Admin123!@#"

Write-Host "Testando API via BFF" -ForegroundColor Green

# 1. Login (sempre na API direta)
Write-Host "Fazendo login..." -ForegroundColor Cyan
$loginData = @{ email = $email; password = $password } | ConvertTo-Json
$loginResponse = Invoke-RestMethod -Uri "$apiUrl/api/users/login" -Method POST -Body $loginData -ContentType "application/json"
$token = $loginResponse.data.token
Write-Host "Token obtido: $($token.Substring(0,50))..." -ForegroundColor Green

# 2. Listar veículos via BFF
Write-Host "Listando veículos via BFF..." -ForegroundColor Cyan
$headers = @{"Authorization" = "Bearer $token"}
$vehicles = Invoke-RestMethod -Uri "$bffUrl/api/vehicles?limit=1" -Method GET -Headers $headers
$vehicleId = $vehicles.data.data[0]._id
Write-Host "Veículo selecionado: $vehicleId" -ForegroundColor Green

# 3. Criar venda via BFF (com token fresco)
Write-Host "Criando venda via BFF..." -ForegroundColor Cyan
$saleData = @{
  vehicleId = $vehicleId
  buyer = @{
    name = "João Silva"
    email = "joao@email.com"
    phone = "11999999999"
    document = "12345678900"
  }
  salePrice = 95000
  paymentMethod = "cash"
  notes = "Venda de teste via BFF"
  commission = 0
} | ConvertTo-Json -Depth 3

$newSale = Invoke-RestMethod -Uri "$bffUrl/api/sales" -Method POST -Body $saleData -Headers $headers -ContentType "application/json"
Write-Host "Venda criada com ID: $($newSale.data._id)" -ForegroundColor Green

# 4. Estatísticas via BFF
Write-Host "Obtendo estatísticas via BFF..." -ForegroundColor Cyan
$stats = Invoke-RestMethod -Uri "$bffUrl/api/sales/stats" -Method GET -Headers $headers
Write-Host "Total de vendas: $($stats.data.totalSales)" -ForegroundColor Yellow

Write-Host "Teste completo realizado com sucesso!" -ForegroundColor Green
```

---

## ⚠️ **IMPORTANTE**

### Token JWT
- **Duração:** 4 horas
- **Formato:** `Bearer TOKEN_AQUI`
- **Header:** `Authorization: Bearer SEU_TOKEN_AQUI`
- **⚠️ CRÍTICO:** Sempre obtenha um token fresco antes de operações de vendas
- **Renovação:** Faça login novamente se receber erro 401

### Códigos de Status
- **200:** Sucesso
- **201:** Criado com sucesso
- **400:** Erro de validação
- **401:** Não autorizado (token inválido/expirado) - **Obtenha novo token**
- **404:** Recurso não encontrado
- **500:** Erro interno do servidor

### ⚠️ **Problemas Comuns e Soluções**
- **Erro 401:** Token expirado - Faça login novamente
- **Erro 400 em vendas:** Dados inválidos - Verifique schema
- **Timeout:** Servidor pode estar sobrecarregado - Tente novamente

### Filtros Disponíveis
- **Veículos:** `brand`, `category`, `status`, `year`, `price`, `fuelType`, `transmission`
- **Vendas:** `status`, `paymentMethod`, `page`, `limit`

---

## 🌐 **URLS IMPORTANTES**

- **API Base:** https://backoffice-veiculos-api-production.up.railway.app/
- **Documentação:** https://backoffice-veiculos-api-production.up.railway.app/docs
- **Health Check:** https://backoffice-veiculos-api-production.up.railway.app/health

---

## ✅ **STATUS DA API**

- **✅ API funcionando em produção**
- **✅ CRUD de veículos operacional**
- **✅ CRUD de vendas operacional (com token fresco)**
- **✅ Autenticação JWT funcionando**
- **✅ Documentação Swagger disponível**
- **✅ Filtros e paginação funcionando**
- **✅ Estatísticas disponíveis**
- **✅ BFF funcionando como proxy**

## 🔧 **BFF (Backend for Frontend)**

### URLs do BFF
- **BFF Produção:** https://bff-production-cae3.up.railway.app/
- **BFF Local:** http://localhost:3017/ (ou porta configurada)
- **Documentação BFF:** https://bff-production-cae3.up.railway.app/docs

### Funcionalidades do BFF
- **Proxy para API:** Todas as chamadas passam pelo BFF
- **Autenticação:** Token JWT configurado automaticamente
- **CORS:** Configurado para todas as origens
- **Validação:** Validação de dados antes de enviar para API
- **Logs:** Logs detalhados de todas as operações

**🎉 API e BFF 100% funcionais em produção!**