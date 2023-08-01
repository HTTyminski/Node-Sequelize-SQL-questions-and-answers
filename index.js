const express = require('express');
const app = express();
const port = 5000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//permite que os dados do formulario sejam enviados para o backend
app.use(bodyParser.json());//ler dados de formularios enviados via json
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');


//teste database
connection
.authenticate()
.then(() => {
    console.log("Conexão feita com o banco de dados!");
}).catch((msgErro) => {
    console.log(msgErro);
});

app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true,order:[['id','DESC']] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
})

app.get('/perguntar', (req, res) => {
    res.render("perguntar");
});

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //res.send("formulario recebido! Titulo:" + titulo + descricao);
    //INSERT INTO perguntas (titulo, descricao) VALUES (titulo, descricao);
    //salvar no banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");//redireciona para a pagina principal
    });
});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {//pergunta encontrada
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order:[['id','DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            }); 
        } else {//pergunta não encontrada
            res.redirect("/");
        }
    });
});

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    //res.send("formulario recebido! Titulo:" + titulo + descricao);
    //INSERT INTO perguntas (titulo, descricao) VALUES (titulo, descricao);
    //salvar no banco de dados
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);//redireciona para a pagina principal
    }).catch((erro) => {
        console.log(erro);
    }
    );
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});