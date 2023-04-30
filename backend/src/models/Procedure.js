const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

// Definindo o schema (modelo) do usuário com seus respectivos campos
const ProcedureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    cod: {
        type: String,
        required: true,
        unique: true,
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
const Procedure = mongoose.model("Procedure", ProcedureSchema);

// Exportando o modelo "User" para que possa ser utilizado em outros arquivos do projeto
module.exports = Procedure;
