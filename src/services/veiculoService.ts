import { apiClient } from './apiClient';
import { 
  Veiculo, 
  CreateVeiculoRequest, 
  UpdateVeiculoRequest, 
  VeiculoFilters, 
  PaginatedResponse,
  DashboardStats 
} from '../types';

export class VeiculoService {
  private readonly basePath = '/api/veiculos';

  async getVeiculos(filters: VeiculoFilters = {}): Promise<PaginatedResponse<Veiculo>> {
    return apiClient.get<PaginatedResponse<Veiculo>>(this.basePath, filters);
  }

  async getVeiculoById(id: string): Promise<Veiculo> {
    return apiClient.get<Veiculo>(`${this.basePath}/${id}`);
  }

  async createVeiculo(data: CreateVeiculoRequest): Promise<Veiculo> {
    return apiClient.post<Veiculo>(this.basePath, data);
  }

  async updateVeiculo(id: string, data: UpdateVeiculoRequest): Promise<Veiculo> {
    return apiClient.put<Veiculo>(`${this.basePath}/${id}`, data);
  }

  async deleteVeiculo(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async updateVeiculoStatus(id: string, status: 'ativo' | 'inativo' | 'vendido'): Promise<Veiculo> {
    return apiClient.patch<Veiculo>(`${this.basePath}/${id}/status`, { status });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(`${this.basePath}/dashboard/stats`);
  }

  async getVeiculosByVendedor(vendedorId: string, filters: Omit<VeiculoFilters, 'vendedorId'> = {}): Promise<PaginatedResponse<Veiculo>> {
    return apiClient.get<PaginatedResponse<Veiculo>>(`${this.basePath}/vendedor/${vendedorId}`, filters);
  }

  async searchVeiculos(query: string, filters: Omit<VeiculoFilters, 'search'> = {}): Promise<PaginatedResponse<Veiculo>> {
    return apiClient.get<PaginatedResponse<Veiculo>>(`${this.basePath}/search`, { 
      ...filters, 
      q: query 
    });
  }
}

export const veiculoService = new VeiculoService();
