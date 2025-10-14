import Joi from 'joi';

export const createSaleSchema = Joi.object({
  vehicleId: Joi.string().required(),
  buyer: Joi.object({
    name: Joi.string().required().min(2).max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().required().pattern(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/),
    document: Joi.string().required().min(11).max(14)
  }).required(),
  salePrice: Joi.number().positive().required(),
  commission: Joi.number().min(0).optional().default(0),
  paymentMethod: Joi.string().valid('cash', 'financing', 'trade-in').required(),
  notes: Joi.string().max(1000).optional()
});

export const updateSaleSchema = Joi.object({
  status: Joi.string().valid('pending', 'completed', 'cancelled').optional(),
  salePrice: Joi.number().positive().optional(),
  commission: Joi.number().min(0).optional(),
  paymentMethod: Joi.string().valid('cash', 'financing', 'trade-in').optional(),
  notes: Joi.string().max(1000).optional()
});

export const saleFiltersSchema = Joi.object({
  status: Joi.string().valid('pending', 'completed', 'cancelled').optional(),
  paymentMethod: Joi.string().valid('cash', 'financing', 'trade-in').optional(),
  dateFrom: Joi.string().isoDate().optional(),
  dateTo: Joi.string().isoDate().optional(),
  sellerId: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
  sortBy: Joi.string().valid('saleDate', 'salePrice', 'createdAt').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

export const saleIdSchema = Joi.object({
  id: Joi.string().required()
});
