import React, { useState } from "react";
import "./styleCadastro.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineHome, AiOutlineOrderedList } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

export function CadastroAtualizacaoPaciente() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [cpf, setCpf] = useState("");
    const [sexo, setSexo] = useState("");
    const [rg, setRg] = useState("");
    const [data, setDataNascimento] = useState(new Date());
    const [naturalidade, setNaturalidade] = useState("");
    const [estadoCivil, setestadoCivil] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");

    function schedule() {
        console.log("schedule");
    }

    function handleButtonClick() {
        setShowSidebar(!showSidebar);
    }

    function formatCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
        cpf = cpf.slice(0, 11); // Limita o tamanho para 11 dígitos
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o primeiro ponto
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
        return cpf;
    }


    return (
        //Lateral da página
        <div id="agendamento_container">
            <div className={`sidebar ${showSidebar ? "visible" : ""}`}>
                <label style={{ marginTop: 25, marginLeft: 53, marginBottom: 30 }}>
                    NAMEUSER
                </label>
                <ul>
                    <li>
                        <a href="/homepage">
                            <div style={{ alignItems: "center", display: "flex", flexDirection: "row", gap: 20, }}>
                                <AiOutlineHome size={20} />
                                Painel
                            </div>
                        </a>
                        <a href="/#">
                            <div style={{ alignItems: "center", display: "flex", flexDirection: "row", gap: 20, }}>
                                <FaUserPlus size={20} />
                                Cadastrar Paciente
                            </div>
                        </a>
                        <a href="/homepage/registro_consulta">
                            <div style={{ alignItems: "center", display: "flex", flexDirection: "row", gap: 20, }}>
                                <AiOutlineOrderedList size={20} />
                                Registro de Consultas
                            </div>
                        </a>
                    </li>
                </ul>
            </div>

            <div id="agendamento_title">

                <button id="agendamento_toggle-button" onClick={handleButtonClick}>
                    <AiOutlineMenu />
                </button>


            </div>


            <div id="agendamento_area_info">
                <div id="agendamento_subarea_info">

                    <div className="cadastrar_container">
                        <FaUserPlus size={35} color={"#0DA2A9"} />
                        <label className="cadastrar_title">Cadastrar</label>
                    </div>

                    <div className="infoPessoais_container">
                        <label className="infoPessoais_title">Informações Pessoais</label>
                    </div>

                    <div id="agendamento_sub_info">
                        <div className="nome_container">

                            <label className="nome_title">
                                Nome:
                            </label>
                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                            />
                        </div>




                        <div className="dtdenascimento_container">
                            <label className="dtdenascimento_container">Data de Nascimento:</label>
                            <input
                                type="datetime-local"
                                id="agendamento_subarea_info_inputdata"
                                value={data}
                                onChange={(event) => setDataNascimento(event.target.value)}
                            />
                        </div>


                        <div className="sexo_container">
                            <label className="sexo_title">
                                Sexo:

                            </label>
                            <select
                                className="agendamento_subarea_info_inputselection"
                                value={sexo}
                                onChange={(event) => setSexo(event.target.value)}
                            >
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>


                        <div className="cpf_container">
                            <label className="cpf_title">
                                CPF:
                            </label>

                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                                placeholder="Ex: 111.222.333-44"
                                maxLength={14}
                                value={cpf}
                                onChange={(event) => setCpf(formatCPF(event.target.value))}
                            />
                        </div>


                        <div className="rg_container">
                            <label className="rg_title">
                                RG:
                            </label>

                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                                placeholder="Ex: 3008391-5"
                                maxLength={8}
                                value={rg}
                                onChange={(event) => setRg(event.target.value)}
                            />
                        </div>

                        <div className="naturalidade_container">
                            <label className="naturalidade_title">
                                Naturalidade:

                            </label>
                            <select
                                className="agendamento_subarea_info_inputselection"
                                value={naturalidade}
                                onChange={(event) => setNaturalidade(event.target.value)}
                            >
                                <option value="brasileira">Brasileira</option>
                                <option value="americana">Americana</option>
                                <option value="mexicana">Mexicana</option>
                                <option value="portuguesa">Portuguesa</option>
                                <option value="chinesa">Chinesa</option>
                            </select>

                        </div>


                        <div className="estadocivil_container">
                            <label className="estadocivil_title">
                                Estado Civil:

                            </label>
                            <select
                                className="agendamento_subarea_info_inputselection"
                                value={estadoCivil}
                                onChange={(event) => setestadoCivil(event.target.value)}
                            >
                                <option value="solteiro">Solteiro(a)</option>
                                <option value="casado">Casado(a)</option>
                                <option value="viuvo">Viúvo(a)</option>
                                <option value="divorciado">Divorciado(a)</option>
                            </select>
                        </div>

                        <div className="telefone_container">
                            <label className="telefone_title">
                                Telefone:
                            </label>

                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                                placeholder="Ex: 92988476315"
                                maxLength={11}
                                value={telefone}
                                onChange={(event) => setTelefone(event.target.value)}
                            />
                        </div>

                        <div className="email_container">
                            <label className="email_title">
                                Email:
                            </label>
                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                            />

                        </div>


                        <div className="cep_container">
                            <label className="cep_title">
                                CEP:
                            </label>

                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                                placeholder="Ex: 69021540"
                                maxLength={9}
                                value={cep}
                                onChange={(event) => setCep(event.target.value)}
                            />
                        </div>

                        <div className="rua_container">
                            <label className="rua_title">
                                Rua:
                            </label>

                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                            />
                        </div>

                        <div className="numero_container">
                            <label className="numero_title">
                                Número:
                            </label>

                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                            />
                        </div>

                        <div className="bairro_container">
                            <label className="bairro_title">
                                Bairro:
                            </label>

                            <input
                                type="text"
                                className="agendamento_subarea_info_input"
                            />
                        </div>


                    </div>

                    <div className="button_container">
                        <button id="cadproced_subarea_info_button">Salvar</button>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default CadastroAtualizacaoPaciente;