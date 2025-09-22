const axios = require('axios');
const https = require('https');

const BFF_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 15000
};

async function testRailwayBFF() {
  console.log('🧪 Testando BFF no Railway...\n');

  try {
    // Teste 1: Health check do BFF
    console.log('1. Testando health check do BFF...');
    const healthResponse = await axios.get(`${BFF_URL}/health`, axiosConfig);
    console.log('✅ Health check:', healthResponse.data);

    // Teste 2: Listar veículos (GET)
    console.log('\n2. Testando listagem de veículos...');
    const listResponse = await axios.get(`${BFF_URL}/api/vehicles?page=1&limit=5`, axiosConfig);
    console.log('✅ Listagem:', listResponse.data);

    // Teste 3: Criar veículo sem autenticação (POST)
    console.log('\n3. Testando criação de veículo sem autenticação...');
    const vehicleData = {
      brand: "Toyota",
      model: "Corolla",
      year: 2020,
      price: 85000,
      mileage: 50000,
      fuel: "gasolina",
      color: "white",
      transmission: "automatico",
      category: "carro",
      description: "Teste direto no Railway BFF"
    };

    const createResponse = await axios.post(`${BFF_URL}/api/vehicles`, vehicleData, axiosConfig);
    console.log('✅ Criação sem auth funcionou:', createResponse.data);

  } catch (error) {
    if (error.response) {
      console.log('❌ Erro:', error.response.status, error.response.data);
    } else {
      console.log('❌ Erro:', error.message);
    }
  }
}

testRailwayBFF();
