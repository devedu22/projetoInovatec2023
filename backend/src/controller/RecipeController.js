const DoctorModel = require('../models/Medic')
const PatientModel = require('../models/Patient')
const RemedyModel = require('../models/Remedy')
const RecipeModel = require('../models/Recipe')
const nodemailer = require('nodemailer');
const type_email = process.env.TYPE_EMAIL;
const user_email = process.env.USER_EMAIL;
const password_email = process.env.PASSWORD_EMAIL;


class RecipeController{
    
    

    static async register(req, res) {

        async function SendEmail() {
            const transporter = nodemailer.createTransport({
                service: type_email,
                auth: {
                  user: user_email,
                  pass: password_email,
                },
              });

              const { destinatario, assunto, corpo, remedies } = req.body;

              const mailOptions = {
                from: user_email,
                to: destinatario,
                subject: assunto,
                html: `
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f1f1f1;
                      }
                      
                      h1 {
                        color: #333;
                      }
                      
                      div {
                        text-align :center
                      }
                      
                      p {
                        color: #666;
                      }
                    </style>
                  </head>
                  <body>
                  <img src="cid:Remedy-amico" alt="Image Remedy" width="1000px" height="1000px">
                    <div>
                        <h1>Receita Médica</h1>
                        <p> ${corpo} </p>
                        <p>Estes são os remédios indicados para o seu tratamento:</p>
                        <p><strong> ${remedies} </strong></p>
                    </div>
                  </body>
                </html>
              `,
              attachments: [{
                  path: __dirname + '/images/Remedy-amico.png',
                  filename: 'Remedy-amico.png',
                  cid: 'Remedy-amico' 
              }]
              };
              
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Erro ao enviar e-mail');
                } else {
                  console.log('E-mail enviado: ' + info.response);
                  res.send('E-mail enviado com sucesso');
                }
              });
        }

        try{

            const {doctorCrm , patientCpf, emitionDate} = req.body;

            if (patientCpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                return res.status(400).json({
                    error: true,
                    message: "CPF inválido. O CPF deve ter 11 caracteres."
                    });
                }
            const patient = await PatientModel.findOne({ cpf : patientCpf })
                if (!patient) {
                    return res.status(400).json({
                        error: true,
                        message: "CPF informado não está vinculado à um usuário cadastrado!"
                    });
                }
            const medic = await DoctorModel.findOne({ crm : doctorCrm })
                if (!medic) {
                    return res.status(400).json({
                        error: true,
                        message: "CRM informado não está vinculado à um médico cadastrado!"
                    });
                }

            const recipeExisting = await RecipeModel.findOne({ doctorCrm : doctorCrm, patientCpf : patientCpf, emitionDate : emitionDate })

                if (!recipeExisting) {
                    const recipe = await RecipeModel.create(req.body); 
                    console.log(recipe)
                    let email = SendEmail() 

                    return res.json({
                        error: false,
                        message: "Receita cadastrado com sucesso!",
                        data: recipe 
                    });   
                }
                return res.status(400).json({
                    error:true,
                    message:"Receita já cadastrada!",
                });

            }catch(err){
                console.log(err)
                return res.status(500).json({
                    error: true,
                    message: "Ocorreu um erro ao cadastrar os dados da Receita. Por favor, verifique novamente os campos."
                });
            }
        }

    }

    module.exports = RecipeController