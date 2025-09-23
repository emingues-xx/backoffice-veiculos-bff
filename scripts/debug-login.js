const axios = require('axios');
const https = require('https');

const BFF_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 15000
};

async function debugLogin() {
  console.log('🔍 Debugando login...\n');

  try {
    const loginData = {
      email: "admin@test.com",
      password: "password123"
    };

    console.log('Enviando dados:', loginData);
    const loginResponse = await axios.post(`${BFF_URL}/api/login`, loginData, axiosConfig);
    
    console.log('Status:', loginResponse.status);
    console.log('Headers:', loginResponse.headers);
    console.log('Data completa:', JSON.stringify(loginResponse.data, null, 2));

    // Tentar diferentes caminhos para o token
    console.log('\n🔍 Tentando encontrar o token:');
    console.log('loginResponse.data.token:', loginResponse.data.token);
    console.log('loginResponse.data.data.token:', loginResponse.data.data?.token);
    console.log('loginResponse.data.data.data.token:', loginResponse.data.data?.data?.token);

  } catch (error) {
    console.log('❌ Erro:', error.response?.data || error.message);
  }
}

debugLogin();
