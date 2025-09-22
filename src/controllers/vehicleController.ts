import { Request, Response, NextFunction } from 'express';
import { vehicleService } from '../services/vehicleService';
import { mockVehicleService } from '../services/mockVehicleService';
import { VehicleFilters, CreateVehicleRequest, UpdateVehicleRequest } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';
import { config } from '../config';

// Use mock service only in test environment
const service = config.nodeEnv === 'test' ? mockVehicleService : vehicleService;

export class VehicleController {
  async getVehicles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: VehicleFilters = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        yearMin: req.query.yearMin ? parseInt(req.query.yearMin as string, 10) : undefined,
        yearMax: req.query.yearMax ? parseInt(req.query.yearMax as string, 10) : undefined,
        priceMin: req.query.priceMin ? parseFloat(req.query.priceMin as string) : undefined,
        priceMax: req.query.priceMax ? parseFloat(req.query.priceMax as string) : undefined,
      };

      const result = await service.getVehicles(filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getVehicleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const vehicle = await service.getVehicleById(id);
      
      res.json({
        success: true,
        data: vehicle
      });
    } catch (error) {
      next(error);
    }
  }

  async createVehicle(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const vehicleData: CreateVehicleRequest = req.body;
      const vehicle = await service.createVehicle(vehicleData);
      
      res.status(201).json({
        success: true,
        data: vehicle,
        message: 'Veículo criado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVehicle(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateVehicleRequest = req.body;
      const vehicle = await service.updateVehicle(id, updateData);
      
      res.json({
        success: true,
        data: vehicle,
        message: 'Veículo atualizado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteVehicle(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await service.deleteVehicle(id);
      
      res.json({
        success: true,
        message: 'Veículo removido com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVehicleStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const vehicle = await service.updateVehicleStatus(id, status);
      
      res.json({
        success: true,
        data: vehicle,
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

  async getVehiclesBySeller(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sellerId } = req.params;
      const filters: Omit<VehicleFilters, 'sellerId'> = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        yearMin: req.query.yearMin ? parseInt(req.query.yearMin as string, 10) : undefined,
        yearMax: req.query.yearMax ? parseInt(req.query.yearMax as string, 10) : undefined,
        priceMin: req.query.priceMin ? parseFloat(req.query.priceMin as string) : undefined,
        priceMax: req.query.priceMax ? parseFloat(req.query.priceMax as string) : undefined,
      };

      const result = await service.getVehiclesBySeller(sellerId, filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async searchVehicles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q } = req.query;
      const filters: Omit<VehicleFilters, 'search'> = {
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        yearMin: req.query.yearMin ? parseInt(req.query.yearMin as string, 10) : undefined,
        yearMax: req.query.yearMax ? parseInt(req.query.yearMax as string, 10) : undefined,
        priceMin: req.query.priceMin ? parseFloat(req.query.priceMin as string) : undefined,
        priceMax: req.query.priceMax ? parseFloat(req.query.priceMax as string) : undefined,
      };

      const result = await service.searchVehicles(q as string, filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

export const vehicleController = new VehicleController();
