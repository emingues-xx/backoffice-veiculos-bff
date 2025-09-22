import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config';
import { createError } from '../middleware/errorHandler';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any request modifications here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          const message = error.response.data?.message || error.response.data?.error || 'Erro na API';
          
          throw createError(message, status);
        } else if (error.request) {
          // Request was made but no response received
          throw createError('Serviço indisponível', 503);
        } else {
          // Something else happened
          throw createError('Erro interno', 500);
        }
      }
    );
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  public async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  public setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthToken(): void {
    delete this.client.defaults.headers.common['Authorization'];
  }
}

export const apiClient = new ApiClient();
