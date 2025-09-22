export interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  combustivel: 'gasolina' | 'etanol' | 'flex' | 'diesel' | 'eletrico' | 'hibrido';
  cor: string;
  cambio: 'manual' | 'automatico';
  categoria: 'carro' | 'moto' | 'caminhao' | 'onibus';
  status: 'ativo' | 'inativo' | 'vendido';
  descricao?: string;
  imagens?: string[];
  dataCriacao: string;
  dataAtualizacao: string;
  vendedorId: string;
}

export interface CreateVeiculoRequest {
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  combustivel: 'gasolina' | 'etanol' | 'flex' | 'diesel' | 'eletrico' | 'hibrido';
  cor: string;
  cambio: 'manual' | 'automatico';
  categoria: 'carro' | 'moto' | 'caminhao' | 'onibus';
  descricao?: string;
  imagens?: string[];
}

export interface UpdateVeiculoRequest {
  marca?: string;
  modelo?: string;
  ano?: number;
  preco?: number;
  quilometragem?: number;
  combustivel?: 'gasolina' | 'etanol' | 'flex' | 'diesel' | 'eletrico' | 'hibrido';
  cor?: string;
  cambio?: 'manual' | 'automatico';
  categoria?: 'carro' | 'moto' | 'caminhao' | 'onibus';
  status?: 'ativo' | 'inativo' | 'vendido';
  descricao?: string;
  imagens?: string[];
}

export interface VeiculoFilters {
  marca?: string;
  modelo?: string;
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  combustivel?: string;
  categoria?: string;
  status?: string;
  vendedorId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface DashboardStats {
  totalVeiculos: number;
  veiculosAtivos: number;
  veiculosVendidos: number;
  vendasMes: number;
  receitaMes: number;
  topMarcas: Array<{ marca: string; quantidade: number }>;
  vendasPorMes: Array<{ mes: string; vendas: number; receita: number }>;
}
