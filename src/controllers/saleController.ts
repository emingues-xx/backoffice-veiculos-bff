import { Request, Response, NextFunction } from 'express';
import { saleService } from '../services/saleService';
import { SaleFilters, CreateSaleRequest, UpdateSaleRequest } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';
import { apiClient } from '../services/apiClient';

export class SaleController {
  async getSales(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: SaleFilters = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
      };

      const result = await saleService.getSales(filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getSaleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const sale = await saleService.getSaleById(id);
      
      res.json({
        success: true,
        data: sale
      });
    } catch (error) {
      next(error);
    }
  }

  async createSale(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const saleData: CreateSaleRequest = req.body;
      
      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }
      
      const sale = await saleService.createSale(saleData);
      
      res.status(201).json({
        success: true,
        data: sale,
        message: 'Venda criada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSale(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateSaleRequest = req.body;
      
      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }
      
      const sale = await saleService.updateSale(id, updateData);
      
      res.json({
        success: true,
        data: sale,
        message: 'Venda atualizada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSale(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }
      
      await saleService.deleteSale(id);
      
      res.json({
        success: true,
        message: 'Venda removida com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async getSaleStats(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }
      
      const stats = await saleService.getSaleStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }

  async getMySales(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado'
        });
        return;
      }

      const filters: Omit<SaleFilters, 'sellerId'> = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
      };

      // Configure authentication token for API calls
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        apiClient.setAuthToken(authHeader.split(' ')[1]);
      }

      const result = await saleService.getSalesBySeller(userId, filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

export const saleController = new SaleController();
