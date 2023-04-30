import React, { useState } from "react";
import "./style.css";
import { AiOutlineMenu, AiOutlineHome, AiOutlineOrderedList, AiOutlineCalendar } from "react-icons/ai";
import { FaUserPlus  } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";

export function AgenConsult() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [cpf, setCpf] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [medico, setMedico] = useState("");
  const [data, setData] = useState(new Date());

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
    <div id="agendamento_container">
      <div className={`sidebar ${showSidebar ? "visible" : ""}`}>
        <label style={{ marginTop: 25, marginLeft: 53, marginBottom: 30 }}>
          NAMEUSER
        </label>
        <ul>
          <li>
            <a href="/homepage">
              <div style={{alignItems: "center",display: "flex",flexDirection: "row",gap: 20,}}>
                <AiOutlineHome size={20} />
                Painel
              </div>
            </a>
            <a href="/homepage/atualizacaopacientes">
              <div style={{alignItems: "center",display: "flex",flexDirection: "row",gap: 20,}}>
                <FaUserPlus size={20} />
                Cadastrar Paciente
              </div>
            </a>
            <a href="/homepage/cadastro_procedimento">
              <div style={{alignItems: "center",display: "flex",flexDirection: "row",gap: 20,}}>
                <MdNoteAdd size={20} />
                Cadastro de Procedimentos
              </div>
            </a>
            <a href="/homepage/registro_consulta">
              <div style={{alignItems: "center",display: "flex",flexDirection: "row",gap: 20,}}>
                <AiOutlineOrderedList size={20} />
                Registro de Consultas
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div id="agendamento_title">
        <button id="agendamento_toggle-button" onClick={handleButtonClick}>
          <AiOutlineMenu size={28}/>
        </button>
      </div>

      <div id="agendamento_area_info">
        <div id="agendamento_subarea_info">
        <div
          style={{display: "flex",flexDirection: "row",alignItems: "center",width: "100%", gap:25}}>
            <AiOutlineCalendar size={35}/>
            <label id="agendamento_title_text_App">Agendamento de Consulta</label>
        </div>
          <div id="agendamento_sub_info">

            <label className="agendamento_subarea_info_label">
              CPF do paciente:
            </label>

            <input
              type="text"
              className="agendamento_subarea_info_input"
              placeholder="Ex: 111.222.333-44"
              maxLength={14}
              value={cpf}
              onChange={(event) => setCpf(formatCPF(event.target.value))}
            />

            <label className="agendamento_subarea_info_label">
              Nome do paciente:
            </label>

            <input
              type="text"
              className="agendamento_subarea_info_input"
              disabled
            />

            <label className="agendamento_subarea_info_label">
              Tipo de procedimento:
            </label>
            <select
              className="agendamento_subarea_info_inputselection"
              value={tipoServico}
              onChange={(event) => setTipoServico(event.target.value)}
            >
              <option value="">Selecione um Procedimento</option>
              <option value="clinico-geral">Clínico Geral</option>
              <option value="ortopedia">Ortopedia</option>
              <option value="dermatologia">Dermatologia</option>
            </select>

            <label className="agendamento_subarea_info_label">Médico:</label>

            <select
              className="agendamento_subarea_info_inputselection"
              value={medico}
              onChange={(event) => setMedico(event.target.value)}
            >
              <option value="">Selecione um médico</option>
              <option value="jose-silva">José Silva</option>
              <option value="maria-souza">Maria Souza</option>
              <option value="carlos-oliveira">Carlos Oliveira</option>
            </select>

            <label className="agendamento_subarea_info_label">Data:</label>

            <input
              type="datetime-local"
              id="agendamento_subarea_info_inputdata"
              value={data}
              onChange={(event) => setData(event.target.value)}
            />
          </div>

          <button id="agendamento_subarea_info_button" onClick={schedule}>
            Agendar
          </button>
        </div>
      </div>
    </div>
  );
}
