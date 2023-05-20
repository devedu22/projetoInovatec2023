const SpecialityModel = require('../models/Speciality')
const DoctorModel = require('../models/Medic')

class SpecialityController {
    static async findDoctorBySpeciality(req,res){
        
        try {
            const { cod } = req.body;
            const medics = await DoctorModel.find({ speciality : cod });

            if(medics.length ==  0){
                return res.json({
                    error: true,
                    message: "Nenhum médico encontrado para essa especialidade!",
                    data: medics // Retorna o procedimento criado em um objeto
                });
            }
            return res.json({
                error: false,
                message: "Médicos encontrados com sucesso!",
                data: medics // Retorna os medicos encontrado em um objeto
            });
            
        }catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao buscar o especialidade. Por favor, verifique novamente os campos."
            });
        }
    }

    static async register(req, res) {
        try {
            const { name, cod } = req.body;
            
            if (await SpecialityModel.findOne({ cod })) {
                return res.status(400).json({
                    error: true,
                    message: "codigo informado já vinculado à um especialidade cadastrado!"
                });
            }

            if (await SpecialityModel.findOne({ name })) {
                return res.status(400).json({
                    error: true,
                    message: "Nome informado já vinculado à um especialidade cadastrado!"
                });
            }

            const Speciality = await SpecialityModel.create(req.body);
    
            return res.json({
                error: false,
                message: "Especialidade Cadastrado com sucesso!",
                data: Speciality // Retorna o procedimento criado em um objeto
            });
        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar o especialidade. Por favor, verifique novamente os campos."
            });
        }
    }

    static async update(req, res) {
        try {
            const { name, cod } = req.body;

            // busca um procedimento no banco de dados com base no name e codigo fornecidos
            const Speciality = await SpecialityModel.findOne({ cod });
            
            if (!Speciality) {
                // se nenhum procedimento for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Especialidade não encontrado. Verifique o name e código informado e tente novamente.'
                });
            }
        
            // atualiza informações do procedimento no banco de dados
            await SpecialityModel.updateOne({ cod }, { name: name });

            return res.json({
                error: false,
                message: 'Especialidade atualizado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao atualizar o Especialidade. Por favor, tente novamente mais tarde.',
            });
        }
    }

    static async delete (req, res) {
        try {
            const { cod } = req.body;
    
            // busca um procedimento no banco de dados com base no name e codigo fornecidos
            const Speciality = await SpecialityModel.findOne({ cod });
    
            if (!Speciality) {
                // se nenhum procedimento for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Especialidade não encontrado. Verifique o name e codigo informado e tente novamente.'
                });
            }
    
            // atualiza informações do procedimento no banco de dados
            await SpecialityModel.deleteOne({ cod });
    
            return res.json({
                error: false,
                message: 'Especialidade deletado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao deletar o Especialidade. Por favor, tente novamente mais tarde.',
            });
        }
    }
}

module.exports = SpecialityController