const axios = require('axios');
const https = require('https');

// Configuração para ignorar certificados SSL
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const API_BASE_URL = 'https://backoffice-veiculos-api-production.up.railway.app';

// Credenciais de login
const loginCredentials = {
  email: 'admin@test.com',
  password: 'password123'
};

// Função para fazer login e obter token
async function login() {
  try {
    console.log('🔐 Fazendo login...');
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, loginCredentials, {
      httpsAgent,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.data.success) {
      const token = response.data.data.token;
      console.log('✅ Login realizado com sucesso!');
      return token;
    } else {
      throw new Error('Falha no login');
    }
  } catch (error) {
    console.error('❌ Erro no login:', error.response?.data || error.message);
    throw error;
  }
}

// Dados dos veículos adicionais
const additionalVehicles = [
  {
    brand: "Audi",
    vehicleModel: "A4",
    year: 2023,
    price: 195000,
    mileage: 12000,
    fuelType: "gasoline",
    color: "preto",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Audi A4 2023, automático, completo, seminova",
    images: [
      "https://www.webmotors.com.br/carros/estoque/audi/a4/2023/2-0-turbo-16v-4p/2-0-turbo-16v-4p/",
      "https://www.webmotors.com.br/carros/estoque/audi/a4/2023/2-0-turbo-16v-4p/2-0-turbo-16v-4p/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: true
  },
  {
    brand: "Nissan",
    vehicleModel: "Sentra",
    year: 2022,
    price: 85000,
    mileage: 25000,
    fuelType: "gasoline",
    color: "prata",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Nissan Sentra 2022, automático, completo, bem conservado",
    images: [
      "https://www.webmotors.com.br/carros/estoque/nissan/sentra/2022/2-0-flex-16v-4p/2-0-flex-16v-4p/",
      "https://www.webmotors.com.br/carros/estoque/nissan/sentra/2022/2-0-flex-16v-4p/2-0-flex-16v-4p/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: false
  },
  {
    brand: "Hyundai",
    vehicleModel: "HB20",
    year: 2023,
    price: 75000,
    mileage: 8000,
    fuelType: "gasoline",
    color: "branco",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Hyundai HB20 2023, automático, completo, seminova",
    images: [
      "https://www.webmotors.com.br/carros/estoque/hyundai/hb20/2023/1-0-turbo-flex-12v-4p/1-0-turbo-flex-12v-4p/",
      "https://www.webmotors.com.br/carros/estoque/hyundai/hb20/2023/1-0-turbo-flex-12v-4p/1-0-turbo-flex-12v-4p/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: false
  },
  {
    brand: "Chevrolet",
    vehicleModel: "Onix",
    year: 2022,
    price: 65000,
    mileage: 30000,
    fuelType: "gasoline",
    color: "azul",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Chevrolet Onix 2022, automático, completo, bem conservado",
    images: [
      "https://www.webmotors.com.br/carros/estoque/chevrolet/onix/2022/1-0-turbo-flex-12v-4p/1-0-turbo-flex-12v-4p/",
      "https://www.webmotors.com.br/carros/estoque/chevrolet/onix/2022/1-0-turbo-flex-12v-4p/1-0-turbo-flex-12v-4p/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: false
  },
  {
    brand: "Ducati",
    vehicleModel: "Monster",
    year: 2022,
    price: 55000,
    mileage: 12000,
    fuelType: "gasoline",
    color: "vermelho",
    transmission: "manual",
    doors: 2,
    category: "motorcycle",
    condition: "used",
    description: "Ducati Monster 2022, manual, completa, seminova",
    images: [
      "https://www.webmotors.com.br/motos/estoque/ducati/monster/2022/monster-821-abs-16v/monster-821-abs-16v/",
      "https://www.webmotors.com.br/motos/estoque/ducati/monster/2022/monster-821-abs-16v/monster-821-abs-16v/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: true
  },
  {
    brand: "Triumph",
    vehicleModel: "Street Triple",
    year: 2023,
    price: 48000,
    mileage: 6000,
    fuelType: "gasoline",
    color: "preto",
    transmission: "manual",
    doors: 2,
    category: "motorcycle",
    condition: "used",
    description: "Triumph Street Triple 2023, manual, completa, seminova",
    images: [
      "https://www.webmotors.com.br/motos/estoque/triumph/street-triple/2023/street-triple-765-abs-16v/street-triple-765-abs-16v/",
      "https://www.webmotors.com.br/motos/estoque/triumph/street-triple/2023/street-triple-765-abs-16v/street-triple-765-abs-16v/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: true
  },
  {
    brand: "Chevrolet",
    vehicleModel: "S10",
    year: 2023,
    price: 190000,
    mileage: 8000,
    fuelType: "diesel",
    color: "branco",
    transmission: "automatic",
    doors: 4,
    category: "truck",
    condition: "used",
    description: "Chevrolet S10 2023, automático, diesel, seminova",
    images: [
      "https://www.webmotors.com.br/caminhoes/estoque/chevrolet/s10/2023/2-8-turbo-diesel-16v-4p/2-8-turbo-diesel-16v-4p/",
      "https://www.webmotors.com.br/caminhoes/estoque/chevrolet/s10/2023/2-8-turbo-diesel-16v-4p/2-8-turbo-diesel-16v-4p/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: true
  },
  {
    brand: "Iveco",
    vehicleModel: "Daily",
    year: 2022,
    price: 120000,
    mileage: 35000,
    fuelType: "diesel",
    color: "azul",
    transmission: "manual",
    doors: 4,
    category: "van",
    condition: "used",
    description: "Iveco Daily 2022, manual, diesel, bem conservada",
    images: [
      "https://www.webmotors.com.br/caminhoes/estoque/iveco/daily/2022/3-0-turbo-diesel-16v-4p/3-0-turbo-diesel-16v-4p/",
      "https://www.webmotors.com.br/caminhoes/estoque/iveco/daily/2022/3-0-turbo-diesel-16v-4p/3-0-turbo-diesel-16v-4p/"
    ],
    location: {
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    seller: {
      id: "68d1d34f2dd6f78e64b71fff",
      name: "Admin User",
      phone: "(11) 99999-9999",
      email: "admin@test.com"
    },
    isFeatured: false
  }
];

// Função para criar um veículo
async function createVehicle(token, vehicleData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/vehicles`, vehicleData, {
      httpsAgent,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      console.log(`✅ Veículo ${vehicleData.brand} ${vehicleData.vehicleModel} criado com sucesso`);
      return response.data.data;
    } else {
      console.log(`⚠️ Falha ao criar veículo ${vehicleData.brand} ${vehicleData.vehicleModel}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Erro ao criar veículo ${vehicleData.brand} ${vehicleData.vehicleModel}:`, error.response?.data || error.message);
    return null;
  }
}

// Função para listar todos os veículos
async function listAllVehicles(token) {
  try {
    console.log('📋 Listando todos os veículos...');
    const response = await axios.get(`${API_BASE_URL}/api/vehicles`, {
      httpsAgent,
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.data.success) {
      console.log(`✅ Encontrados ${response.data.data.length} veículos`);
      return response.data.data;
    } else {
      throw new Error('Falha ao listar veículos');
    }
  } catch (error) {
    console.error('❌ Erro ao listar veículos:', error.response?.data || error.message);
    throw error;
  }
}

// Função principal
async function main() {
  try {
    console.log('🚀 Criando veículos adicionais...\n');
    
    // 1. Fazer login
    const token = await login();
    console.log('');
    
    // 2. Criar veículos adicionais
    console.log(`🚗 Criando ${additionalVehicles.length} veículos adicionais...`);
    
    let createdCount = 0;
    for (const vehicle of additionalVehicles) {
      const result = await createVehicle(token, vehicle);
      if (result) {
        createdCount++;
      }
      // Pequena pausa para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`✅ ${createdCount} de ${additionalVehicles.length} veículos adicionais criados com sucesso\n`);
    
    // 3. Listar total de veículos
    const allVehicles = await listAllVehicles(token);
    console.log(`🎉 Total de veículos no sistema: ${allVehicles.length}`);
    
  } catch (error) {
    console.error('❌ Erro no processo:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
