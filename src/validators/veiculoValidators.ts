import Joi from 'joi';

export const createVeiculoSchema = Joi.object({
  marca: Joi.string().required().min(2).max(50),
  modelo: Joi.string().required().min(2).max(50),
  ano: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
  preco: Joi.number().positive().required(),
  quilometragem: Joi.number().integer().min(0).required(),
  combustivel: Joi.string().valid('gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido').required(),
  cor: Joi.string().required().min(2).max(30),
  cambio: Joi.string().valid('manual', 'automatico').required(),
  categoria: Joi.string().valid('carro', 'moto', 'caminhao', 'onibus').required(),
  descricao: Joi.string().max(1000).optional(),
  imagens: Joi.array().items(Joi.string().uri()).max(10).optional()
});

export const updateVeiculoSchema = Joi.object({
  marca: Joi.string().min(2).max(50).optional(),
  modelo: Joi.string().min(2).max(50).optional(),
  ano: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
  preco: Joi.number().positive().optional(),
  quilometragem: Joi.number().integer().min(0).optional(),
  combustivel: Joi.string().valid('gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido').optional(),
  cor: Joi.string().min(2).max(30).optional(),
  cambio: Joi.string().valid('manual', 'automatico').optional(),
  categoria: Joi.string().valid('carro', 'moto', 'caminhao', 'onibus').optional(),
  status: Joi.string().valid('ativo', 'inativo', 'vendido').optional(),
  descricao: Joi.string().max(1000).optional(),
  imagens: Joi.array().items(Joi.string().uri()).max(10).optional()
});

export const veiculoFiltersSchema = Joi.object({
  marca: Joi.string().optional(),
  modelo: Joi.string().optional(),
  anoMin: Joi.number().integer().min(1900).optional(),
  anoMax: Joi.number().integer().max(new Date().getFullYear() + 1).optional(),
  precoMin: Joi.number().positive().optional(),
  precoMax: Joi.number().positive().optional(),
  combustivel: Joi.string().valid('gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido').optional(),
  categoria: Joi.string().valid('carro', 'moto', 'caminhao', 'onibus').optional(),
  status: Joi.string().valid('ativo', 'inativo', 'vendido').optional(),
  vendedorId: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
  sortBy: Joi.string().valid('preco', 'ano', 'quilometragem', 'dataCriacao').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

export const veiculoIdSchema = Joi.object({
  id: Joi.string().required()
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('ativo', 'inativo', 'vendido').required()
});

export const searchSchema = Joi.object({
  q: Joi.string().min(2).max(100).required()
});
