import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateRequest } from '../middleware/validation';
import { loginSchema, generateTokenSchema } from '../validators/authValidators';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuário
 *     description: Autentica um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', 
  validateRequest(loginSchema),
  authController.login.bind(authController)
);

/**
 * @swagger
 * /api/auth/generate-token:
 *   post:
 *     summary: Gerar token JWT
 *     description: Gera um token JWT para um usuário específico (útil para desenvolvimento)
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - email
 *               - role
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 68d17845a08df9f982e3397a
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@test.com
 *               role:
 *                 type: string
 *                 enum: [admin, vendedor]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                 message:
 *                   type: string
 *                   example: Token gerado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/generate-token',
  validateRequest(generateTokenSchema),
  authController.generateToken.bind(authController)
);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verificar token JWT
 *     description: Verifica se um token JWT é válido e retorna informações do usuário
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: Token válido
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/verify',
  authController.verifyToken.bind(authController)
);

export default router;
