const axios = require('axios')

// Utils
const { sendEmail } = require('../../utils/sendEmail')

const employeeServiceUrl = 'http://employee:5001'; // URL do serviço de customer
const sagaServiceUrl = 'http://saga:5010'; // URL do serviço de saga

async function getEmployees(req, res) {
    try {
        const response = await axios.get(`${employeeServiceUrl}/employees`)
        const users = response.data
        if (users) {
            return res.status(200).json({
                employees: users
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro serviço funcionario' });
    }
}

async function getEmployee(req, res) {
    const { id } = req.params;
    try {
        const response = await axios.get(`${employeeServiceUrl}/employees/${id}`);
        const user = response.data;
        if (user) {
            return res.status(200).json({
                employees: user,
                miles: user.miles
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro serviço funcionario' });
    }
}

async function createEmployee(req, res) {
    const newEmployee = req.body
    try {
        // Enviar solicitação para a saga
        console.log(newEmployee)
        const response = await axios.post(`${sagaServiceUrl}/employees/create`, newEmployee)
        return res.status(201).json({
            message: "Solicitação de criação de funcionario enviada com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro na criação de funcionario' });
    }
}

async function updateEmployee(req, res) {
    const { id } = req.params
    const updateEmployee = req.body
    console.log("Em body: ", req.body)
    try {
        const response = await axios.put(`${sagaServiceUrl}/employees/update/${id}`, updateEmployee)
        console.log(response.data)
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
        const response = await axios.put(`${sagaServiceUrl}/employees/delete/${id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(`Error deleting employee with id ${id}:`, error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee }