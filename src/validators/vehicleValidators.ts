import Joi from 'joi';

export const createVehicleSchema = Joi.object({
  brand: Joi.string().required().min(2).max(50),
  vehicleModel: Joi.string().required().min(2).max(50),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
  price: Joi.number().positive().required(),
  mileage: Joi.number().integer().min(0).required(),
  fuelType: Joi.string().valid('gasoline', 'diesel', 'electric', 'hybrid').required(),
  color: Joi.string().required().min(2).max(30),
  transmission: Joi.string().valid('automatic', 'manual').required(),
  doors: Joi.number().integer().min(2).required(),
  category: Joi.string().valid('car', 'motorcycle', 'truck', 'van').required(),
  condition: Joi.string().valid('new', 'used').required(),
  description: Joi.string().max(1000).required(),
  images: Joi.array().items(Joi.string().uri()).max(10).required(),
  location: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required()
  }).required(),
  seller: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required()
  }).required(),
  isFeatured: Joi.boolean().required()
});

export const updateVehicleSchema = Joi.object({
  brand: Joi.string().min(2).max(50).optional(),
  vehicleModel: Joi.string().min(2).max(50).optional(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
  price: Joi.number().positive().optional(),
  mileage: Joi.number().integer().min(0).optional(),
  fuelType: Joi.string().valid('gasoline', 'diesel', 'electric', 'hybrid').optional(),
  color: Joi.string().min(2).max(30).optional(),
  transmission: Joi.string().valid('automatic', 'manual').optional(),
  doors: Joi.number().integer().min(2).optional(),
  category: Joi.string().valid('car', 'motorcycle', 'truck', 'van').optional(),
  condition: Joi.string().valid('new', 'used').optional(),
  status: Joi.string().valid('active', 'inactive', 'sold').optional(),
  description: Joi.string().max(1000).optional(),
  images: Joi.array().items(Joi.string().uri()).max(10).optional(),
  location: Joi.object({
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional()
  }).optional(),
  seller: Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional()
  }).optional(),
  isFeatured: Joi.boolean().optional()
});

export const vehicleFiltersSchema = Joi.object({
  brand: Joi.string().optional(),
  vehicleModel: Joi.string().optional(),
  yearMin: Joi.number().integer().min(1900).optional(),
  yearMax: Joi.number().integer().max(new Date().getFullYear() + 1).optional(),
  minPrice: Joi.number().positive().optional(),
  maxPrice: Joi.number().positive().optional(),
  fuelType: Joi.string().valid('gasoline', 'diesel', 'electric', 'hybrid').optional(),
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
