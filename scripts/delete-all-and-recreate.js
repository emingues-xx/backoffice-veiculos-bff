const axios = require('axios');
const https = require('https');

// Configuração para ignorar certificados SSL
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const API_BASE_URL = 'https://backoffice-veiculos-api-production.up.railway.app';
const BFF_BASE_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

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

// Função para deletar um veículo
async function deleteVehicle(token, vehicleId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/vehicles/${vehicleId}`, {
      httpsAgent,
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.data.success) {
      console.log(`✅ Veículo ${vehicleId} deletado com sucesso`);
      return true;
    } else {
      console.log(`⚠️ Falha ao deletar veículo ${vehicleId}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao deletar veículo ${vehicleId}:`, error.response?.data || error.message);
    return false;
  }
}

// Função para deletar todos os veículos
async function deleteAllVehicles(token) {
  try {
    const vehicles = await listAllVehicles(token);
    
    if (vehicles.length === 0) {
      console.log('ℹ️ Nenhum veículo encontrado para deletar');
      return;
    }
    
    console.log(`🗑️ Deletando ${vehicles.length} veículos...`);
    
    let deletedCount = 0;
    for (const vehicle of vehicles) {
      const success = await deleteVehicle(token, vehicle._id);
      if (success) {
        deletedCount++;
      }
      // Pequena pausa para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`✅ ${deletedCount} de ${vehicles.length} veículos deletados com sucesso`);
  } catch (error) {
    console.error('❌ Erro ao deletar veículos:', error.message);
    throw error;
  }
}

// Dados dos novos veículos com imagens da internet
const newVehicles = [
  {
    brand: "Toyota",
    vehicleModel: "Corolla Cross",
    year: 2023,
    price: 145000,
    mileage: 15000,
    fuelType: "gasoline",
    color: "branco",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Toyota Corolla Cross 2023, automático, completo, único dono",
    images: [
      "https://www.webmotors.com.br/carros/estoque/toyota/corolla-cross/2023/1-8-at-flex-16v-4p/1-8-at-flex-16v-4p/",
      "https://www.webmotors.com.br/carros/estoque/toyota/corolla-cross/2023/1-8-at-flex-16v-4p/1-8-at-flex-16v-4p/"
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
    brand: "Honda",
    vehicleModel: "Civic",
    year: 2022,
    price: 125000,
    mileage: 20000,
    fuelType: "gasoline",
    color: "prata",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Honda Civic 2022, automático, completo, bem conservado",
    images: [
      "https://www.webmotors.com.br/carros/estoque/honda/civic/2022/2-0-at-flex-16v-4p/2-0-at-flex-16v-4p/",
      "https://www.webmotors.com.br/carros/estoque/honda/civic/2022/2-0-at-flex-16v-4p/2-0-at-flex-16v-4p/"
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
    brand: "Volkswagen",
    vehicleModel: "Golf",
    year: 2021,
    price: 95000,
    mileage: 30000,
    fuelType: "gasoline",
    color: "azul",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Volkswagen Golf 2021, automático, completo, único dono",
    images: [
      "https://www.webmotors.com.br/carros/estoque/volkswagen/golf/2021/1-4-tsi-16v-4p/1-4-tsi-16v-4p/",
      "https://www.webmotors.com.br/carros/estoque/volkswagen/golf/2021/1-4-tsi-16v-4p/1-4-tsi-16v-4p/"
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
    brand: "BMW",
    vehicleModel: "320i",
    year: 2023,
    price: 180000,
    mileage: 10000,
    fuelType: "gasoline",
    color: "preto",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "BMW 320i 2023, automático, completo, seminova",
    images: [
      "https://www.webmotors.com.br/carros/estoque/bmw/320i/2023/2-0-turbo-16v-4p/2-0-turbo-16v-4p/",
      "https://www.webmotors.com.br/carros/estoque/bmw/320i/2023/2-0-turbo-16v-4p/2-0-turbo-16v-4p/"
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
    brand: "Mercedes-Benz",
    vehicleModel: "C200",
    year: 2022,
    price: 220000,
    mileage: 15000,
    fuelType: "gasoline",
    color: "branco",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Mercedes-Benz C200 2022, automático, completo, único dono",
    images: [
      "https://www.webmotors.com.br/carros/estoque/mercedes-benz/c200/2022/1-5-turbo-16v-4p/1-5-turbo-16v-4p/",
      "https://www.webmotors.com.br/carros/estoque/mercedes-benz/c200/2022/1-5-turbo-16v-4p/1-5-turbo-16v-4p/"
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
    brand: "Honda",
    vehicleModel: "CB 600F",
    year: 2021,
    price: 35000,
    mileage: 15000,
    fuelType: "gasoline",
    color: "vermelho",
    transmission: "manual",
    doors: 2,
    category: "motorcycle",
    condition: "used",
    description: "Honda CB 600F 2021, manual, completa, bem conservada",
    images: [
      "https://www.webmotors.com.br/motos/estoque/honda/cb-600f/2021/cb-600f-hornet-abs-16v/cb-600f-hornet-abs-16v/",
      "https://www.webmotors.com.br/motos/estoque/honda/cb-600f/2021/cb-600f-hornet-abs-16v/cb-600f-hornet-abs-16v/"
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
    brand: "Yamaha",
    vehicleModel: "MT-07",
    year: 2022,
    price: 42000,
    mileage: 8000,
    fuelType: "gasoline",
    color: "azul",
    transmission: "manual",
    doors: 2,
    category: "motorcycle",
    condition: "used",
    description: "Yamaha MT-07 2022, manual, completa, seminova",
    images: [
      "https://www.webmotors.com.br/motos/estoque/yamaha/mt-07/2022/mt-07-abs-16v/mt-07-abs-16v/",
      "https://www.webmotors.com.br/motos/estoque/yamaha/mt-07/2022/mt-07-abs-16v/mt-07-abs-16v/"
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
    brand: "Kawasaki",
    vehicleModel: "Ninja 650",
    year: 2023,
    price: 45000,
    mileage: 5000,
    fuelType: "gasoline",
    color: "verde",
    transmission: "manual",
    doors: 2,
    category: "motorcycle",
    condition: "used",
    description: "Kawasaki Ninja 650 2023, manual, completa, seminova",
    images: [
      "https://www.webmotors.com.br/motos/estoque/kawasaki/ninja-650/2023/ninja-650-abs-16v/ninja-650-abs-16v/",
      "https://www.webmotors.com.br/motos/estoque/kawasaki/ninja-650/2023/ninja-650-abs-16v/ninja-650-abs-16v/"
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
    brand: "Toyota",
    vehicleModel: "Hilux",
    year: 2023,
    price: 220000,
    mileage: 5000,
    fuelType: "diesel",
    color: "prata",
    transmission: "automatic",
    doors: 4,
    category: "truck",
    condition: "used",
    description: "Toyota Hilux 2023, automático, diesel, seminova",
    images: [
      "https://www.webmotors.com.br/caminhoes/estoque/toyota/hilux/2023/2-8-turbo-diesel-16v-4p/2-8-turbo-diesel-16v-4p/",
      "https://www.webmotors.com.br/caminhoes/estoque/toyota/hilux/2023/2-8-turbo-diesel-16v-4p/2-8-turbo-diesel-16v-4p/"
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
    brand: "Ford",
    vehicleModel: "Ranger",
    year: 2022,
    price: 180000,
    mileage: 25000,
    fuelType: "diesel",
    color: "branco",
    transmission: "automatic",
    doors: 4,
    category: "truck",
    condition: "used",
    description: "Ford Ranger 2022, automático, diesel, bem conservada",
    images: [
      "https://www.webmotors.com.br/caminhoes/estoque/ford/ranger/2022/3-2-turbo-diesel-16v-4p/3-2-turbo-diesel-16v-4p/",
      "https://www.webmotors.com.br/caminhoes/estoque/ford/ranger/2022/3-2-turbo-diesel-16v-4p/3-2-turbo-diesel-16v-4p/"
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
    brand: "Mercedes-Benz",
    vehicleModel: "Sprinter",
    year: 2021,
    price: 150000,
    mileage: 40000,
    fuelType: "diesel",
    color: "branco",
    transmission: "manual",
    doors: 4,
    category: "van",
    condition: "used",
    description: "Mercedes-Benz Sprinter 2021, manual, diesel, bem conservada",
    images: [
      "https://www.webmotors.com.br/caminhoes/estoque/mercedes-benz/sprinter/2021/2-1-turbo-diesel-16v-4p/2-1-turbo-diesel-16v-4p/",
      "https://www.webmotors.com.br/caminhoes/estoque/mercedes-benz/sprinter/2021/2-1-turbo-diesel-16v-4p/2-1-turbo-diesel-16v-4p/"
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
    brand: "Volkswagen",
    vehicleModel: "Kombi",
    year: 2020,
    price: 80000,
    mileage: 60000,
    fuelType: "gasoline",
    color: "azul",
    transmission: "manual",
    doors: 4,
    category: "van",
    condition: "used",
    description: "Volkswagen Kombi 2020, manual, gasolina, clássica",
    images: [
      "https://www.webmotors.com.br/caminhoes/estoque/volkswagen/kombi/2020/1-4-flex-16v-4p/1-4-flex-16v-4p/",
      "https://www.webmotors.com.br/caminhoes/estoque/volkswagen/kombi/2020/1-4-flex-16v-4p/1-4-flex-16v-4p/"
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

// Função para criar todos os novos veículos
async function createAllVehicles(token) {
  try {
    console.log(`🚗 Criando ${newVehicles.length} novos veículos...`);
    
    let createdCount = 0;
    for (const vehicle of newVehicles) {
      const result = await createVehicle(token, vehicle);
      if (result) {
        createdCount++;
      }
      // Pequena pausa para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`✅ ${createdCount} de ${newVehicles.length} veículos criados com sucesso`);
  } catch (error) {
    console.error('❌ Erro ao criar veículos:', error.message);
    throw error;
  }
}

// Função principal
async function main() {
  try {
    console.log('🚀 Iniciando processo de limpeza e recriação de veículos...\n');
    
    // 1. Fazer login
    const token = await login();
    console.log('');
    
    // 2. Deletar todos os veículos existentes
    await deleteAllVehicles(token);
    console.log('');
    
    // 3. Criar novos veículos
    await createAllVehicles(token);
    console.log('');
    
    // 4. Listar veículos finais
    const finalVehicles = await listAllVehicles(token);
    console.log(`🎉 Processo concluído! Total de veículos: ${finalVehicles.length}`);
    
  } catch (error) {
    console.error('❌ Erro no processo principal:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
