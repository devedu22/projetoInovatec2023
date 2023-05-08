const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

// Definindo o schema (modelo) do medicamento com seus respectivos campos
const RemedySchema = new mongoose.Schema({
    cod: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
    },
    form: {
        type: String,
        required: true,
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
const Remedy = mongoose.model("Remedy", RemedySchema);

// Exportando o modelo "User" para que possa ser utilizado em outros arquivos do projeto
module.exports = Remedy;
