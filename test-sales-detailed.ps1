# Teste Detalhado de Vendas
Write-Host "TESTE DETALHADO DE VENDAS" -ForegroundColor Green
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

# 2. Listar veiculos para pegar um ID valido
Write-Host "2. Listando veiculos..." -ForegroundColor Yellow
try {
    $vehicles = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles" -Method GET -Headers $headers
    $vehicleId = $vehicles.data.data[0]._id
    Write-Host "   Veiculo selecionado: $vehicleId" -ForegroundColor Green
} catch {
    Write-Host "   Erro ao listar veiculos: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 3. Testar venda no BACKEND direto
Write-Host "3. Testando venda no BACKEND direto..." -ForegroundColor Yellow
$saleData = @{
    vehicleId = $vehicleId
    buyer = @{
        name = "Joao Silva"
        email = "joao@email.com"
        phone = "11999999999"
        document = "12345678900"
    }
    salePrice = 70000
    commission = 0
    paymentMethod = "cash"
    notes = "Teste de venda"
} | ConvertTo-Json -Depth 3

try {
    $newSale = Invoke-RestMethod -Uri "https://backoffice-veiculos-api-production.up.railway.app/api/sales" -Method POST -Headers $headers -Body $saleData
    Write-Host "   BACKEND SUCESSO: Venda criada com ID $($newSale.data._id)" -ForegroundColor Green
    $backendSaleId = $newSale.data._id
} catch {
    Write-Host "   BACKEND ERRO: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response Body: $responseBody" -ForegroundColor Red
    }
}

# 4. Testar venda no BFF
Write-Host "4. Testando venda no BFF..." -ForegroundColor Yellow
try {
    $newSale = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales" -Method POST -Headers $headers -Body $saleData
    Write-Host "   BFF SUCESSO: Venda criada com ID $($newSale.data._id)" -ForegroundColor Green
    $bffSaleId = $newSale.data._id
} catch {
    Write-Host "   BFF ERRO: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response Body: $responseBody" -ForegroundColor Red
    }
}

# 5. Listar vendas
Write-Host "5. Listando vendas..." -ForegroundColor Yellow
try {
    $sales = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales" -Method GET -Headers $headers
    Write-Host "   Vendas encontradas: $($sales.data.data.Count)" -ForegroundColor Green
    if ($sales.data.data.Count -gt 0) {
        Write-Host "   Primeira venda: $($sales.data.data[0]._id)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   Erro ao listar vendas: $($_.Exception.Message)" -ForegroundColor Red
}

# 6. Testar dados mais simples
Write-Host "6. Testando dados mais simples..." -ForegroundColor Yellow
$simpleSaleData = @{
    vehicleId = $vehicleId
    buyer = @{
        name = "Teste"
        email = "teste@teste.com"
        phone = "11999999999"
        document = "12345678900"
    }
    salePrice = 50000
    paymentMethod = "cash"
} | ConvertTo-Json -Depth 3

try {
    $newSale = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales" -Method POST -Headers $headers -Body $simpleSaleData
    Write-Host "   DADOS SIMPLES SUCESSO: Venda criada com ID $($newSale.data._id)" -ForegroundColor Green
} catch {
    Write-Host "   DADOS SIMPLES ERRO: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response Body: $responseBody" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "TESTE CONCLUIDO!" -ForegroundColor Green
