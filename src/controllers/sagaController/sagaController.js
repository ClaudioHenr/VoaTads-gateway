const axios = require('axios')

async function createBooking(req, res) {
    const newBooking  = req.body
    try {
        const response = await axios.post(`http://localhost:5010/bookings/create`, newBooking)
        const booking = response.data
        if (booking) {
            return res.status(200).json({
                booking: booking
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro na criação de reserva' });
    } 
}

module.exports = { createBooking }