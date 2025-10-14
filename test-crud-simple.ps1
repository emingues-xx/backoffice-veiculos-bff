# Teste CRUD Completo - Veiculos e Vendas
# BFF: https://bff-production-cae3.up.railway.app/

Write-Host "TESTE CRUD COMPLETO - BFF PRODUCAO" -ForegroundColor Green
Write-Host "URL: https://bff-production-cae3.up.railway.app/" -ForegroundColor Cyan
Write-Host ""

# Variaveis globais
$global:authToken = $null
$global:createdVehicleId = $null
$global:createdSaleId = $null

# Funcao para fazer login
function Test-Login {
    Write-Host "Testando Login..." -ForegroundColor Yellow
    
    $loginBody = @{
        email = "admin@backoffice.com"
        password = "Admin123!@#"
    } | ConvertTo-Json
    
    # Tentar diferentes endpoints
    $endpoints = @(
        "https://bff-production-cae3.up.railway.app/api/auth/login",
        "https://bff-production-cae3.up.railway.app/api/users/login",
        "https://backoffice-veiculos-api-production.up.railway.app/api/users/login"
    )
    
    foreach ($endpoint in $endpoints) {
        try {
            Write-Host "  Tentando: $endpoint" -ForegroundColor Gray
            $login = Invoke-RestMethod -Uri $endpoint -Method POST -ContentType "application/json" -Body $loginBody -TimeoutSec 10
            $global:authToken = $login.data.token
            Write-Host "  LOGIN SUCESSO: $($global:authToken.Substring(0,30))..." -ForegroundColor Green
            return $true
        } catch {
            Write-Host "  Falhou: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Write-Host "TODOS OS LOGINS FALHARAM" -ForegroundColor Red
    return $false
}

# Funcao para testar CRUD de Veiculos
function Test-VehiclesCRUD {
    Write-Host ""
    Write-Host "TESTANDO CRUD DE VEICULOS" -ForegroundColor Yellow
    
    # 1. LISTAR VEICULOS
    Write-Host "1. Listando veiculos..." -ForegroundColor Cyan
    try {
        $vehicles = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles" -Method GET -TimeoutSec 15
        Write-Host "   LISTAR: $($vehicles.data.data.Count) veiculos encontrados" -ForegroundColor Green
    } catch {
        Write-Host "   LISTAR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # 2. CRIAR VEICULO (se tiver token)
    if ($global:authToken) {
        Write-Host "2. Criando veiculo..." -ForegroundColor Cyan
        try {
            $vehicleData = @{
                brand = "Toyota"
                vehicleModel = "Corolla"
                year = 2023
                mileage = 15000
                price = 95000
                fuelType = "gasoline"
                transmission = "automatic"
                color = "Branco"
                doors = 4
                category = "car"
                condition = "used"
                description = "Veiculo em excelente estado, unico dono, revisoes em dia."
                images = @("https://example.com/corolla1.jpg")
                features = @("Ar condicionado", "Direcao eletrica")
                location = @{
                    city = "Sao Paulo"
                    state = "SP"
                    zipCode = "01234-567"
                }
                seller = @{
                    id = "68ed57a3572e134dd39350ce"
                    name = "Concessionaria Toyota"
                    phone = "(11) 9999-9999"
                    email = "vendas@toyota.com"
                }
                isFeatured = $false
            } | ConvertTo-Json -Depth 3
            
            $headers = @{
                "Authorization" = "Bearer $global:authToken"
                "Content-Type" = "application/json"
            }
            
            $newVehicle = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles" -Method POST -Headers $headers -Body $vehicleData -TimeoutSec 15
            $global:createdVehicleId = $newVehicle.data._id
            Write-Host "   CRIAR: Veiculo criado com ID $($global:createdVehicleId)" -ForegroundColor Green
        } catch {
            Write-Host "   CRIAR: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        # 3. ATUALIZAR VEICULO
        if ($global:createdVehicleId) {
            Write-Host "3. Atualizando veiculo..." -ForegroundColor Cyan
            try {
                $updateData = @{
                    price = 90000
                    description = "Veiculo atualizado com novo preco"
                } | ConvertTo-Json
                
                $updatedVehicle = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles/$($global:createdVehicleId)" -Method PUT -Headers $headers -Body $updateData -TimeoutSec 15
                Write-Host "   ATUALIZAR: Veiculo atualizado com sucesso" -ForegroundColor Green
            } catch {
                Write-Host "   ATUALIZAR: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
        
        # 4. DELETAR VEICULO
        if ($global:createdVehicleId) {
            Write-Host "4. Deletando veiculo..." -ForegroundColor Cyan
            try {
                Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/vehicles/$($global:createdVehicleId)" -Method DELETE -Headers $headers -TimeoutSec 15
                Write-Host "   DELETAR: Veiculo deletado com sucesso" -ForegroundColor Green
            } catch {
                Write-Host "   DELETAR: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "Pulando operacoes protegidas (sem token)" -ForegroundColor Yellow
    }
}

# Funcao para testar CRUD de Vendas
function Test-SalesCRUD {
    Write-Host ""
    Write-Host "TESTANDO CRUD DE VENDAS" -ForegroundColor Yellow
    
    if (-not $global:authToken) {
        Write-Host "Pulando testes de vendas (sem token)" -ForegroundColor Yellow
        return
    }
    
    $headers = @{
        "Authorization" = "Bearer $global:authToken"
        "Content-Type" = "application/json"
    }
    
    # 1. LISTAR VENDAS
    Write-Host "1. Listando vendas..." -ForegroundColor Cyan
    try {
        $sales = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales" -Method GET -Headers $headers -TimeoutSec 15
        Write-Host "   LISTAR: $($sales.data.data.Count) vendas encontradas" -ForegroundColor Green
    } catch {
        Write-Host "   LISTAR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # 2. CRIAR VENDA
    Write-Host "2. Criando venda..." -ForegroundColor Cyan
    try {
        $saleData = @{
            vehicleId = "68ed79c17fb1e4518e0098b6"
            buyer = @{
                name = "Joao Silva"
                email = "joao@email.com"
                phone = "11999999999"
                document = "12345678900"
            }
            salePrice = 50000
            commission = 0
            paymentMethod = "cash"
            notes = "Cliente interessado em financiamento"
        } | ConvertTo-Json -Depth 3
        
        $newSale = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales" -Method POST -Headers $headers -Body $saleData -TimeoutSec 15
        $global:createdSaleId = $newSale.data._id
        Write-Host "   CRIAR: Venda criada com ID $($global:createdSaleId)" -ForegroundColor Green
    } catch {
        Write-Host "   CRIAR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # 3. ATUALIZAR VENDA
    if ($global:createdSaleId) {
        Write-Host "3. Atualizando venda..." -ForegroundColor Cyan
        try {
            $updateData = @{
                status = "completed"
                notes = "Venda finalizada com sucesso"
            } | ConvertTo-Json
            
            $updatedSale = Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales/$($global:createdSaleId)" -Method PUT -Headers $headers -Body $updateData -TimeoutSec 15
            Write-Host "   ATUALIZAR: Venda atualizada com sucesso" -ForegroundColor Green
        } catch {
            Write-Host "   ATUALIZAR: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    # 4. DELETAR VENDA
    if ($global:createdSaleId) {
        Write-Host "4. Deletando venda..." -ForegroundColor Cyan
        try {
            Invoke-RestMethod -Uri "https://bff-production-cae3.up.railway.app/api/sales/$($global:createdSaleId)" -Method DELETE -Headers $headers -TimeoutSec 15
            Write-Host "   DELETAR: Venda deletada com sucesso" -ForegroundColor Green
        } catch {
            Write-Host "   DELETAR: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Executar testes
Write-Host "Iniciando testes..." -ForegroundColor Green

# Testar login
$loginSuccess = Test-Login

# Testar CRUD de Veiculos
Test-VehiclesCRUD

# Testar CRUD de Vendas
Test-SalesCRUD

Write-Host ""
Write-Host "TESTES CONCLUIDOS!" -ForegroundColor Green
if($global:authToken) { 
    Write-Host "Token disponivel: SIM" -ForegroundColor Green 
} else { 
    Write-Host "Token disponivel: NAO" -ForegroundColor Red 
}
