const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) { // Verifica se o token está sendo fornecido no cabeçalho
        return res.status(401).json({
            error: true,
            message: "Acesso negado! Token não informado no cabeçalho."
        })
    }

    const parts = authHeader.split(" "); //Divide Bearer do Token 
    if (parts.length !== 2) { // Verifica se o token está no formato correto
        return res.status(401).json({
            error: true,
            message: "Tipo de token inválido"
        })
    }

    const [scheme, token] = parts;

    if (scheme.indexOf("Bearer") !== 0) { // Verifica se o esquema de autenticação é válido
        return res.status(401).json({
            error: true,
            message: "Token mal formatado"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => { // Verifica se o token é válido
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token inválido/Expirado"
            })
        }
        req.userLogged = decoded; // Adiciona o ID do usuário ao objeto req
        next(); // remove o 'return' aqui
    })
}
