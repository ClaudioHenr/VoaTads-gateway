const axios = require('axios')

async function getFlights(req, res) {
    try {
        const response = await axios.get(`http://localhost:5004/flights`)
        const flights = response.data
        if (flights) {
            return res.status(200).json({
                flights: flights
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro serviço voos' });
    }
}

module.exports = { getFlights }