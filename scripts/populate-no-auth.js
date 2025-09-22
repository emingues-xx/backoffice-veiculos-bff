const axios = require('axios');
const https = require('https');

// Configurar axios para ignorar problemas de certificado SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

axios.defaults.httpsAgent = httpsAgent;

const API_BASE_URL = 'https://backoffice-veiculos-bff-production.up.railway.app';

const vehicles = [
  {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 85000,
    mileage: 0,
    fuel: 'flex',
    color: 'Branco',
    transmission: 'automatico',
    category: 'carro',
    description: 'Veículo seminovo em excelente estado',
    images: ['https://example.com/corolla1.jpg']
  },
  {
    brand: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 75000,
    mileage: 15000,
    fuel: 'flex',
    color: 'Prata',
    transmission: 'automatico',
    category: 'carro',
    description: 'Civic com baixa quilometragem',
    images: ['https://example.com/civic1.jpg']
  },
  {
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2020,
    price: 65000,
    mileage: 25000,
    fuel: 'gasolina',
    color: 'Azul',
    transmission: 'manual',
    category: 'carro',
    description: 'Golf bem conservado',
    images: ['https://example.com/golf1.jpg']
  },
  {
    brand: 'Ford',
    model: 'Focus',
    year: 2019,
    price: 55000,
    mileage: 40000,
    fuel: 'flex',
    color: 'Preto',
    transmission: 'automatico',
    category: 'carro',
    description: 'Focus com histórico de manutenção completo',
    images: ['https://example.com/focus1.jpg']
  },
  {
    brand: 'Chevrolet',
    model: 'Onix',
    year: 2023,
    price: 72000,
    mileage: 5000,
    fuel: 'flex',
    color: 'Vermelho',
    transmission: 'automatico',
    category: 'carro',
    description: 'Onix zero quilômetro, único dono',
    images: ['https://example.com/onix1.jpg']
  },
  {
    brand: 'Fiat',
    model: 'Argo',
    year: 2021,
    price: 65000,
    mileage: 20000,
    fuel: 'flex',
    color: 'Branco',
    transmission: 'manual',
    category: 'carro',
    description: 'Argo com poucos quilômetros rodados',
    images: ['https://example.com/argo1.jpg']
  },
  {
    brand: 'Hyundai',
    model: 'HB20',
    year: 2022,
    price: 78000,
    mileage: 10000,
    fuel: 'flex',
    color: 'Prata',
    transmission: 'automatico',
    category: 'carro',
    description: 'HB20 seminovo, bem conservado',
    images: ['https://example.com/hb20_1.jpg']
  },
  {
    brand: 'Nissan',
    model: 'Versa',
    year: 2020,
    price: 62000,
    mileage: 35000,
    fuel: 'flex',
    color: 'Cinza',
    transmission: 'automatico',
    category: 'carro',
    description: 'Versa com ar condicionado e direção hidráulica',
    images: ['https://example.com/versa1.jpg']
  },
  {
    brand: 'Renault',
    model: 'Logan',
    year: 2019,
    price: 48000,
    mileage: 45000,
    fuel: 'flex',
    color: 'Branco',
    transmission: 'manual',
    category: 'carro',
    description: 'Logan econômico e confiável',
    images: ['https://example.com/logan1.jpg']
  },
  {
    brand: 'Peugeot',
    model: '208',
    year: 2021,
    price: 69000,
    mileage: 18000,
    fuel: 'flex',
    color: 'Azul',
    transmission: 'automatico',
    category: 'carro',
    description: '208 com design moderno e tecnologia',
    images: ['https://example.com/208_1.jpg']
  },
  {
    brand: 'Honda',
    model: 'CB 600F',
    year: 2020,
    price: 35000,
    mileage: 8000,
    fuel: 'gasolina',
    color: 'Vermelho',
    transmission: 'manual',
    category: 'moto',
    description: 'Moto esportiva em excelente estado',
    images: ['https://example.com/cb600f_1.jpg']
  },
  {
    brand: 'Yamaha',
    model: 'MT-07',
    year: 2022,
    price: 42000,
    mileage: 3000,
    fuel: 'gasolina',
    color: 'Preto',
    transmission: 'manual',
    category: 'moto',
    description: 'MT-07 seminova, poucos quilômetros',
    images: ['https://example.com/mt07_1.jpg']
  },
  {
    brand: 'Kawasaki',
    model: 'Ninja 650',
    year: 2021,
    price: 45000,
    mileage: 5000,
    fuel: 'gasolina',
    color: 'Verde',
    transmission: 'manual',
    category: 'moto',
    description: 'Ninja 650 com visual esportivo',
    images: ['https://example.com/ninja650_1.jpg']
  },
  {
    brand: 'Volkswagen',
    model: 'Delivery',
    year: 2019,
    price: 85000,
    mileage: 60000,
    fuel: 'diesel',
    color: 'Branco',
    transmission: 'manual',
    category: 'caminhao',
    description: 'Caminhão para carga, bem conservado',
    images: ['https://example.com/delivery1.jpg']
  },
  {
    brand: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2020,
    price: 120000,
    mileage: 40000,
    fuel: 'diesel',
    color: 'Branco',
    transmission: 'manual',
    category: 'onibus', // Mudado de 'van' para 'onibus'
    description: 'Van Mercedes para transporte de passageiros',
    images: ['https://example.com/sprinter1.jpg']
  },
  {
    brand: 'Toyota',
    model: 'Hilux',
    year: 2022,
    price: 180000,
    mileage: 15000,
    fuel: 'diesel',
    color: 'Prata',
    transmission: 'automatico',
    category: 'carro',
    description: 'Hilux 4x4, ideal para trabalho e lazer',
    images: ['https://example.com/hilux1.jpg']
  },
  {
    brand: 'Ford',
    model: 'Ranger',
    year: 2021,
    price: 160000,
    mileage: 20000,
    fuel: 'diesel',
    color: 'Azul',
    transmission: 'automatico',
    category: 'carro',
    description: 'Ranger com cabine dupla e 4x4',
    images: ['https://example.com/ranger1.jpg']
  },
  {
    brand: 'Chevrolet',
    model: 'S10',
    year: 2020,
    price: 140000,
    mileage: 30000,
    fuel: 'diesel',
    color: 'Preto',
    transmission: 'manual',
    category: 'carro',
    description: 'S10 robusta e confiável',
    images: ['https://example.com/s10_1.jpg']
  },
  {
    brand: 'Volkswagen',
    model: 'Amarok',
    year: 2023,
    price: 200000,
    mileage: 8000,
    fuel: 'diesel',
    color: 'Branco',
    transmission: 'automatico',
    category: 'carro',
    description: 'Amarok V6, alta performance',
    images: ['https://example.com/amarok1.jpg']
  },
  {
    brand: 'Mercedes-Benz',
    model: 'OF-1722',
    year: 2018,
    price: 180000,
    mileage: 80000,
    fuel: 'diesel',
    color: 'Branco',
    transmission: 'manual',
    category: 'onibus',
    description: 'Ônibus Mercedes para transporte urbano',
    images: ['https://example.com/of1722_1.jpg']
  }
];

async function createVehicle(vehicleData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/vehicles`, vehicleData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar veículo:', error.response?.data || error.message);
    throw error;
  }
}

async function populateAPI() {
  console.log('🚀 Iniciando população da API com 20 veículos (sem autenticação)...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
    console.log(`📝 Criando veículo ${i + 1}/20: ${vehicle.brand} ${vehicle.model}`);
    
    try {
      const result = await createVehicle(vehicle);
      console.log(`✅ Sucesso: ${result.data.brand} ${result.data.model} (ID: ${result.data.id})`);
      successCount++;
    } catch (error) {
      console.log(`❌ Erro: ${vehicle.brand} ${vehicle.model}`);
      errorCount++;
    }
    
    // Pequena pausa entre as requisições
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('\n📊 Resumo da população:');
  console.log(`✅ Veículos criados com sucesso: ${successCount}`);
  console.log(`❌ Erros: ${errorCount}`);
  console.log(`📈 Total processado: ${vehicles.length}`);
  
  if (successCount > 0) {
    console.log('\n🎉 Massa de dados criada com sucesso!');
    console.log(`🔗 Acesse a API: ${API_BASE_URL}/api/vehicles`);
    console.log(`📚 Documentação: ${API_BASE_URL}/docs`);
  }
}

// Executar o script
populateAPI().catch(console.error);
