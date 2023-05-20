const SpecialityModel = require('../models/Speciality')
const DoctorModel = require('../models/Medic')
const PatientModel = require('../models/Patient')
const SchedulingModel = require('../models/Scheduling')

class SchedulingController {
    static async verifyScheduleDoctor(req, res){
        try{
            const { doctorCrm, appointmentDate } = req.body;
            const scheduling = await SchedulingModel.find({ doctorCrm, appointmentDate })

            if (scheduling.length == 0) {
                return res.status(400).json({
                    error: true,
                    message: "Medico com agenda Vazia!"
                });
            }
            return res.status(200).json({
                error: false,
                message: "Agenda:",
                data:scheduling
            })
        }catch{
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao buscar a agenda do médico solicitado. Por favor, verifique novamente os campos."
            });
        }
    }

    static async listSchedulesByDay(req, res){
        try{
            const { appointmentDate } = req.body;
            const scheduling = await SchedulingModel.find({ appointmentDate })

            if (scheduling.length == 0) {
                return res.status(400).json({
                    error: true,
                    message: "Agenda Vazia para esse dia!"
                });
            }
            return res.status(200).json({
                error: false,
                message: "Agenda do dia:",
                data:scheduling
            })
        }catch{
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao buscar a agenda do médico solicitado. Por favor, verifique novamente os campos."
            });
        }
    }

    static async filterHoursDoctor(req, res){
        try{
            const { doctorCrm, appointmentDate } = req.body;

            const schedule = await SchedulingModel.find({ doctorCrm, appointmentDate })
            const medic = await DoctorModel.findOne({ crm : doctorCrm})
            
            console.log(schedule)

            let  newList = [];
            for (let i = 0; i < schedule.length; i++) {
                let hourExcluir = schedule[i].hourInit;
                newList = medic.hoursService.filter(function(hora) {
                    return hora !== hourExcluir;})
              }
            
            const medicResponse = {
                crm: medic.crm,
                name: medic.name,
                hours: newList
            }
            
            return res.status(200).json({
                error: false,
                message: "Horarios livres:",
                data:medicResponse
            })
        }catch(err){
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao buscar a agenda do médico solicitado. Por favor, verifique novamente os campos."
            });
        }
    }

    static async register(req, res) {
            try{
                const {doctorCrm , patientCpf, appointmentDate, hourInit} = req.body;
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

                const medic = await DoctorModel.findOne({ crm : doctorCrm })
                if (!medic) {
                    return res.status(400).json({
                        error: true,
                        message: "CRM informado não está vinculado à um médico cadastrado!"
                    });
                }
                
                // const Speciality = await Speciality.findOne({ cod : SpecialityCode})

                // if (!Speciality) {
                //     return res.status(400).json({
                //         error: true,
                //         message: "codigo informado não está vinculado à um procedimento cadastrado!"
                //     });
                // }

                const schedulingExisting = await SchedulingModel.findOne({ doctorCrm, appointmentDate, hourInit })

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
                    message: "Scheduling already exists!",
                    data: schedulingExisting
                });
                     
                
            }catch{
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: "Ocorreu um erro ao cadastrar o Agendamento. Por favor, verifique novamente os campos."
                });
            }
    }
}

module.exports = SchedulingController