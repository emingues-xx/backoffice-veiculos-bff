import { Request, Response, NextFunction } from 'express';
import { veiculoService } from '../services/veiculoService';
import { mockVeiculoService } from '../services/mockVeiculoService';
import { VeiculoFilters, CreateVeiculoRequest, UpdateVeiculoRequest } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';
import { config } from '../config';

// Use mock service in development and test when API is not available
const service = (config.nodeEnv === 'development' || config.nodeEnv === 'test') ? mockVeiculoService : veiculoService;

export class VeiculoController {
  async getVeiculos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: VeiculoFilters = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        anoMin: req.query.anoMin ? parseInt(req.query.anoMin as string, 10) : undefined,
        anoMax: req.query.anoMax ? parseInt(req.query.anoMax as string, 10) : undefined,
        precoMin: req.query.precoMin ? parseFloat(req.query.precoMin as string) : undefined,
        precoMax: req.query.precoMax ? parseFloat(req.query.precoMax as string) : undefined,
      };

      const result = await service.getVeiculos(filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getVeiculoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const veiculo = await service.getVeiculoById(id);
      
      res.json({
        success: true,
        data: veiculo
      });
    } catch (error) {
      next(error);
    }
  }

  async createVeiculo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const veiculoData: CreateVeiculoRequest = req.body;
      const veiculo = await service.createVeiculo(veiculoData);
      
      res.status(201).json({
        success: true,
        data: veiculo,
        message: 'Veículo criado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVeiculo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateVeiculoRequest = req.body;
      const veiculo = await service.updateVeiculo(id, updateData);
      
      res.json({
        success: true,
        data: veiculo,
        message: 'Veículo atualizado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteVeiculo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await service.deleteVeiculo(id);
      
      res.json({
        success: true,
        message: 'Veículo removido com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVeiculoStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const veiculo = await service.updateVeiculoStatus(id, status);
      
      res.json({
        success: true,
        data: veiculo,
        message: 'Status do veículo atualizado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async getDashboardStats(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await service.getDashboardStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }

  async getVeiculosByVendedor(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { vendedorId } = req.params;
      const filters: Omit<VeiculoFilters, 'vendedorId'> = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        anoMin: req.query.anoMin ? parseInt(req.query.anoMin as string, 10) : undefined,
        anoMax: req.query.anoMax ? parseInt(req.query.anoMax as string, 10) : undefined,
        precoMin: req.query.precoMin ? parseFloat(req.query.precoMin as string) : undefined,
        precoMax: req.query.precoMax ? parseFloat(req.query.precoMax as string) : undefined,
      };

      const result = await service.getVeiculosByVendedor(vendedorId, filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async searchVeiculos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q } = req.query;
      const filters: Omit<VeiculoFilters, 'search'> = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        anoMin: req.query.anoMin ? parseInt(req.query.anoMin as string, 10) : undefined,
        anoMax: req.query.anoMax ? parseInt(req.query.anoMax as string, 10) : undefined,
        precoMin: req.query.precoMin ? parseFloat(req.query.precoMin as string) : undefined,
        precoMax: req.query.precoMax ? parseFloat(req.query.precoMax as string) : undefined,
      };

      const result = await service.searchVeiculos(q as string, filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

export const veiculoController = new VeiculoController();
