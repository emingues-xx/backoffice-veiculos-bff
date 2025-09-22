import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './index';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backoffice Veículos BFF API',
      version: '1.0.0',
      description: 'Backend for Frontend (BFF) para o sistema de E-commerce de Veículos - Backoffice',
      contact: {
        name: 'Squad Backoffice',
        email: 'squad-backoffice@empresa.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: config.nodeEnv === 'production' 
          ? 'https://backoffice-veiculos-bff.railway.app' 
          : `http://localhost:${config.port}`,
        description: config.nodeEnv === 'production' ? 'Produção' : 'Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticação'
        }
      },
      schemas: {
        Veiculo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do veículo'
            },
            marca: {
              type: 'string',
              description: 'Marca do veículo',
              example: 'Toyota'
            },
            modelo: {
              type: 'string',
              description: 'Modelo do veículo',
              example: 'Corolla'
            },
            ano: {
              type: 'integer',
              description: 'Ano do veículo',
              example: 2022
            },
            preco: {
              type: 'number',
              description: 'Preço do veículo',
              example: 85000
            },
            quilometragem: {
              type: 'integer',
              description: 'Quilometragem do veículo',
              example: 0
            },
            combustivel: {
              type: 'string',
              enum: ['gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido'],
              description: 'Tipo de combustível'
            },
            cor: {
              type: 'string',
              description: 'Cor do veículo',
              example: 'Branco'
            },
            cambio: {
              type: 'string',
              enum: ['manual', 'automatico'],
              description: 'Tipo de câmbio'
            },
            categoria: {
              type: 'string',
              enum: ['carro', 'moto', 'caminhao', 'onibus'],
              description: 'Categoria do veículo'
            },
            status: {
              type: 'string',
              enum: ['ativo', 'inativo', 'vendido'],
              description: 'Status do veículo'
            },
            descricao: {
              type: 'string',
              description: 'Descrição do veículo'
            },
            imagens: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'URLs das imagens do veículo'
            },
            dataCriacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            dataAtualizacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização'
            },
            vendedorId: {
              type: 'string',
              description: 'ID do vendedor'
            }
          }
        },
        CreateVeiculoRequest: {
          type: 'object',
          required: ['marca', 'modelo', 'ano', 'preco', 'quilometragem', 'combustivel', 'cor', 'cambio', 'categoria'],
          properties: {
            marca: {
              type: 'string',
              description: 'Marca do veículo',
              example: 'Toyota'
            },
            modelo: {
              type: 'string',
              description: 'Modelo do veículo',
              example: 'Corolla'
            },
            ano: {
              type: 'integer',
              description: 'Ano do veículo',
              example: 2022
            },
            preco: {
              type: 'number',
              description: 'Preço do veículo',
              example: 85000
            },
            quilometragem: {
              type: 'integer',
              description: 'Quilometragem do veículo',
              example: 0
            },
            combustivel: {
              type: 'string',
              enum: ['gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido'],
              description: 'Tipo de combustível'
            },
            cor: {
              type: 'string',
              description: 'Cor do veículo',
              example: 'Branco'
            },
            cambio: {
              type: 'string',
              enum: ['manual', 'automatico'],
              description: 'Tipo de câmbio'
            },
            categoria: {
              type: 'string',
              enum: ['carro', 'moto', 'caminhao', 'onibus'],
              description: 'Categoria do veículo'
            },
            descricao: {
              type: 'string',
              description: 'Descrição do veículo'
            },
            imagens: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'URLs das imagens do veículo'
            }
          }
        },
        UpdateVeiculoRequest: {
          type: 'object',
          properties: {
            marca: {
              type: 'string',
              description: 'Marca do veículo'
            },
            modelo: {
              type: 'string',
              description: 'Modelo do veículo'
            },
            ano: {
              type: 'integer',
              description: 'Ano do veículo'
            },
            preco: {
              type: 'number',
              description: 'Preço do veículo'
            },
            quilometragem: {
              type: 'integer',
              description: 'Quilometragem do veículo'
            },
            combustivel: {
              type: 'string',
              enum: ['gasolina', 'etanol', 'flex', 'diesel', 'eletrico', 'hibrido'],
              description: 'Tipo de combustível'
            },
            cor: {
              type: 'string',
              description: 'Cor do veículo'
            },
            cambio: {
              type: 'string',
              enum: ['manual', 'automatico'],
              description: 'Tipo de câmbio'
            },
            categoria: {
              type: 'string',
              enum: ['carro', 'moto', 'caminhao', 'onibus'],
              description: 'Categoria do veículo'
            },
            status: {
              type: 'string',
              enum: ['ativo', 'inativo', 'vendido'],
              description: 'Status do veículo'
            },
            descricao: {
              type: 'string',
              description: 'Descrição do veículo'
            },
            imagens: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'URLs das imagens do veículo'
            }
          }
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Veiculo'
              }
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  description: 'Página atual'
                },
                limit: {
                  type: 'integer',
                  description: 'Itens por página'
                },
                total: {
                  type: 'integer',
                  description: 'Total de itens'
                },
                totalPages: {
                  type: 'integer',
                  description: 'Total de páginas'
                }
              }
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indica se a operação foi bem-sucedida'
            },
            data: {
              description: 'Dados da resposta'
            },
            message: {
              type: 'string',
              description: 'Mensagem da resposta'
            },
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        },
        DashboardStats: {
          type: 'object',
          properties: {
            totalVeiculos: {
              type: 'integer',
              description: 'Total de veículos'
            },
            veiculosAtivos: {
              type: 'integer',
              description: 'Veículos ativos'
            },
            veiculosVendidos: {
              type: 'integer',
              description: 'Veículos vendidos'
            },
            vendasMes: {
              type: 'integer',
              description: 'Vendas do mês'
            },
            receitaMes: {
              type: 'number',
              description: 'Receita do mês'
            },
            topMarcas: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  marca: {
                    type: 'string'
                  },
                  quantidade: {
                    type: 'integer'
                  }
                }
              }
            },
            vendasPorMes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  mes: {
                    type: 'string'
                  },
                  vendas: {
                    type: 'integer'
                  },
                  receita: {
                    type: 'number'
                  }
                }
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
