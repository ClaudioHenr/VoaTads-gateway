const axios = require('axios')
// Importação dos módulos
const jwt = require('jsonwebtoken');
var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ) )
// parse application/json
app.use( bodyParser.json() )
// Configurações do app
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Habilitar CORS para todas as solicitações
app.use(cors({
    origin: "*"
}))
// Cria o servidor na porta 3000
var server = http.createServer(app);

// Criação dos proxies
//const authServiceProxy = httpProxy('http://localhost:5000');


// ENDPOINT Microsserviços fake -> o json-serve simula o microsserviço
// LOGIN
app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    console.log("chegou")
    try {
        // Requisição ao json-server
        const response = await axios.get('http://localhost:5000/authentication'); // URL do json-server
        const users = response.data;

        // Busca o usuário correspondente
        const user = users.find(u => u.login === login && u.password === password);
        const loginUser = user.login
        const passwordUser = user.password
        const roleUser = user.role

        if (user) {
            res.status(200).json({
                message: 'Login feito com sucesso',
                login: { loginUser, passwordUser, roleUser },
                user: { id: user.id, login: user.login } // Retorne as informações do usuário
            });
        } else {
            res.status(401).json({ 
                message: "Credenciais inválidas"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de autenticação' });
    }
})


server.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
});