const axios = require('axios')

// Utils
const { sendEmail } = require('../../utils/sendEmail')

const customerServiceUrl = 'http://localhost:5002'; // URL do serviço de customer
const sagaServiceUrl = 'http://localhost:5010'; // URL do serviço de saga

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
        res.status(500).json({ message: 'Erro serviço cliente' });
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
        res.status(500).json({ message: 'Erro serviço cliente' });
    }
}

async function createCustomer(req, res) {
    const newCustomer = req.body
    try {
        // Enviar solicitação para a saga
        console.log(newCustomer)
        const response = await axios.post(`${sagaServiceUrl}/customers/create`, newCustomer)
        return res.status(201).json({
            message: "Solicitação de criação de cliente enviada com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro na criação de cliente' });
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