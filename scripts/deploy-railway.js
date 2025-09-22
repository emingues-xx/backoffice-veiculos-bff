#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando deploy para Railway...\n');

// Verificar se Railway CLI está instalado
try {
  execSync('railway --version', { stdio: 'ignore' });
  console.log('✅ Railway CLI encontrado');
} catch (error) {
  console.log('❌ Railway CLI não encontrado. Instalando...');
  try {
    execSync('npm install -g @railway/cli', { stdio: 'inherit' });
    console.log('✅ Railway CLI instalado com sucesso');
  } catch (installError) {
    console.error('❌ Erro ao instalar Railway CLI:', installError.message);
    process.exit(1);
  }
}

// Verificar se está logado no Railway
try {
  execSync('railway whoami', { stdio: 'ignore' });
  console.log('✅ Logado no Railway');
} catch (error) {
  console.log('❌ Não está logado no Railway. Fazendo login...');
  try {
    execSync('railway login', { stdio: 'inherit' });
    console.log('✅ Login realizado com sucesso');
  } catch (loginError) {
    console.error('❌ Erro no login:', loginError.message);
    process.exit(1);
  }
}

// Verificar se o projeto está inicializado
if (!fs.existsSync('.railway')) {
  console.log('🔧 Inicializando projeto Railway...');
  try {
    execSync('railway init', { stdio: 'inherit' });
    console.log('✅ Projeto Railway inicializado');
  } catch (initError) {
    console.error('❌ Erro ao inicializar projeto:', initError.message);
    process.exit(1);
  }
}

// Verificar se as variáveis de ambiente estão configuradas
console.log('🔍 Verificando variáveis de ambiente...');
try {
  const variables = execSync('railway variables', { encoding: 'utf8' });
  
  const requiredVars = ['NODE_ENV', 'JWT_SECRET'];
  const missingVars = requiredVars.filter(varName => !variables.includes(varName));
  
  if (missingVars.length > 0) {
    console.log('⚠️  Variáveis de ambiente faltando:', missingVars.join(', '));
    console.log('📝 Configure as variáveis no dashboard do Railway ou use:');
    console.log('   railway variables set NODE_ENV=production');
    console.log('   railway variables set JWT_SECRET=sua-chave-secreta');
    console.log('   railway variables set API_BASE_URL=https://sua-api.railway.app');
    console.log('   railway variables set CORS_ORIGIN=https://seu-frontend.railway.app');
  } else {
    console.log('✅ Variáveis de ambiente configuradas');
  }
} catch (error) {
  console.log('⚠️  Não foi possível verificar variáveis de ambiente');
}

// Fazer build local para verificar se está tudo ok
console.log('🔨 Fazendo build local...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build local realizado com sucesso');
} catch (buildError) {
  console.error('❌ Erro no build local:', buildError.message);
  process.exit(1);
}

// Executar testes
console.log('🧪 Executando testes...');
try {
  execSync('npm test', { stdio: 'inherit' });
  console.log('✅ Testes passaram');
} catch (testError) {
  console.log('⚠️  Testes falharam, mas continuando com o deploy...');
}

// Deploy para Railway
console.log('🚀 Fazendo deploy para Railway...');
try {
  execSync('railway up', { stdio: 'inherit' });
  console.log('✅ Deploy realizado com sucesso!');
} catch (deployError) {
  console.error('❌ Erro no deploy:', deployError.message);
  process.exit(1);
}

// Obter URL do deploy
try {
  const url = execSync('railway domain', { encoding: 'utf8' }).trim();
  console.log(`\n🎉 Deploy concluído com sucesso!`);
  console.log(`🌐 URL: ${url}`);
  console.log(`📊 Health Check: ${url}/health`);
  console.log(`📚 API Docs: ${url}/api/veiculos`);
} catch (error) {
  console.log('\n🎉 Deploy concluído!');
  console.log('🌐 Verifique a URL no dashboard do Railway');
}

console.log('\n📝 Próximos passos:');
console.log('1. Configure as variáveis de ambiente no dashboard do Railway');
console.log('2. Teste a aplicação usando a URL fornecida');
console.log('3. Configure o domínio customizado se necessário');
console.log('4. Configure o frontend para usar a nova URL da API');
