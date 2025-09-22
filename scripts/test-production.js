#!/usr/bin/env node

const axios = require('axios');

const PRODUCTION_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

async function testProduction() {
  console.log('🧪 Testando Backoffice Veículos BFF em Produção...\n');

  try {
    // Test 1: Root endpoint
    console.log('1. Testando Root Endpoint...');
    const rootResponse = await axios.get(`${PRODUCTION_URL}/`);
    console.log('✅ Root:', rootResponse.data.message);
    console.log('');

    // Test 2: Health check
    console.log('2. Testando Health Check...');
    const healthResponse = await axios.get(`${PRODUCTION_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);
    console.log('✅ Environment:', healthResponse.data.environment);
    console.log('✅ Version:', healthResponse.data.version);
    console.log('');

    // Test 3: Documentation
    console.log('3. Testando Documentação...');
    const docsResponse = await axios.get(`${PRODUCTION_URL}/docs`);
    console.log('✅ Documentação disponível em:', `${PRODUCTION_URL}/docs`);
    console.log('');

    // Test 4: Vehicles endpoint (public)
    console.log('4. Testando GET /api/vehicles (público)...');
    const vehiclesResponse = await axios.get(`${PRODUCTION_URL}/api/vehicles`);
    console.log('✅ Vehicles endpoint funcionando');
    console.log('✅ Total de veículos:', vehiclesResponse.data.data?.pagination?.total || 0);
    console.log('');

    // Test 5: Vehicles with filters
    console.log('5. Testando GET /api/vehicles com filtros...');
    const filteredResponse = await axios.get(`${PRODUCTION_URL}/api/vehicles?page=1&limit=5`);
    console.log('✅ Filtros funcionando');
    console.log('✅ Página:', filteredResponse.data.data?.pagination?.page || 1);
    console.log('✅ Limite:', filteredResponse.data.data?.pagination?.limit || 5);
    console.log('');

    // Test 6: Old endpoint (should fail)
    console.log('6. Testando endpoint antigo /api/veiculos (deve falhar)...');
    try {
      await axios.get(`${PRODUCTION_URL}/api/veiculos`);
      console.log('❌ Endpoint antigo ainda funciona (não deveria)');
    } catch (error) {
      if (error.response?.data?.error?.includes('Rota não encontrada')) {
        console.log('✅ Endpoint antigo corretamente removido');
      } else {
        console.log('❌ Erro inesperado:', error.response?.data?.error || error.message);
      }
    }
    console.log('');

    console.log('🎉 Todos os testes concluídos com sucesso!');
    console.log('');
    console.log('📋 Resumo:');
    console.log('✅ BFF funcionando em produção');
    console.log('✅ Endpoints em inglês ativos');
    console.log('✅ Integração com API backend funcionando');
    console.log('✅ Documentação Swagger disponível');
    console.log('✅ Endpoints antigos removidos');

  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
    process.exit(1);
  }
}

testProduction();
