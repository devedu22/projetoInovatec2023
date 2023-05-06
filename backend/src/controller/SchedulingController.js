const ProcedureModel = require('../models/Procedure')
const MedicModel = require('../models/Medic')
const PatientModel = require('../models/Patient')
const SchedulingModel = require('../models/Scheduling')

class SchedulingController {

    static async register(req, res) {
            try{
                const {crm , cpf, procedureCode} = req.body;
                if (cpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                    return res.status(400).json({
                        error: true,
                        message: "CPF inválido. O CPF deve ter 11 caracteres."
                    });
                }
                // Verifica se o CPF desse paciente já existe
                const patient = await PatientModel.findOne({ cpf })
                if (!patient) {
                    return res.status(400).json({
                        error: true,
                        message: "CPF informado não está vinculado à um usuário cadastrado!"
                    });
                }

                const medic = await MedicModel.findOne({ crm })
                if (!medic) {
                    return res.status(400).json({
                        error: true,
                        message: "CRM informado não está vinculado à um médico cadastrado!"
                    });
                }
                
                const procedure = await ProcedureModel.findOne({ procedureCode })
                if (!procedure) {
                    return res.status(400).json({
                        error: true,
                        message: "codigo informado não está vinculado à um procedimento cadastrado!"
                    });
                }
                
                const scheduling = await SchedulingModel.create(req.body); //Se tudo der certo, cadastra o médico
    
                return res.json({
                    error: false,
                    message: "Agendamento cadastrado com sucesso!",
                    data: scheduling // Retorna o médico criado em um objeto
                });
                
            } catch{
                return res.status(200)
            }
    }
}

module.exports = SchedulingController