# Teste das APIs do BFF em Produção
# URL: https://bff-production-cae3.up.railway.app/

Write-Host "🚀 TESTANDO BFF EM PRODUÇÃO" -ForegroundColor Green
Write-Host "URL: https://bff-production-cae3.up.railway.app/" -ForegroundColor Cyan
Write-Host ""

# 1. Health Check
Write-Host "1️⃣ Testando Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/health" -Method GET -TimeoutSec 10
    Write-Host "✅ HEALTH: $($health.message) - Versão: $($health.version)" -ForegroundColor Green
} catch {
    Write-Host "❌ HEALTH: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 2. Documentação Swagger
Write-Host "2️⃣ Testando Documentação Swagger..." -ForegroundColor Yellow
try {
    $docs = Invoke-WebRequest -Uri "https://bff-production-cae3.up.railway.app/docs" -Method GET -TimeoutSec 10
    Write-Host "✅ SWAGGER: Status $($docs.StatusCode) - Documentação acessível!" -ForegroundColor Green
} catch {
    Write-Host "❌ SWAGGER: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 3. Login
Write-Host "3️⃣ Testando Login..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "admin@backoffice.com"
        password = "Admin123!@#"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody -TimeoutSec 10
    $token = $loginResponse.data.token
    Write-Host "✅ LOGIN: Token obtido - $($token.Substring(0,30))..." -ForegroundColor Green
    
    # Salvar token para próximos testes
    $global:authToken = $token
} catch {
    Write-Host "❌ LOGIN: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 4. APIs de Veículos
Write-Host "4️⃣ Testando APIs de Veículos..." -ForegroundColor Yellow
try {
    $vehicles = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles" -Method GET -TimeoutSec 15
    Write-Host "✅ VEHICLES: $($vehicles.data.data.Count) veículos encontrados" -ForegroundColor Green
} catch {
    Write-Host "❌ VEHICLES: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 5. APIs de Sales (se token disponível)
if ($global:authToken) {
    Write-Host "5️⃣ Testando APIs de Sales..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $global:authToken"
        }
        $sales = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales" -Method GET -Headers $headers -TimeoutSec 15
        Write-Host "✅ SALES: $($sales.data.data.Count) vendas encontradas" -ForegroundColor Green
    } catch {
        Write-Host "❌ SALES: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "5️⃣ Pulando teste de Sales (token não disponível)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 TESTE CONCLUÍDO!" -ForegroundColor Green

