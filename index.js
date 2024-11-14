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

//Controllers
const authController = require('./src/controllers/authControllers/authController')
const customerController = require('./src/controllers/customerControllers/customerController')
const milesController = require('./src/controllers/customerControllers/milesController')
const employeeController = require('./src/controllers/employeeController/employeeController')
const flightController = require('./src/controllers/flightController/flightController')

// Criação dos proxies
//const authServiceProxy = httpProxy('http://localhost:5000');
//const customerServiceProxy = httpProxy('http://localhost:5001');

// ENDPOINT Microsserviços fake -> o json-server simula o microsserviço
// LOGIN
app.post('/login', authController.login)

// CLIENTES
app.get('/customers', customerController.getCustomers)
// Requisição de um cliente especifico
app.get('/customers/:id', customerController.getCustomer)
//Transações de um cliente
app.get('/customers/:id/transactions', customerController.getTransactionsByCustomer);
// Criar cliente
app.post('/customers', customerController.createCustomer)
// Atualizar dados de cliente
app.put('/customers/:id', customerController.updateCustomer)
// Remover cliente
app.delete('/customers/:id', customerController.deleteCustomer)
// Comprar milhas
app.post('/customers/:id/transactions', milesController.buyMiles)
app.patch('/customers/:id/miles/buy', milesController.buyMiles)
// Usar milhas
app.patch('/customers/miles/use/:id', milesController.useMiles)

// FUNCIONARIOS
app.get('/employees', employeeController.getEmployees)

app.get('/employees/:id', employeeController.getEmployee)

app.post('/employees', employeeController.createEmployee)

app.put('/employees/:id', employeeController.updateEmployee)

app.delete('/employees/:id', employeeController.deleteEmployee)

// VOOS
app.get('/flights', flightController.getFlights)

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log('Servidor ouvindo na porta', PORT);
});