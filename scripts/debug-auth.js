const axios = require('axios');
const https = require('https');

// Configurar axios para ignorar problemas de certificado SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

axios.defaults.httpsAgent = httpsAgent;

const API_BASE_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

async function debugAuthentication() {
  try {
    console.log('🔍 Debugando autenticação...\n');
    
    // 1. Testar login
    console.log('1. Testando login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'admin@test.com',
      password: 'admin123'
    });
    console.log('✅ Login funcionando:', loginResponse.data.success);
    const loginToken = loginResponse.data.data.token;
    
    // 2. Testar geração de token
    console.log('\n2. Testando geração de token...');
    const tokenResponse = await axios.post(`${API_BASE_URL}/api/auth/generate-token`, {
      userId: '68d17845a08df9f982e3397a',
      email: 'admin@test.com',
      role: 'admin'
    });
    console.log('✅ Geração de token funcionando:', tokenResponse.data.success);
    const generatedToken = tokenResponse.data.data.token;
    
    // 3. Testar diferentes formatos de header
    console.log('\n3. Testando diferentes formatos de header...');
    
    const testData = {
      brand: 'Toyota',
      model: 'Teste',
      year: 2023,
      price: 50000,
      mileage: 0,
      fuel: 'flex',
      color: 'Branco',
      transmission: 'automatico',
      category: 'carro',
      description: 'Teste',
      images: ['https://example.com/test.jpg']
    };
    
    // Teste 1: Token do login com Bearer
    console.log('\n3.1. Testando token do login com Bearer...');
    try {
      const response1 = await axios.post(`${API_BASE_URL}/api/vehicles`, testData, {
        headers: {
          'Authorization': `Bearer ${loginToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ Sucesso com token do login:', response1.data.success);
    } catch (error) {
      console.log('❌ Erro com token do login:', error.response?.data?.error);
    }
    
    // Teste 2: Token gerado com Bearer
    console.log('\n3.2. Testando token gerado com Bearer...');
    try {
      const response2 = await axios.post(`${API_BASE_URL}/api/vehicles`, testData, {
        headers: {
          'Authorization': `Bearer ${generatedToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ Sucesso com token gerado:', response2.data.success);
    } catch (error) {
      console.log('❌ Erro com token gerado:', error.response?.data?.error);
    }
    
    // Teste 3: Token sem Bearer
    console.log('\n3.3. Testando token sem Bearer...');
    try {
      const response3 = await axios.post(`${API_BASE_URL}/api/vehicles`, testData, {
        headers: {
          'Authorization': generatedToken,
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ Sucesso sem Bearer:', response3.data.success);
    } catch (error) {
      console.log('❌ Erro sem Bearer:', error.response?.data?.error);
    }
    
    // Teste 4: Verificar se o problema é específico do endpoint
    console.log('\n4. Testando outros endpoints protegidos...');
    try {
      const response4 = await axios.get(`${API_BASE_URL}/api/vehicles/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${generatedToken}`
        }
      });
      console.log('✅ Dashboard funcionando:', response4.data.success);
    } catch (error) {
      console.log('❌ Dashboard erro:', error.response?.data?.error);
    }
    
    // Teste 5: Verificar se o problema é com o método POST
    console.log('\n5. Testando método GET com autenticação...');
    try {
      const response5 = await axios.get(`${API_BASE_URL}/api/vehicles`, {
        headers: {
          'Authorization': `Bearer ${generatedToken}`
        }
      });
      console.log('✅ GET com auth funcionando:', response5.data.success);
    } catch (error) {
      console.log('❌ GET com auth erro:', error.response?.data?.error);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

debugAuthentication();
