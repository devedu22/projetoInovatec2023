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
    especialized:{
        type: [String],
        required: true,
    },
    dossierInit:{
        type: String,
        required: true,
        match: /^\d{2}:\d{2}$/
    },
    dossierEnd:{
        type: String,
        required: true,
        match: /^\d{2}:\d{2}$/
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
