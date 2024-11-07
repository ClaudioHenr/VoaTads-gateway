const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.JWT_SECRET || 'my_secret_key';  // Recomendado definir em variáveis de ambiente
const EXPIRATION_TIME = process.env.JWT_EXPIRATION || '1h';    // 1 hora (use '1h', '2d', etc.)

/**
 * Gera um token JWT usando o nome de usuário e define uma data de expiração.
 *
 * @param {string} username - Nome de usuário para o qual o token é gerado
 * @returns {string} - Token JWT gerado
 */
function generateToken(username) {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
}

/**
 * Valida um token JWT verificando sua assinatura e expiração.
 *
 * @param {string} token - Token JWT a ser validado
 * @returns {boolean} - Retorna true se o token for válido, caso contrário false
 */
function validateToken(token) {
    try {
        jwt.verify(token, SECRET_KEY);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Extrai o nome de usuário de um token JWT.
 *
 * @param {string} token - Token JWT do qual extrair o nome de usuário
 * @returns {string|null} - Retorna o nome de usuário ou null se o token for inválido
 */
function getUsernameFromToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.username;
    } catch (error) {
        return null;
    }
}

/**
 * Extrai as "claims" (informações adicionais) de um token JWT.
 *
 * @param {string} token - Token JWT do qual extrair as claims
 * @returns {object|null} - Retorna as claims contidas no token ou null se o token for inválido
 */
function getClaimsFromToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

// Exporta as funções para uso em outros módulos
module.exports = {
    generateToken,
    validateToken,
    getUsernameFromToken,
    getClaimsFromToken,
};
