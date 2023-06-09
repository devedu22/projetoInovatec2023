const UserModel = require('../models/User');
const PatientModel = require('../models/Patient');
const SpecialityModel = require('../models/Speciality');
const RemedyModel = require('../models/Remedy');
const MedicModel = require('../models/Medic');
const RecipeModel = require ('../models/Recipe');
const PrescriptionModel = require('../models/Prescription');

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

  static async getSpeciality(req, res) {
    try {
      const Speciality = await SpecialityModel.find({});
      res.status(200).json(Speciality);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar as Especialidades. Por favor, tente novamente mais tarde.'
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

  static async getMedic(req, res) {
    try {
      const medic = await MedicModel.find({});
      res.status(200).json(medic);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar os medicos. Por favor, tente novamente mais tarde.'
      });
    }
  }

  static async getPrescription(req, res) {
    
    try {
      const Prescription = await PrescriptionModel.find({});
      res.status(200).json(Prescription);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar as Prescrições. Por favor, tente novamente mais tarde.'
      });
    }
  }

  static async getRecipe(req, res) {
    try {
      const recipe = await RecipeModel.find({});
      res.status(200).json(recipe);

    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Ocorreu um erro ao buscar as Receitas. Por favor, tente novamente mais tarde.'
      });
    }
  }

}

module.exports = AdminController;
