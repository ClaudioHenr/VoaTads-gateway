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
require('dotenv-safe').config();

const { sendEmail } = require('./utils/sendEmail')

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
//const customerServiceProxy = httpProxy('http://localhost:5001');


app.get('/email', (req, res) => {
    const { email } = req.body
    sendEmail(email)
})

// ENDPOINT Microsserviços fake -> o json-server simula o microsserviço
// LOGIN
app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    console.log("chegou")
    try {
        // Requisição ao json-server - Buscar Login
        const responseAuth = await axios.get('http://localhost:5000/authentication') // URL do json-server
        const usersAuth = responseAuth.data;
        console.log("Lista de auths: ", usersAuth)
        const userAuth = usersAuth.find(u => u.login === login && u.password === password)

        // Requisição ao json-server - Buscar usuário
        if (userAuth) {
            if (userAuth.role === 1) {
                const responseUser = await axios.get(`http://localhost:5000/employees/${userAuth.id}`)
                const employee = responseUser.data
                return res.status(200).json({
                    message: 'Login feito com sucesso',
                    auth: userAuth,
                    user: employee
                })
            } else if (userAuth.role === 2) {
                const responseUser = await axios.get(`http://localhost:5000/customers/${userAuth.id}`)
                const customer = responseUser.find(u => u.id === userAuth.id)
                return res.status(200).json({
                    message: 'Login feito com sucesso',
                    auth: userAuth,
                    user: customer
                })
            }
        }
        
        res.status(401).json({ 
            message: "Credenciais inválidas"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de autenticação: ', error });
    }
})

// Requisição de todos os clientes
app.get('/customers', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/customers')
        const users = response.data
        if (users) {
            return res.status(200).json({
                customers: users
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
})

// Requisição de um cliente especifico
app.get('/customers/id')

// Criar cliente
app.post('/customers', async (req, res) => {
    const newCustomer = req.body
    console.log("Em body: ", req.body)
    try {
        // Criar cliente
        const response = await axios.post('http://localhost:5000/customers', newCustomer)
        console.log(response)
        // Enviar senha (xxxx) para o email

        return res.status(201).json({
            message: "Cliente adicionado com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
})

// Atualizar dados de cliente
app.put('/customers/id')

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log('Servidor ouvindo na porta', PORT);
});