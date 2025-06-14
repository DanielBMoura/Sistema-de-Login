const Sequelize = require('sequelize');
require('dotenv').config(); // Carrega variáveis do .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL === 'true', // Converte string para boolean
        rejectUnauthorized: false // Apenas para desenvolvimento
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Teste de conexão
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao banco de dados no Railway!');
  })
  .catch(err => {
    console.error('❌ Erro na conexão:', err);
  });

module.exports = {
  Sequelize,
  sequelize
};