const express = require('express')
const AuthController = require('../controller/AuthController')
const AdminController = require('../controller/AdminController')
const authMiddleware = require('../middlewares/authenticate')
const PatientController = require('../controller/PatientController')
const SpecialityController = require('../controller/SpecialityController')
const RemedyController = require('../controller/RemedyController')
const MedicController = require('../controller/MedicController')
const SchedulingController = require('../controller/SchedulingController')
const PrescriptionController = require('../controller/PrescriptionController')
const RecipeController = require('../controller/RecipeController')

const routes = express.Router();

routes.get('/admin/usuarios',authMiddleware,AdminController.getUsers) //Rota para  consulta de todos usuarios, com token no header
routes.get('/admin/patient',authMiddleware,AdminController.getPatient) //Rota para  consulta de todos pacientes, com token no header
routes.get('/admin/Speciality',authMiddleware,AdminController.getSpeciality) //Rota para  consulta de todos procedimentos, com token no header
routes.get('/admin/Remedio',authMiddleware,AdminController.getRemedy) //Rota para  consulta de todos medicamentos, com token no header
routes.get('/admin/Medico',authMiddleware,AdminController.getMedic) //Rota para  consulta de todos Medicos, com token no header
routes.get('/admin/Recipe',authMiddleware,AdminController.getRecipe) //Rota para consulta de todas as receitas, com token no header
routes.get('/admin/Prescription',authMiddleware,AdminController.getPrescription) // Rota para consulta de todas as Prescrições, com token no header

routes.post('/registrarUsuario',AuthController.register) //Rota para criar usuario
routes.post('/logarUsuario',AuthController.authenticate)// Rota de autenticação
routes.put('/atualizarsenha',AuthController.recovery) //Rota para atualizar senha

routes.post('/registrarPaciente',PatientController.register) //Rota para criar paciente
routes.put('/atualizarPaciente',PatientController.update) //Rota para atualizar paciente
routes.delete('/deletarPaciente',PatientController.delete) //Rota para atualizar paciente

routes.post('/registrarEspecialidade',SpecialityController.register) //Rota para criar procedimento
routes.put('/atualizarEspecialidade',SpecialityController.update) //Rota para atualizar procedimento
routes.delete('/deletarEspecialidade',SpecialityController.delete) //Rota para atualizar procedimento
routes.post('/buscarMedicos',SpecialityController.findDoctorBySpeciality) //Rota para atualizar procedimento

routes.post('/registrarRemedio',RemedyController.register) //Rota para criar medicamento
routes.put('/atualizarRemedio',RemedyController.update) //Rota para atualizar medicamento
routes.delete('/deletarRemedio',RemedyController.delete) //Rota para atualizar medicamento

routes.post('/registrarMedico',MedicController.register) //Rota para criar Medico
routes.put('/atualizarMedico',MedicController.update) //Rota para atualizar Medico
routes.delete('/deletarMedico',MedicController.delete) //Rota para atualizar Medico

// Recipes
routes.post('/registrarReceita',RecipeController.register)

// Scheduling
routes.post('/listSchedule',SchedulingController.verifyScheduleDoctor) 
routes.post('/createScheduling',SchedulingController.register)
routes.post('/filterSchedule',SchedulingController.filterHoursDoctor)

routes.post('/registrarPrescrição',PrescriptionController.register)
routes.put('/atualizarPrescrição',PrescriptionController.update)
routes.delete('/deletarPrescrição',PrescriptionController.delete)

module.exports = routes;