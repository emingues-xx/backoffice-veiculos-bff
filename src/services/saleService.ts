import { apiClient } from './apiClient';
import { Sale, CreateSaleRequest, UpdateSaleRequest, SaleFilters, SaleStats, PaginatedResponse } from '../types';
import { config } from '../config';

class SaleService {
  private baseUrl = config.api.baseUrl;

  async getSales(filters: SaleFilters): Promise<PaginatedResponse<Sale>> {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);
    if (filters.sellerId) params.append('sellerId', filters.sellerId);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await apiClient.get(`${this.baseUrl}/api/sales?${params.toString()}`);
    return response.data;
  }

  async getSaleById(id: string): Promise<Sale> {
    const response = await apiClient.get(`${this.baseUrl}/api/sales/${id}`);
    return response.data;
  }

  async createSale(saleData: CreateSaleRequest): Promise<Sale> {
    const response = await apiClient.post(`${this.baseUrl}/api/sales`, saleData);
    return response.data;
  }

  async updateSale(id: string, updateData: UpdateSaleRequest): Promise<Sale> {
    const response = await apiClient.put(`${this.baseUrl}/api/sales/${id}`, updateData);
    return response.data;
  }

  async deleteSale(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/api/sales/${id}`);
  }

  async getSaleStats(): Promise<SaleStats> {
    const response = await apiClient.get(`${this.baseUrl}/api/sales/stats`);
    return response.data;
  }

  async getSalesBySeller(sellerId: string, filters: Omit<SaleFilters, 'sellerId'>): Promise<PaginatedResponse<Sale>> {
    const params = new URLSearchParams();
    
    params.append('sellerId', sellerId);
    if (filters.status) params.append('status', filters.status);
    if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await apiClient.get(`${this.baseUrl}/api/sales?${params.toString()}`);
    return response.data;
  }
}

export const saleService = new SaleService();
