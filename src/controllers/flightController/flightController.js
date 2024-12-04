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

async function getAirports(req, res) {
    try {
        const response = await axios.get(`http://localhost:5004/flights/airports`)
        const airports = response.data
        console.log(response.data)
        if (airports) {
            return res.status(200).json({
                airports: airports
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro serviço voos ao recuperar aeroportos' });
    }
}


async function getTravels(req, res) {
    const flight = req.body
    console.log(flight)
    try {
        const response = await axios.post(`http://localhost:5004/flights/travels`, flight)
        const travels = response.data
        if (travels) {
            return res.status(200).json({
                travels: travels
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro serviço voos' });
    }
}

async function createFlight(req, res) {
    const flight = req.body
    try {
        const response = await axios.post(`http://localhost:5004/flights`, flight)
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

module.exports = { getFlights, createFlight, getAirports, getTravels }