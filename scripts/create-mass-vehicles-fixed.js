const axios = require('axios');
const https = require('https');

const API_URL = 'https://backoffice-veiculos-api-production.up.railway.app';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 15000
};

// Dados de veículos baseados na Webmotors com estrutura correta da API
const vehicles = [
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
    images: ["https://www.webmotors.com.br/carros/estoque/toyota/corolla-cross"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Honda",
    vehicleModel: "Civic",
    year: 2022,
    price: 135000,
    mileage: 25000,
    fuelType: "gasoline",
    color: "prata",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Honda Civic 2022, automático, completo, bem conservado",
    images: ["https://www.webmotors.com.br/carros/estoque/honda/civic"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Volkswagen",
    vehicleModel: "Golf",
    year: 2021,
    price: 125000,
    mileage: 35000,
    fuelType: "gasoline",
    color: "azul",
    transmission: "manual",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Volkswagen Golf 2021, manual, completo, revisado",
    images: ["https://www.webmotors.com.br/carros/estoque/volkswagen/golf"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Ford",
    vehicleModel: "Focus",
    year: 2020,
    price: 85000,
    mileage: 45000,
    fuelType: "gasoline",
    color: "preto",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Ford Focus 2020, automático, completo, único dono",
    images: ["https://www.webmotors.com.br/carros/estoque/ford/focus"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Chevrolet",
    vehicleModel: "Onix",
    year: 2023,
    price: 75000,
    mileage: 10000,
    fuelType: "gasoline",
    color: "vermelho",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Chevrolet Onix 2023, automático, completo, seminovo",
    images: ["https://www.webmotors.com.br/carros/estoque/chevrolet/onix"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Fiat",
    vehicleModel: "Argo",
    year: 2022,
    price: 65000,
    mileage: 20000,
    fuelType: "gasoline",
    color: "branco",
    transmission: "manual",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Fiat Argo 2022, manual, completo, bem conservado",
    images: ["https://www.webmotors.com.br/carros/estoque/fiat/argo"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Hyundai",
    vehicleModel: "HB20",
    year: 2021,
    price: 70000,
    mileage: 30000,
    fuelType: "gasoline",
    color: "prata",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Hyundai HB20 2021, automático, completo, revisado",
    images: ["https://www.webmotors.com.br/carros/estoque/hyundai/hb20"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Nissan",
    vehicleModel: "Versa",
    year: 2020,
    price: 80000,
    mileage: 40000,
    fuelType: "gasoline",
    color: "azul",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Nissan Versa 2020, automático, completo, único dono",
    images: ["https://www.webmotors.com.br/carros/estoque/nissan/versa"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Renault",
    vehicleModel: "Logan",
    year: 2019,
    price: 55000,
    mileage: 50000,
    fuelType: "gasoline",
    color: "preto",
    transmission: "manual",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Renault Logan 2019, manual, completo, bem conservado",
    images: ["https://www.webmotors.com.br/carros/estoque/renault/logan"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Peugeot",
    vehicleModel: "208",
    year: 2022,
    price: 75000,
    mileage: 18000,
    fuelType: "gasoline",
    color: "vermelho",
    transmission: "automatic",
    doors: 4,
    category: "car",
    condition: "used",
    description: "Peugeot 208 2022, automático, completo, seminovo",
    images: ["https://www.webmotors.com.br/carros/estoque/peugeot/208"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
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
    doors: 0,
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
    doors: 0,
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
    doors: 0,
    category: "motorcycle",
    condition: "used",
    description: "Kawasaki Ninja 650 2020, manual, completa, revisada",
    images: ["https://www.webmotors.com.br/motos/estoque/kawasaki/ninja-650"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Volkswagen",
    vehicleModel: "Delivery",
    year: 2021,
    price: 95000,
    mileage: 25000,
    fuelType: "diesel",
    color: "branco",
    transmission: "manual",
    doors: 2,
    category: "truck",
    condition: "used",
    description: "Volkswagen Delivery 2021, manual, diesel, bem conservado",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/volkswagen/delivery"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Mercedes-Benz",
    vehicleModel: "Sprinter",
    year: 2022,
    price: 180000,
    mileage: 12000,
    fuelType: "diesel",
    color: "branco",
    transmission: "automatic",
    doors: 2,
    category: "truck",
    condition: "used",
    description: "Mercedes-Benz Sprinter 2022, automático, diesel, seminovo",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/mercedes-benz/sprinter"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
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
    images: ["https://www.webmotors.com.br/caminhoes/estoque/toyota/hilux"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Ford",
    vehicleModel: "Ranger",
    year: 2022,
    price: 200000,
    mileage: 15000,
    fuelType: "diesel",
    color: "azul",
    transmission: "automatic",
    doors: 4,
    category: "truck",
    condition: "used",
    description: "Ford Ranger 2022, automático, diesel, bem conservada",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/ford/ranger"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Chevrolet",
    vehicleModel: "S10",
    year: 2021,
    price: 180000,
    mileage: 20000,
    fuelType: "diesel",
    color: "preto",
    transmission: "manual",
    doors: 4,
    category: "truck",
    condition: "used",
    description: "Chevrolet S10 2021, manual, diesel, revisada",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/chevrolet/s10"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  },
  {
    brand: "Volkswagen",
    vehicleModel: "Amarok",
    year: 2023,
    price: 250000,
    mileage: 8000,
    fuelType: "diesel",
    color: "branco",
    transmission: "automatic",
    doors: 4,
    category: "truck",
    condition: "used",
    description: "Volkswagen Amarok 2023, automático, diesel, seminova",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/volkswagen/amarok"],
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
    category: "bus",
    condition: "used",
    description: "Mercedes-Benz OF-1722 2020, manual, diesel, revisado",
    images: ["https://www.webmotors.com.br/onibus/estoque/mercedes-benz/of-1722"],
    location: { city: "São Paulo", state: "SP", zipCode: "01310-100" },
    seller: { id: "68d1d34f2dd6f78e64b71fff", name: "Admin User", phone: "(11) 99999-9999", email: "admin@test.com" },
    isFeatured: false
  }
];

async function createMassVehicles() {
  console.log('🚀 Iniciando criação de massa de 20 veículos...\n');

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

    // Passo 2: Criar veículos
    console.log('\n2. Criando veículos...');
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];
      try {
        console.log(`📝 Criando veículo ${i + 1}/20: ${vehicle.brand} ${vehicle.vehicleModel}`);
        
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
    console.log(`📈 Total processado: ${vehicles.length}`);

  } catch (error) {
    console.log('❌ Erro geral:', error.response?.data || error.message);
  }
}

createMassVehicles();

