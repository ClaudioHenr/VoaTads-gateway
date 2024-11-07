const axios = require('axios')

// Utils
const { sendEmail } = require('../../utils/sendEmail')

const customerServiceUrl = 'http://localhost:8080';

async function getCustomers(req, res) {
    try {
        const response = await axios.get(`${customerServiceUrl}/customers`)
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
}

async function getCustomer(req, res) {
    const { id } = req.params;
    try {
        const response = await axios.get(`${customerServiceUrl}/customers/${id}`);
        const user = response.data;
        if (user) {
            return res.status(200).json({
                customers: user,
                miles: user.miles
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}

async function createCustomer(req, res) {
    const newCustomer = req.body
    console.log("Em body: ", req.body)
    try {
        // Criar cliente
        const response = await axios.post(`${customerServiceUrl}/customers`, newCustomer)
        console.log(response.data)
        // Criar autenticação
        const randomPassword = Math.floor(1000 + Math.random() * 9000).toString()
        console.log("Senha: ", randomPassword)
        const authUser = {"login": response.data.email, "password": randomPassword, "role": 2}
        const responseAuth = await axios.post('http://localhost:5000/authentication', authUser)
        // Enviar senha (xxxx) para o email
        sendEmail(response.data.email, randomPassword)
        return res.status(201).json({
            message: "Cliente adicionado com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}

async function updateCustomer(req, res) {
    const { id } = req.params
    const updateCustomer = req.body
    console.log("Em body: ", req.body)
    try {
        const response = await axios.put(`${customerServiceUrl}/customers/${id}`, updateCustomer)
        console.log(response.data)
        return res.status(200).json({
            message: "Cliente atualizado com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}

async function deleteCustomer(req, res) {
    const { id } = req.params
    try {
        const response = await axios.delete(`${customerServiceUrl}/customers/${id}`)
        const user = response.data
        if (user) {
            return res.status(200).json({
                customers: user
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}

async function getTransactionsByCustomer(req, res) {
    const { id } = req.params;
    try {
        const response = await axios.get(`${customerServiceUrl}/customers/${id}/transactions`);
        const transactions = response.data;
        if (transactions) {
            return res.status(200).json(transactions);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de transações' });
    }
}

module.exports = { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer, getTransactionsByCustomer }