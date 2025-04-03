const express = require("express")    // Criação do express
const app = express()     // Tudo Relacionado ao express, está na const app
const path = require("path");
const bodyParser = require('body-parser')
const Cadastro = require('./models/Cadastro')   // NN sei se está certo
const bd = require('./models/db')
const mysql = require('mysql2')

// Configurações
    // Body-Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// Rotas
    app.use(express.static(path.join(__dirname, 'Front'))); // <- Carrega arquivos estaticos


    app.post("/cadastro-form", async function(req, res){ // Rota para quando o cadastro for feito
        try{
            const email = req.body.email
            const query = 'SELECT * FROM usuarios WHERE email = :email' // Faz a consulta no Banco de Dados
            const replacements = {email: email}

            const [results] = await bd.sequelize.query(query, {
                replacements: replacements,
                type: bd.Sequelize.QueryTypes.SELECT
            })

            if (results && results.email) {      // Bloco de código, se o e-mail já existir
                return res.status(400).json({ error: 'E-mail já cadastrado' }); 
            } else {      // Bloco de código se for um cadastro novo
                await Cadastro.create({      // Cria o usuário
                    id: req.body.id,
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })
                return res.status(200).json({message: 'Cadastro realizado com sucesso'})
            }
            
        } catch (error) { // Bloco se código se houver algum erro na execução
            console.error(error)
            return res.status(500).json({ error: 'Erro ao processar aplicação' });
        }
    })

    app.post("/login-form", async function (req, res) {  // Rota para quando o login for feito
        try {
            const emailSenha = {  // Cria-se um objeto para receber os dados vindo do front-end( email e senha )
                senha: req.body.senha,
                email: req.body.email
            }

            const query = 'SELECT * FROM usuarios WHERE email = :email'  // Faz a consulta no Banco de Dados
            const replacements = {email: emailSenha.email}

            const [results] = await bd.sequelize.query(query, {
                replacements: replacements,
                type: bd.Sequelize.QueryTypes.SELECT
            })

            if (results == undefined) {  // Retorna esse valor se o email ainda não for cadastrado
                return res.status(400).json({error: 'E-mail não reconhecido'})
            } else {
                if (emailSenha.email == results.email && emailSenha.senha == results.senha) {  // Retorna esse valor se o email e a senha estiverem corretos
                    return res.status(200).json({message: 'Login realizado com sucesso'})
                } else {  // Retorna esse valor se o email e a senha não baterem
                    return res.status(400).json({error: 'O E-mail ou senha estão incorretos'})
                }
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Erro ao processar aplicação'})
        }
    })

    app.get("/home", function(req, res){    
        res.sendFile(__dirname + "/Front/index.html")  // Rota para a página principal
    })


    app.get("/produtos", function(req, res){
        res.sendFile(__dirname + "/Front/produtos.html")  // Rota para a página de produtos
    })


    app.get("/contato", function(req, res){
        res.sendFile(__dirname + "/Front/contato.html")  // Rota para a página de contatos
    })


    app.get("/login", function(req, res){
        res.sendFile(__dirname + "/Front/login.html")  // Rota para a página de login
    })


    app.get("/cadastro", function(req, res){
        res.sendFile(__dirname + "/Front/cadastro.html")  // Rota para a página de cadastro
    })


app.listen(8082, function(){
    console.log('Servidor rodando na porta 8082')
})   // Sempre manter essa linha no Final do código