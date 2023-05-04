const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

// Definindo o schema (modelo) do usuário com seus respectivos campos
const RecipeSchema = new mongoose.Schema({
    doctorCrm: {
        type: String,
        required: true,
        unique: true,
    },  
    patientCpf: {
        type: String,
        required: true,
        unique: true,
    },
    remedies:{
        type: [String],
        required: true,
    },
    emitionDate: {
        type: Date,
        required:true
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
const Recipe = mongoose.model("Recipe", RecipeSchema);

// Exportando o modelo "User" para que possa ser utilizado em outros arquivos do projeto
module.exports = Recipe;
