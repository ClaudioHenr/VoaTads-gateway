const axios = require('axios')

// Utils
const { sendEmail } = require('../../utils/sendEmail')
const sagaServiceUrl = 'http://localhost:5010'; // URL do serviço de saga

async function getEmployees(req, res) {
    try {
        const response = await axios.get('http://localhost:5001/employees')
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
        const response = await axios.get(`http://localhost:5001/employees/${id}`)
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
    try {
        // Enviar solicitação para a saga
        console.log(newEmployee)
        const response = await axios.post(`${sagaServiceUrl}/employees/create`, newEmployee)
        return res.status(201).json({
            message: "Solicitação de criação de func. enviada com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro na criação de func.' });
    }
}


async function updateEmployee(req, res) {
    const { id } = req.params
    const updateEmployee = req.body
    console.log("Em body: ", req.body)
    try {
        const response = await axios.put(`http://localhost:5001/employees/${id}`, updateEmployee)
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
        const response = await axios.delete(`http://localhost:5001/employees/${id}`)
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