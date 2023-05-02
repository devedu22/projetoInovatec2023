const MedicModel = require('../models/Medic')

class MedicController {

    static async register(req, res) {
        try {
            const {crm , cpf, email} = req.body;

            if (cpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                return res.status(400).json({
                    error: true,
                    message: "CPF inválido. O CPF deve ter 11 caracteres."
                });
            }
            
            if (await MedicModel.findOne({ crm })) {
                return res.status(400).json({
                    error: true,
                    message: "CRM informado já vinculado à um médico cadastrado!"
                });
            }

            if (await MedicModel.findOne({ email })) {
                return res.status(400).json({
                    error: true,
                    message: "Email informado já vinculado à um médico cadastrado!"
                });
            }

            if (await MedicModel.findOne({ cpf })) {
                return res.status(400).json({
                    error: true,
                    message: "CPF informado já vinculado à um médico cadastrado!"
                });
            }

            const medic = await MedicModel.create(req.body); //Se tudo der certo, cadastra o médico
    
            return res.json({
                error: false,
                message: "Médico cadastrado com sucesso!",
                data: medic // Retorna o médico criado em um objeto
            });
        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar o médico. Por favor, verifique novamente os campos."
            });
        }
    }

    static async update (req, res) {
        try {
            const { name, crm } = req.body;

            // busca um médico no banco de dados com base no name e CRM fornecidos
            const medic = await MedicModel.findOne({ crm });
            
            if (!medic) {
                // se nenhum médico for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Médico não encontrado. Verifique o name e CRM informado e tente novamente.'
                });
            }
        
            // atualiza informações do médico no banco de dados
            await MedicModel.updateOne({ cpf }, { dossierInit: dossierInit, dossierEnd: dossierInit, email: email });

            return res.json({
                error: false,
                message: 'Médico atualizado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao atualizar o Médico. Por favor, tente novamente mais tarde.',
            });
        }
    }


    static async delete (req, res) {
        try {
            const { name, crm } = req.body;
    
            // busca um médico no banco de dados com base no name e CRM fornecidos
            const medic = await MedicModel.findOne({ crm });
    
            if (!medic) {
                // se nenhum médico for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Médico não encontrado. Verifique o name e CRM informado e tente novamente.'
                });
            }
    
            // atualiza informações do médico no banco de dados
            await MedicModel.deleteOne({ crm }); // Deleta o médico
    
            return res.json({
                error: false,
                message: 'Médico deletado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao deletar o Médico. Por favor, tente novamente mais tarde.',
            });
        }
    }


}

module.exports = MedicController;
