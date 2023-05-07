const SpecialityModel = require('../models/Speciality')
const MedicModel = require('../models/Medic')
const PatientModel = require('../models/Patient')
const SchedulingModel = require('../models/Scheduling')

class SchedulingController {

    static async register(req, res) {
            try{
                const {doctorCrm , patientCpf, SpecialityCode, appointmentDate, hourInit} = req.body;
                if (patientCpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                    return res.status(400).json({
                        error: true,
                        message: "CPF inválido. O CPF deve ter 11 caracteres."
                    });
                }
                // Verifica se o CPF desse paciente já existe
                const patient = await PatientModel.findOne({ cpf : patientCpf })
                if (!patient) {
                    return res.status(400).json({
                        error: true,
                        message: "CPF informado não está vinculado à um usuário cadastrado!"
                    });
                }

                const medic = await MedicModel.findOne({ crm : doctorCrm })
                if (!medic) {
                    return res.status(400).json({
                        error: true,
                        message: "CRM informado não está vinculado à um médico cadastrado!"
                    });
                }
                
                const Speciality = await Speciality.findOne({ cod : SpecialityCode})

                if (!Speciality) {
                    return res.status(400).json({
                        error: true,
                        message: "codigo informado não está vinculado à um procedimento cadastrado!"
                    });
                }

                const schedulingExisting = await SchedulingModel.findOne({ doctorCrm, appointmentDate, hourInit })
                
                console.log(schedulingExisting)

                if (!schedulingExisting) {
                    const scheduling = await SchedulingModel.create(req.body); 
                    return res.json({
                        error: false,
                        message: "Agendamento cadastrado com sucesso!",
                        data: scheduling // Retorna o Agendamento criado em um objeto
                    });   
                }
                
                return res.status(400).json({
                    error: true,
                    message: "Scheduling already exists!"
                });
                     
                
            } catch{
                return res.status(500)
            }
    }
}

module.exports = SchedulingController