# Teste Individual de Operacoes CRUD
Write-Host "TESTE INDIVIDUAL DE OPERACOES CRUD" -ForegroundColor Green
Write-Host ""

# 1. Login
Write-Host "1. Fazendo login..." -ForegroundColor Yellow
$loginBody = '{"email":"admin@backoffice.com","password":"Admin123!@#"}'
try {
    $login = Invoke-RestMethod -Uri "https://backoffice-veiculos-api-production.up.railway.app/api/users/login" -Method POST -ContentType "application/json" -Body $loginBody
    $token = $login.data.token
    Write-Host "   Login sucesso: $($token.Substring(0,30))..." -ForegroundColor Green
} catch {
    Write-Host "   Login falhou: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# 2. Listar veiculos
Write-Host "2. Listando veiculos..." -ForegroundColor Yellow
try {
    $vehicles = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles" -Method GET -Headers $headers
    Write-Host "   Veiculos encontrados: $($vehicles.data.data.Count)" -ForegroundColor Green
    if ($vehicles.data.data.Count -gt 0) {
        $testVehicleId = $vehicles.data.data[0]._id
        Write-Host "   ID do veiculo para teste: $testVehicleId" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   Erro ao listar: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Testar UPDATE
if ($testVehicleId) {
    Write-Host "3. Testando UPDATE..." -ForegroundColor Yellow
    $updateData = '{"price": 85000}'
    try {
        $updated = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles/$testVehicleId" -Method PUT -Headers $headers -Body $updateData
        Write-Host "   UPDATE sucesso: Preco atualizado para $($updated.data.price)" -ForegroundColor Green
    } catch {
        Write-Host "   UPDATE falhou: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 4. Testar DELETE
if ($testVehicleId) {
    Write-Host "4. Testando DELETE..." -ForegroundColor Yellow
    try {
        $deleted = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles/$testVehicleId" -Method DELETE -Headers $headers
        Write-Host "   DELETE sucesso: Veiculo deletado" -ForegroundColor Green
    } catch {
        Write-Host "   DELETE falhou: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 5. Testar Sales
Write-Host "5. Testando Sales..." -ForegroundColor Yellow
try {
    $sales = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales" -Method GET -Headers $headers
    Write-Host "   Sales encontradas: $($sales.data.data.Count)" -ForegroundColor Green
} catch {
    Write-Host "   Erro ao listar sales: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "TESTE CONCLUIDO!" -ForegroundColor Green
