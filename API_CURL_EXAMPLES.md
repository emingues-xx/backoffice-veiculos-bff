# 🚀 Backoffice Veículos BFF - Exemplos de cURL

Este documento contém exemplos práticos de como usar a API Backoffice Veículos BFF através de comandos cURL.

## 🔑 Autenticação

### Login
```bash
curl -X POST "https://backoffice-veiculos-bff-production.up.railway.app/api/auth/login" \
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "68ed57a3572e134dd39350ce",
      "name": "Administrador",
      "email": "admin@backoffice.com",
      "role": "admin"
    }
  },
  "message": "Login successful"
}
```

## 🚗 Veículos

### Listar Veículos
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Listar Veículos com Filtros
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles?brand=Toyota&yearMin=2020&priceMax=100000&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Buscar Veículo por ID
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles/68ed5b50572e134dd39350e4" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Criar Veículo
```bash
curl -X POST "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
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
      "id": "68ed57a3572e134dd39350ce",
      "name": "Concessionaria Toyota",
      "phone": "(11) 9999-9999",
      "email": "vendas@toyota.com"
    },
    "isFeatured": false
  }'
```

### Atualizar Veículo
```bash
curl -X PUT "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles/68ed5b50572e134dd39350e4" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 90000,
    "description": "Veiculo atualizado com novo preco"
  }'
```

### Deletar Veículo
```bash
curl -X DELETE "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles/68ed5b50572e134dd39350e4" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Atualizar Status do Veículo
```bash
curl -X PATCH "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles/68ed5b50572e134dd39350e4/status" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "sold"
  }'
```

### Estatísticas de Veículos
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles/dashboard/stats" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Buscar Veículos
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles/search?q=Toyota" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Veículos por Vendedor
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/vehicles/seller/68ed57a3572e134dd39350ce" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 💰 Vendas

### Listar Vendas
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/sales" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Listar Vendas com Filtros
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/sales?status=completed&paymentMethod=cash&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Buscar Venda por ID
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/sales/68ee4b984740ba79c6d9df9c" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Criar Venda
```bash
curl -X POST "https://backoffice-veiculos-bff-production.up.railway.app/api/sales" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": "68ed79c17fb1e4518e0098b6",
    "buyer": {
      "name": "Joao Silva",
      "email": "joao@email.com",
      "phone": "11999999999",
      "document": "12345678900"
    },
    "salePrice": 50000,
    "commission": 0,
    "paymentMethod": "cash",
    "notes": "Cliente interessado em financiamento"
  }'
```

### Atualizar Venda
```bash
curl -X PUT "https://backoffice-veiculos-bff-production.up.railway.app/api/sales/68ee4b984740ba79c6d9df9c" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "notes": "Venda finalizada com sucesso"
  }'
```

### Deletar Venda (Admin)
```bash
curl -X DELETE "https://backoffice-veiculos-bff-production.up.railway.app/api/sales/68ee4b984740ba79c6d9df9c" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Estatísticas de Vendas
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/sales/stats" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Vendas do Vendedor
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/api/sales/my-sales" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔧 Utilitários

### Health Check
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/health"
```

### Documentação Swagger
```bash
curl -X GET "https://backoffice-veiculos-bff-production.up.railway.app/docs"
```

## 📝 Notas Importantes

### Headers Obrigatórios
- **Authorization**: `Bearer YOUR_TOKEN_HERE` (para endpoints autenticados)
- **Content-Type**: `application/json` (para POST/PUT)

### Token JWT
- O token JWT expira em **4 horas**
- Após a expiração, faça login novamente para obter um novo token

### Encoding de Dados
- Use apenas caracteres **sem acentos** para evitar problemas de encoding
- ✅ Correto: "Veiculo em excelente estado, unico dono, revisoes em dia"
- ❌ Evitar: "Veículo em excelente estado, único dono, revisões em dia"

### Filtros Disponíveis

#### Veículos
- `brand` - Marca do veículo
- `vehicleModel` - Modelo do veículo
- `yearMin` / `yearMax` - Faixa de anos
- `priceMin` / `priceMax` - Faixa de preços
- `category` - Categoria (car, motorcycle, truck, van)
- `fuelType` - Tipo de combustível
- `transmission` - Transmissão (manual, automatic)
- `condition` - Condição (new, used)
- `status` - Status (active, inactive, sold)
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)

#### Vendas
- `status` - Status da venda (pending, completed, cancelled)
- `paymentMethod` - Método de pagamento (cash, financing, trade-in)
- `dateFrom` / `dateTo` - Período da venda
- `sellerId` - ID do vendedor
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)

### Códigos de Resposta
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação
- `401` - Não autenticado
- `403` - Acesso negado
- `404` - Não encontrado
- `500` - Erro interno do servidor

## 🌐 URLs de Produção

- **API**: https://backoffice-veiculos-bff-production.up.railway.app/
- **Documentação**: https://backoffice-veiculos-bff-production.up.railway.app/docs
- **Health Check**: https://backoffice-veiculos-bff-production.up.railway.app/health

Para usar em produção, substitua `http://localhost:3017` pelas URLs acima.

## 🚀 Script de Exemplo Completo

```bash
#!/bin/bash

# Configurações
API_URL="https://backoffice-veiculos-bff-production.up.railway.app"
EMAIL="admin@backoffice.com"
PASSWORD="Admin123!@#"

echo "🔐 Fazendo login..."
TOKEN=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | \
  jq -r '.data.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Erro ao obter token de autenticação"
  exit 1
fi

echo "✅ Token obtido: ${TOKEN:0:30}..."

# Testar endpoints de veículos
echo "🚗 Testando endpoints de veículos..."

echo "📋 Listando veículos..."
curl -s -X GET "$API_URL/api/vehicles" \
  -H "Authorization: Bearer $TOKEN" | jq '.data.data | length'

echo "📊 Obtendo estatísticas..."
curl -s -X GET "$API_URL/api/vehicles/dashboard/stats" \
  -H "Authorization: Bearer $TOKEN" | jq '.data.totalVehicles'

# Testar endpoints de vendas
echo "💰 Testando endpoints de vendas..."

echo "📋 Listando vendas..."
curl -s -X GET "$API_URL/api/sales" \
  -H "Authorization: Bearer $TOKEN" | jq '.data.data | length'

echo "📊 Obtendo estatísticas de vendas..."
curl -s -X GET "$API_URL/api/sales/stats" \
  -H "Authorization: Bearer $TOKEN" | jq '.data.totalSales'

echo "✅ Testes concluídos!"
```

---

**Última atualização**: 13 de Janeiro de 2025  
**Versão**: 1.0.0  
**Ambiente**: Produção
