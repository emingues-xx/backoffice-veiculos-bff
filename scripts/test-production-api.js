const axios = require('axios');
const https = require('https');

const API_URL = 'https://backoffice-veiculos-api-production.up.railway.app';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 15000
};

async function testProductionAPI() {
  console.log('🧪 Testando API de produção diretamente...\n');

  try {
    // Teste 1: Health check da API de produção
    console.log('1. Testando health check da API de produção...');
    const healthResponse = await axios.get(`${API_URL}/health`, axiosConfig);
    console.log('✅ Health check:', healthResponse.data);

    // Teste 2: Listar veículos (GET)
    console.log('\n2. Testando listagem de veículos...');
    const listResponse = await axios.get(`${API_URL}/api/vehicles?page=1&limit=5`, axiosConfig);
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
      description: "Teste direto na API de produção",
      images: ["https://example.com/corolla.jpg"],
      sellerId: "507f1f77bcf86cd799439011"
    };

    const createResponse = await axios.post(`${API_URL}/api/vehicles`, vehicleData, axiosConfig);
    console.log('✅ Criação sem auth:', createResponse.data);

  } catch (error) {
    if (error.response) {
      console.log('❌ Erro:', error.response.status, error.response.data);
    } else {
      console.log('❌ Erro:', error.message);
    }
  }
}

testProductionAPI();
