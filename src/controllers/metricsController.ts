import { Request, Response, NextFunction } from 'express';
import { metricsService } from '../services/metricsService';
import { MetricsFilters } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';
import { apiClient } from '../services/apiClient';

export class MetricsController {
  async getRevenueMetrics(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: MetricsFilters = {
        ...req.query,
      };

      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }

      const metrics = await metricsService.getRevenueMetrics(filters);

      res.json({
        success: true,
        data: metrics
      });
    } catch (error) {
      next(error);
    }
  }

  async getSalesByDayMetrics(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: MetricsFilters = {
        ...req.query,
      };

      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }

      const metrics = await metricsService.getSalesByDayMetrics(filters);

      res.json({
        success: true,
        data: metrics
      });
    } catch (error) {
      next(error);
    }
  }

  async getTopSellersMetrics(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: MetricsFilters = {
        ...req.query,
      };

      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }

      const metrics = await metricsService.getTopSellersMetrics(filters);

      res.json({
        success: true,
        data: metrics
      });
    } catch (error) {
      next(error);
    }
  }

  async getTotalSalesMetrics(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: MetricsFilters = {
        ...req.query,
      };

      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }

      const metrics = await metricsService.getTotalSalesMetrics(filters);

      res.json({
        success: true,
        data: metrics
      });
    } catch (error) {
      next(error);
    }
  }
}

export const metricsController = new MetricsController();
