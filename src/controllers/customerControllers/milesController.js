const axios = require('axios');

async function buyMiles(req, res) {
    const { id } = req.params;
    const { miles } = req.body;
    const transactionPayload = {
        transactionDate: new Date().toISOString(),
        miles: miles,
        type: "ENTRADA",
        description: "COMPRA DE MILHAS"
    };

    try {
        const transactionResponse = await axios.post(`http://localhost:5002/customers/${id}/transactions`, transactionPayload);
        if (transactionResponse.status === 201) {
            const user = await axios.patch(`http://localhost:5002/customers/${id}/miles/buy`, { miles });
            return res.status(201).json({
                message: "Milhas adicionadas a conta com sucesso"
            });
        } else {
            return res.status(500).json({ message: 'Erro ao criar a transação' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}

async function useMiles(req, res) {
    const { id } = req.params;
    const { miles } = req.body;
    try {
        const user = await axios.patch(`http://localhost:5002/customers/${id}`, { "miles": miles });
        const transaction = {
            transaction: new Date().toISOString(),
            amount: miles,
            transactionType: "use",
            description: "Uso de milhas",
            id_customer: id
        };
        await axios.post(`http://localhost:5002/transactions`, transaction);
        return res.status(201).json({
            message: "Milhas usadas com sucesso"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de clientes' });
    }
}

module.exports = { buyMiles, useMiles };