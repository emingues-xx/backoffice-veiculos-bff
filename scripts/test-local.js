const axios = require('axios');

const API_URL = 'http://localhost:3002';

async function testLocalAPI() {
  console.log('🧪 Testando API local...\n');

  try {
    // Teste 1: Health check
    console.log('1. Testando health check...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Teste 2: Listar veículos (GET)
    console.log('\n2. Testando listagem de veículos...');
    const listResponse = await axios.get(`${API_URL}/api/vehicles?page=1&limit=5`);
    console.log('✅ Listagem:', listResponse.data);

    // Teste 3: Criar veículo sem autenticação (POST)
    console.log('\n3. Testando criação de veículo sem autenticação...');
    const vehicleData = {
      brand: "Toyota",
      model: "Corolla",
      year: 2020,
      price: 85000,
      mileage: 50000,
      fuel: "gasoline",
      color: "white",
      transmission: "automatic",
      category: "car",
      description: "Teste local sem auth",
      images: ["https://example.com/corolla.jpg"],
      sellerId: "507f1f77bcf86cd799439011"
    };

    const createResponse = await axios.post(`${API_URL}/api/vehicles`, vehicleData);
    console.log('✅ Criação sem auth:', createResponse.data);

  } catch (error) {
    if (error.response) {
      console.log('❌ Erro:', error.response.status, error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.log('❌ Servidor local não está rodando. Execute: npm run dev');
    } else {
      console.log('❌ Erro:', error.message);
    }
  }
}

testLocalAPI();
