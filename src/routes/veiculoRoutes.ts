import { Router } from 'express';
import Joi from 'joi';
import { veiculoController } from '../controllers/veiculoController';
import { authenticateToken, requireRole } from '../middleware/auth';
import { 
  validateRequest, 
  validateQuery, 
  validateParams 
} from '../middleware/validation';
import {
  createVeiculoSchema,
  updateVeiculoSchema,
  veiculoFiltersSchema,
  veiculoIdSchema,
  updateStatusSchema,
  searchSchema
} from '../validators/veiculoValidators';

const router = Router();

// Public routes (no authentication required)
router.get(
  '/',
  validateQuery(veiculoFiltersSchema),
  veiculoController.getVeiculos
);

router.get(
  '/search',
  validateQuery(searchSchema),
  veiculoController.searchVeiculos
);

router.get(
  '/:id',
  validateParams(veiculoIdSchema),
  veiculoController.getVeiculoById
);

// Protected routes (authentication required)
router.use(authenticateToken);

// Admin only routes
router.post(
  '/',
  requireRole(['admin', 'vendedor']),
  validateRequest(createVeiculoSchema),
  veiculoController.createVeiculo
);

router.put(
  '/:id',
  requireRole(['admin', 'vendedor']),
  validateParams(veiculoIdSchema),
  validateRequest(updateVeiculoSchema),
  veiculoController.updateVeiculo
);

router.delete(
  '/:id',
  requireRole(['admin']),
  validateParams(veiculoIdSchema),
  veiculoController.deleteVeiculo
);

router.patch(
  '/:id/status',
  requireRole(['admin', 'vendedor']),
  validateParams(veiculoIdSchema),
  validateRequest(updateStatusSchema),
  veiculoController.updateVeiculoStatus
);

// Dashboard routes
router.get(
  '/dashboard/stats',
  requireRole(['admin', 'vendedor']),
  veiculoController.getDashboardStats
);

// Vendedor specific routes
router.get(
  '/vendedor/:vendedorId',
  requireRole(['admin', 'vendedor']),
  validateParams(Joi.object({ vendedorId: Joi.string().required() })),
  validateQuery(veiculoFiltersSchema),
  veiculoController.getVeiculosByVendedor
);

export default router;
