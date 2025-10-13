import Joi from 'joi';

export const createVehicleSchema = Joi.object({
  brand: Joi.string().required().min(2).max(50),
  vehicleModel: Joi.string().required().min(2).max(50),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
  price: Joi.number().positive().required(),
  mileage: Joi.number().integer().min(0).required(),
  fuelType: Joi.string().valid('gasoline', 'ethanol', 'diesel', 'electric', 'hybrid').required(),
  color: Joi.string().required().min(2).max(30),
  transmission: Joi.string().valid('manual', 'automatic').required(),
  doors: Joi.number().integer().min(2).max(6).required(),
  category: Joi.string().valid('car', 'motorcycle', 'truck', 'van').required(),
  condition: Joi.string().valid('new', 'used').required(),
  description: Joi.string().required().min(10).max(2000),
  images: Joi.array().items(Joi.string().uri()).min(1).max(10).required(),
  features: Joi.array().items(Joi.string().max(100)).max(20).optional().default([]),
  location: Joi.object({
    city: Joi.string().required().min(2).max(50),
    state: Joi.string().required().min(2).max(50),
    zipCode: Joi.string().required().pattern(/^\d{5}-?\d{3}$/)
  }).required(),
  seller: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required().min(2).max(50),
    phone: Joi.string().required().pattern(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/),
    email: Joi.string().email().required()
  }).required(),
  isFeatured: Joi.boolean().optional().default(false)
});

export const updateVehicleSchema = Joi.object({
  brand: Joi.string().min(2).max(50).optional(),
  vehicleModel: Joi.string().min(2).max(50).optional(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
  price: Joi.number().positive().optional(),
  mileage: Joi.number().integer().min(0).optional(),
  fuelType: Joi.string().valid('gasoline', 'ethanol', 'diesel', 'electric', 'hybrid').optional(),
  color: Joi.string().min(2).max(30).optional(),
  transmission: Joi.string().valid('manual', 'automatic').optional(),
  doors: Joi.number().integer().min(2).max(6).optional(),
  category: Joi.string().valid('car', 'motorcycle', 'truck', 'van').optional(),
  condition: Joi.string().valid('new', 'used').optional(),
  status: Joi.string().valid('active', 'inactive', 'sold').optional(),
  description: Joi.string().min(10).max(2000).optional(),
  images: Joi.array().items(Joi.string().uri()).min(1).max(10).optional(),
  features: Joi.array().items(Joi.string().max(100)).max(20).optional(),
  location: Joi.object({
    city: Joi.string().min(2).max(50).optional(),
    state: Joi.string().min(2).max(50).optional(),
    zipCode: Joi.string().pattern(/^\d{5}-?\d{3}$/).optional()
  }).optional(),
  seller: Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().min(2).max(50).optional(),
    phone: Joi.string().pattern(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/).optional(),
    email: Joi.string().email().optional()
  }).optional(),
  isFeatured: Joi.boolean().optional()
});

export const vehicleFiltersSchema = Joi.object({
  brand: Joi.string().optional(),
  vehicleModel: Joi.string().optional(),
  yearMin: Joi.number().integer().min(1900).optional(),
  yearMax: Joi.number().integer().max(new Date().getFullYear() + 1).optional(),
  priceMin: Joi.number().positive().optional(),
  priceMax: Joi.number().positive().optional(),
  fuelType: Joi.string().valid('gasoline', 'ethanol', 'diesel', 'electric', 'hybrid').optional(),
  category: Joi.string().valid('car', 'motorcycle', 'truck', 'van').optional(),
  condition: Joi.string().valid('new', 'used').optional(),
  status: Joi.string().valid('active', 'inactive', 'sold').optional(),
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
  status: Joi.string().valid('active', 'inactive', 'sold').required()
});

export const searchSchema = Joi.object({
  q: Joi.string().min(2).max(100).required()
});
