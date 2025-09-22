import { 
  Veiculo, 
  CreateVeiculoRequest, 
  UpdateVeiculoRequest, 
  VeiculoFilters, 
  PaginatedResponse,
  DashboardStats 
} from '../types';

export class MockVeiculoService {
  private veiculos: Veiculo[] = [
    {
      id: '1',
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2022,
      preco: 85000,
      quilometragem: 0,
      combustivel: 'flex',
      cor: 'Branco',
      cambio: 'automatico',
      categoria: 'carro',
      status: 'ativo',
      descricao: 'Veículo seminovo em excelente estado',
      imagens: ['https://example.com/corolla1.jpg'],
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      vendedorId: '68d17845a08df9f982e3397a'
    },
    {
      id: '2',
      marca: 'Honda',
      modelo: 'Civic',
      ano: 2021,
      preco: 75000,
      quilometragem: 15000,
      combustivel: 'flex',
      cor: 'Prata',
      cambio: 'automatico',
      categoria: 'carro',
      status: 'ativo',
      descricao: 'Civic com baixa quilometragem',
      imagens: ['https://example.com/civic1.jpg'],
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      vendedorId: '68d17845a08df9f982e3397a'
    },
    {
      id: '3',
      marca: 'Volkswagen',
      modelo: 'Golf',
      ano: 2020,
      preco: 65000,
      quilometragem: 25000,
      combustivel: 'gasolina',
      cor: 'Azul',
      cambio: 'manual',
      categoria: 'carro',
      status: 'vendido',
      descricao: 'Golf bem conservado',
      imagens: ['https://example.com/golf1.jpg'],
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      vendedorId: '68d17845a08df9f982e3397a'
    }
  ];

  async getVeiculos(filters: VeiculoFilters = {}): Promise<PaginatedResponse<Veiculo>> {
    let filteredVeiculos = [...this.veiculos];

    // Apply filters
    if (filters.marca) {
      filteredVeiculos = filteredVeiculos.filter(v => 
        v.marca.toLowerCase().includes(filters.marca!.toLowerCase())
      );
    }

    if (filters.modelo) {
      filteredVeiculos = filteredVeiculos.filter(v => 
        v.modelo.toLowerCase().includes(filters.modelo!.toLowerCase())
      );
    }

    if (filters.anoMin) {
      filteredVeiculos = filteredVeiculos.filter(v => v.ano >= filters.anoMin!);
    }

    if (filters.anoMax) {
      filteredVeiculos = filteredVeiculos.filter(v => v.ano <= filters.anoMax!);
    }

    if (filters.precoMin) {
      filteredVeiculos = filteredVeiculos.filter(v => v.preco >= filters.precoMin!);
    }

    if (filters.precoMax) {
      filteredVeiculos = filteredVeiculos.filter(v => v.preco <= filters.precoMax!);
    }

    if (filters.combustivel) {
      filteredVeiculos = filteredVeiculos.filter(v => v.combustivel === filters.combustivel);
    }

    if (filters.categoria) {
      filteredVeiculos = filteredVeiculos.filter(v => v.categoria === filters.categoria);
    }

    if (filters.status) {
      filteredVeiculos = filteredVeiculos.filter(v => v.status === filters.status);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredVeiculos.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof Veiculo];
        const bValue = b[filters.sortBy as keyof Veiculo];
        
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
    const paginatedVeiculos = filteredVeiculos.slice(startIndex, endIndex);

    return {
      data: paginatedVeiculos,
      pagination: {
        page,
        limit,
        total: filteredVeiculos.length,
        totalPages: Math.ceil(filteredVeiculos.length / limit)
      }
    };
  }

  async getVeiculoById(id: string): Promise<Veiculo> {
    const veiculo = this.veiculos.find(v => v.id === id);
    if (!veiculo) {
      throw new Error('Veículo não encontrado');
    }
    return veiculo;
  }

  async createVeiculo(data: CreateVeiculoRequest): Promise<Veiculo> {
    const newVeiculo: Veiculo = {
      id: (this.veiculos.length + 1).toString(),
      ...data,
      status: 'ativo',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      vendedorId: '68d17845a08df9f982e3397a'
    };

    this.veiculos.push(newVeiculo);
    return newVeiculo;
  }

  async updateVeiculo(id: string, data: UpdateVeiculoRequest): Promise<Veiculo> {
    const index = this.veiculos.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Veículo não encontrado');
    }

    this.veiculos[index] = {
      ...this.veiculos[index],
      ...data,
      dataAtualizacao: new Date().toISOString()
    };

    return this.veiculos[index];
  }

  async deleteVeiculo(id: string): Promise<void> {
    const index = this.veiculos.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Veículo não encontrado');
    }

    this.veiculos.splice(index, 1);
  }

  async updateVeiculoStatus(id: string, status: 'ativo' | 'inativo' | 'vendido'): Promise<Veiculo> {
    return this.updateVeiculo(id, { status });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const totalVeiculos = this.veiculos.length;
    const veiculosAtivos = this.veiculos.filter(v => v.status === 'ativo').length;
    const veiculosVendidos = this.veiculos.filter(v => v.status === 'vendido').length;
    const vendasMes = veiculosVendidos; // Simplified
    const receitaMes = this.veiculos
      .filter(v => v.status === 'vendido')
      .reduce((sum, v) => sum + v.preco, 0);

    // Top marcas
    const marcasCount = this.veiculos.reduce((acc, v) => {
      acc[v.marca] = (acc[v.marca] || 0) + 1;
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

  async getVeiculosByVendedor(vendedorId: string, filters: Omit<VeiculoFilters, 'vendedorId'> = {}): Promise<PaginatedResponse<Veiculo>> {
    const vendedorFilters = { ...filters, vendedorId };
    return this.getVeiculos(vendedorFilters);
  }

  async searchVeiculos(query: string, filters: Omit<VeiculoFilters, 'search'> = {}): Promise<PaginatedResponse<Veiculo>> {
    let filteredVeiculos = this.veiculos.filter(v => 
      v.marca.toLowerCase().includes(query.toLowerCase()) ||
      v.modelo.toLowerCase().includes(query.toLowerCase()) ||
      v.descricao?.toLowerCase().includes(query.toLowerCase())
    );

    // Apply other filters
    if (filters.anoMin) {
      filteredVeiculos = filteredVeiculos.filter(v => v.ano >= filters.anoMin!);
    }

    if (filters.anoMax) {
      filteredVeiculos = filteredVeiculos.filter(v => v.ano <= filters.anoMax!);
    }

    if (filters.precoMin) {
      filteredVeiculos = filteredVeiculos.filter(v => v.preco >= filters.precoMin!);
    }

    if (filters.precoMax) {
      filteredVeiculos = filteredVeiculos.filter(v => v.preco <= filters.precoMax!);
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVeiculos = filteredVeiculos.slice(startIndex, endIndex);

    return {
      data: paginatedVeiculos,
      pagination: {
        page,
        limit,
        total: filteredVeiculos.length,
        totalPages: Math.ceil(filteredVeiculos.length / limit)
      }
    };
  }
}

export const mockVeiculoService = new MockVeiculoService();
