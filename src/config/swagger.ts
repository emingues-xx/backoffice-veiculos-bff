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
        }
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
