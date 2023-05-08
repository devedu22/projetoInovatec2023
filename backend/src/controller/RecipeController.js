const DoctorModel = require('../models/Medic')
const PatientModel = require('../models/Patient')
const RemedyModel = require('../models/Remedy')
const RecipeModel = require('../models/Recipe')


class RecipeController{
    
    static async register(req, res) {
        try{
            const {doctorCrm , patientCpf,remedies, emitionDate} = req.body;
            if (patientCpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                return res.status(400).json({
                    error: true,
                    message: "CPF inválido. O CPF deve ter 11 caracteres."
                    });
                }
            const patient = await PatientModel.findOne({ cpf : patientCpf })
                if (!patient) {
                    return res.status(400).json({
                        error: true,
                        message: "CPF informado não está vinculado à um usuário cadastrado!"
                    });
                }
            const medic = await DoctorModel.findOne({ cpf : doctorCrm })
                if (!medic) {
                    return res.status(400).json({
                        error: true,
                        message: "CRM informado não está vinculado à um médico cadastrado!"
                    });
                }

            const recipeExisting = await RecipeModel.findOne({ doctorCrm, patientCpf, emitionDate })

                if (!recipeExisting) {
                    const recipe = await RecipeModel.create(req.body); 
                    return res.json({
                        error: false,
                        message: "Receita cadastrado com sucesso!",
                        data: recipe // Retorna o Agendamento criado em um objeto
                    });   
                }

                return res.status(400).json({
                    error:true,
                    message:"Scheduling already exists!",
                    data: recipeExisting
                });

            }catch(err){
                return res.status(500).json({
                    error: true,
                    message: "Ocorreu um erro ao cadastrar os dados da Receita. Por favor, verifique novamente os campos."
                })
            }
        }
    }

    module.exports = RecipeController