export interface Vehicle {
  id: string;
  brand: string;
  vehicleModel: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'gasoline' | 'ethanol' | 'diesel' | 'electric' | 'hybrid';
  color: string;
  transmission: 'manual' | 'automatic';
  doors?: number;
  category: 'car' | 'motorcycle' | 'truck' | 'van';
  condition?: 'new' | 'used';
  status: 'active' | 'inactive' | 'sold';
  description: string;
  images: string[];
  features?: string[];
  location?: {
    city: string;
    state: string;
    zipCode: string;
  };
  seller?: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  isFeatured?: boolean;
  views?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleRequest {
  brand: string;
  vehicleModel: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'gasoline' | 'ethanol' | 'diesel' | 'electric' | 'hybrid';
  color: string;
  transmission: 'manual' | 'automatic';
  doors: number;
  category: 'car' | 'motorcycle' | 'truck' | 'van';
  condition: 'new' | 'used';
  description: string;
  images: string[];
  features?: string[];
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  seller: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  isFeatured?: boolean;
}

export interface UpdateVehicleRequest {
  brand?: string;
  vehicleModel?: string;
  year?: number;
  price?: number;
  mileage?: number;
  fuelType?: 'gasoline' | 'ethanol' | 'diesel' | 'electric' | 'hybrid';
  color?: string;
  transmission?: 'manual' | 'automatic';
  doors?: number;
  category?: 'car' | 'motorcycle' | 'truck' | 'van';
  condition?: 'new' | 'used';
  status?: 'active' | 'inactive' | 'sold';
  description?: string;
  images?: string[];
  features?: string[];
  location?: {
    city: string;
    state: string;
    zipCode: string;
  };
  seller?: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  isFeatured?: boolean;
}

export interface VehicleFilters {
  brand?: string;
  vehicleModel?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  fuelType?: string;
  category?: string;
  condition?: string;
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

// Sales interfaces
export interface Sale {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle;
  buyer: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
  sellerId: string;
  seller?: {
    id: string;
    name: string;
    email: string;
  };
  salePrice: number;
  commission: number;
  paymentMethod: 'cash' | 'financing' | 'trade-in';
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
  saleDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSaleRequest {
  vehicleId: string;
  buyer: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
  salePrice: number;
  commission?: number;
  paymentMethod: 'cash' | 'financing' | 'trade-in';
  notes?: string;
}

export interface UpdateSaleRequest {
  status?: 'pending' | 'completed' | 'cancelled';
  salePrice?: number;
  commission?: number;
  paymentMethod?: 'cash' | 'financing' | 'trade-in';
  notes?: string;
}

export interface SaleFilters {
  status?: 'pending' | 'completed' | 'cancelled';
  paymentMethod?: 'cash' | 'financing' | 'trade-in';
  dateFrom?: string;
  dateTo?: string;
  sellerId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SaleStats {
  totalSales: number;
  totalRevenue: number;
  pendingSales: number;
  completedSales: number;
  cancelledSales: number;
  averageSalePrice: number;
  salesByMonth: Array<{ month: string; sales: number; revenue: number }>;
  salesByPaymentMethod: Array<{ method: string; count: number; revenue: number }>;
}
