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
      model: 'Corolla',
      year: 2022,
      price: 85000,
      mileage: 0,
      fuel: 'flex',
      color: 'Branco',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Veículo seminovo em excelente estado',
      images: ['https://example.com/corolla1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '2',
      brand: 'Honda',
      model: 'Civic',
      year: 2021,
      price: 75000,
      mileage: 15000,
      fuel: 'flex',
      color: 'Prata',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Civic com baixa quilometragem',
      images: ['https://example.com/civic1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '3',
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2020,
      price: 65000,
      mileage: 25000,
      fuel: 'gasolina',
      color: 'Azul',
      transmission: 'manual',
      category: 'carro',
      status: 'vendido',
      description: 'Golf bem conservado',
      images: ['https://example.com/golf1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '4',
      brand: 'Ford',
      model: 'Focus',
      year: 2019,
      price: 55000,
      mileage: 40000,
      fuel: 'flex',
      color: 'Preto',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Focus com histórico de manutenção completo',
      images: ['https://example.com/focus1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '5',
      brand: 'Chevrolet',
      model: 'Onix',
      year: 2023,
      price: 72000,
      mileage: 5000,
      fuel: 'flex',
      color: 'Vermelho',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Onix zero quilômetro, único dono',
      images: ['https://example.com/onix1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '6',
      brand: 'Fiat',
      model: 'Argo',
      year: 2021,
      price: 65000,
      mileage: 20000,
      fuel: 'flex',
      color: 'Branco',
      transmission: 'manual',
      category: 'carro',
      status: 'ativo',
      description: 'Argo com poucos quilômetros rodados',
      images: ['https://example.com/argo1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '7',
      brand: 'Hyundai',
      model: 'HB20',
      year: 2022,
      price: 78000,
      mileage: 10000,
      fuel: 'flex',
      color: 'Prata',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'HB20 seminovo, bem conservado',
      images: ['https://example.com/hb20_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '8',
      brand: 'Nissan',
      model: 'Versa',
      year: 2020,
      price: 62000,
      mileage: 35000,
      fuel: 'flex',
      color: 'Cinza',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Versa com ar condicionado e direção hidráulica',
      images: ['https://example.com/versa1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '9',
      brand: 'Renault',
      model: 'Logan',
      year: 2019,
      price: 48000,
      mileage: 45000,
      fuel: 'flex',
      color: 'Branco',
      transmission: 'manual',
      category: 'carro',
      status: 'ativo',
      description: 'Logan econômico e confiável',
      images: ['https://example.com/logan1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '10',
      brand: 'Peugeot',
      model: '208',
      year: 2021,
      price: 69000,
      mileage: 18000,
      fuel: 'flex',
      color: 'Azul',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: '208 com design moderno e tecnologia',
      images: ['https://example.com/208_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '11',
      brand: 'Honda',
      model: 'CB 600F',
      year: 2020,
      price: 35000,
      mileage: 8000,
      fuel: 'gasolina',
      color: 'Vermelho',
      transmission: 'manual',
      category: 'moto',
      status: 'ativo',
      description: 'Moto esportiva em excelente estado',
      images: ['https://example.com/cb600f_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '12',
      brand: 'Yamaha',
      model: 'MT-07',
      year: 2022,
      price: 42000,
      mileage: 3000,
      fuel: 'gasolina',
      color: 'Preto',
      transmission: 'manual',
      category: 'moto',
      status: 'ativo',
      description: 'MT-07 seminova, poucos quilômetros',
      images: ['https://example.com/mt07_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '13',
      brand: 'Kawasaki',
      model: 'Ninja 650',
      year: 2021,
      price: 45000,
      mileage: 5000,
      fuel: 'gasolina',
      color: 'Verde',
      transmission: 'manual',
      category: 'moto',
      status: 'ativo',
      description: 'Ninja 650 com visual esportivo',
      images: ['https://example.com/ninja650_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '14',
      brand: 'Volkswagen',
      model: 'Delivery',
      year: 2019,
      price: 85000,
      mileage: 60000,
      fuel: 'diesel',
      color: 'Branco',
      transmission: 'manual',
      category: 'caminhao',
      status: 'ativo',
      description: 'Caminhão para carga, bem conservado',
      images: ['https://example.com/delivery1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '15',
      brand: 'Mercedes-Benz',
      model: 'Sprinter',
      year: 2020,
      price: 120000,
      mileage: 40000,
      fuel: 'diesel',
      color: 'Branco',
      transmission: 'manual',
      category: 'van',
      status: 'ativo',
      description: 'Van Mercedes para transporte de passageiros',
      images: ['https://example.com/sprinter1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '16',
      brand: 'Toyota',
      model: 'Hilux',
      year: 2022,
      price: 180000,
      mileage: 15000,
      fuel: 'diesel',
      color: 'Prata',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Hilux 4x4, ideal para trabalho e lazer',
      images: ['https://example.com/hilux1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '17',
      brand: 'Ford',
      model: 'Ranger',
      year: 2021,
      price: 160000,
      mileage: 20000,
      fuel: 'diesel',
      color: 'Azul',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Ranger com cabine dupla e 4x4',
      images: ['https://example.com/ranger1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '18',
      brand: 'Chevrolet',
      model: 'S10',
      year: 2020,
      price: 140000,
      mileage: 30000,
      fuel: 'diesel',
      color: 'Preto',
      transmission: 'manual',
      category: 'carro',
      status: 'ativo',
      description: 'S10 robusta e confiável',
      images: ['https://example.com/s10_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
    },
    {
      id: '19',
      brand: 'Volkswagen',
      model: 'Amarok',
      year: 2023,
      price: 200000,
      mileage: 8000,
      fuel: 'diesel',
      color: 'Branco',
      transmission: 'automatico',
      category: 'carro',
      status: 'ativo',
      description: 'Amarok V6, alta performance',
      images: ['https://example.com/amarok1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397b'
    },
    {
      id: '20',
      brand: 'Mercedes-Benz',
      model: 'OF-1722',
      year: 2018,
      price: 180000,
      mileage: 80000,
      fuel: 'diesel',
      color: 'Branco',
      transmission: 'manual',
      category: 'onibus',
      status: 'ativo',
      description: 'Ônibus Mercedes para transporte urbano',
      images: ['https://example.com/of1722_1.jpg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
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

    if (filters.model) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.model.toLowerCase().includes(filters.model!.toLowerCase())
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

    if (filters.fuel) {
      filteredVehicles = filteredVehicles.filter(v => v.fuel === filters.fuel);
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
      status: 'ativo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerId: '68d17845a08df9f982e3397a'
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

  async updateVehicleStatus(id: string, status: 'ativo' | 'inativo' | 'vendido'): Promise<Vehicle> {
    return this.updateVehicle(id, { status });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const totalVehicles = this.vehicles.length;
    const veiculosAtivos = this.vehicles.filter(v => v.status === 'ativo').length;
    const veiculosVendidos = this.vehicles.filter(v => v.status === 'vendido').length;
    const vendasMes = veiculosVendidos; // Simplified
    const receitaMes = this.vehicles
      .filter(v => v.status === 'vendido')
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
      v.model.toLowerCase().includes(query.toLowerCase()) ||
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
