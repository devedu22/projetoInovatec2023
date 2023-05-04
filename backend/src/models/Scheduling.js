const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

// Definindo o schema (modelo) do medicamento com seus respectivos campos
const SchedullingSchema = new mongoose.Schema({
    doctorCrm: {
        type: String,
        required: true,
    },
    patientCpf: {
        type: String,
        required: true,
    },
    procedureCode:{
        type: String,
        required: true
    },
    appointmentDate:{
        type: Date,
        required: true
    },
    hourInit:{
        type: String,
        required: true,
        match: /^\d{2}:\d{2}$/
    },
    hourEnd:{
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

// Criando o modelo "User" com base no schema definido acima
const Schedulling = mongoose.model("Schedulling", SchedullingSchema);

// Exportando o modelo "User" para que possa ser utilizado em outros arquivos do projeto
module.exports = Schedulling;
