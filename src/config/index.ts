import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const config = {
  port: parseInt(process.env.PORT || '3002', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  api: {
    baseUrl: process.env.API_BASE_URL || (isProduction ? 'https://api-backend.railway.app' : 'http://localhost:3001'),
    timeout: parseInt(process.env.API_TIMEOUT || (isProduction ? '15000' : '10000'), 10),
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || (isProduction ? 'production-jwt-secret-key' : 'your-jwt-secret-key'),
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || (isProduction ? 'https://backoffice-frontend.railway.app' : 'http://localhost:3000'),
  },
  
  logging: {
    level: process.env.LOG_LEVEL || (isProduction ? 'warn' : 'info'),
  },
};
