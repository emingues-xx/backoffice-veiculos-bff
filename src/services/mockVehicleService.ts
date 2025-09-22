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
    const totalVeiculos = this.vehicles.length;
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
      totalVeiculos,
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
