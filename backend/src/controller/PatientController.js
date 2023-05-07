const PatientModel = require('../models/Patient')

class PatientController {

    static async register(req, res) {
        try {
            const { email, cpf } = req.body;
    
            // Validando CPF
            if (cpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                return res.status(400).json({
                    error: true,
                    message: "CPF inválido. O CPF deve ter 11 caracteres."
                });
            }
            // Verifica se o paciente já existe
            if (await PatientModel.findOne({ email })) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário já existe!"
                });
            }
            // Verifica se o CPF desse paciente já existe
            if (await PatientModel.findOne({ cpf })) {
                return res.status(400).json({
                    error: true,
                    message: "CPF informado já vinculado à um usuário cadastrado!"
                });
            }
            // Cria um novo paciente
            const patient = await PatientModel.create(req.body);
    
            console.log(patient); // Console para teste
            return res.json({
                error: false,
                message: "Paciente Cadastrado com sucesso!",
                data: patient // Retorna o paciente criado em um objeto
            });
        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar o paciente. Por favor, verifique novamente os campos."
            });
        }
    }

    static async update (req, res) {
        try {
            const { name, email, cpf } = req.body;

            // busca um paciente no banco de dados com base no email e cpf fornecidos
            const patient = await PatientModel.findOne({ cpf });
            
            if (!patient) {
                // se nenhum paciente for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Paciente não encontrado. Verifique o cpf informado e tente novamente.'
                });
            }
        
            // atualiza informações do paciente no banco de dados
            await PatientModel.updateOne({ cpf }, { name: name, email: email });

            return res.json({
                error: false,
                message: 'Paciente atualizado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao atualizar o paciente. Por favor, tente novamente mais tarde.',
            });
        }
    }


    static async delete (req, res) {
        try {
            const { cpf } = req.body;
    
            // busca um paciente no banco de dados com base no email e cpf fornecidos
            const patient = await PatientModel.findOne({ cpf });
    
            if (!patient) {
                // se nenhum paciente for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Paciente não encontrado. Verifique o cpf informado e tente novamente.'
                });
            }
    
            // atualiza informações do paciente no banco de dados
            await PatientModel.deleteOne({ cpf });
    
            return res.json({
                error: false,
                message: 'Paciente deletado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao deletar o paciente. Por favor, tente novamente mais tarde.',
            });
        }
    }


    static async registerSpeciality (req, res) {
        try {
            const { email, cpf } = req.body;
    
            // Validando CPF
            if (cpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                return res.status(400).json({
                    error: true,
                    message: "CPF inválido. O CPF deve ter 11 caracteres."
                });
            }
            // Verifica se o paciente já existe
            if (await PatientModel.findOne({ email })) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário já existe!"
                });
            }
            // Verifica se o CPF desse paciente já existe
            if (await PatientModel.findOne({ cpf })) {
                return res.status(400).json({
                    error: true,
                    message: "CPF informado já vinculado à um usuário cadastrado!"
                });
            }
            // Cria um novo paciente
            const patient = await PatientModel.create(req.body);
    
            console.log(patient); // Console para teste
            return res.json({
                error: false,
                message: "Paciente Cadastrado com sucesso!",
                data: patient // Retorna o paciente criado em um objeto
            });
        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar o paciente. Por favor, verifique novamente os campos."
            });
        }
    }


}

module.exports = PatientController