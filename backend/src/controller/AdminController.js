const UserModel = require('../models/User');
const PatientModel = require('../models/Patient');
const ProceduretModel = require('../models/Procedure');
const RemedyModel = require('../models/Remedy');

class AdminController {
  static async getUsers(req, res) {
    try {
      const users = await UserModel.find({});
      res.status(200).json(users);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar os usuários. Por favor, tente novamente mais tarde.'
      });
    }
  }

  static async getPatient(req, res) {
    try {
      const patient = await PatientModel.find({});
      res.status(200).json(patient);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar os pacientes. Por favor, tente novamente mais tarde.'
      });
    }
  }

  static async getProcedure(req, res) {
    try {
      const patient = await ProceduretModel.find({});
      res.status(200).json(patient);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar os procedimentos. Por favor, tente novamente mais tarde.'
      });
    }
  }

  static async getRemedy(req, res) {
    try {
      const patient = await RemedyModel.find({});
      res.status(200).json(patient);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar os medicamentos. Por favor, tente novamente mais tarde.'
      });
    }
  }

}

module.exports = AdminController;
