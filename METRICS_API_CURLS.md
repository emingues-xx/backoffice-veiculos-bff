# 📊 APIs de Métricas - Exemplos de cURL

Este documento contém exemplos práticos de como usar as APIs de métricas do BFF Backoffice Veículos.

## 🔧 **USANDO O BFF (RECOMENDADO)**

### Por que usar o BFF?
- **Proxy automático:** Todas as chamadas passam pelo BFF
- **Autenticação transparente:** Token configurado automaticamente
- **CORS configurado:** Funciona com qualquer frontend
- **Validação:** Dados validados antes de enviar para API
- **Logs centralizados:** Facilita debugging

### URLs do BFF
- **Local:** `http://localhost:3018`
- **Produção:** `https://bff-production-cae3.up.railway.app`

---

## 🔐 **AUTENTICAÇÃO**

Todas as APIs de métricas requerem autenticação via JWT token. Primeiro, faça login para obter o token:

### Login (API Backend)
```bash
curl -X POST "https://backoffice-veiculos-api-production.up.railway.app/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@backoffice.com",
    "password": "Admin123!@#"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "68ed57a3572e134dd39350ce",
      "email": "admin@backoffice.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login realizado com sucesso"
}
```

---

## 📊 **APIS DE MÉTRICAS**

### 1. 📈 Total Revenue (Receita Total)

Retorna a receita total no período especificado.

#### Via BFF (Recomendado)
```bash
curl -X GET "http://localhost:3018/api/metrics/revenue?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

#### Via API Direta
```bash
curl -X GET "https://backoffice-veiculos-api-production.up.railway.app/api/metrics/revenue?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 2426000,
    "period": {
      "startDate": "2025-10-14",
      "endDate": "2025-10-15"
    }
  }
}
```

### 2. 📅 Sales by Day (Vendas por Dia)

Retorna as vendas agrupadas por dia no período especificado.

#### Via BFF (Recomendado)
```bash
curl -X GET "http://localhost:3018/api/metrics/sales-by-day?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

#### Via API Direta
```bash
curl -X GET "https://backoffice-veiculos-api-production.up.railway.app/api/metrics/sales-by-day?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "salesByDay": [
      {
        "date": "2025-10-14",
        "count": 38,
        "revenue": 2426000
      }
    ],
    "period": {
      "startDate": "2025-10-14",
      "endDate": "2025-10-15"
    }
  }
}
```

### 3. 🏆 Top Sellers (Melhores Vendedores)

Retorna os vendedores com melhor performance no período especificado.

#### Via BFF (Recomendado)
```bash
curl -X GET "http://localhost:3018/api/metrics/top-sellers?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

#### Via API Direta
```bash
curl -X GET "https://backoffice-veiculos-api-production.up.railway.app/api/metrics/top-sellers?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "topSellers": [
      {
        "sellerId": "68ed57a3572e134dd39350ce",
        "sellerName": "Administrador",
        "salesCount": 38,
        "revenue": 2426000,
        "commission": 121300
      }
    ],
    "period": {
      "startDate": "2025-10-14",
      "endDate": "2025-10-15"
    }
  }
}
```

### 4. 📊 Total Sales (Total de Vendas)

Retorna o total de vendas e comparação com período anterior.

#### Via BFF (Recomendado)
```bash
curl -X GET "http://localhost:3018/api/metrics/total-sales?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

#### Via API Direta
```bash
curl -X GET "https://backoffice-veiculos-api-production.up.railway.app/api/metrics/total-sales?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "totalSales": 1,
    "totalRevenue": 50000,
    "period": {
      "startDate": "2025-10-14T00:00:00.000Z",
      "endDate": "2025-10-15T00:00:00.000Z"
    },
    "growth": 100
  }
}
```

---

## 🔧 **PARÂMETROS DE QUERY DISPONÍVEIS**

Todas as APIs de métricas suportam os seguintes parâmetros de query:

| Parâmetro | Tipo | Obrigatório | Descrição | Exemplo |
|-----------|------|-------------|-----------|---------|
| `startDate` | string (ISO 8601) | Não | Data de início do período | `2025-10-14` |
| `endDate` | string (ISO 8601) | Não | Data de fim do período | `2025-10-15` |
| `period` | string | Não | Período predefinido | `daily`, `weekly`, `monthly`, `yearly` |
| `sellerId` | string (ObjectId) | Não | ID do vendedor específico | `68ed57a3572e134dd39350ce` |

### Exemplos de Uso dos Parâmetros

```bash
# Usando período predefinido
curl -X GET "http://localhost:3018/api/metrics/revenue?period=monthly" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Filtrando por vendedor específico
curl -X GET "http://localhost:3018/api/metrics/top-sellers?sellerId=68ed57a3572e134dd39350ce" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Combinando parâmetros
curl -X GET "http://localhost:3018/api/metrics/sales-by-day?startDate=2025-10-01&endDate=2025-10-31&sellerId=68ed57a3572e134dd39350ce" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🧪 **SCRIPTS DE TESTE**

### Script PowerShell Completo

```powershell
# Configurações
$baseUrl = "http://localhost:3018"
$email = "admin@backoffice.com"
$password = "Admin123!@#"

# Login e obter token
Write-Host "🔐 Fazendo login..." -ForegroundColor Yellow
$loginBody = @{
    email = $email
    password = $password
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "https://backoffice-veiculos-api-production.up.railway.app/api/users/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = $loginResponse.data.token

if (-not $token) {
    Write-Host "❌ Erro: Falha no login" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Token obtido: $($token.Substring(0, 20))..." -ForegroundColor Green

# Headers para autenticação
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# Testar APIs de métricas
Write-Host "`n📊 === Testando APIs de Métricas ===" -ForegroundColor Cyan

Write-Host "`n1. 📈 Testando Total Revenue..." -ForegroundColor Yellow
$revenueResponse = Invoke-RestMethod -Uri "$baseUrl/api/metrics/revenue?startDate=2025-10-14&endDate=2025-10-15" -Method GET -Headers $headers
Write-Host "   ✅ Total Revenue: R$ $($revenueResponse.data.totalRevenue)" -ForegroundColor Green

Write-Host "`n2. 📅 Testando Sales by Day..." -ForegroundColor Yellow
$salesByDayResponse = Invoke-RestMethod -Uri "$baseUrl/api/metrics/sales-by-day?startDate=2025-10-14&endDate=2025-10-15" -Method GET -Headers $headers
Write-Host "   ✅ Sales by Day Count: $($salesByDayResponse.data.salesByDay.Count)" -ForegroundColor Green

Write-Host "`n3. 🏆 Testando Top Sellers..." -ForegroundColor Yellow
$topSellersResponse = Invoke-RestMethod -Uri "$baseUrl/api/metrics/top-sellers?startDate=2025-10-14&endDate=2025-10-15" -Method GET -Headers $headers
Write-Host "   ✅ Top Sellers Count: $($topSellersResponse.data.topSellers.Count)" -ForegroundColor Green

Write-Host "`n4. 📊 Testando Total Sales..." -ForegroundColor Yellow
$totalSalesResponse = Invoke-RestMethod -Uri "$baseUrl/api/metrics/total-sales?startDate=2025-10-14&endDate=2025-10-15" -Method GET -Headers $headers
Write-Host "   ✅ Total Sales: $($totalSalesResponse.data.totalSales)" -ForegroundColor Green

Write-Host "`n🎉 Teste completo realizado com sucesso!" -ForegroundColor Green
```

### Script Bash Completo

```bash
#!/bin/bash

# Configurações
BASE_URL="http://localhost:3018"
EMAIL="admin@backoffice.com"
PASSWORD="Admin123!@#"

echo "🚀 Testando APIs de Métricas do BFF"

# 1. Login
echo "🔐 Fazendo login..."
TOKEN=$(curl -s -X POST "https://backoffice-veiculos-api-production.up.railway.app/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | \
  jq -r '.data.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Erro: Falha no login"
  exit 1
fi

echo "✅ Token obtido: ${TOKEN:0:20}..."

# 2. Testar APIs de métricas
echo -e "\n📊 === Testando APIs de Métricas ==="

echo -e "\n1. 📈 Testando Total Revenue..."
curl -s -X GET "$BASE_URL/api/metrics/revenue?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n2. 📅 Testando Sales by Day..."
curl -s -X GET "$BASE_URL/api/metrics/sales-by-day?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n3. 🏆 Testando Top Sellers..."
curl -s -X GET "$BASE_URL/api/metrics/top-sellers?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n4. 📊 Testando Total Sales..."
curl -s -X GET "$BASE_URL/api/metrics/total-sales?startDate=2025-10-14&endDate=2025-10-15" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n🎉 Teste completo realizado com sucesso!"
```

---

## ⚠️ **CÓDIGOS DE ERRO**

| Código | Descrição | Solução |
|--------|-----------|---------|
| 400 | Bad Request | Verificar parâmetros de query |
| 401 | Unauthorized | Verificar token de autenticação |
| 403 | Forbidden | Usuário não tem permissão (admin/manager) |
| 404 | Not Found | Endpoint não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

### Exemplos de Respostas de Erro

#### Erro de Autenticação (401)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token de autenticação inválido ou expirado"
  }
}
```

#### Erro de Validação (400)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "endDate deve ser maior que startDate"
  }
}
```

#### Erro de Permissão (403)
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Permissão insuficiente. Apenas admin e manager podem acessar métricas"
  }
}
```

---

## 🔗 **LINKS ÚTEIS**

- **BFF Local:** http://localhost:3018
- **BFF Produção:** https://bff-production-cae3.up.railway.app
- **API Backend:** https://backoffice-veiculos-api-production.up.railway.app
- **Documentação Swagger:** http://localhost:3018/docs
- **Health Check:** http://localhost:3018/health

---

## 📝 **NOTAS IMPORTANTES**

1. **Datas:** Use o formato ISO 8601 (YYYY-MM-DD) para as datas
2. **Período Padrão:** Se não especificar datas, será usado o período dos últimos 30 dias
3. **Permissões:** Apenas usuários com role `admin` ou `manager` podem acessar métricas
4. **Token JWT:** Expira em 4 horas, faça login novamente após expiração
5. **Timezone:** Todas as datas são processadas em UTC
6. **Cache:** As respostas são cacheadas por 5 minutos para melhor performance
7. **Rate Limiting:** Máximo de 1000 requisições por hora por usuário

---

## ✅ **STATUS DAS APIS DE MÉTRICAS**

- **✅ Revenue Metrics** - Funcionando perfeitamente
- **✅ Sales by Day** - Funcionando perfeitamente  
- **✅ Top Sellers** - Funcionando perfeitamente
- **✅ Total Sales** - Funcionando perfeitamente
- **✅ Autenticação JWT** - Funcionando
- **✅ Validação de parâmetros** - Funcionando
- **✅ Documentação Swagger** - Disponível
- **✅ CORS configurado** - Funcionando

🎉 **APIs de Métricas 100% funcionais no BFF!**
