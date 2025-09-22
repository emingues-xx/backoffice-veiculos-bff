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

/**
 * @swagger
 * /api/veiculos:
 *   get:
 *     summary: Listar veículos
 *     description: Retorna uma lista paginada de veículos com filtros opcionais
 *     tags: [Veículos]
 *     parameters:
 *       - in: query
 *         name: marca
 *         schema:
 *           type: string
 *         description: Filtrar por marca
 *       - in: query
 *         name: modelo
 *         schema:
 *           type: string
 *         description: Filtrar por modelo
 *       - in: query
 *         name: anoMin
 *         schema:
 *           type: integer
 *         description: Ano mínimo
 *       - in: query
 *         name: anoMax
 *         schema:
 *           type: integer
 *         description: Ano máximo
 *       - in: query
 *         name: precoMin
 *         schema:
 *           type: number
 *         description: Preço mínimo
 *       - in: query
 *         name: precoMax
 *         schema:
 *           type: number
 *         description: Preço máximo
 *       - in: query
 *         name: combustivel
 *         schema:
 *           type: string
 *           enum: [gasolina, etanol, flex, diesel, eletrico, hibrido]
 *         description: Tipo de combustível
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *           enum: [carro, moto, caminhao, onibus]
 *         description: Categoria do veículo
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ativo, inativo, vendido]
 *         description: Status do veículo
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
 *           enum: [preco, ano, quilometragem, dataCriacao]
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
 *         description: Lista de veículos retornada com sucesso
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
  validateQuery(veiculoFiltersSchema),
  veiculoController.getVeiculos
);

/**
 * @swagger
 * /api/veiculos/search:
 *   get:
 *     summary: Buscar veículos
 *     description: Busca veículos por texto livre
 *     tags: [Veículos]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Resultados da busca retornados com sucesso
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
  '/search',
  validateQuery(searchSchema),
  veiculoController.searchVeiculos
);

/**
 * @swagger
 * /api/veiculos/{id}:
 *   get:
 *     summary: Obter veículo por ID
 *     description: Retorna um veículo específico pelo ID
 *     tags: [Veículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 */
router.get(
  '/:id',
  validateParams(veiculoIdSchema),
  veiculoController.getVeiculoById
);

// Protected routes (authentication required)
router.use(authenticateToken);

/**
 * @swagger
 * /api/veiculos:
 *   post:
 *     summary: Criar veículo
 *     description: Cria um novo veículo (requer autenticação)
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVeiculoRequest'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Veiculo'
 *                 message:
 *                   type: string
 *                   example: Veículo criado com sucesso
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.post(
  '/',
  requireRole(['admin', 'vendedor']),
  validateRequest(createVeiculoSchema),
  veiculoController.createVeiculo
);

/**
 * @swagger
 * /api/veiculos/{id}:
 *   put:
 *     summary: Atualizar veículo
 *     description: Atualiza um veículo existente (requer autenticação)
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateVeiculoRequest'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Veiculo'
 *                 message:
 *                   type: string
 *                   example: Veículo atualizado com sucesso
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 *       404:
 *         description: Veículo não encontrado
 */
router.put(
  '/:id',
  requireRole(['admin', 'vendedor']),
  validateParams(veiculoIdSchema),
  validateRequest(updateVeiculoSchema),
  veiculoController.updateVeiculo
);

/**
 * @swagger
 * /api/veiculos/{id}:
 *   delete:
 *     summary: Remover veículo
 *     description: Remove um veículo (requer autenticação de admin)
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo removido com sucesso
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
 *                   example: Veículo removido com sucesso
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente (apenas admin)
 *       404:
 *         description: Veículo não encontrado
 */
router.delete(
  '/:id',
  requireRole(['admin']),
  validateParams(veiculoIdSchema),
  veiculoController.deleteVeiculo
);

/**
 * @swagger
 * /api/veiculos/{id}/status:
 *   patch:
 *     summary: Atualizar status do veículo
 *     description: Atualiza o status de um veículo (requer autenticação)
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ativo, inativo, vendido]
 *                 description: Novo status do veículo
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Veiculo'
 *                 message:
 *                   type: string
 *                   example: Status do veículo atualizado com sucesso
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 *       404:
 *         description: Veículo não encontrado
 */
router.patch(
  '/:id/status',
  requireRole(['admin', 'vendedor']),
  validateParams(veiculoIdSchema),
  validateRequest(updateStatusSchema),
  veiculoController.updateVeiculoStatus
);

/**
 * @swagger
 * /api/veiculos/dashboard/stats:
 *   get:
 *     summary: Estatísticas do dashboard
 *     description: Retorna estatísticas para o dashboard (requer autenticação)
 *     tags: [Dashboard]
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
 *                   $ref: '#/components/schemas/DashboardStats'
 *       401:
 *         description: Token de acesso requerido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  '/dashboard/stats',
  requireRole(['admin', 'vendedor']),
  veiculoController.getDashboardStats
);

/**
 * @swagger
 * /api/veiculos/vendedor/{vendedorId}:
 *   get:
 *     summary: Veículos por vendedor
 *     description: Retorna veículos de um vendedor específico (requer autenticação)
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendedorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do vendedor
 *     responses:
 *       200:
 *         description: Veículos do vendedor retornados com sucesso
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
  '/vendedor/:vendedorId',
  requireRole(['admin', 'vendedor']),
  validateParams(Joi.object({ vendedorId: Joi.string().required() })),
  validateQuery(veiculoFiltersSchema),
  veiculoController.getVeiculosByVendedor
);

export default router;