import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JwtPayload } from '../types';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validação básica
      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Email e senha são obrigatórios'
        });
        return;
      }

      // Mock de autenticação - em produção, validar com banco de dados
      const mockUsers = [
        {
          id: '68d17845a08df9f982e3397a',
          email: 'admin@test.com',
          password: 'admin123',
          role: 'admin'
        },
        {
          id: '68d17845a08df9f982e3397b',
          email: 'vendedor@test.com',
          password: 'vendedor123',
          role: 'vendedor'
        }
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Credenciais inválidas'
        });
        return;
      }

      // Gerar JWT token
      const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
        id: user.id,
        email: user.email,
        role: user.role
      };

      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
      } as jwt.SignOptions);

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          }
        },
        message: 'Login realizado com sucesso'
      });

    } catch (error) {
      next(error);
    }
  }

  async generateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, email, role } = req.body;

      // Validação básica
      if (!userId || !email || !role) {
        res.status(400).json({
          success: false,
          error: 'userId, email e role são obrigatórios'
        });
        return;
      }

      // Validar roles permitidas
      const allowedRoles = ['admin', 'vendedor'];
      if (!allowedRoles.includes(role)) {
        res.status(400).json({
          success: false,
          error: 'Role deve ser admin ou vendedor'
        });
        return;
      }

      // Gerar JWT token
      const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
        id: userId,
        email: email,
        role: role
      };

      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
      } as jwt.SignOptions);

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: userId,
            email: email,
            role: role
          }
        },
        message: 'Token gerado com sucesso'
      });

    } catch (error) {
      next(error);
    }
  }

  async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        res.status(401).json({
          success: false,
          error: 'Token não fornecido'
        });
        return;
      }

      try {
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
        
        res.json({
          success: true,
          data: {
            user: {
              id: decoded.id,
              email: decoded.email,
              role: decoded.role
            },
            expiresAt: new Date(decoded.exp * 1000).toISOString()
          },
          message: 'Token válido'
        });
      } catch (jwtError) {
        res.status(401).json({
          success: false,
          error: 'Token inválido ou expirado'
        });
      }

    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
