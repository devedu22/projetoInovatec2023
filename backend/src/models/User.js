const mongoose = require('../database/index'); // importando a estrutura da conexão com o MongoDb

const bcrypt = require('bcryptjs'); // importando a biblioteca bcryptjs para gerar hashes de senhas

// Definindo o schema (modelo) do usuário com seus respectivos campos
const UserSchema = new mongoose.Schema({
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
    password:{
        type: String,
        required: true,
        select: false // o campo de senha não será exibido nas consultas ao banco de dados
    },
    cpf:{
        type: String,
        required: true,
        unique: true
    },
    accessLevel:{ // Campo para setar nível de acesso
        type: String,
        required: true,
        maxlength: 3
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

// Adicionando um hook de pré-salvamento ao schema do usuário, que irá gerar um hash de senha antes de salvar o usuário no banco de dados
UserSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10); // gerando um hash de senha com o valor do campo "password" e um "salt" de valor 10
    console.log(hash); // exibindo o hash gerado no console (apenas para fins de depuração)
    this.password = hash; // atribuindo o hash gerado ao campo "password" do usuário
});

// Criando o modelo "User" com base no schema definido acima
const User = mongoose.model("User", UserSchema);

// Exportando o modelo "User" para que possa ser utilizado em outros arquivos do projeto
module.exports = User;
