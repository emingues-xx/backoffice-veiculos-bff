import { Router } from 'express';
import Joi from 'joi';
import { saleController } from '../controllers/saleController';
import { authenticateToken, requireRole } from '../middleware/auth';
import { 
  validateRequest, 
  validateQuery, 
  validateParams 
} from '../middleware/validation';
import {
  createSaleSchema,
  updateSaleSchema,
  saleFiltersSchema,
  saleIdSchema
} from '../validators/saleValidators';

const router = Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Listar vendas
 *     description: Retorna uma lista paginada de vendas com filtros opcionais
 *     tags: [Vendas]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *         description: Filtrar por status da venda
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum: [cash, financing, trade-in]
 *         description: Filtrar por método de pagamento
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial (ISO 8601)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final (ISO 8601)
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: Filtrar por ID do vendedor
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [saleDate, salePrice, createdAt]
 *         description: Campo para ordenação
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordem da ordenação
 *     responses:
 *       200:
 *         description: Lista de vendas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaginatedResponse'
 */
router.get(
  '/',
  validateQuery(saleFiltersSchema),
  saleController.getSales
);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obter venda por ID
 *     description: Retorna uma venda específica pelo ID
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Venda não encontrada
 */
router.get(
  '/:id',
  validateParams(saleIdSchema),
  saleController.getSaleById
);

// Protected routes (authentication required)
router.use(authenticateToken);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Criar venda
 *     description: Cria uma nova venda (requer autenticação)
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSaleRequest'
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Sale'
 *                 message:
 *                   type: string
 *                   example: Venda criada com sucesso
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.post(
  '/',
  requireRole(['admin', 'seller']),
  validateRequest(createSaleSchema),
  saleController.createSale
);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Atualizar venda
 *     description: Atualiza uma venda existente (requer autenticação)
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSaleRequest'
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Sale'
 *                 message:
 *                   type: string
 *                   example: Venda atualizada com sucesso
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 *       404:
 *         description: Venda não encontrada
 */
router.put(
  '/:id',
  requireRole(['admin', 'seller']),
  validateParams(saleIdSchema),
  validateRequest(updateSaleSchema),
  saleController.updateSale
);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Remover venda
 *     description: Remove uma venda (requer autenticação de admin)
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Venda removida com sucesso
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente (apenas admin)
 *       404:
 *         description: Venda não encontrada
 */
router.delete(
  '/:id',
  requireRole(['admin']),
  validateParams(saleIdSchema),
  saleController.deleteSale
);

/**
 * @swagger
 * /api/sales/stats:
 *   get:
 *     summary: Estatísticas de vendas
 *     description: Retorna estatísticas de vendas (requer autenticação)
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SaleStats'
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  '/stats',
  requireRole(['admin', 'seller']),
  saleController.getSaleStats
);

/**
 * @swagger
 * /api/sales/my-sales:
 *   get:
 *     summary: Minhas vendas
 *     description: Retorna as vendas do usuário autenticado (requer autenticação)
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *         description: Filtrar por status da venda
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum: [cash, financing, trade-in]
 *         description: Filtrar por método de pagamento
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Vendas do usuário retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaginatedResponse'
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  '/my-sales',
  requireRole(['admin', 'seller']),
  validateQuery(saleFiltersSchema),
  saleController.getMySales
);

export default router;
