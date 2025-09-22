const axios = require('axios');

const API_URL = 'http://localhost:3002';

async function testLocalNoAuth() {
  console.log('🧪 Testando criação de veículo sem autenticação no servidor local...\n');

  try {
    // Teste: Criar veículo sem autenticação (POST)
    console.log('Testando criação de veículo sem autenticação...');
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
      description: "Teste local sem auth",
      images: ["https://example.com/corolla.jpg"],
    };

    const createResponse = await axios.post(`${API_URL}/api/vehicles`, vehicleData);
    console.log('✅ Criação sem auth funcionou:', createResponse.data);

    // Se funcionou, vamos criar mais alguns veículos
    console.log('\n🚀 Criando mais veículos...');
    const vehicles = [
      {
        brand: "Honda",
        model: "Civic",
        year: 2019,
        price: 75000,
        mileage: 60000,
        fuel: "gasolina",
        color: "black",
        transmission: "automatico",
        category: "carro",
        description: "Honda Civic 2019",
        images: ["https://example.com/civic.jpg"],
      },
      {
        brand: "Volkswagen",
        model: "Golf",
        year: 2021,
        price: 95000,
        mileage: 30000,
        fuel: "gasolina",
        color: "blue",
        transmission: "manual",
        category: "carro",
        description: "Volkswagen Golf 2021",
        images: ["https://example.com/golf.jpg"],
      }
    ];

    for (let i = 0; i < vehicles.length; i++) {
      try {
        const response = await axios.post(`${API_URL}/api/vehicles`, vehicles[i]);
        console.log(`✅ Veículo ${i + 1} criado:`, response.data.data?.brand, response.data.data?.model);
      } catch (error) {
        console.log(`❌ Erro ao criar veículo ${i + 1}:`, error.response?.data || error.message);
      }
    }

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

testLocalNoAuth();
