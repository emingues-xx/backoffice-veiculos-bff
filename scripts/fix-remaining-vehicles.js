const axios = require('axios');
const https = require('https');

const API_URL = 'https://backoffice-veiculos-api-production.up.railway.app';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 15000
};

// Veículos corrigidos
const fixedVehicles = [
  {
    brand: "Honda",
    vehicleModel: "CB 600F",
    year: 2021,
    price: 35000,
    mileage: 15000,
    fuelType: "gasoline",
    color: "vermelho",
    transmission: "manual",
    doors: 2, // Corrigido: mínimo 2 portas
    category: "motorcycle",
    condition: "used",
    description: "Honda CB 600F 2021, manual, completa, bem conservada",
    images: ["https://www.webmotors.com.br/motos/estoque/honda/cb-600f"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Yamaha",
    vehicleModel: "MT-07",
    year: 2022,
    price: 45000,
    mileage: 8000,
    fuelType: "gasoline",
    color: "azul",
    transmission: "manual",
    doors: 2, // Corrigido: mínimo 2 portas
    category: "motorcycle",
    condition: "used",
    description: "Yamaha MT-07 2022, manual, completa, seminova",
    images: ["https://www.webmotors.com.br/motos/estoque/yamaha/mt-07"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Kawasaki",
    vehicleModel: "Ninja 650",
    year: 2020,
    price: 40000,
    mileage: 20000,
    fuelType: "gasoline",
    color: "verde",
    transmission: "manual",
    doors: 2, // Corrigido: mínimo 2 portas
    category: "motorcycle",
    condition: "used",
    description: "Kawasaki Ninja 650 2020, manual, completa, revisada",
    images: ["https://www.webmotors.com.br/motos/estoque/kawasaki/ninja-650"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Mercedes-Benz",
    vehicleModel: "OF-1722",
    year: 2020,
    price: 350000,
    mileage: 30000,
    fuelType: "diesel",
    color: "azul",
    transmission: "manual",
    doors: 2,
    category: "van", // Corrigido: bus -> van
    condition: "used",
    description: "Mercedes-Benz OF-1722 2020, manual, diesel, revisado",
    images: ["https://www.webmotors.com.br/onibus/estoque/mercedes-benz/of-1722"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  }
];

async function createRemainingVehicles() {
  console.log('🔧 Criando veículos restantes com correções...\n');

  try {
    // Passo 1: Login
    console.log('1. Fazendo login...');
    const loginData = {
      email: "admin@test.com",
      password: "password123"
    };

    const loginResponse = await axios.post(`${API_URL}/api/users/login`, loginData, axiosConfig);
    console.log('✅ Login realizado com sucesso');

    const token = loginResponse.data.data.token;
    if (!token) {
      throw new Error('Token não retornado no login');
    }

    // Passo 2: Criar veículos corrigidos
    console.log('\n2. Criando veículos corrigidos...');
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < fixedVehicles.length; i++) {
      const vehicle = fixedVehicles[i];
      try {
        console.log(`📝 Criando veículo ${i + 1}/4: ${vehicle.brand} ${vehicle.vehicleModel}`);
        
        const response = await axios.post(
          `${API_URL}/api/vehicles`,
          vehicle,
          {
            ...axiosConfig,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(`✅ ${vehicle.brand} ${vehicle.vehicleModel} criado com sucesso`);
        successCount++;

        // Pequena pausa entre requisições
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.log(`❌ Erro ao criar ${vehicle.brand} ${vehicle.vehicleModel}:`, error.response?.data || error.message);
        errorCount++;
      }
    }

    // Resumo
    console.log('\n📊 Resumo da criação:');
    console.log(`✅ Veículos criados com sucesso: ${successCount}`);
    console.log(`❌ Erros: ${errorCount}`);
    console.log(`📈 Total processado: ${fixedVehicles.length}`);

  } catch (error) {
    console.log('❌ Erro geral:', error.response?.data || error.message);
  }
}

createRemainingVehicles();

