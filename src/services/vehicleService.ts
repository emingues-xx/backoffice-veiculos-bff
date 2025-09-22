import { apiClient } from './apiClient';
import { 
  Vehicle, 
  CreateVehicleRequest, 
  UpdateVehicleRequest, 
  VehicleFilters, 
  PaginatedResponse,
  DashboardStats 
} from '../types';

export class VehicleService {
  private readonly basePath = '/api/vehicles';

  async getVehicles(filters: VehicleFilters = {}): Promise<PaginatedResponse<Vehicle>> {
    return apiClient.get<PaginatedResponse<Vehicle>>(this.basePath, filters);
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    return apiClient.get<Vehicle>(`${this.basePath}/${id}`);
  }

  async createVehicle(data: CreateVehicleRequest): Promise<Vehicle> {
    return apiClient.post<Vehicle>(this.basePath, data);
  }

  async updateVehicle(id: string, data: UpdateVehicleRequest): Promise<Vehicle> {
    return apiClient.put<Vehicle>(`${this.basePath}/${id}`, data);
  }

  async deleteVehicle(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async updateVehicleStatus(id: string, status: 'ativo' | 'inativo' | 'vendido'): Promise<Vehicle> {
    return apiClient.patch<Vehicle>(`${this.basePath}/${id}/status`, { status });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(`${this.basePath}/dashboard/stats`);
  }

  async getVehiclesBySeller(sellerId: string, filters: Omit<VehicleFilters, 'sellerId'> = {}): Promise<PaginatedResponse<Vehicle>> {
    return apiClient.get<PaginatedResponse<Vehicle>>(`${this.basePath}/seller/${sellerId}`, filters);
  }

  async searchVehicles(query: string, filters: Omit<VehicleFilters, 'search'> = {}): Promise<PaginatedResponse<Vehicle>> {
    return apiClient.get<PaginatedResponse<Vehicle>>(`${this.basePath}/search`, { 
      ...filters, 
      q: query 
    });
  }
}

export const vehicleService = new VehicleService();
