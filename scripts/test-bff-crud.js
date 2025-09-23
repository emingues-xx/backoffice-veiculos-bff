const axios = require('axios');
const https = require('https');

// Configuração para ignorar certificados SSL
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const BFF_BASE_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';
const API_BASE_URL = 'https://backoffice-veiculos-api-production.up.railway.app';

// Credenciais de login
const loginCredentials = {
  email: 'admin@test.com',
  password: 'password123'
};

// Função para fazer login e obter token
async function login() {
  try {
    console.log('🔐 Fazendo login...');
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, loginCredentials, {
      httpsAgent,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.data.success) {
      const token = response.data.data.token;
      console.log('✅ Login realizado com sucesso!');
      return token;
    } else {
      throw new Error('Falha no login');
    }
  } catch (error) {
    console.error('❌ Erro no login:', error.response?.data || error.message);
    throw error;
  }
}

// Função para testar health check do BFF
async function testBFFHealth() {
  try {
    console.log('🏥 Testando health check do BFF...');
    const response = await axios.get(`${BFF_BASE_URL}/health`, { httpsAgent });
    
    if (response.data.success) {
      console.log('✅ BFF está funcionando!');
      console.log(`   Environment: ${response.data.environment}`);
      console.log(`   Version: ${response.data.version}`);
      return true;
    } else {
      console.log('❌ BFF não está funcionando corretamente');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao testar BFF:', error.response?.data || error.message);
    return false;
  }
}

// Função para testar listagem de veículos no BFF
async function testBFFListVehicles() {
  try {
    console.log('📋 Testando listagem de veículos no BFF...');
    const response = await axios.get(`${BFF_BASE_URL}/api/vehicles`, { httpsAgent });
    
    if (response.data.success) {
      console.log(`✅ BFF listou ${response.data.data.length} veículos`);
      return response.data.data;
    } else {
      console.log('❌ Falha ao listar veículos no BFF');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao listar veículos no BFF:', error.response?.data || error.message);
    return null;
  }
}

// Função para testar criação de veículo no BFF
async function testBFFCreateVehicle(token) {
  try {
    console.log('🚗 Testando criação de veículo no BFF...');
    
    const testVehicle = {
      brand: "Test",
      vehicleModel: "BFF Test",
      year: 2024,
      price: 50000,
      mileage: 0,
      fuelType: "gasoline",
      color: "branco",
      transmission: "automatic",
      doors: 4,
      category: "car",
      condition: "new",
      description: "Veículo de teste criado via BFF",
      images: ["https://www.webmotors.com.br/carros/estoque/test/test"],
      location: {
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100"
      },
      seller: {
        id: "68d1d34f2dd6f78e64b71fff",
        name: "Admin User",
        phone: "(11) 99999-9999",
        email: "admin@test.com"
      },
      isFeatured: false
    };
    
    const response = await axios.post(`${BFF_BASE_URL}/api/vehicles`, testVehicle, {
      httpsAgent,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      console.log('✅ Veículo criado com sucesso via BFF!');
      return response.data.data;
    } else {
      console.log('❌ Falha ao criar veículo via BFF');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao criar veículo via BFF:', error.response?.data || error.message);
    return null;
  }
}

// Função para testar atualização de veículo no BFF
async function testBFFUpdateVehicle(token, vehicleId) {
  try {
    console.log('✏️ Testando atualização de veículo no BFF...');
    
    const updateData = {
      price: 55000,
      description: "Veículo de teste atualizado via BFF"
    };
    
    const response = await axios.put(`${BFF_BASE_URL}/api/vehicles/${vehicleId}`, updateData, {
      httpsAgent,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      console.log('✅ Veículo atualizado com sucesso via BFF!');
      return response.data.data;
    } else {
      console.log('❌ Falha ao atualizar veículo via BFF');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar veículo via BFF:', error.response?.data || error.message);
    return null;
  }
}

// Função para testar exclusão de veículo no BFF
async function testBFFDeleteVehicle(token, vehicleId) {
  try {
    console.log('🗑️ Testando exclusão de veículo no BFF...');
    
    const response = await axios.delete(`${BFF_BASE_URL}/api/vehicles/${vehicleId}`, {
      httpsAgent,
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.data.success) {
      console.log('✅ Veículo excluído com sucesso via BFF!');
      return true;
    } else {
      console.log('❌ Falha ao excluir veículo via BFF');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao excluir veículo via BFF:', error.response?.data || error.message);
    return false;
  }
}

// Função para gerar comandos curl
function generateCurlCommands(token) {
  console.log('\n📋 COMANDOS CURL PARA TESTAR O BFF:\n');
  
  console.log('🔐 1. LOGIN (para obter token):');
  console.log(`curl -X POST ${API_BASE_URL}/api/users/login \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{"email":"admin@test.com","password":"password123"}'`);
  console.log('');
  
  console.log('🏥 2. HEALTH CHECK:');
  console.log(`curl -X GET ${BFF_BASE_URL}/health`);
  console.log('');
  
  console.log('📋 3. LISTAR VEÍCULOS:');
  console.log(`curl -X GET ${BFF_BASE_URL}/api/vehicles`);
  console.log('');
  
  console.log('🚗 4. CRIAR VEÍCULO:');
  console.log(`curl -X POST ${BFF_BASE_URL}/api/vehicles \\`);
  console.log(`  -H "Authorization: Bearer ${token}" \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{`);
  console.log(`    "brand": "Toyota",`);
  console.log(`    "vehicleModel": "Corolla Cross",`);
  console.log(`    "year": 2023,`);
  console.log(`    "price": 145000,`);
  console.log(`    "mileage": 15000,`);
  console.log(`    "fuelType": "gasoline",`);
  console.log(`    "color": "branco",`);
  console.log(`    "transmission": "automatic",`);
  console.log(`    "doors": 4,`);
  console.log(`    "category": "car",`);
  console.log(`    "condition": "used",`);
  console.log(`    "description": "Toyota Corolla Cross 2023, automático, completo",`);
  console.log(`    "images": ["https://www.webmotors.com.br/carros/estoque/toyota/corolla-cross"],`);
  console.log(`    "location": {`);
  console.log(`      "city": "São Paulo",`);
  console.log(`      "state": "SP",`);
  console.log(`      "zipCode": "01310-100"`);
  console.log(`    },`);
  console.log(`    "seller": {`);
  console.log(`      "id": "68d1d34f2dd6f78e64b71fff",`);
  console.log(`      "name": "Admin User",`);
  console.log(`      "phone": "(11) 99999-9999",`);
  console.log(`      "email": "admin@test.com"`);
  console.log(`    },`);
  console.log(`    "isFeatured": false`);
  console.log(`  }'`);
  console.log('');
  
  console.log('✏️ 5. ATUALIZAR VEÍCULO (substitua VEHICLE_ID):');
  console.log(`curl -X PUT ${BFF_BASE_URL}/api/vehicles/VEHICLE_ID \\`);
  console.log(`  -H "Authorization: Bearer ${token}" \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{`);
  console.log(`    "price": 150000,`);
  console.log(`    "description": "Veículo atualizado via BFF"`);
  console.log(`  }'`);
  console.log('');
  
  console.log('🗑️ 6. EXCLUIR VEÍCULO (substitua VEHICLE_ID):');
  console.log(`curl -X DELETE ${BFF_BASE_URL}/api/vehicles/VEHICLE_ID \\`);
  console.log(`  -H "Authorization: Bearer ${token}"`);
  console.log('');
  
  console.log('📊 7. DASHBOARD STATS:');
  console.log(`curl -X GET ${BFF_BASE_URL}/api/vehicles/dashboard/stats \\`);
  console.log(`  -H "Authorization: Bearer ${token}"`);
  console.log('');
  
  console.log('🔍 8. BUSCAR VEÍCULOS COM FILTROS:');
  console.log(`curl -X GET "${BFF_BASE_URL}/api/vehicles?brand=Toyota&category=car&minPrice=100000&maxPrice=200000"`);
  console.log('');
}

// Função principal
async function main() {
  try {
    console.log('🚀 Testando operações CRUD no BFF...\n');
    
    // 1. Testar health check do BFF
    const bffHealthy = await testBFFHealth();
    if (!bffHealthy) {
      console.log('❌ BFF não está funcionando. Abortando testes.');
      return;
    }
    console.log('');
    
    // 2. Fazer login para obter token
    const token = await login();
    console.log('');
    
    // 3. Testar listagem de veículos
    const vehicles = await testBFFListVehicles();
    console.log('');
    
    // 4. Testar criação de veículo
    const createdVehicle = await testBFFCreateVehicle(token);
    console.log('');
    
    if (createdVehicle) {
      // 5. Testar atualização de veículo
      const updatedVehicle = await testBFFUpdateVehicle(token, createdVehicle._id);
      console.log('');
      
      // 6. Testar exclusão de veículo
      const deleted = await testBFFDeleteVehicle(token, createdVehicle._id);
      console.log('');
    }
    
    // 7. Gerar comandos curl
    generateCurlCommands(token);
    
    console.log('🎉 Testes concluídos!');
    
  } catch (error) {
    console.error('❌ Erro nos testes:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
