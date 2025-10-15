import { apiClient } from './apiClient';
import { 
  MetricsFilters, 
  RevenueMetrics, 
  SalesByDayMetrics, 
  TopSellersMetrics, 
  TotalSalesMetrics 
} from '../types';
import { config } from '../config';

class MetricsService {
  private baseUrl = config.api.baseUrl;

  async getRevenueMetrics(filters: MetricsFilters): Promise<RevenueMetrics> {
    const params = new URLSearchParams();

    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.period) params.append('period', filters.period);
    if (filters.sellerId) params.append('sellerId', filters.sellerId);

    const response = await apiClient.get<RevenueMetrics>(`${this.baseUrl}/api/metrics/revenue?${params.toString()}`);
    return response;
  }

  async getSalesByDayMetrics(filters: MetricsFilters): Promise<SalesByDayMetrics> {
    const params = new URLSearchParams();

    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.period) params.append('period', filters.period);
    if (filters.sellerId) params.append('sellerId', filters.sellerId);

    const response = await apiClient.get<SalesByDayMetrics>(`${this.baseUrl}/api/metrics/sales-by-day?${params.toString()}`);
    return response;
  }

  async getTopSellersMetrics(filters: MetricsFilters): Promise<TopSellersMetrics> {
    const params = new URLSearchParams();

    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.period) params.append('period', filters.period);
    if (filters.sellerId) params.append('sellerId', filters.sellerId);

    const response = await apiClient.get<TopSellersMetrics>(`${this.baseUrl}/api/metrics/top-sellers?${params.toString()}`);
    return response;
  }

  async getTotalSalesMetrics(filters: MetricsFilters): Promise<TotalSalesMetrics> {
    const params = new URLSearchParams();

    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.period) params.append('period', filters.period);
    if (filters.sellerId) params.append('sellerId', filters.sellerId);

    const response = await apiClient.get<TotalSalesMetrics>(`${this.baseUrl}/api/metrics/total-sales?${params.toString()}`);
    return response;
  }
}

export const metricsService = new MetricsService();
