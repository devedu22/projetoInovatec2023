const RemedyModel = require('../models/Remedy')
const ObjectId = require('mongodb').ObjectId

class RemedyController {

    static async register(req, res) {
        try {
            const { name, type, form, dosage } = req.body;

            const remedy = await RemedyModel.create(req.body);
    
            return res.json({
                error: false,
                message: "Medicamento Cadastrado com sucesso!",
                data: remedy // Retorna o Medicamento criado em um objeto
            });
        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar o Medicamento. Por favor, verifique novamente os campos."
            });
        }
    }

    static async update (req, res) {
        try {
            const { id, name, type, form, dosage } = req.body;

            // transformando o id do objeto em classe objectId
            const objectId = new ObjectId(id)

            // busca um Medicamento no banco de dados com base objectId fornecidos
            const remedy = await RemedyModel.findOne({ "_id": objectId });
            console.log(remedy)
            
            if (!remedy) {
                // se nenhum Medicamento for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Medicamento não encontrado. Verifique o name e código informado e tente novamente.'
                });
            }
        
            // atualiza informações do medicamento no banco de dados
            await RemedyModel.updateOne({ "_id": objectId }, { name: name, type: type, form: form, dosage: dosage });

            return res.json({
                error: false,
                message: 'Medicamento atualizado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao atualizar o Medicamento. Por favor, tente novamente mais tarde.',
            });
        }
    }


    static async delete (req, res) {
        try {
            const { id } = req.body;
    
            // transformando o id do objeto em classe objectId
            const objectId = new ObjectId(id)

            // deleta um Medicamento no banco de dados com base objectId fornecidos
            const remedy = await RemedyModel.findOne({ "_id": objectId });
    
            if (!remedy) {
                // se nenhum Medicamento for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'medicamento não encontrado. Verifique o name e codigo informado e tente novamente.'
                });
            }
    
            // deleta informações do Medicamento no banco de dados
            await RemedyModel.deleteOne({ "_id": objectId });
    
            return res.json({
                error: false,
                message: 'Medicamento deletado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao deletar o Medicamento. Por favor, tente novamente mais tarde.',
            });
        }
    }


}

module.exports = RemedyController