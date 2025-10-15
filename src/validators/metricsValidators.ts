import Joi from 'joi';

export const metricsFiltersSchema = Joi.object({
  startDate: Joi.string().isoDate().optional().description('Data de início do período (ISO 8601)'),
  endDate: Joi.string().isoDate().optional().description('Data de fim do período (ISO 8601)'),
  period: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').optional().description('Período predefinido'),
  sellerId: Joi.string().optional().description('ID do vendedor específico')
}).custom((value, helpers) => {
  // Validação customizada para garantir que endDate seja maior que startDate
  if (value.startDate && value.endDate) {
    const startDate = new Date(value.startDate);
    const endDate = new Date(value.endDate);
    
    if (endDate <= startDate) {
      return helpers.error('custom.dateRange', {
        message: 'endDate deve ser maior que startDate'
      });
    }
  }
  
  return value;
}).messages({
  'custom.dateRange': 'endDate deve ser maior que startDate'
});

export const revenueMetricsSchema = Joi.object({
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  period: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').optional(),
  sellerId: Joi.string().optional()
});

export const salesByDayMetricsSchema = Joi.object({
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  period: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').optional(),
  sellerId: Joi.string().optional()
});

export const topSellersMetricsSchema = Joi.object({
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  period: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').optional(),
  sellerId: Joi.string().optional()
});

export const totalSalesMetricsSchema = Joi.object({
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  period: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').optional(),
  sellerId: Joi.string().optional()
});
