# Teste de Vendas com Token Fresco
Write-Host "TESTE DE VENDAS COM TOKEN FRESCO - PORTA 3017" -ForegroundColor Green
Write-Host ""

# Funcao para obter token fresco
function Get-FreshToken {
    Write-Host "Obtendo token fresco..." -ForegroundColor Yellow
    $loginBody = '{"email":"admin@backoffice.com","password":"Admin123!@#"}'
    try {
        $login = Invoke-RestMethod -Uri "https://backoffice-veiculos-api-production.up.railway.app/api/users/login" -Method POST -ContentType "application/json" -Body $loginBody -TimeoutSec 10
        $token = $login.data.token
        Write-Host "   Token obtido: $($token.Substring(0,30))..." -ForegroundColor Green
        return $token
    } catch {
        Write-Host "   Erro no login: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# 1. Verificar se servidor esta rodando
Write-Host "1. Verificando servidor na porta 3017..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3017/health" -Method GET -TimeoutSec 5
    Write-Host "   Servidor 3017: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "   Servidor 3017 nao esta rodando: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 2. Obter token fresco
$token = Get-FreshToken
if (-not $token) {
    Write-Host "Nao foi possivel obter token" -ForegroundColor Red
    exit
}

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# 3. Listar veiculos
Write-Host "3. Listando veiculos..." -ForegroundColor Yellow
try {
    $vehicles = Invoke-RestMethod -Uri "http://localhost:3017/api/vehicles" -Method GET -Headers $headers -TimeoutSec 10
    $vehicleId = $vehicles.data.data[0]._id
    Write-Host "   Veiculo selecionado: $vehicleId" -ForegroundColor Green
} catch {
    Write-Host "   Erro ao listar veiculos: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 4. Listar vendas
Write-Host "4. Listando vendas..." -ForegroundColor Yellow
try {
    $sales = Invoke-RestMethod -Uri "http://localhost:3017/api/sales" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "   Vendas encontradas: $($sales.data.data.Count)" -ForegroundColor Green
} catch {
    Write-Host "   Erro ao listar vendas: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Criar venda
Write-Host "5. Criando venda..." -ForegroundColor Yellow
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
    notes = "Teste de venda com token fresco"
} | ConvertTo-Json -Depth 3

try {
    $newSale = Invoke-RestMethod -Uri "http://localhost:3017/api/sales" -Method POST -Headers $headers -Body $saleData -TimeoutSec 10
    Write-Host "   Venda criada com sucesso: $($newSale.data._id)" -ForegroundColor Green
    $saleId = $newSale.data._id
} catch {
    Write-Host "   Erro ao criar venda: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response: $responseBody" -ForegroundColor Red
    }
}

# 6. Atualizar venda (se criada com sucesso)
if ($saleId) {
    Write-Host "6. Atualizando venda..." -ForegroundColor Yellow
    $updateData = @{
        status = "completed"
        notes = "Venda finalizada com sucesso"
    } | ConvertTo-Json
    
    try {
        $updatedSale = Invoke-RestMethod -Uri "http://localhost:3017/api/sales/$saleId" -Method PUT -Headers $headers -Body $updateData -TimeoutSec 10
        Write-Host "   Venda atualizada com sucesso" -ForegroundColor Green
    } catch {
        Write-Host "   Erro ao atualizar venda: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # 7. Deletar venda
    Write-Host "7. Deletando venda..." -ForegroundColor Yellow
    try {
        Invoke-RestMethod -Uri "http://localhost:3017/api/sales/$saleId" -Method DELETE -Headers $headers -TimeoutSec 10
        Write-Host "   Venda deletada com sucesso" -ForegroundColor Green
    } catch {
        Write-Host "   Erro ao deletar venda: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 8. Testar estatisticas
Write-Host "8. Testando estatisticas..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:3017/api/sales/stats" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "   Estatisticas obtidas com sucesso" -ForegroundColor Green
} catch {
    Write-Host "   Erro ao obter estatisticas: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "TESTE COM TOKEN FRESCO CONCLUIDO!" -ForegroundColor Green
