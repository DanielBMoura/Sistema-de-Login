// Conexão com o Banco de Dados (Railway):
const Sequelize = require('sequelize');

// Configuração usando a URL do Railway (substitua pela sua)
const sequelize = new Sequelize('mysql://root:NWUjRUwhtyisdJZZyETbYMRcfIIYdoBP@turntable.proxy.rlwy.net:40295/railway', {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true, // Para conexões seguras (obrigatório no Railway)
      rejectUnauthorized: false // Ignora verificação de certificado (apenas para desenvolvimento)
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Teste de conexão
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao banco de dados no Railway!');
  })
  .catch(err => {
    console.error('❌ Erro na conexão:', err);
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};