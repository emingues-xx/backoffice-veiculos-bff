import Joi from 'joi';

export const createVehicleSchema = Joi.object({
  brand: Joi.string().required().min(2).max(50),
  model: Joi.string().required().min(2).max(50),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
  price: Joi.number().positive().required(),
  mileage: Joi.number().integer().min(0).required(),
  fuel: Joi.string().valid('gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido').required(),
  color: Joi.string().required().min(2).max(30),
  transmission: Joi.string().valid('manual', 'automatico').required(),
  category: Joi.string().valid('carro', 'moto', 'caminhao', 'onibus').required(),
  description: Joi.string().max(1000).optional(),
  images: Joi.array().items(Joi.string().uri()).max(10).optional()
});

export const updateVehicleSchema = Joi.object({
  brand: Joi.string().min(2).max(50).optional(),
  model: Joi.string().min(2).max(50).optional(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
  price: Joi.number().positive().optional(),
  mileage: Joi.number().integer().min(0).optional(),
  fuel: Joi.string().valid('gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido').optional(),
  color: Joi.string().min(2).max(30).optional(),
  transmission: Joi.string().valid('manual', 'automatico').optional(),
  category: Joi.string().valid('carro', 'moto', 'caminhao', 'onibus').optional(),
  status: Joi.string().valid('ativo', 'inativo', 'vendido').optional(),
  description: Joi.string().max(1000).optional(),
  images: Joi.array().items(Joi.string().uri()).max(10).optional()
});

export const vehicleFiltersSchema = Joi.object({
  brand: Joi.string().optional(),
  model: Joi.string().optional(),
  yearMin: Joi.number().integer().min(1900).optional(),
  yearMax: Joi.number().integer().max(new Date().getFullYear() + 1).optional(),
  priceMin: Joi.number().positive().optional(),
  priceMax: Joi.number().positive().optional(),
  fuel: Joi.string().valid('gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido').optional(),
  category: Joi.string().valid('carro', 'moto', 'caminhao', 'onibus').optional(),
  status: Joi.string().valid('ativo', 'inativo', 'vendido').optional(),
  sellerId: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
  sortBy: Joi.string().valid('price', 'year', 'mileage', 'createdAt').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

export const vehicleIdSchema = Joi.object({
  id: Joi.string().required()
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('ativo', 'inativo', 'vendido').required()
});

export const searchSchema = Joi.object({
  q: Joi.string().min(2).max(100).required()
});
