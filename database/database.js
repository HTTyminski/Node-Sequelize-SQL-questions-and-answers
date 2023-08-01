const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','user','password',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
