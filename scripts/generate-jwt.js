#!/usr/bin/env node

const jwt = require('jsonwebtoken');

// Configuração do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Função para gerar token
function generateToken(userId, email, role) {
  const payload = {
    id: userId,
    email: email,
    role: role
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

// Função para decodificar token
function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar token:', error.message);
    return null;
  }
}

// Exemplos de tokens
const examples = {
  admin: {
    userId: '68d17845a08df9f982e3397a',
    email: 'admin@test.com',
    role: 'admin'
  },
  vendedor: {
    userId: '68d17845a08df9f982e3397b',
    email: 'vendedor@test.com',
    role: 'vendedor'
  }
};

console.log('🔐 Gerador de JWT Tokens - Backoffice Veículos BFF\n');

// Gerar tokens de exemplo
Object.entries(examples).forEach(([type, user]) => {
  const token = generateToken(user.userId, user.email, user.role);
  const decoded = decodeToken(token);
  
  console.log(`📋 Token para ${type.toUpperCase()}:`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Role: ${user.role}`);
  console.log(`   Token: ${token}`);
  console.log(`   Expira em: ${new Date(decoded.exp * 1000).toLocaleString()}`);
  console.log('');
});

// Se argumentos foram fornecidos via linha de comando
if (process.argv.length >= 5) {
  const [, , userId, email, role] = process.argv;
  
  if (!userId || !email || !role) {
    console.error('❌ Uso: node generate-jwt.js <userId> <email> <role>');
    console.error('   Exemplo: node generate-jwt.js 68d17845a08df9f982e3397a admin@test.com admin');
    process.exit(1);
  }

  const allowedRoles = ['admin', 'vendedor'];
  if (!allowedRoles.includes(role)) {
    console.error('❌ Role deve ser "admin" ou "vendedor"');
    process.exit(1);
  }

  const token = generateToken(userId, email, role);
  const decoded = decodeToken(token);
  
  console.log('🎯 Token personalizado gerado:');
  console.log(`   User ID: ${userId}`);
  console.log(`   Email: ${email}`);
  console.log(`   Role: ${role}`);
  console.log(`   Token: ${token}`);
  console.log(`   Expira em: ${new Date(decoded.exp * 1000).toLocaleString()}`);
}

console.log('💡 Dicas:');
console.log('   - Use estes tokens no header: Authorization: Bearer <token>');
console.log('   - Para desenvolvimento local, use: test-token');
console.log('   - Tokens expiram em 24 horas por padrão');
console.log('   - Configure JWT_SECRET no .env para produção');
