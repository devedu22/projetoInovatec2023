const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

// Definindo o schema (modelo) do médico com seus respectivos campos
const MedicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
        },
    crm:{
        type: String,
        required: true,
        unique: true
    },
    speciality:{
        type: String,
        required: true,
    },
    dossierInit:{
        type: String,
        required: true,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, // formatando expressão regular
    },
    dossierEnd:{
        type: String,
        required: true,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,  // formatando expressão regular
    },
    hoursService:{
        type: [String],
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

// Criando o modelo "Medic" com base no schema definido acima
const Medic = mongoose.model("Medic", MedicSchema);

// Exportando o modelo "Medic" para que possa ser utilizado em outros arquivos do projeto
module.exports = Medic;
