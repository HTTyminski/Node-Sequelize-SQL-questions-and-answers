const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {
    console.log("Tabela criada!");
});


// const Perguntas = Pergunta.findAll({ raw: true }).then(perguntas => {
//     console.log(perguntas);
//     render("index", {
//         perguntas: perguntas
//     });
// });




//sincroniza com o banco de dados
//forse: false - não força a criação da tabela caso ela exista
module.exports = Pergunta;