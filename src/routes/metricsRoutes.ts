import { Router } from 'express';
import { metricsController } from '../controllers/metricsController';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateQuery } from '../middleware/validation';
import {
  revenueMetricsSchema,
  salesByDayMetricsSchema,
  topSellersMetricsSchema,
  totalSalesMetricsSchema
} from '../validators/metricsValidators';

const router = Router();

// Protected routes (authentication required)
router.use(authenticateToken);

/**
 * @swagger
 * /api/metrics/revenue:
 *   get:
 *     summary: Receita Total
 *     description: Retorna a receita total no período especificado
 *     tags: [Métricas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início do período (ISO 8601)
 *         example: "2025-10-14"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim do período (ISO 8601)
 *         example: "2025-10-15"
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly]
 *         description: Período predefinido
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: ID do vendedor específico
 *     responses:
 *       200:
 *         description: Receita total retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/RevenueMetrics'
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  '/revenue',
  requireRole(['admin', 'manager']),
  validateQuery(revenueMetricsSchema),
  metricsController.getRevenueMetrics
);

/**
 * @swagger
 * /api/metrics/sales-by-day:
 *   get:
 *     summary: Vendas por Dia
 *     description: Retorna as vendas agrupadas por dia no período especificado
 *     tags: [Métricas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início do período (ISO 8601)
 *         example: "2025-10-14"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim do período (ISO 8601)
 *         example: "2025-10-15"
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly]
 *         description: Período predefinido
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: ID do vendedor específico
 *     responses:
 *       200:
 *         description: Vendas por dia retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SalesByDayMetrics'
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  '/sales-by-day',
  requireRole(['admin', 'manager']),
  validateQuery(salesByDayMetricsSchema),
  metricsController.getSalesByDayMetrics
);

/**
 * @swagger
 * /api/metrics/top-sellers:
 *   get:
 *     summary: Melhores Vendedores
 *     description: Retorna os vendedores com melhor performance no período especificado
 *     tags: [Métricas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início do período (ISO 8601)
 *         example: "2025-10-14"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim do período (ISO 8601)
 *         example: "2025-10-15"
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly]
 *         description: Período predefinido
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: ID do vendedor específico
 *     responses:
 *       200:
 *         description: Melhores vendedores retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TopSellersMetrics'
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  '/top-sellers',
  requireRole(['admin', 'manager']),
  validateQuery(topSellersMetricsSchema),
  metricsController.getTopSellersMetrics
);

/**
 * @swagger
 * /api/metrics/total-sales:
 *   get:
 *     summary: Total de Vendas
 *     description: Retorna o total de vendas e comparação com período anterior
 *     tags: [Métricas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início do período (ISO 8601)
 *         example: "2025-10-14"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim do período (ISO 8601)
 *         example: "2025-10-15"
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly]
 *         description: Período predefinido
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: ID do vendedor específico
 *     responses:
 *       200:
 *         description: Total de vendas retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TotalSalesMetrics'
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  '/total-sales',
  requireRole(['admin', 'manager']),
  validateQuery(totalSalesMetricsSchema),
  metricsController.getTotalSalesMetrics
);

export default router;
