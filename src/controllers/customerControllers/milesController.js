const axios = require('axios')
// Trocar a url para adicionar as milhas no back, http://localhost:5000/customers/miles/buy/:id
async function buyMiles(req, res) {
    const { id } = req.params
    const { miles } = req.body
    try {
        const user = await axios.patch(`http://localhost:5000/customers/${id}`, { "miles": miles })
        console.log(user.data)
        const transaction = {
            "transaction": "2024-10-30T12:45:05Z",
            "amount": 5000,
            "transactionType": "buy",
            "description": "Compra de milhas",
            "id_customer": "9bb58f2b"
        }
        await axios.post(`http://localhost:5000/transactions`, transaction)
        return res.status(201).json({
            message: "Milhas adicionadas a conta com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}
// Trocar a url para subtrair as milhas no back, http://localhost:5000/customers/miles/use/:id
async function useMiles(req, res) {
    const { id } = req.params
    const { miles } = req.body
    try {
        const user = await axios.patch(`http://localhost:5000/customers/${id}`, { "miles": miles })
        const transaction = {
            "transaction": "2024-10-30T12:45:05Z",
            "amount": 1000,
            "transactionType": "use",
            "description": "Uso de milhas",
            "id_customer": "9bb58f2b"
        }
        await axios.post(`http://localhost:5000/transactions`, transaction)
        return res.status(201).json({
            message: "Milhas usadas com sucesso"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}

module.exports = { buyMiles, useMiles }