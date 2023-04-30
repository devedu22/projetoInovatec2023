const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

// Definindo o schema (modelo) do usuário com seus respectivos campos
const PatientSchema = new mongoose.Schema({
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
    cpf:{
        type: String,
        required: true,
        unique: true
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

// Criando o modelo "User" com base no schema definido acima
const Patient = mongoose.model("Patient", PatientSchema);

// Exportando o modelo "User" para que possa ser utilizado em outros arquivos do projeto
module.exports = Patient;
