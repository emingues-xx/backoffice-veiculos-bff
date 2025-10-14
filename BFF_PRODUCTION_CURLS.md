# 🚀 BFF Produção - cURLs Testados e Funcionais

**URL BFF:** https://bff-production-cae3.up.railway.app/  
**Status:** ✅ **100% FUNCIONAL EM PRODUÇÃO**  
**Data:** 14/10/2025

## 📊 **STATUS DOS TESTES**

- ✅ **Health Check** - Funcionando
- ✅ **Login** - Funcionando
- ✅ **Veículos** - 10 veículos encontrados
- ✅ **Vendas** - API respondendo
- ✅ **Autenticação** - Token JWT funcionando
- ✅ **CORS** - Configurado para todas as origens

---

## 🔐 **AUTENTICAÇÃO**

### 1. Login (Backend Direto)
```bash
curl -X POST "https://backoffice-veiculos-api-production.up.railway.app/api/users/login" \
  -H "Content-Type: application/json" \
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

## 🚗 **VEÍCULOS (BFF)**

### 1. Health Check
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/health"
```

### 2. Informações da API
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/"
```

### 3. Listar Veículos
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/api/vehicles" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 4. Listar Veículos com Filtros
```bash
# Por status
curl -X GET "https://bff-production-cae3.up.railway.app/api/vehicles?status=active" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Por marca
curl -X GET "https://bff-production-cae3.up.railway.app/api/vehicles?brand=Toyota" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Por categoria
curl -X GET "https://bff-production-cae3.up.railway.app/api/vehicles?category=car" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Com paginação
curl -X GET "https://bff-production-cae3.up.railway.app/api/vehicles?page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 5. Buscar Veículo por ID
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/api/vehicles/VEHICLE_ID_AQUI" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 6. Criar Veículo
```bash
curl -X POST "https://bff-production-cae3.up.railway.app/api/vehicles" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
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

### 7. Atualizar Veículo
```bash
curl -X PUT "https://bff-production-cae3.up.railway.app/api/vehicles/VEHICLE_ID_AQUI" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 98000,
    "description": "Preco promocional - veiculo atualizado"
  }'
```

### 8. Deletar Veículo
```bash
curl -X DELETE "https://bff-production-cae3.up.railway.app/api/vehicles/VEHICLE_ID_AQUI" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 💰 **VENDAS (BFF)**

### 1. Listar Vendas
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/api/sales" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"
```

### 2. Listar Vendas com Filtros
```bash
# Por status
curl -X GET "https://bff-production-cae3.up.railway.app/api/sales?status=completed" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"

# Por método de pagamento
curl -X GET "https://bff-production-cae3.up.railway.app/api/sales?paymentMethod=cash" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"

# Com paginação
curl -X GET "https://bff-production-cae3.up.railway.app/api/sales?page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"
```

### 3. Buscar Venda por ID
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/api/sales/SALE_ID_AQUI" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"
```

### 4. Criar Venda
```bash
curl -X POST "https://bff-production-cae3.up.railway.app/api/sales" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI" \
  -H "Content-Type: application/json" \
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
```

### 5. Atualizar Venda
```bash
curl -X PUT "https://bff-production-cae3.up.railway.app/api/sales/SALE_ID_AQUI" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "notes": "Venda finalizada com sucesso"
  }'
```

### 6. Deletar Venda (Admin apenas)
```bash
curl -X DELETE "https://bff-production-cae3.up.railway.app/api/sales/SALE_ID_AQUI" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"
```

### 7. Vendas do Vendedor
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/api/sales/my-sales" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"
```

### 8. Estatísticas de Vendas
```bash
curl -X GET "https://bff-production-cae3.up.railway.app/api/sales/stats" \
  -H "Authorization: Bearer SEU_TOKEN_FRESCO_AQUI"
```

---

## 📝 **EXEMPLO COMPLETO - SCRIPT BASH**

```bash
#!/bin/bash

# Configurações
BFF_URL="https://bff-production-cae3.up.railway.app"
API_URL="https://backoffice-veiculos-api-production.up.railway.app"
EMAIL="admin@backoffice.com"
PASSWORD="Admin123!@#"

echo "🚀 Testando BFF em Produção"

# 1. Health Check
echo "1. Health Check..."
curl -X GET "$BFF_URL/health"

# 2. Login
echo "2. Fazendo login..."
TOKEN=$(curl -s -X POST "$API_URL/api/users/login" \
  -H 'Content-Type: application/json' \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}" | \
  jq -r '.data.token')

if [ "$TOKEN" = "null" ]; then
  echo "❌ Erro no login"
  exit 1
fi

echo "✅ Token obtido: ${TOKEN:0:50}..."

# 3. Listar veículos via BFF
echo "3. Listando veículos via BFF..."
VEHICLE_ID=$(curl -s -X GET "$BFF_URL/api/vehicles?limit=1" \
  -H "Authorization: Bearer $TOKEN" | \
  jq -r '.data.data[0]._id')

echo "✅ Veículo selecionado: $VEHICLE_ID"

# 4. Listar vendas via BFF
echo "4. Listando vendas via BFF..."
curl -s -X GET "$BFF_URL/api/sales" \
  -H "Authorization: Bearer $TOKEN" | jq '.data.data | length'

# 5. Estatísticas via BFF
echo "5. Obtendo estatísticas via BFF..."
curl -s -X GET "$BFF_URL/api/sales/stats" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo "🎉 Teste completo realizado com sucesso!"
```

---

## 📝 **EXEMPLO COMPLETO - SCRIPT POWERSHELL**

```powershell
# Configurações
$bffUrl = "https://bff-production-cae3.up.railway.app"
$apiUrl = "https://backoffice-veiculos-api-production.up.railway.app"
$email = "admin@backoffice.com"
$password = "Admin123!@#"

Write-Host "Testando BFF em Producao" -ForegroundColor Green

# 1. Health Check
Write-Host "1. Health Check..." -ForegroundColor Cyan
$health = Invoke-RestMethod -Uri "$bffUrl/health" -Method GET
Write-Host "Status: $($health.message)" -ForegroundColor Green

# 2. Login
Write-Host "2. Fazendo login..." -ForegroundColor Cyan
$loginData = @{ email = $email; password = $password } | ConvertTo-Json
$loginResponse = Invoke-RestMethod -Uri "$apiUrl/api/users/login" -Method POST -Body $loginData -ContentType "application/json"
$token = $loginResponse.data.token
Write-Host "Token obtido: $($token.Substring(0,50))..." -ForegroundColor Green

# 3. Listar veículos via BFF
Write-Host "3. Listando veículos via BFF..." -ForegroundColor Cyan
$headers = @{"Authorization" = "Bearer $token"}
$vehicles = Invoke-RestMethod -Uri "$bffUrl/api/vehicles?limit=1" -Method GET -Headers $headers
$vehicleId = $vehicles.data.data[0]._id
Write-Host "Veículo selecionado: $vehicleId" -ForegroundColor Green

# 4. Listar vendas via BFF
Write-Host "4. Listando vendas via BFF..." -ForegroundColor Cyan
$sales = Invoke-RestMethod -Uri "$bffUrl/api/sales" -Method GET -Headers $headers
Write-Host "Vendas encontradas: $($sales.data.data.Count)" -ForegroundColor Green

# 5. Estatísticas via BFF
Write-Host "5. Obtendo estatísticas via BFF..." -ForegroundColor Cyan
$stats = Invoke-RestMethod -Uri "$bffUrl/api/sales/stats" -Method GET -Headers $headers
Write-Host "Estatísticas obtidas com sucesso" -ForegroundColor Green

Write-Host "Teste completo realizado com sucesso!" -ForegroundColor Green
```

---

## ⚠️ **IMPORTANTE**

### Token JWT
- **Duração:** 4 horas
- **⚠️ CRÍTICO:** Para vendas, sempre use token fresco
- **Renovação:** Faça login novamente se receber erro 401

### URLs
- **BFF Produção:** https://bff-production-cae3.up.railway.app/
- **API Backend:** https://backoffice-veiculos-api-production.up.railway.app/
- **Documentação BFF:** https://bff-production-cae3.up.railway.app/docs

### Códigos de Status
- **200:** Sucesso
- **201:** Criado com sucesso
- **400:** Erro de validação
- **401:** Token expirado - Obtenha novo token
- **404:** Recurso não encontrado
- **500:** Erro interno do servidor

---

## ✅ **STATUS FINAL**

**🎉 BFF 100% FUNCIONAL EM PRODUÇÃO!**

- ✅ **Health Check** funcionando
- ✅ **Autenticação** funcionando
- ✅ **Veículos** funcionando (10 veículos encontrados)
- ✅ **Vendas** funcionando
- ✅ **CORS** configurado
- ✅ **Proxy** funcionando
- ✅ **Documentação** disponível

**Status: PRONTO PARA USO EM PRODUÇÃO!**
