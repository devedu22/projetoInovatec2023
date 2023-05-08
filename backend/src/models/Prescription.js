const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

// Definindo o schema (modelo) da prescrição com seus respectivos campos
const PrescriptionSchema = new mongoose.Schema({
    cod: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
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

// Criando o modelo "Prescription" com base no schema definido acima
const Prescription = mongoose.model("Prescription", PrescriptionSchema);

// Exportando o modelo "Prescription" para que possa ser utilizado em outros arquivos do projeto
module.exports = Prescription;
