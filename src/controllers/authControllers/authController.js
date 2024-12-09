const axios = require('axios');
const { generateToken } = require('../../utils/JwtUtil');

async function login(req, res) {
    const { login, password } = req.body;
    try {
        const auth = { "login": login, "password": password };
        const responseAuth = await axios.post('http://localhost:5000/login', auth);
        const userAuth = responseAuth.data;
        if (!userAuth) {
            return res.status(404).json({ 
                message: "Usuário não encontrado"
            });
        }
        if (userAuth) {
            const token = generateToken(userAuth.login); // Gerar o token JWT
            if (userAuth.type == '1') {
                const responseUser = await axios.get(`http://localhost:5001/employees/email/${userAuth.login}`);
                const employee = responseUser.data;
                return res.status(200).json({
                    message: 'Login feito com sucesso',
                    auth: userAuth,
                    user: employee,
                    token: token // Retornar o token JWT
                });
            } else if (userAuth.type == '2') {
                const responseUser = await axios.get(`http://localhost:5002/customers/email/${userAuth.login}`);
                const customer = responseUser.data;
                return res.status(200).json({
                    message: 'Login feito com sucesso',
                    auth: userAuth,
                    user: customer,
                    token: token // Retornar o token JWT
                });
            }
        }
        
        return res.status(401).json({ 
            message: "Credenciais inválidas"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Erro na autenticação', error });
    }
}

module.exports = { login };