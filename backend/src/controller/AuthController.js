const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConig = require('../config/auth.json')

class AuthController {

    static async register(req, res) {
        try {
            const { email, cpf, accessLevel } = req.body;
    
            // Validando CPF
            if (cpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                return res.status(400).json({
                    error: true,
                    message: "CPF inválido. O CPF deve ter 11 caracteres."
                });
            }
            
            // Verifica se o usuário já existe
            if (await UserModel.findOne({ email })) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário já existe!"
                });
            }
            // Verifica se o CPF desse usuário já existe

            if (await UserModel.findOne({ cpf })) {
                return res.status(400).json({
                    error: true,
                    message: "CPF informado já vinculado à um usuário cadastrado!"
                });
            }

            // Adicionando validador de nível de acesso do usuário
            if (!["ADM", "USR", "MED"].includes(accessLevel)){ // Corrigido a pedido do Carleson Kalebe - FrontEnd
                return res.status(400).json({
                    error: true,
                    message: "Erro ao cadastrar usuário. O nível de acesso deve ser Administrador(ADM), Usuário(USR) ou Médico(MED)"
                })
            }


            // Cria um novo usuário
            const User = await UserModel.create(req.body);
    
            console.log(User); // Console para teste
            return res.json({
                error: false,
                message: "Cadastrado com sucesso!",
                data: User // Retorna o usuário criado em um objeto
            });
        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar o usuário. Por favor, verifique novamente os campos."
            });
        }
    }
    
    static async recovery(req, res) {
        try {
            const { email, newPassword, cpf } = req.body;
    
            // criptografa a nova senha
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            // busca um usuário no banco de dados com base no email e cpf fornecidos
            const user = await UserModel.findOne({ email, cpf });
    
            if (!user) {
                // se nenhum usuário for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Usuário não encontrado. Verifique o email e cpf informados e tente novamente.'
                });
            }
    
            // atualiza a senha do usuário no banco de dados
            await UserModel.updateOne({ email }, { password: hashedPassword });
    
            return res.json({
                error: false,
                message: 'Senha atualizada com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao atualizar a senha do usuário. Por favor, tente novamente mais tarde.',
            });
        }
    }
    

    static async authenticate(req, res) {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email }).select("+password")

        // Verifica se o usuário existe
        if (!user) {
            return res.status(400).json({
                error: true,
                message: 'Usuário não encontrado! Verifique os dados informados e tente novamente!'
            })
        }
        // Verifica se a senha informada é válida
        if (! await bcrypt.compare(password, user.password)) {
            return res.status(400).send({
                error: true,
                message: 'Senha inválida!'
            })
        }

        user.password = undefined // Para não mostrar a senha do usuário na resposta

        // Cria um token para o usuário
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            cpf: user.cpf
        }, authConig.secret, {
            expiresIn: 600 // O token é válido por 10 minutos (600 segundos)
        })

        return res.json({ // Retorna usuario
            user,
            token
        })

    }

}

module.exports = AuthController
