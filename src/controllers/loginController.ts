import { Request, Response } from 'express';
import axios from 'axios';
import https from 'https';
import { config } from '../config';

// Configurar axios para ignorar certificados SSL
const axiosConfig = {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: config.api.timeout
};

export const loginController = {
  /**
   * Login do usuário chamando diretamente a API de produção
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email e senha são obrigatórios'
        });
      }

      // Chamar diretamente a API de produção
      const response = await axios.post(
        `${config.api.baseUrl}/api/users/login`,
        { email, password },
        axiosConfig
      );

      // Retornar o token da API de produção
      res.json({
        success: true,
        data: response.data
      });

    } catch (error: any) {
      console.error('Erro no login:', error.message);
      
      if (error.response) {
        return res.status(error.response.status).json({
          success: false,
          error: error.response.data?.error || 'Erro no login',
          message: error.response.data?.message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
};
