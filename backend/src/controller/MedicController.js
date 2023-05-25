const MedicModel = require('../models/Medic')
const SpecialityModel = require('../models/Speciality')

class MedicController {

    static async register(req, res) {
        try {
            const { name, crm , cpf, email, speciality, dossierInit, dossierEnd } = req.body;

            if (cpf.length !== 11) { // Verifica se o CPF informado tem 11 caracteres
                return res.status(400).json({
                    error: true,
                    message: "CPF inválido. O CPF deve ter 11 caracteres."
                });
            }
            
            if (await MedicModel.findOne({ crm })) {
                return res.status(400).json({
                    error: true,
                    message: "CRM informado já vinculado à um médico cadastrado!"
                });
            }

            if (await MedicModel.findOne({ email })) {
                return res.status(400).json({
                    error: true,
                    message: "Email informado já vinculado à um médico cadastrado!"
                });
            }

            if (await MedicModel.findOne({ cpf })) {
                return res.status(400).json({
                    error: true,
                    message: "CPF informado já vinculado à um médico cadastrado!"
                });
            }
            
            const specialityResponse = await SpecialityModel.findOne({ cod : speciality })

            if (!specialityResponse) {
                return res.status(400).json({
                    error: true,
                    message: "Especialidade informada não está cadastrada!"
                });
            }

            function convertTo24Hour(time) {
                const [hour, minute, period] = time.split(/[:\s]/); // divide o horário em hora, minuto e período (AM / PM)
                const hourInt = parseInt(hour, 10); // converte a hora em um número inteiro
                const periodOffset = period.toUpperCase() === 'PM' ? 12 : 0; // adiciona um offset de 12 horas se o período for PM
                const hour24 = (hourInt % 12) + periodOffset; // converte a hora para o formato de 24 horas
                const formattedHour = hour24.toString().padStart(2, '0'); // formata a hora para ter dois dígitos e adiciona um zero à esquerda, se necessário
                return `${formattedHour}:${minute}`;
              }

            async function hoursForService(start, end) {

                let dateInit = "2000-01-01" + " "+ start + ":" + "00"
                let dateEnd = "2000-01-01" + " "+ end + ":" + "00"

                if(start > end){
                    dateEnd = "2000-01-02" + " "+ end + ":" + "00"
                }

                const milestones = [];
                const interval = 15; 
                let current = new Date(dateInit);
                let final = new Date(dateEnd)

                while (current <= final) {
                  const milestone = current.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}, { hour12: false });
                  //let milestone_formated = convertTo24Hour(milestone)
                  milestones.push(milestone);
                  current.setMinutes(current.getMinutes() + interval);
                }
                return milestones;
            }

            const hoursService = await hoursForService(dossierInit, dossierEnd);
 
            const medicFinal =  {
                name,
                crm, 
                cpf, 
                email, 
                speciality, 
                dossierInit, 
                dossierEnd,
                hoursService
            }

            const medic = await MedicModel.create(medicFinal)
            console.log(medic)
            ////////Se tudo der certo, cadastra o médico
            return res.json({
                error: false,
                message: "Médico cadastrado com sucesso!",
                data: medic // Retorna o médico criado em um objeto
            });
        } catch (err) { //Caso dê erro, ele retorna outro objeto de erro
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar o médico. Por favor, verifique novamente os campos."
            });
        }
    }

    static async update (req, res) {
        try {
            const { crm } = req.body;

            // busca um médico no banco de dados com base no name e CRM fornecidos
            const medic = await MedicModel.findOne({ crm });
            
            if (!medic) {
                // se nenhum médico for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Médico não encontrado. Verifique o name e CRM informado e tente novamente.'
                });
            }
        
            // atualiza informações do médico no banco de dados
            await MedicModel.updateOne({ cpf }, { dossierInit: dossierInit, dossierEnd: dossierInit, email: email });

            return res.json({
                error: false,
                message: 'Médico atualizado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao atualizar o Médico. Por favor, tente novamente mais tarde.',
            });
        }
    }


    static async delete (req, res) {
        try {
            const { crm } = req.body;
    
            // busca um médico no banco de dados com base no name e CRM fornecidos
            const medic = await MedicModel.findOne({ crm });
    
            if (!medic) {
                // se nenhum médico for encontrado, retorna uma mensagem de erro
                return res.status(404).json({
                    error: true,
                    message: 'Médico não encontrado. Verifique o name e CRM informado e tente novamente.'
                });
            }
    
            // atualiza informações do médico no banco de dados
            await MedicModel.deleteOne({ crm }); // Deleta o médico
    
            return res.json({
                error: false,
                message: 'Médico deletado com sucesso!',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao deletar o Médico. Por favor, tente novamente mais tarde.',
            });
        }
    }


}

module.exports = MedicController;
