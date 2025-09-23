const axios = require('axios');
const https = require('https');

const BFF_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 15000
};

// Dados de veículos baseados na Webmotors
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
    brand: "Honda",
    model: "Civic",
    year: 2022,
    price: 135000,
    mileage: 25000,
    fuel: "gasolina",
    color: "prata",
    transmission: "automatico",
    category: "carro",
    description: "Honda Civic 2022, automático, completo, bem conservado",
    images: ["https://www.webmotors.com.br/carros/estoque/honda/civic"]
  },
  {
    brand: "Volkswagen",
    model: "Golf",
    year: 2021,
    price: 125000,
    mileage: 35000,
    fuel: "gasolina",
    color: "azul",
    transmission: "manual",
    category: "carro",
    description: "Volkswagen Golf 2021, manual, completo, revisado",
    images: ["https://www.webmotors.com.br/carros/estoque/volkswagen/golf"]
  },
  {
    brand: "Ford",
    model: "Focus",
    year: 2020,
    price: 85000,
    mileage: 45000,
    fuel: "gasolina",
    color: "preto",
    transmission: "automatico",
    category: "carro",
    description: "Ford Focus 2020, automático, completo, único dono",
    images: ["https://www.webmotors.com.br/carros/estoque/ford/focus"]
  },
  {
    brand: "Chevrolet",
    model: "Onix",
    year: 2023,
    price: 75000,
    mileage: 10000,
    fuel: "gasolina",
    color: "vermelho",
    transmission: "automatico",
    category: "carro",
    description: "Chevrolet Onix 2023, automático, completo, seminovo",
    images: ["https://www.webmotors.com.br/carros/estoque/chevrolet/onix"]
  },
  {
    brand: "Fiat",
    model: "Argo",
    year: 2022,
    price: 65000,
    mileage: 20000,
    fuel: "gasolina",
    color: "branco",
    transmission: "manual",
    category: "carro",
    description: "Fiat Argo 2022, manual, completo, bem conservado",
    images: ["https://www.webmotors.com.br/carros/estoque/fiat/argo"]
  },
  {
    brand: "Hyundai",
    model: "HB20",
    year: 2021,
    price: 70000,
    mileage: 30000,
    fuel: "gasolina",
    color: "prata",
    transmission: "automatico",
    category: "carro",
    description: "Hyundai HB20 2021, automático, completo, revisado",
    images: ["https://www.webmotors.com.br/carros/estoque/hyundai/hb20"]
  },
  {
    brand: "Nissan",
    model: "Versa",
    year: 2020,
    price: 80000,
    mileage: 40000,
    fuel: "gasolina",
    color: "azul",
    transmission: "automatico",
    category: "carro",
    description: "Nissan Versa 2020, automático, completo, único dono",
    images: ["https://www.webmotors.com.br/carros/estoque/nissan/versa"]
  },
  {
    brand: "Renault",
    model: "Logan",
    year: 2019,
    price: 55000,
    mileage: 50000,
    fuel: "gasolina",
    color: "preto",
    transmission: "manual",
    category: "carro",
    description: "Renault Logan 2019, manual, completo, bem conservado",
    images: ["https://www.webmotors.com.br/carros/estoque/renault/logan"]
  },
  {
    brand: "Peugeot",
    model: "208",
    year: 2022,
    price: 75000,
    mileage: 18000,
    fuel: "gasolina",
    color: "vermelho",
    transmission: "automatico",
    category: "carro",
    description: "Peugeot 208 2022, automático, completo, seminovo",
    images: ["https://www.webmotors.com.br/carros/estoque/peugeot/208"]
  },
  {
    brand: "Honda",
    model: "CB 600F",
    year: 2021,
    price: 35000,
    mileage: 15000,
    fuel: "gasolina",
    color: "vermelho",
    transmission: "manual",
    category: "moto",
    description: "Honda CB 600F 2021, manual, completa, bem conservada",
    images: ["https://www.webmotors.com.br/motos/estoque/honda/cb-600f"]
  },
  {
    brand: "Yamaha",
    model: "MT-07",
    year: 2022,
    price: 45000,
    mileage: 8000,
    fuel: "gasolina",
    color: "azul",
    transmission: "manual",
    category: "moto",
    description: "Yamaha MT-07 2022, manual, completa, seminova",
    images: ["https://www.webmotors.com.br/motos/estoque/yamaha/mt-07"]
  },
  {
    brand: "Kawasaki",
    model: "Ninja 650",
    year: 2020,
    price: 40000,
    mileage: 20000,
    fuel: "gasolina",
    color: "verde",
    transmission: "manual",
    category: "moto",
    description: "Kawasaki Ninja 650 2020, manual, completa, revisada",
    images: ["https://www.webmotors.com.br/motos/estoque/kawasaki/ninja-650"]
  },
  {
    brand: "Volkswagen",
    model: "Delivery",
    year: 2021,
    price: 95000,
    mileage: 25000,
    fuel: "diesel",
    color: "branco",
    transmission: "manual",
    category: "caminhao",
    description: "Volkswagen Delivery 2021, manual, diesel, bem conservado",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/volkswagen/delivery"]
  },
  {
    brand: "Mercedes-Benz",
    model: "Sprinter",
    year: 2022,
    price: 180000,
    mileage: 12000,
    fuel: "diesel",
    color: "branco",
    transmission: "automatico",
    category: "caminhao",
    description: "Mercedes-Benz Sprinter 2022, automático, diesel, seminovo",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/mercedes-benz/sprinter"]
  },
  {
    brand: "Toyota",
    model: "Hilux",
    year: 2023,
    price: 220000,
    mileage: 5000,
    fuel: "diesel",
    color: "prata",
    transmission: "automatico",
    category: "caminhao",
    description: "Toyota Hilux 2023, automático, diesel, seminova",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/toyota/hilux"]
  },
  {
    brand: "Ford",
    model: "Ranger",
    year: 2022,
    price: 200000,
    mileage: 15000,
    fuel: "diesel",
    color: "azul",
    transmission: "automatico",
    category: "caminhao",
    description: "Ford Ranger 2022, automático, diesel, bem conservada",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/ford/ranger"]
  },
  {
    brand: "Chevrolet",
    model: "S10",
    year: 2021,
    price: 180000,
    mileage: 20000,
    fuel: "diesel",
    color: "preto",
    transmission: "manual",
    category: "caminhao",
    description: "Chevrolet S10 2021, manual, diesel, revisada",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/chevrolet/s10"]
  },
  {
    brand: "Volkswagen",
    model: "Amarok",
    year: 2023,
    price: 250000,
    mileage: 8000,
    fuel: "diesel",
    color: "branco",
    transmission: "automatico",
    category: "caminhao",
    description: "Volkswagen Amarok 2023, automático, diesel, seminova",
    images: ["https://www.webmotors.com.br/caminhoes/estoque/volkswagen/amarok"]
  },
  {
    brand: "Mercedes-Benz",
    model: "OF-1722",
    year: 2020,
    price: 350000,
    mileage: 30000,
    fuel: "diesel",
    color: "azul",
    transmission: "manual",
    category: "onibus",
    description: "Mercedes-Benz OF-1722 2020, manual, diesel, revisado",
    images: ["https://www.webmotors.com.br/onibus/estoque/mercedes-benz/of-1722"]
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

    const loginResponse = await axios.post(`${BFF_URL}/api/login`, loginData, axiosConfig);
    console.log('✅ Login realizado com sucesso');

    const token = loginResponse.data.data.data.token;
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
        console.log(`📝 Criando veículo ${i + 1}/20: ${vehicle.brand} ${vehicle.model}`);
        
        const response = await axios.post(
          `${BFF_URL}/api/vehicles`,
          vehicle,
          {
            ...axiosConfig,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(`✅ ${vehicle.brand} ${vehicle.model} criado com sucesso`);
        successCount++;

        // Pequena pausa entre requisições
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.log(`❌ Erro ao criar ${vehicle.brand} ${vehicle.model}:`, error.response?.data || error.message);
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
