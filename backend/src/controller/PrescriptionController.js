const PrescriptionModel = require('../models/Prescription');

class PrescriptionController {

    static async findPrescriptionCod(req,res){
        
        try {
            const { cod } = req.body;
            const prescriptions = await PrescriptionModel.find({ prescription : cod });

            if(prescriptions.length ==  0){
                return res.json({
                    error: true,
                    message: "Nenhuma prescrição encontrada para essa especialidade!",
                    data: prescriptions // Retorna o procedimento criado em um objeto
                });
            }
            return res.json({
                error: false,
                message: "Prescrição encontrada com sucesso!",
                data: prescriptions
            });
            
        }catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao buscar o procedimento. Por favor, verifique novamente os campos."
            });
        }
    }


    static async register(req, res) {
        try {
            const { name, cod } = req.body;
            
            if (await PrescriptionModel.findOne({ cod })) {
                return res.status(400).json({
                    error: true,
                    message: "codigo informado já vinculado à um procedimento cadastrado!"
                });
            }

            if (await PrescriptionModel.findOne({ name })) {
                return res.status(400).json({
                    error: true,
                    message: "Nome informado já vinculado à um procedimento cadastrado!"
                });
            }

            const Prescription = await PrescriptionModel.create(req.body);
    
            return res.json({
                error: false,
                message: "Prescrição Cadastrado com sucesso!",
                data: Prescription // Retorna o procedimento criado em um objeto
            });

        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar a prescrição. Por favor, verifique novamente os campos."
            });
        }
    }

        static async update(req, res) {
            try {
                const { name, cod } = req.body;
    
                const Prescription = await PrescriptionModel.findOne({ cod });
                
                if (!Prescription) {
                    return res.status(404).json({
                        error: true,
                        message: 'Prescrição não encontrada. Verifique o nome e código informado e tente novamente.'
                    });
                }
            
                await Prescription.updateOne({ cod }, { name: name });
    
                return res.json({
                    error: false,
                    message: 'Prescrição atualizada com sucesso!',
                });
        
            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: 'Ocorreu um erro ao atualizar a Prescrição. Por favor, tente novamente mais tarde.',
                });
            }
        }

        static async delete (req,res){

            try{
                const {cod} = req.body;

                const Prescription = await PrescriptionModel.findOne({ cod });

                if(!Prescription){
                    return res.status(404).json({
                        error: true,
                        message: 'Prescrição não encontrada. Verifique o nome e código informado e tente novamente.'
                    });
                }

                await Prescription.deleteOne({ cod });

                return res.json({
                    error:false,
                    message: 'Prescrição deletada com sucesso!',
                });

            }catch(err){
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: 'Ocorreu um erro ao deletar a Prescrição. Por favor, tente novamente mais tarde.',
                });
        }
    }
}
module.exports = PrescriptionController