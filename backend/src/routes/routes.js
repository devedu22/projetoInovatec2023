const express = require('express')
const AuthController = require('../controller/AuthController')
const AdminController = require('../controller/AdminController')
const authMiddleware = require('../middlewares/authenticate')
const PatientController = require('../controller/PatientController')
const ProcedureController = require('../controller/ProcedureController')
const RemedyController = require('../controller/RemedyController')

const routes = express.Router();


routes.get('/admin/usuarios',authMiddleware,AdminController.getUsers) //Rota para  consulta de todos usuarios, com token no header
routes.get('/admin/patient',authMiddleware,AdminController.getPatient) //Rota para  consulta de todos pacientes, com token no header
routes.get('/admin/Procedimento',authMiddleware,AdminController.getProcedure) //Rota para  consulta de todos procedimentos, com token no header
routes.get('/admin/Remedio',authMiddleware,AdminController.getRemedy) //Rota para  consulta de todos medicamentos, com token no header

routes.post('/registrarUsuario',AuthController.register) //Rota para criar usuario
routes.post('/logarUsuario',AuthController.authenticate)// Rota de autenticação
routes.put('/atualizarsenha',AuthController.recovery) //Rota para atualizar senha

routes.post('/registrarPaciente',PatientController.register) //Rota para criar paciente
routes.put('/atualizarPaciente',PatientController.update) //Rota para atualizar paciente
routes.delete('/deletarPaciente',PatientController.delete) //Rota para atualizar paciente

routes.post('/registrarProcedimento',ProcedureController.register) //Rota para criar procedimento
routes.put('/atualizarProcedimento',ProcedureController.update) //Rota para atualizar procedimento
routes.delete('/deletarProcedimento',ProcedureController.delete) //Rota para atualizar procedimento

routes.post('/registrarRemedio',RemedyController.register) //Rota para criar medicamento
routes.put('/atualizarRemedio',RemedyController.update) //Rota para atualizar medicamento
routes.delete('/deletarRemedio',RemedyController.delete) //Rota para atualizar medicamento



module.exports = routes;