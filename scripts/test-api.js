#!/usr/bin/env node

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3002';
const JWT_TOKEN = 'test-token';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${JWT_TOKEN}`
};

async function testAPI() {
  console.log('🧪 Testando Backoffice Veículos BFF API...\n');

  try {
    // Test health check
    console.log('1. Testando Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);
    console.log('');

    // Test documentation
    console.log('2. Testando Documentação...');
    const docsResponse = await axios.get(`${API_BASE_URL}/docs`);
    console.log('✅ Documentação disponível em:', `${API_BASE_URL}/docs`);
    console.log('');

    // Test get veiculos (public endpoint)
    console.log('3. Testando GET /api/veiculos (público)...');
    const veiculosResponse = await axios.get(`${API_BASE_URL}/api/veiculos`);
    console.log('✅ Veículos encontrados:', veiculosResponse.data.data?.pagination?.total || 0);
    console.log('');

    // Test create veiculo (protected endpoint)
    console.log('4. Testando POST /api/veiculos (protegido)...');
    const novoVeiculo = {
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2022,
      preco: 85000,
      quilometragem: 0,
      combustivel: 'flex',
      cor: 'Branco',
      cambio: 'automatico',
      categoria: 'carro',
      descricao: 'Veículo de teste criado via script'
    };

    const createResponse = await axios.post(`${API_BASE_URL}/api/veiculos`, novoVeiculo, { headers });
    console.log('✅ Veículo criado:', createResponse.data.data?.id);
    console.log('');

    // Test dashboard stats
    console.log('5. Testando GET /api/veiculos/dashboard/stats...');
    const statsResponse = await axios.get(`${API_BASE_URL}/api/veiculos/dashboard/stats`, { headers });
    console.log('✅ Estatísticas do dashboard:', {
      totalVeiculos: statsResponse.data.data?.totalVeiculos,
      veiculosAtivos: statsResponse.data.data?.veiculosAtivos
    });
    console.log('');

    // Test search
    console.log('6. Testando GET /api/veiculos/search...');
    const searchResponse = await axios.get(`${API_BASE_URL}/api/veiculos/search?q=Toyota`);
    console.log('✅ Busca por "Toyota":', searchResponse.data.data?.pagination?.total || 0, 'resultados');
    console.log('');

    console.log('🎉 Todos os testes passaram com sucesso!');

  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests
testAPI();
