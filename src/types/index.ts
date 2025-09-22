export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: 'gasolina' | 'etanol' | 'flex' | 'diesel' | 'eletrico' | 'hibrido';
  color: string;
  transmission: 'manual' | 'automatico';
  category: 'carro' | 'moto' | 'caminhao' | 'onibus' | 'van';
  status: 'ativo' | 'inativo' | 'vendido';
  description?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  sellerId: string;
}

export interface CreateVehicleRequest {
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: 'gasolina' | 'etanol' | 'flex' | 'diesel' | 'eletrico' | 'hibrido';
  color: string;
  transmission: 'manual' | 'automatico';
  category: 'carro' | 'moto' | 'caminhao' | 'onibus' | 'van';
  description?: string;
  images?: string[];
}

export interface UpdateVehicleRequest {
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  fuel?: 'gasolina' | 'etanol' | 'flex' | 'diesel' | 'eletrico' | 'hibrido';
  color?: string;
  transmission?: 'manual' | 'automatico';
  category?: 'carro' | 'moto' | 'caminhao' | 'onibus';
  status?: 'ativo' | 'inativo' | 'vendido';
  description?: string;
  images?: string[];
}

export interface VehicleFilters {
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  fuel?: string;
  category?: string;
  status?: string;
  sellerId?: string;
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
  totalVehicles: number;
  veiculosAtivos: number;
  veiculosVendidos: number;
  vendasMes: number;
  receitaMes: number;
  topMarcas: Array<{ marca: string; quantidade: number }>;
  vendasPorMes: Array<{ mes: string; vendas: number; receita: number }>;
}
