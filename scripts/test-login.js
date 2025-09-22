const axios = require('axios');
const https = require('https');

// Configurar axios para ignorar problemas de certificado SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

axios.defaults.httpsAgent = httpsAgent;

const API_BASE_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

async function testLogin() {
  try {
    console.log('🔐 Testando login...');
    
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'admin@test.com',
      password: 'admin123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Login response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success) {
      const token = response.data.data.token;
      console.log('🔑 Token obtido:', token);
      
      // Testar o token criando um veículo
      console.log('\n🧪 Testando criação de veículo...');
      
      const vehicleData = {
        brand: 'Toyota',
        model: 'Teste',
        year: 2023,
        price: 50000,
        mileage: 0,
        fuel: 'flex',
        color: 'Branco',
        transmission: 'automatico',
        category: 'carro',
        description: 'Veículo de teste',
        images: ['https://example.com/test.jpg']
      };
      
      const createResponse = await axios.post(`${API_BASE_URL}/api/vehicles`, vehicleData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Veículo criado:', JSON.stringify(createResponse.data, null, 2));
      
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

testLogin();
