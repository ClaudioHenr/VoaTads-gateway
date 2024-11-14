const axios = require('axios')

async function login(req, res) {
    const { login, password } = req.body;
    try {
        const auth = { "login": login, "password": password }
        const responseAuth = await axios.post('http://localhost:5000/login', auth)
        const userAuth = responseAuth.data;
        if (!userAuth){
            return res.status(404).json({ 
                message: "Usuário não encontrado"
            });
        }
        if (userAuth) {
            if (userAuth.type == '1') {
                const responseUser = await axios.get(`http://localhost:5001/employees/${userAuth.idUser}`)
                const employee = responseUser.data
                return res.status(200).json({
                    message: 'Login feito com sucesso',
                    auth: userAuth,
                    user: employee
                })
            } else if (userAuth.type == '2') {
                console.log(userAuth.type)
                console.log(userAuth.idUser)
                const responseUser = await axios.get(`http://localhost:5002/customers/${userAuth.idUser}`)
                const customer = responseUser.data
                console.log(responseUser.data.customer)
                return res.status(200).json({
                    message: 'Login feito com sucesso',
                    auth: userAuth,
                    user: customer
                })
            }
        }
        
        return res.status(401).json({ 
            message: "Credenciais inválidas"
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Erro na autenticação', error});
    }
}

module.exports = { login }