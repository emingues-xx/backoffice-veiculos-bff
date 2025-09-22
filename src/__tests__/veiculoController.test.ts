import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler';
import veiculoRoutes from '../routes/veiculoRoutes';

// Mock the config to use test environment
jest.mock('../config', () => ({
  config: {
    nodeEnv: 'test',
    port: 3002,
    api: {
      baseUrl: 'http://localhost:3001',
      timeout: 10000
    },
    jwt: {
      secret: 'test-secret',
      expiresIn: '24h'
    },
    cors: {
      origin: 'http://localhost:3000'
    },
    logging: {
      level: 'info'
    }
  }
}));

// Create test app without starting server
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backoffice Veículos BFF is running',
    timestamp: new Date().toISOString(),
    environment: 'test',
    version: '1.0.0'
  });
});

// API routes
app.use('/api/veiculos', veiculoRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

describe('VeiculoController', () => {
  const mockToken = 'test-token';

  describe('GET /api/veiculos', () => {
    it('should return list of veiculos without authentication', async () => {
      const response = await request(app)
        .get('/api/veiculos')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });

    it('should accept query parameters', async () => {
      const response = await request(app)
        .get('/api/veiculos?marca=Toyota&page=1&limit=5')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /api/veiculos', () => {
    it('should require authentication', async () => {
      const veiculoData = {
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2022,
        preco: 85000,
        quilometragem: 0,
        combustivel: 'flex',
        cor: 'Branco',
        cambio: 'automatico',
        categoria: 'carro'
      };

      await request(app)
        .post('/api/veiculos')
        .send(veiculoData)
        .expect(401);
    });

    it('should create veiculo with valid token', async () => {
      const veiculoData = {
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2022,
        preco: 85000,
        quilometragem: 0,
        combustivel: 'flex',
        cor: 'Branco',
        cambio: 'automatico',
        categoria: 'carro'
      };

      const response = await request(app)
        .post('/api/veiculos')
        .set('Authorization', `Bearer ${mockToken}`)
        .send(veiculoData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Backoffice Veículos BFF is running');
    });
  });
});
