import { 
  Vehicle, 
  CreateVehicleRequest, 
  UpdateVehicleRequest, 
  VehicleFilters, 
  PaginatedResponse,
  DashboardStats 
} from '../types';

export class MockVehicleService {
  private vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'Toyota',
      vehicleModel: 'Corolla',
      year: 2022,
      price: 85000,
      mileage: 0,
      fuelType: 'gasoline',
      color: 'Branco',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Veículo seminovo em excelente estado, único dono, revisões em dia. Equipado com ar condicionado, direção hidráulica, vidros elétricos e trava elétrica.',
      images: ['https://example.com/corolla1.jpg', 'https://example.com/corolla2.jpg'],
      features: ['Ar condicionado', 'Direção hidráulica', 'Vidros elétricos', 'Trava elétrica', 'Airbag', 'ABS'],
      location: {
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Toyota',
        phone: '(11) 99999-9999',
        email: 'vendas@toyota.com'
      },
      isFeatured: false,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      brand: 'Honda',
      vehicleModel: 'Civic',
      year: 2021,
      price: 75000,
      mileage: 15000,
      fuelType: 'gasoline',
      color: 'Prata',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Civic com baixa quilometragem, bem conservado, único dono. Equipado com ar condicionado, direção elétrica, vidros elétricos e sistema de som.',
      images: ['https://example.com/civic1.jpg', 'https://example.com/civic2.jpg'],
      features: ['Ar condicionado', 'Direção elétrica', 'Vidros elétricos', 'Sistema de som', 'Airbag', 'ABS'],
      location: {
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '20000-000'
      },
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Honda',
        phone: '(21) 99999-9999',
        email: 'vendas@honda.com'
      },
      isFeatured: true,
      views: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      brand: 'Volkswagen',
      vehicleModel: 'Golf',
      year: 2020,
      price: 65000,
      mileage: 25000,
      fuelType: 'gasoline',
      color: 'Azul',
      transmission: 'manual',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'sold',
      description: 'Golf bem conservado, revisões em dia, único dono. Equipado com ar condicionado, direção hidráulica e sistema de som.',
      images: ['https://example.com/golf1.jpg', 'https://example.com/golf2.jpg'],
      features: ['Ar condicionado', 'Direção hidráulica', 'Sistema de som', 'Airbag', 'ABS'],
      location: {
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '30000-000'
      },
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Volkswagen',
        phone: '(31) 99999-9999',
        email: 'vendas@volkswagen.com'
      },
      isFeatured: false,
      views: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      brand: 'Ford',
      vehicleModel: 'Focus',
      year: 2019,
      price: 55000,
      mileage: 40000,
      fuelType: 'gasoline',
      color: 'Preto',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Focus com histórico de manutenção completo, bem conservado. Equipado com ar condicionado, direção elétrica e sistema de som.',
      images: ['https://example.com/focus1.jpg', 'https://example.com/focus2.jpg'],
      features: ['Ar condicionado', 'Direção elétrica', 'Sistema de som', 'Airbag', 'ABS'],
      location: {
        city: 'Salvador',
        state: 'BA',
        zipCode: '40000-000'
      },
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Ford',
        phone: '(71) 99999-9999',
        email: 'vendas@ford.com'
      },
      isFeatured: false,
      views: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      brand: 'Chevrolet',
      vehicleModel: 'Onix',
      year: 2023,
      price: 72000,
      mileage: 5000,
      fuelType: 'gasoline',
      color: 'Vermelho',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'new',
      status: 'active',
      description: 'Onix zero quilômetro, único dono, garantia de fábrica. Equipado com ar condicionado, direção elétrica, vidros elétricos e sistema de som.',
      images: ['https://example.com/onix1.jpg', 'https://example.com/onix2.jpg'],
      features: ['Ar condicionado', 'Direção elétrica', 'Vidros elétricos', 'Sistema de som', 'Airbag', 'ABS', 'Controle de estabilidade'],
      location: {
        city: 'Brasília',
        state: 'DF',
        zipCode: '70000-000'
      },
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Chevrolet',
        phone: '(61) 99999-9999',
        email: 'vendas@chevrolet.com'
      },
      isFeatured: true,
      views: 25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      brand: 'Fiat',
      vehicleModel: 'Argo',
      year: 2021,
      price: 65000,
      mileage: 20000,
      fuelType: 'gasoline',
      color: 'Branco',
      transmission: 'manual',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Argo com poucos quilômetros rodados, bem conservado. Equipado com ar condicionado, direção hidráulica e sistema de som.',
      images: ['https://example.com/argo1.jpg', 'https://example.com/argo2.jpg'],
      features: ['Ar condicionado', 'Direção hidráulica', 'Sistema de som', 'Airbag', 'ABS'],
      location: {
        city: 'Curitiba',
        state: 'PR',
        zipCode: '80000-000'
      },
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Fiat',
        phone: '(41) 99999-9999',
        email: 'vendas@fiat.com'
      },
      isFeatured: false,
      views: 7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '7',
      brand: 'Hyundai',
      vehicleModel: 'HB20',
      year: 2022,
      price: 78000,
      mileage: 10000,
      fuelType: 'gasoline',
      color: 'Prata',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'HB20 seminovo, bem conservado, único dono. Equipado com ar condicionado, direção elétrica e sistema de som.',
      images: ['https://example.com/hb20_1.jpg', 'https://example.com/hb20_2.jpg'],
      features: ['Ar condicionado', 'Direção elétrica', 'Sistema de som', 'Airbag', 'ABS'],
      location: {
        city: 'Porto Alegre',
        state: 'RS',
        zipCode: '90000-000'
      },
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Hyundai',
        phone: '(51) 99999-9999',
        email: 'vendas@hyundai.com'
      },
      isFeatured: false,
      views: 9,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '8',
      brand: 'Nissan',
      vehicleModel: 'Versa',
      year: 2020,
      price: 62000,
      mileage: 35000,
      fuelType: 'gasoline',
      color: 'Cinza',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Versa com ar condicionado e direção hidráulica',
      images: ['https://example.com/versa1.jpg', 'https://example.com/versa2.jpg'],
      features: ['Ar condicionado', 'Direção hidráulica', 'Sistema de som', 'Airbag', 'ABS'],
      location: {
        city: 'Recife',
        state: 'PE',
        zipCode: '50000-000'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Teste',
        phone: '(11) 99999-9999',
        email: 'vendas@teste.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '9',
      brand: 'Renault',
      vehicleModel: 'Logan',
      year: 2019,
      price: 48000,
      mileage: 45000,
      fuelType: 'gasoline',
      color: 'Branco',
      transmission: 'manual',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Logan econômico e confiável',
      images: ['https://example.com/logan1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Teste 2',
        phone: '(11) 99999-9999',
        email: 'vendas@teste2.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '10',
      brand: 'Peugeot',
      vehicleModel: '208',
      year: 2021,
      price: 69000,
      mileage: 18000,
      fuelType: 'gasoline',
      color: 'Azul',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: '208 com design moderno e tecnologia',
      images: ['https://example.com/208_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Teste',
        phone: '(11) 99999-9999',
        email: 'vendas@teste.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '11',
      brand: 'Honda',
      vehicleModel: 'CB 600F',
      year: 2020,
      price: 35000,
      mileage: 8000,
      fuelType: 'gasoline',
      color: 'Vermelho',
      transmission: 'manual',
      doors: 0,
      category: 'motorcycle',
      condition: 'used',
      status: 'active',
      description: 'Moto esportiva em excelente estado',
      images: ['https://example.com/cb600f_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Teste 2',
        phone: '(11) 99999-9999',
        email: 'vendas@teste2.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '12',
      brand: 'Yamaha',
      vehicleModel: 'MT-07',
      year: 2022,
      price: 42000,
      mileage: 3000,
      fuelType: 'gasoline',
      color: 'Preto',
      transmission: 'manual',
      doors: 0,
      category: 'motorcycle',
      condition: 'used',
      status: 'active',
      description: 'MT-07 seminova, poucos quilômetros',
      images: ['https://example.com/mt07_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Teste',
        phone: '(11) 99999-9999',
        email: 'vendas@teste.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '13',
      brand: 'Kawasaki',
      vehicleModel: 'Ninja 650',
      year: 2021,
      price: 45000,
      mileage: 5000,
      fuelType: 'gasoline',
      color: 'Verde',
      transmission: 'manual',
      doors: 0,
      category: 'motorcycle',
      condition: 'used',
      status: 'active',
      description: 'Ninja 650 com visual esportivo',
      images: ['https://example.com/ninja650_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Teste 2',
        phone: '(11) 99999-9999',
        email: 'vendas@teste2.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '14',
      brand: 'Volkswagen',
      vehicleModel: 'Delivery',
      year: 2019,
      price: 85000,
      mileage: 60000,
      fuelType: 'diesel',
      color: 'Branco',
      transmission: 'manual',
      doors: 2,
      category: 'truck',
      condition: 'used',
      status: 'active',
      description: 'Caminhão para carga, bem conservado',
      images: ['https://example.com/delivery1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Teste',
        phone: '(11) 99999-9999',
        email: 'vendas@teste.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '15',
      brand: 'Mercedes-Benz',
      vehicleModel: 'Sprinter',
      year: 2020,
      price: 120000,
      mileage: 40000,
      fuelType: 'diesel',
      color: 'Branco',
      transmission: 'manual',
      category: 'van',
      status: 'active',
      description: 'Van Mercedes para transporte de passageiros',
      images: ['https://example.com/sprinter1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Teste 2',
        phone: '(11) 99999-9999',
        email: 'vendas@teste2.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '16',
      brand: 'Toyota',
      vehicleModel: 'Hilux',
      year: 2022,
      price: 180000,
      mileage: 15000,
      fuelType: 'diesel',
      color: 'Prata',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Hilux 4x4, ideal para trabalho e lazer',
      images: ['https://example.com/hilux1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Teste',
        phone: '(11) 99999-9999',
        email: 'vendas@teste.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '17',
      brand: 'Ford',
      vehicleModel: 'Ranger',
      year: 2021,
      price: 160000,
      mileage: 20000,
      fuelType: 'diesel',
      color: 'Azul',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Ranger com cabine dupla e 4x4',
      images: ['https://example.com/ranger1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Teste 2',
        phone: '(11) 99999-9999',
        email: 'vendas@teste2.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '18',
      brand: 'Chevrolet',
      vehicleModel: 'S10',
      year: 2020,
      price: 140000,
      mileage: 30000,
      fuelType: 'diesel',
      color: 'Preto',
      transmission: 'manual',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'S10 robusta e confiável',
      images: ['https://example.com/s10_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Teste',
        phone: '(11) 99999-9999',
        email: 'vendas@teste.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '19',
      brand: 'Volkswagen',
      vehicleModel: 'Amarok',
      year: 2023,
      price: 200000,
      mileage: 8000,
      fuelType: 'diesel',
      color: 'Branco',
      transmission: 'automatic',
      doors: 4,
      category: 'car',
      condition: 'used',
      status: 'active',
      description: 'Amarok V6, alta performance',
      images: ['https://example.com/amarok1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397b',
        name: 'Concessionária Teste 2',
        phone: '(11) 99999-9999',
        email: 'vendas@teste2.com'
      },
      isFeatured: false,
      views: 0
    },
    {
      id: '20',
      brand: 'Mercedes-Benz',
      vehicleModel: 'OF-1722',
      year: 2018,
      price: 180000,
      mileage: 80000,
      fuelType: 'diesel',
      color: 'Branco',
      transmission: 'manual',
      category: 'van',
      status: 'active',
      description: 'Ônibus Mercedes para transporte urbano',
      images: ['https://example.com/of1722_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: {
        id: '68d17845a08df9f982e3397a',
        name: 'Concessionária Teste',
        phone: '(11) 99999-9999',
        email: 'vendas@teste.com'
      },
      isFeatured: false,
      views: 0
    }
  ];

  async getVehicles(filters: VehicleFilters = {}): Promise<PaginatedResponse<Vehicle>> {
    let filteredVehicles = [...this.vehicles];

    // Apply filters
    if (filters.brand) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters.vehicleModel) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.vehicleModel.toLowerCase().includes(filters.vehicleModel!.toLowerCase())
      );
    }

    if (filters.yearMin) {
      filteredVehicles = filteredVehicles.filter(v => v.year >= filters.yearMin!);
    }

    if (filters.yearMax) {
      filteredVehicles = filteredVehicles.filter(v => v.year <= filters.yearMax!);
    }

    if (filters.priceMin) {
      filteredVehicles = filteredVehicles.filter(v => v.price >= filters.priceMin!);
    }

    if (filters.priceMax) {
      filteredVehicles = filteredVehicles.filter(v => v.price <= filters.priceMax!);
    }

    if (filters.fuelType) {
      filteredVehicles = filteredVehicles.filter(v => v.fuelType === filters.fuelType);
    }

    if (filters.category) {
      filteredVehicles = filteredVehicles.filter(v => v.category === filters.category);
    }

    if (filters.status) {
      filteredVehicles = filteredVehicles.filter(v => v.status === filters.status);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredVehicles.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof Vehicle];
        const bValue = b[filters.sortBy as keyof Vehicle];
        
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }
        
        if (filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

    return {
      data: paginatedVehicles,
      pagination: {
        page,
        limit,
        total: filteredVehicles.length,
        totalPages: Math.ceil(filteredVehicles.length / limit)
      }
    };
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const veiculo = this.vehicles.find(v => v.id === id);
    if (!veiculo) {
      throw new Error('Veículo não encontrado');
    }
    return veiculo;
  }

  async createVehicle(data: CreateVehicleRequest): Promise<Vehicle> {
    const newVehicle: Vehicle = {
      id: (this.vehicles.length + 1).toString(),
      ...data,
      features: data.features || [],
      isFeatured: data.isFeatured || false,
      status: 'active',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.vehicles.push(newVehicle);
    return newVehicle;
  }

  async updateVehicle(id: string, data: UpdateVehicleRequest): Promise<Vehicle> {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Veículo não encontrado');
    }

    this.vehicles[index] = {
      ...this.vehicles[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    return this.vehicles[index];
  }

  async deleteVehicle(id: string): Promise<void> {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Veículo não encontrado');
    }

    this.vehicles.splice(index, 1);
  }

  async updateVehicleStatus(id: string, status: 'active' | 'inactive' | 'sold'): Promise<Vehicle> {
    return this.updateVehicle(id, { status: status as 'active' | 'inactive' | 'sold' });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const totalVehicles = this.vehicles.length;
    const veiculosAtivos = this.vehicles.filter(v => v.status === 'active').length;
    const veiculosVendidos = this.vehicles.filter(v => v.status === 'sold').length;
    const vendasMes = veiculosVendidos; // Simplified
    const receitaMes = this.vehicles
      .filter(v => v.status === 'sold')
      .reduce((sum, v) => sum + v.price, 0);

    // Top marcas
    const marcasCount = this.vehicles.reduce((acc, v) => {
      acc[v.brand] = (acc[v.brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topMarcas = Object.entries(marcasCount)
      .map(([marca, quantidade]) => ({ marca, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);

    // Vendas por mês (simplified)
    const vendasPorMes = [
      { mes: 'Jan', vendas: 2, receita: 150000 },
      { mes: 'Fev', vendas: 1, receita: 75000 },
      { mes: 'Mar', vendas: 3, receita: 200000 }
    ];

    return {
      totalVehicles,
      veiculosAtivos,
      veiculosVendidos,
      vendasMes,
      receitaMes,
      topMarcas,
      vendasPorMes
    };
  }

  async getVehiclesBySeller(sellerId: string, filters: Omit<VehicleFilters, 'sellerId'> = {}): Promise<PaginatedResponse<Vehicle>> {
    const sellerFilters = { ...filters, sellerId };
    return this.getVehicles(sellerFilters);
  }

  async searchVehicles(query: string, filters: Omit<VehicleFilters, 'search'> = {}): Promise<PaginatedResponse<Vehicle>> {
    let filteredVehicles = this.vehicles.filter(v => 
      v.brand.toLowerCase().includes(query.toLowerCase()) ||
      v.vehicleModel.toLowerCase().includes(query.toLowerCase()) ||
      v.description?.toLowerCase().includes(query.toLowerCase())
    );

    // Apply other filters
    if (filters.yearMin) {
      filteredVehicles = filteredVehicles.filter(v => v.year >= filters.yearMin!);
    }

    if (filters.yearMax) {
      filteredVehicles = filteredVehicles.filter(v => v.year <= filters.yearMax!);
    }

    if (filters.priceMin) {
      filteredVehicles = filteredVehicles.filter(v => v.price >= filters.priceMin!);
    }

    if (filters.priceMax) {
      filteredVehicles = filteredVehicles.filter(v => v.price <= filters.priceMax!);
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

    return {
      data: paginatedVehicles,
      pagination: {
        page,
        limit,
        total: filteredVehicles.length,
        totalPages: Math.ceil(filteredVehicles.length / limit)
      }
    };
  }
}

export const mockVehicleService = new MockVehicleService();
