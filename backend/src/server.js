require('dotenv').config()
const express = require('express');
const app = express()
const routes = require('./routes/routes'); // importando as rotas do arquivo routes.js
const PORT = process.env.PORT_SERVER;
const cors = require ('cors') // importando o pacote de CORS


app.use(express.json()) // permitindo que o Express entenda JSON
app.use(cors()) // permitindo o acesso de diferentes domínios à API
app.use('/', routes) // definindo as rotas a serem usadas na aplicação


app.listen(PORT,()=>{
    console.log(`Servidor do Yuzu funcionando na porta: ${PORT}`) // mensagem de confirmação de que o servidor está funcionando
})
