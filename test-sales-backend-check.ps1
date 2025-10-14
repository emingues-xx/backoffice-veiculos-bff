# Verificar se o backend tem vendas implementadas
Write-Host "VERIFICANDO BACKEND PARA VENDAS" -ForegroundColor Green
Write-Host ""

# 1. Testar endpoints do backend
Write-Host "1. Testando endpoints do backend..." -ForegroundColor Yellow

$endpoints = @(
    "https://backoffice-veiculos-api-production.up.railway.app/health",
    "https://backoffice-veiculos-api-production.up.railway.app/api/vehicles",
    "https://backoffice-veiculos-api-production.up.railway.app/api/sales",
    "https://backoffice-veiculos-api-production.up.railway.app/docs"
)

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri $endpoint -Method GET -TimeoutSec 10
        Write-Host "   $endpoint - Status: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "   $endpoint - Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 2. Testar login no backend
Write-Host ""
Write-Host "2. Testando login no backend..." -ForegroundColor Yellow
$loginBody = '{"email":"admin@backoffice.com","password":"Admin123!@#"}'
try {
    $login = Invoke-RestMethod -Uri "https://backoffice-veiculos-api-production.up.railway.app/api/users/login" -Method POST -ContentType "application/json" -Body $loginBody -TimeoutSec 10
    $token = $login.data.token
    Write-Host "   Login sucesso: $($token.Substring(0,30))..." -ForegroundColor Green
} catch {
    Write-Host "   Login falhou: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

$headers = @{
    "Authorization" = "Bearer $token"
}

# 3. Testar vendas no backend com token
Write-Host ""
Write-Host "3. Testando vendas no backend com token..." -ForegroundColor Yellow
try {
    $sales = Invoke-RestMethod -Uri "https://backoffice-veiculos-api-production.up.railway.app/api/sales" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "   Vendas no backend: $($sales.data.data.Count)" -ForegroundColor Green
} catch {
    Write-Host "   Erro vendas backend: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response: $responseBody" -ForegroundColor Red
    }
}

# 4. Testar criar venda no backend
Write-Host ""
Write-Host "4. Testando criar venda no backend..." -ForegroundColor Yellow
$saleData = @{
    vehicleId = "68ee58f81b01b5cc67f61d48"
    buyer = @{
        name = "Teste"
        email = "teste@teste.com"
        phone = "11999999999"
        document = "12345678900"
    }
    salePrice = 50000
    paymentMethod = "cash"
} | ConvertTo-Json -Depth 3

$headersWithContent = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

try {
    $newSale = Invoke-RestMethod -Uri "https://backoffice-veiculos-api-production.up.railway.app/api/sales" -Method POST -Headers $headersWithContent -Body $saleData -TimeoutSec 10
    Write-Host "   Venda criada no backend: $($newSale.data._id)" -ForegroundColor Green
} catch {
    Write-Host "   Erro criar venda backend: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response: $responseBody" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "VERIFICACAO CONCLUIDA!" -ForegroundColor Green
