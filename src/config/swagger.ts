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
        Vehicle: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do veículo',
              example: '68ed57a3572e134dd39350cf'
            },
            brand: {
              type: 'string',
              description: 'Marca do veículo',
              example: 'Toyota',
              minLength: 2,
              maxLength: 50
            },
            vehicleModel: {
              type: 'string',
              description: 'Modelo do veículo',
              example: 'Corolla',
              minLength: 2,
              maxLength: 50
            },
            year: {
              type: 'integer',
              description: 'Ano de fabricação',
              example: 2023,
              minimum: 1900,
              maximum: 2025
            },
            price: {
              type: 'number',
              description: 'Preço em reais (R$)',
              example: 85000,
              minimum: 0
            },
            mileage: {
              type: 'integer',
              description: 'Quilometragem em km',
              example: 15000,
              minimum: 0
            },
            fuelType: {
              type: 'string',
              enum: ['gasoline', 'ethanol', 'diesel', 'electric', 'hybrid'],
              description: 'Tipo de combustível',
              example: 'gasoline'
            },
            color: {
              type: 'string',
              description: 'Cor do veículo',
              example: 'Branco',
              minLength: 2,
              maxLength: 30
            },
            transmission: {
              type: 'string',
              enum: ['manual', 'automatic'],
              description: 'Tipo de transmissão',
              example: 'automatic'
            },
            doors: {
              type: 'integer',
              description: 'Número de portas',
              example: 4,
              minimum: 2,
              maximum: 6
            },
            category: {
              type: 'string',
              enum: ['car', 'motorcycle', 'truck', 'van'],
              description: 'Categoria do veículo',
              example: 'car'
            },
            condition: {
              type: 'string',
              enum: ['new', 'used'],
              description: 'Condição do veículo',
              example: 'used'
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'sold'],
              description: 'Status do veículo',
              example: 'active'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do veículo',
              example: 'Veículo em excelente estado, único dono, revisões em dia. Equipado com ar condicionado, direção hidráulica, vidros elétricos e trava elétrica.',
              minLength: 10,
              maxLength: 2000
            },
            images: {
              type: 'array',
              description: 'Array de URLs das imagens',
              items: {
                type: 'string',
                format: 'uri'
              },
              example: ['https://example.com/images/corolla1.jpg', 'https://example.com/images/corolla2.jpg'],
              minItems: 1,
              maxItems: 10
            },
            features: {
              type: 'array',
              description: 'Array de características especiais',
              items: {
                type: 'string',
                maxLength: 100
              },
              example: ['Ar condicionado', 'Direção hidráulica', 'Vidros elétricos', 'Trava elétrica', 'Airbag', 'ABS'],
              maxItems: 20
            },
            location: {
              type: 'object',
              description: 'Localização do veículo',
              properties: {
                city: {
                  type: 'string',
                  description: 'Cidade',
                  example: 'São Paulo',
                  minLength: 2,
                  maxLength: 50
                },
                state: {
                  type: 'string',
                  description: 'Estado',
                  example: 'SP',
                  minLength: 2,
                  maxLength: 50
                },
                zipCode: {
                  type: 'string',
                  description: 'CEP',
                  example: '01234-567',
                  pattern: '^\\d{5}-?\\d{3}$'
                }
              },
              required: ['city', 'state', 'zipCode']
            },
            seller: {
              type: 'object',
              description: 'Informações do vendedor',
              properties: {
                id: {
                  type: 'string',
                  description: 'ID do vendedor',
                  example: '68ed57a3572e134dd39350ce'
                },
                name: {
                  type: 'string',
                  description: 'Nome do vendedor',
                  example: 'Concessionária Toyota',
                  minLength: 2,
                  maxLength: 50
                },
                phone: {
                  type: 'string',
                  description: 'Telefone do vendedor',
                  example: '(11) 99999-9999',
                  pattern: '^\\(\\d{2}\\)\\s\\d{4,5}-?\\d{4}$'
                },
                email: {
                  type: 'string',
                  description: 'Email do vendedor',
                  example: 'vendas@toyota.com',
                  format: 'email'
                }
              },
              required: ['id', 'name', 'phone', 'email']
            },
            isFeatured: {
              type: 'boolean',
              description: 'Se o veículo é destaque',
              example: false
            },
            views: {
              type: 'integer',
              description: 'Número de visualizações',
              example: 0,
              minimum: 0
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
              example: '2024-01-15T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
              example: '2024-01-15T10:30:00.000Z'
            }
          },
          required: ['id', 'brand', 'vehicleModel', 'year', 'price', 'mileage', 'fuelType', 'color', 'transmission', 'doors', 'category', 'condition', 'status', 'description', 'images', 'location', 'seller', 'isFeatured', 'views', 'createdAt', 'updatedAt']
        },
        CreateVehicleRequest: {
          type: 'object',
          properties: {
            brand: {
              type: 'string',
              description: 'Marca do veículo',
              example: 'Toyota',
              minLength: 2,
              maxLength: 50
            },
            vehicleModel: {
              type: 'string',
              description: 'Modelo do veículo',
              example: 'Corolla',
              minLength: 2,
              maxLength: 50
            },
            year: {
              type: 'integer',
              description: 'Ano de fabricação',
              example: 2023,
              minimum: 1900,
              maximum: 2025
            },
            price: {
              type: 'number',
              description: 'Preço em reais (R$)',
              example: 85000,
              minimum: 0
            },
            mileage: {
              type: 'integer',
              description: 'Quilometragem em km',
              example: 15000,
              minimum: 0
            },
            fuelType: {
              type: 'string',
              enum: ['gasoline', 'ethanol', 'diesel', 'electric', 'hybrid'],
              description: 'Tipo de combustível',
              example: 'gasoline'
            },
            color: {
              type: 'string',
              description: 'Cor do veículo',
              example: 'Branco',
              minLength: 2,
              maxLength: 30
            },
            transmission: {
              type: 'string',
              enum: ['manual', 'automatic'],
              description: 'Tipo de transmissão',
              example: 'automatic'
            },
            doors: {
              type: 'integer',
              description: 'Número de portas',
              example: 4,
              minimum: 2,
              maximum: 6
            },
            category: {
              type: 'string',
              enum: ['car', 'motorcycle', 'truck', 'van'],
              description: 'Categoria do veículo',
              example: 'car'
            },
            condition: {
              type: 'string',
              enum: ['new', 'used'],
              description: 'Condição do veículo',
              example: 'used'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do veículo',
              example: 'Veículo em excelente estado, único dono, revisões em dia. Equipado com ar condicionado, direção hidráulica, vidros elétricos e trava elétrica.',
              minLength: 10,
              maxLength: 2000
            },
            images: {
              type: 'array',
              description: 'Array de URLs das imagens',
              items: {
                type: 'string',
                format: 'uri'
              },
              example: ['https://example.com/images/corolla1.jpg', 'https://example.com/images/corolla2.jpg'],
              minItems: 1,
              maxItems: 10
            },
            features: {
              type: 'array',
              description: 'Array de características especiais',
              items: {
                type: 'string',
                maxLength: 100
              },
              example: ['Ar condicionado', 'Direção hidráulica', 'Vidros elétricos', 'Trava elétrica', 'Airbag', 'ABS'],
              maxItems: 20
            },
            location: {
              type: 'object',
              description: 'Localização do veículo',
              properties: {
                city: {
                  type: 'string',
                  description: 'Cidade',
                  example: 'São Paulo',
                  minLength: 2,
                  maxLength: 50
                },
                state: {
                  type: 'string',
                  description: 'Estado',
                  example: 'SP',
                  minLength: 2,
                  maxLength: 50
                },
                zipCode: {
                  type: 'string',
                  description: 'CEP',
                  example: '01234-567',
                  pattern: '^\\d{5}-?\\d{3}$'
                }
              },
              required: ['city', 'state', 'zipCode']
            },
            seller: {
              type: 'object',
              description: 'Informações do vendedor',
              properties: {
                id: {
                  type: 'string',
                  description: 'ID do vendedor',
                  example: '68ed57a3572e134dd39350ce'
                },
                name: {
                  type: 'string',
                  description: 'Nome do vendedor',
                  example: 'Concessionária Toyota',
                  minLength: 2,
                  maxLength: 50
                },
                phone: {
                  type: 'string',
                  description: 'Telefone do vendedor',
                  example: '(11) 99999-9999',
                  pattern: '^\\(\\d{2}\\)\\s\\d{4,5}-?\\d{4}$'
                },
                email: {
                  type: 'string',
                  description: 'Email do vendedor',
                  example: 'vendas@toyota.com',
                  format: 'email'
                }
              },
              required: ['id', 'name', 'phone', 'email']
            },
            isFeatured: {
              type: 'boolean',
              description: 'Se o veículo é destaque',
              example: false
            }
          },
          required: ['brand', 'vehicleModel', 'year', 'price', 'mileage', 'fuelType', 'color', 'transmission', 'doors', 'category', 'condition', 'description', 'images', 'location', 'seller']
        },
        UpdateVehicleRequest: {
          type: 'object',
          properties: {
            brand: {
              type: 'string',
              description: 'Marca do veículo',
              example: 'Toyota',
              minLength: 2,
              maxLength: 50
            },
            vehicleModel: {
              type: 'string',
              description: 'Modelo do veículo',
              example: 'Corolla',
              minLength: 2,
              maxLength: 50
            },
            year: {
              type: 'integer',
              description: 'Ano de fabricação',
              example: 2023,
              minimum: 1900,
              maximum: 2025
            },
            price: {
              type: 'number',
              description: 'Preço em reais (R$)',
              example: 85000,
              minimum: 0
            },
            mileage: {
              type: 'integer',
              description: 'Quilometragem em km',
              example: 15000,
              minimum: 0
            },
            fuelType: {
              type: 'string',
              enum: ['gasoline', 'ethanol', 'diesel', 'electric', 'hybrid'],
              description: 'Tipo de combustível',
              example: 'gasoline'
            },
            color: {
              type: 'string',
              description: 'Cor do veículo',
              example: 'Branco',
              minLength: 2,
              maxLength: 30
            },
            transmission: {
              type: 'string',
              enum: ['manual', 'automatic'],
              description: 'Tipo de transmissão',
              example: 'automatic'
            },
            doors: {
              type: 'integer',
              description: 'Número de portas',
              example: 4,
              minimum: 2,
              maximum: 6
            },
            category: {
              type: 'string',
              enum: ['car', 'motorcycle', 'truck', 'van'],
              description: 'Categoria do veículo',
              example: 'car'
            },
            condition: {
              type: 'string',
              enum: ['new', 'used'],
              description: 'Condição do veículo',
              example: 'used'
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'sold'],
              description: 'Status do veículo',
              example: 'active'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do veículo',
              example: 'Veículo em excelente estado, único dono, revisões em dia. Equipado com ar condicionado, direção hidráulica, vidros elétricos e trava elétrica.',
              minLength: 10,
              maxLength: 2000
            },
            images: {
              type: 'array',
              description: 'Array de URLs das imagens',
              items: {
                type: 'string',
                format: 'uri'
              },
              example: ['https://example.com/images/corolla1.jpg', 'https://example.com/images/corolla2.jpg'],
              minItems: 1,
              maxItems: 10
            },
            features: {
              type: 'array',
              description: 'Array de características especiais',
              items: {
                type: 'string',
                maxLength: 100
              },
              example: ['Ar condicionado', 'Direção hidráulica', 'Vidros elétricos', 'Trava elétrica', 'Airbag', 'ABS'],
              maxItems: 20
            },
            location: {
              type: 'object',
              description: 'Localização do veículo',
              properties: {
                city: {
                  type: 'string',
                  description: 'Cidade',
                  example: 'São Paulo',
                  minLength: 2,
                  maxLength: 50
                },
                state: {
                  type: 'string',
                  description: 'Estado',
                  example: 'SP',
                  minLength: 2,
                  maxLength: 50
                },
                zipCode: {
                  type: 'string',
                  description: 'CEP',
                  example: '01234-567',
                  pattern: '^\\d{5}-?\\d{3}$'
                }
              }
            },
            seller: {
              type: 'object',
              description: 'Informações do vendedor',
              properties: {
                id: {
                  type: 'string',
                  description: 'ID do vendedor',
                  example: '68ed57a3572e134dd39350ce'
                },
                name: {
                  type: 'string',
                  description: 'Nome do vendedor',
                  example: 'Concessionária Toyota',
                  minLength: 2,
                  maxLength: 50
                },
                phone: {
                  type: 'string',
                  description: 'Telefone do vendedor',
                  example: '(11) 99999-9999',
                  pattern: '^\\(\\d{2}\\)\\s\\d{4,5}-?\\d{4}$'
                },
                email: {
                  type: 'string',
                  description: 'Email do vendedor',
                  example: 'vendas@toyota.com',
                  format: 'email'
                }
              }
            },
            isFeatured: {
              type: 'boolean',
              description: 'Se o veículo é destaque',
              example: false
            }
          }
        },
        VehicleFilters: {
          type: 'object',
          properties: {
            brand: {
              type: 'string',
              description: 'Filtrar por marca',
              example: 'Toyota'
            },
            vehicleModel: {
              type: 'string',
              description: 'Filtrar por modelo',
              example: 'Corolla'
            },
            yearMin: {
              type: 'integer',
              description: 'Ano mínimo',
              example: 2020,
              minimum: 1900
            },
            yearMax: {
              type: 'integer',
              description: 'Ano máximo',
              example: 2024,
              maximum: 2025
            },
            priceMin: {
              type: 'number',
              description: 'Preço mínimo',
              example: 50000,
              minimum: 0
            },
            priceMax: {
              type: 'number',
              description: 'Preço máximo',
              example: 100000,
              minimum: 0
            },
            fuelType: {
              type: 'string',
              enum: ['gasoline', 'ethanol', 'diesel', 'electric', 'hybrid'],
              description: 'Tipo de combustível'
            },
            category: {
              type: 'string',
              enum: ['car', 'motorcycle', 'truck', 'van'],
              description: 'Categoria do veículo'
            },
            condition: {
              type: 'string',
              enum: ['new', 'used'],
              description: 'Condição do veículo'
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'sold'],
              description: 'Status do veículo'
            },
            sellerId: {
              type: 'string',
              description: 'ID do vendedor',
              example: '68ed57a3572e134dd39350ce'
            },
            page: {
              type: 'integer',
              description: 'Número da página',
              example: 1,
              minimum: 1,
              default: 1
            },
            limit: {
              type: 'integer',
              description: 'Itens por página',
              example: 10,
              minimum: 1,
              maximum: 100,
              default: 10
            },
            sortBy: {
              type: 'string',
              enum: ['price', 'year', 'mileage', 'createdAt'],
              description: 'Campo para ordenação',
              example: 'price'
            },
            sortOrder: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Ordem da ordenação',
              example: 'desc',
              default: 'desc'
            }
          }
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Vehicle'
              }
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  description: 'Página atual',
                  example: 1
                },
                limit: {
                  type: 'integer',
                  description: 'Itens por página',
                  example: 10
                },
                total: {
                  type: 'integer',
                  description: 'Total de itens',
                  example: 25
                },
                totalPages: {
                  type: 'integer',
                  description: 'Total de páginas',
                  example: 3
                }
              },
              required: ['page', 'limit', 'total', 'totalPages']
            }
          },
          required: ['data', 'pagination']
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indica se a operação foi bem-sucedida',
              example: true
            },
            data: {
              type: 'object',
              description: 'Dados da resposta'
            },
            message: {
              type: 'string',
              description: 'Mensagem de sucesso ou erro',
              example: 'Veículo criado com sucesso'
            },
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Validation error'
            }
          },
          required: ['success']
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Validation error'
            },
            message: {
              type: 'string',
              example: 'Validation failed'
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'brand'
                  },
                  message: {
                    type: 'string',
                    example: 'Brand is required'
                  }
                }
              }
            }
          }
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'admin@test.com'
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              example: 'admin123'
            }
          },
          required: ['email', 'password']
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'JWT Token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                user: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '68d17845a08df9f982e3397a'
                    },
                    email: {
                      type: 'string',
                      example: 'admin@test.com'
                    },
                    role: {
                      type: 'string',
                      example: 'admin'
                    }
                  }
                }
              }
            },
            message: {
              type: 'string',
              example: 'Login realizado com sucesso'
            }
          }
        },
        DashboardStats: {
          type: 'object',
          properties: {
            totalVehicles: {
              type: 'integer',
              description: 'Total de veículos',
              example: 150
            },
            veiculosAtivos: {
              type: 'integer',
              description: 'Veículos ativos',
              example: 120
            },
            veiculosVendidos: {
              type: 'integer',
              description: 'Veículos vendidos',
              example: 30
            },
            vendasMes: {
              type: 'integer',
              description: 'Vendas do mês',
              example: 15
            },
            receitaMes: {
              type: 'number',
              description: 'Receita do mês',
              example: 1275000
            },
            topMarcas: {
              type: 'array',
              description: 'Top marcas por quantidade',
              items: {
                type: 'object',
                properties: {
                  marca: {
                    type: 'string',
                    example: 'Toyota'
                  },
                  quantidade: {
                    type: 'integer',
                    example: 25
                  }
                }
              }
            },
            vendasPorMes: {
              type: 'array',
              description: 'Vendas por mês',
              items: {
                type: 'object',
                properties: {
                  mes: {
                    type: 'string',
                    example: 'Janeiro'
                  },
                  vendas: {
                    type: 'integer',
                    example: 12
                  },
                  receita: {
                    type: 'number',
                    example: 1020000
                  }
                }
              }
            }
          }
        },
        Sale: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único da venda',
              example: '68ee4b984740ba79c6d9df9c'
            },
            vehicleId: {
              type: 'string',
              description: 'ID do veículo vendido',
              example: '68ed79c17fb1e4518e0098b6'
            },
            vehicle: {
              $ref: '#/components/schemas/Vehicle'
            },
            buyer: {
              type: 'object',
              description: 'Informações do comprador',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome do comprador',
                  example: 'João Silva',
                  minLength: 2,
                  maxLength: 100
                },
                email: {
                  type: 'string',
                  description: 'Email do comprador',
                  example: 'joao@email.com',
                  format: 'email'
                },
                phone: {
                  type: 'string',
                  description: 'Telefone do comprador',
                  example: '(11) 99999-9999',
                  pattern: '^\\(\\d{2}\\)\\s\\d{4,5}-?\\d{4}$'
                },
                document: {
                  type: 'string',
                  description: 'CPF/CNPJ do comprador',
                  example: '12345678900',
                  minLength: 11,
                  maxLength: 14
                }
              },
              required: ['name', 'email', 'phone', 'document']
            },
            sellerId: {
              type: 'string',
              description: 'ID do vendedor',
              example: '68ed57a3572e134dd39350ce'
            },
            seller: {
              type: 'object',
              description: 'Informações do vendedor',
              properties: {
                id: {
                  type: 'string',
                  description: 'ID do vendedor',
                  example: '68ed57a3572e134dd39350ce'
                },
                name: {
                  type: 'string',
                  description: 'Nome do vendedor',
                  example: 'João Vendedor'
                },
                email: {
                  type: 'string',
                  description: 'Email do vendedor',
                  example: 'joao@vendedor.com'
                }
              }
            },
            salePrice: {
              type: 'number',
              description: 'Preço de venda em reais (R$)',
              example: 50000,
              minimum: 0
            },
            commission: {
              type: 'number',
              description: 'Comissão em reais (R$)',
              example: 2500,
              minimum: 0
            },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'financing', 'trade-in'],
              description: 'Método de pagamento',
              example: 'cash'
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'cancelled'],
              description: 'Status da venda',
              example: 'completed'
            },
            notes: {
              type: 'string',
              description: 'Observações da venda',
              example: 'Cliente interessado em financiamento',
              maxLength: 1000
            },
            saleDate: {
              type: 'string',
              format: 'date-time',
              description: 'Data da venda',
              example: '2024-01-15T14:30:00.000Z'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
              example: '2024-01-15T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
              example: '2024-01-15T14:30:00.000Z'
            }
          },
          required: ['id', 'vehicleId', 'buyer', 'sellerId', 'salePrice', 'commission', 'paymentMethod', 'status', 'saleDate', 'createdAt', 'updatedAt']
        },
        CreateSaleRequest: {
          type: 'object',
          properties: {
            vehicleId: {
              type: 'string',
              description: 'ID do veículo a ser vendido',
              example: '68ed79c17fb1e4518e0098b6'
            },
            buyer: {
              type: 'object',
              description: 'Informações do comprador',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome do comprador',
                  example: 'João Silva',
                  minLength: 2,
                  maxLength: 100
                },
                email: {
                  type: 'string',
                  description: 'Email do comprador',
                  example: 'joao@email.com',
                  format: 'email'
                },
                phone: {
                  type: 'string',
                  description: 'Telefone do comprador',
                  example: '(11) 99999-9999',
                  pattern: '^\\(\\d{2}\\)\\s\\d{4,5}-?\\d{4}$'
                },
                document: {
                  type: 'string',
                  description: 'CPF/CNPJ do comprador',
                  example: '12345678900',
                  minLength: 11,
                  maxLength: 14
                }
              },
              required: ['name', 'email', 'phone', 'document']
            },
            salePrice: {
              type: 'number',
              description: 'Preço de venda em reais (R$)',
              example: 50000,
              minimum: 0
            },
            commission: {
              type: 'number',
              description: 'Comissão em reais (R$)',
              example: 2500,
              minimum: 0,
              default: 0
            },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'financing', 'trade-in'],
              description: 'Método de pagamento',
              example: 'cash'
            },
            notes: {
              type: 'string',
              description: 'Observações da venda',
              example: 'Cliente interessado em financiamento',
              maxLength: 1000
            }
          },
          required: ['vehicleId', 'buyer', 'salePrice', 'paymentMethod']
        },
        UpdateSaleRequest: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'cancelled'],
              description: 'Status da venda'
            },
            salePrice: {
              type: 'number',
              description: 'Preço de venda em reais (R$)',
              minimum: 0
            },
            commission: {
              type: 'number',
              description: 'Comissão em reais (R$)',
              minimum: 0
            },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'financing', 'trade-in'],
              description: 'Método de pagamento'
            },
            notes: {
              type: 'string',
              description: 'Observações da venda',
              maxLength: 1000
            }
          }
        },
        SaleStats: {
          type: 'object',
          properties: {
            totalSales: {
              type: 'integer',
              description: 'Total de vendas',
              example: 150
            },
            totalRevenue: {
              type: 'number',
              description: 'Receita total em reais (R$)',
              example: 7500000
            },
            pendingSales: {
              type: 'integer',
              description: 'Vendas pendentes',
              example: 5
            },
            completedSales: {
              type: 'integer',
              description: 'Vendas concluídas',
              example: 140
            },
            cancelledSales: {
              type: 'integer',
              description: 'Vendas canceladas',
              example: 5
            },
            averageSalePrice: {
              type: 'number',
              description: 'Preço médio de venda em reais (R$)',
              example: 50000
            },
            salesByMonth: {
              type: 'array',
              description: 'Vendas por mês',
              items: {
                type: 'object',
                properties: {
                  month: {
                    type: 'string',
                    example: 'Janeiro'
                  },
                  sales: {
                    type: 'integer',
                    example: 12
                  },
                  revenue: {
                    type: 'number',
                    example: 600000
                  }
                }
              }
            },
            salesByPaymentMethod: {
              type: 'array',
              description: 'Vendas por método de pagamento',
              items: {
                type: 'object',
                properties: {
                  method: {
                    type: 'string',
                    example: 'cash'
                  },
                  count: {
                    type: 'integer',
                    example: 80
                  },
                  revenue: {
                    type: 'number',
                    example: 4000000
                  }
                }
              }
            }
          }
        },
        RevenueMetrics: {
          type: 'object',
          properties: {
            totalRevenue: {
              type: 'number',
              description: 'Receita total em reais (R$)',
              example: 2426000
            },
            period: {
              type: 'object',
              properties: {
                startDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de início do período',
                  example: '2025-10-14'
                },
                endDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de fim do período',
                  example: '2025-10-15'
                }
              }
            }
          }
        },
        SalesByDay: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              format: 'date',
              description: 'Data',
              example: '2025-10-14'
            },
            count: {
              type: 'integer',
              description: 'Número de vendas',
              example: 38
            },
            revenue: {
              type: 'number',
              description: 'Receita em reais (R$)',
              example: 2426000
            }
          }
        },
        SalesByDayMetrics: {
          type: 'object',
          properties: {
            salesByDay: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/SalesByDay'
              }
            },
            period: {
              type: 'object',
              properties: {
                startDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de início do período',
                  example: '2025-10-14'
                },
                endDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de fim do período',
                  example: '2025-10-15'
                }
              }
            }
          }
        },
        TopSeller: {
          type: 'object',
          properties: {
            sellerId: {
              type: 'string',
              description: 'ID do vendedor',
              example: '68ed57a3572e134dd39350ce'
            },
            sellerName: {
              type: 'string',
              description: 'Nome do vendedor',
              example: 'Administrador'
            },
            salesCount: {
              type: 'integer',
              description: 'Número de vendas',
              example: 38
            },
            revenue: {
              type: 'number',
              description: 'Receita em reais (R$)',
              example: 2426000
            },
            commission: {
              type: 'number',
              description: 'Comissão em reais (R$)',
              example: 121300
            }
          }
        },
        TopSellersMetrics: {
          type: 'object',
          properties: {
            topSellers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TopSeller'
              }
            },
            period: {
              type: 'object',
              properties: {
                startDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de início do período',
                  example: '2025-10-14'
                },
                endDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de fim do período',
                  example: '2025-10-15'
                }
              }
            }
          }
        },
        TotalSalesMetrics: {
          type: 'object',
          properties: {
            totalSales: {
              type: 'integer',
              description: 'Total de vendas',
              example: 1
            },
            periodComparison: {
              type: 'object',
              properties: {
                salesGrowth: {
                  type: 'number',
                  description: 'Crescimento de vendas (%)',
                  example: 0
                },
                previousPeriodSales: {
                  type: 'integer',
                  description: 'Vendas do período anterior',
                  example: 0
                }
              }
            },
            period: {
              type: 'object',
              properties: {
                startDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de início do período',
                  example: '2025-10-14'
                },
                endDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de fim do período',
                  example: '2025-10-15'
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
