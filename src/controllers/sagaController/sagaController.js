const axios = require('axios');
const { sendEmail } = require('../../utils/sendEmail'); // Certifique-se de que o caminho está correto

function generateRandomPassword() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Gera uma senha aleatória de 4 dígitos numéricos
}

async function createBooking(req, res) {
    const newBooking = req.body;
    try {
        const response = await axios.post(`http://localhost:5010/bookings/create`, newBooking);
        const booking = response.data;
        if (booking) {
            return res.status(200).json({
                booking: booking
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro na criação de reserva' });
    }
}

async function createCustomer(req, res) {
    const newCustomer = req.body;
    const password = generateRandomPassword();
    newCustomer.password = password; // Adiciona a senha aleatória ao objeto newCustomer
    try {
        console.log(newCustomer);
        const response = await axios.post(`http://localhost:5010/customers/create`, newCustomer, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            // Enviar e-mail de sucesso
            await sendEmail(newCustomer.email, password);
            return res.status(201).json({
                message: "Solicitação de criação de cliente enviada com sucesso"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro na criação de cliente' });
    }
}

async function createEmployee(req, res) {
    const newEmployee = req.body;
    const password = generateRandomPassword();
    newEmployee.password = password; // Adiciona a senha aleatória ao objeto newEmployee
    try {
        console.log(newEmployee);
        const response = await axios.post(`http://localhost:5010/employees/create`, newEmployee, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            // Enviar e-mail de sucesso
            await sendEmail(newEmployee.email, password);
            return res.status(201).json({
                message: "Solicitação de criação de funcionário enviada com sucesso"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro na criação de funcionário' });
    }
}

async function updateEmployee(req, res) {
    const { id } = req.params
    const updateEmployee = req.body
    console.log("Em body: ", req.body)
    try {
        const response = await axios.put(`http://localhost:5010/employees/update/${id}`, updateEmployee)
        console.log(response.data)
        return res.status(200).json({
            message: "funcionario atualizado com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de funcionarios' });
    }
}

module.exports = { createBooking, createCustomer, createEmployee, updateEmployee };