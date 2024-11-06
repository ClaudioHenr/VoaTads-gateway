const axios = require('axios')

// Utils
const { sendEmail } = require('../../utils/sendEmail')

async function getEmployees(req, res) {
    try {
        const response = await axios.get('http://localhost:5000/employees')
        const users = response.data
        if (users) {
            return res.status(200).json({
                Employees: users
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de funcionarios' });
    }
}

async function getEmployee(req, res) {
    const { id } = req.params
    try {
        const response = await axios.get(`http://localhost:5000/employees/${id}`)
        const user = response.data
        if (user) {
            return res.status(200).json({
                Employees: user
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de funcionarios' });
    }
}

async function createEmployee(req, res) {
    const newEmployee = req.body
    console.log("Em body: ", req.body)
    try {
        // Criar funcionario
        const response = await axios.post('http://localhost:5000/employees', newEmployee)
        console.log(response.data)
        // Criar autenticação
        const randomPassword = Math.floor(1000 + Math.random() * 9000).toString()
        const authUser = {"login": response.data.email, "password": randomPassword, "role": 1}
        const responseAuth = await axios.post('http://localhost:5000/authentication', authUser)
        // Enviar senha (xxxx) para o email
        sendEmail(response.data.email, randomPassword)
        return res.status(201).json({
            message: "funcionario adicionado com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de funcionarios' });
    }
}


async function updateEmployee(req, res) {
    const { id } = req.params
    const updateEmployee = req.body
    console.log("Em body: ", req.body)
    try {
        const response = await axios.put(`http://localhost:5000/employees/${id}`, updateEmployee)
        console.log(response)
        return res.status(200).json({
            message: "funcionario atualizado com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de funcionarios' });
    }
}

async function deleteEmployee(req, res) {
    const { id } = req.params
    try {
        const response = await axios.delete(`http://localhost:5000/employees/${id}`)
        const user = response.data
        if (user) {
            return res.status(200).json({
                Employees: user
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de funcionarios' });
    }
}

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee }