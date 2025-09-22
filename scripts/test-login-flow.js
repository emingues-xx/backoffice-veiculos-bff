const axios = require('axios');
const https = require('https');

const BFF_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 15000
};

async function testLoginFlow() {
  console.log('🧪 Testando fluxo completo de login e criação de veículos...\n');

  try {
    // Passo 1: Login
    console.log('1. Fazendo login...');
    const loginData = {
      email: "admin@test.com",
      password: "password123"
    };

    const loginResponse = await axios.post(`${BFF_URL}/api/login`, loginData, axiosConfig);
    console.log('✅ Login realizado:', loginResponse.data);

    const token = loginResponse.data.data.token;
    if (!token) {
      throw new Error('Token não retornado no login');
    }

    // Passo 2: Criar veículo com o token
    console.log('\n2. Criando veículo com token...');
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
      description: "Teste com login via BFF"
    };

    const createResponse = await axios.post(
      `${BFF_URL}/api/vehicles`, 
      vehicleData, 
      {
        ...axiosConfig,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ Veículo criado:', createResponse.data);

    // Passo 3: Listar veículos
    console.log('\n3. Listando veículos...');
    const listResponse = await axios.get(
      `${BFF_URL}/api/vehicles?page=1&limit=5`,
      {
        ...axiosConfig,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log('✅ Listagem:', listResponse.data);

  } catch (error) {
    if (error.response) {
      console.log('❌ Erro:', error.response.status, error.response.data);
    } else {
      console.log('❌ Erro:', error.message);
    }
  }
}

testLoginFlow();
