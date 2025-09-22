import { config } from './index';

// Production-specific configurations
export const productionConfig = {
  ...config,
  nodeEnv: 'production',
  port: parseInt(process.env.PORT || '3002', 10),
  
  // Production API configuration
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api-backend.railway.app',
    timeout: parseInt(process.env.API_TIMEOUT || '15000', 10),
  },
  
  // Production JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'production-jwt-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  
  // Production CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://backoffice-frontend.railway.app',
  },
  
  // Production logging
  logging: {
    level: process.env.LOG_LEVEL || 'warn',
  },
};
