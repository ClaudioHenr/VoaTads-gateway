const axios = require('axios')

async function login(req, res) {
    const { login, password } = req.body;
    console.log("chegou")
    try {
        // Requisição ao json-server - Buscar Login
        const responseAuth = await axios.get('http://localhost:5000/authentication') // URL do json-server
        const usersAuth = responseAuth.data;
        console.log("Lista de auths: ", usersAuth)
        const userAuth = usersAuth.find(u => u.login === login && u.password === password)
        if (!userAuth){
            return res.status(404).json({ 
                message: "Usuário não encontrado"
            });
        }

        // Requisição ao json-server - Buscar usuário
        if (userAuth) {
            if (userAuth.role === 1) {
                const responseUser = await axios.get(`http://localhost:5000/employees/${userAuth.id}`)
                const employee = responseUser.data
                return res.status(200).json({
                    message: 'Login feito com sucesso',
                    auth: userAuth,
                    user: employee
                })
            } else if (userAuth.role === 2) {
                const responseUser = await axios.get(`http://localhost:5000/customers/${userAuth.id}`)
                const customer = responseUser.find(u => u.id === userAuth.id)
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
        console.error("Erro ao acessar o serviço de autenticação:", error);
        res.status(500).json({ message: 'Erro ao acessar o serviço de autenticação: ', error: error.message });
    }
}

module.exports = { login }