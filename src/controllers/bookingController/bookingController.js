const axios = require('axios')

const bookingServiceUri = 'http://booking:5006';
const flightsServiceUri = 'http://flights:5004';

async function getBookingFlight(req, res) {
    const { id } = req.params;
    console.log(id)
    try {
        const responseBookings = await axios.get(`${bookingServiceUri}/bookings/view/${id}`) // Reservas do usuário
        const bookings = responseBookings.data

        const responseFlights = await axios.get(`${flightsServiceUri}/flights`)
        const flights = responseFlights.data

        // Relacione reservas e voos
        const bookingFlightDetails = bookings.map(booking => {
            const flight = flights.find(flight => flight.codigoVoo == booking.codFlight);
            return {
                ...booking,
                flightDetails: flight || null,
            };
        });
        console.log(bookingFlightDetails)

        if (bookingFlightDetails) {
            return res.status(200).json({
                bookings: bookingFlightDetails
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro serviço visualizar reservas' });
    }
}

async function cancelBooking(req, res) {
    const { id } = req.params
    try {
        const response = await axios.patch(`${bookingServiceUri}/bookings/cancel/${id}`)
        console.log(response.status)
        if (response.status == 200) {
            return res.status(200).json({
                message: "Reserva cancelada com sucesso"
            })
        } else {
            return res.status(500).json({ 
                message: 'Erro ao cancelar reserva' 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar serviço de reservas' });
    }
}

async function checkInBooking(req, res) {
    const { id } = req.params
    try {
        const response = await axios.patch(`${bookingServiceUri}/bookings/checkin/${id}`)
        console.log(response.status)
        if (response.status == 200) {
            return res.status(200).json({
                message: "Check-in realizado com sucesso"
            })
        } else {
            return res.status(500).json({ 
                message: 'Erro ao realizar check-in' 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao acessar serviço de reservas' });
    }   
}

module.exports = { getBookingFlight, cancelBooking, checkInBooking }