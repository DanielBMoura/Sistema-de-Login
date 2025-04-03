const db = require('./db')

const Cadastro = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: db.Sequelize.STRING(100),
        allowNull: false,
    },
    email: {
        type: db.Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: db.Sequelize.STRING(255),
        allowNull: false,
    }
})

module.exports = Cadastro   // <- Se não tiver exportando, tentar executar o arquivo de novo

Cadastro.sync({force: true})