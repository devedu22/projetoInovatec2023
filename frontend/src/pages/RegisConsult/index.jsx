import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineSearch,
  AiOutlineOrderedList
} from "react-icons/ai";
import "./style.css";

export function RegisConsult() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [cpf, setCpf] = useState("");
  

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
    <div id="regisconsult_container">
      <div className={`sidebar ${showSidebar ? "visible" : ""}`}>
        <label style={{ marginTop: 25, marginLeft: 53, marginBottom: 30 }}>
          NAMEUSER
        </label>
        <ul>
          <li>
            <a href="/homepage">
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <AiOutlineHome size={20} />
                Painel
              </div>
            </a>
            <a href="/homepage/agendamento_consulta">
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <AiOutlineCalendar size={20} />
                Agendar Consulta
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div id="regisconsult_title">
        <button id="regisconsult_toggle-button" onClick={handleButtonClick}>
          <AiOutlineMenu size={28} />
        </button>

        
      </div>

      <div id="regisconsult_area_info">
        <div id="regisconsult_subarea_info">
        <div
          style={{display: "flex",flexDirection: "row",alignItems: "center",width: "100%",gap:25}}>
            <AiOutlineOrderedList size={28}/>
          <label id="regisconsult_title_text_App">Registro de Consultas</label>
        </div>

          <div id="regisconsult_sub_info">
            <label className="regisconsult_subarea_info_label">
              CPF do paciente:
            </label>

            <input
              type="text"
              className="regisconsult_subarea_info_input"
              placeholder="Ex: 111.222.333-44"
              maxLength={14}
              value={cpf}
              onChange={(event) => setCpf(formatCPF(event.target.value))}
            />

            <label className="regisconsult_subarea_info_label">
              Nome do paciente:
            </label>

            <input
              type="text"
              className="regisconsult_subarea_info_input"
              disabled
            />
          </div>

          <button id="regisconsult_subarea_info_button">
            <AiOutlineSearch size={28} />
          </button>

          <table class="tabela-agendamentos">
            <thead>
              <tr>
                <th>CPF</th>
                <th>Procedimento</th>
                <th>Médico</th>
                <th>Horário</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>111.222.333-44</td>
                <td>Odontologia - Limpeza</td>
                <td>Dr. Silva</td>
                <td>2023-05-01T10:30</td>
                <td>Limpeza de rotina</td>
              </tr>
              <tr>
                <td>111.222.333-44</td>
                <td>Odontologia - Extração</td>
                <td>Dra. Souza</td>
                <td>2023-05-15T14:00</td>
                <td>Extração do dente do siso</td>
              </tr>
              <tr>
                <td>111.222.333-44</td>
                <td>Odontologia - Restauração</td>
                <td>Dr. Santos</td>
                <td>2023-06-02T11:15</td>
                <td>Restauração de cárie</td>
              </tr>
              <tr>
                <td>111.222.333-44</td>
                <td>Odontologia - Clareamento</td>
                <td>Dra. Lima</td>
                <td>2023-06-10T16:30</td>
                <td>Clareamento dental</td>
              </tr>
              <tr>
                <td>111.222.333-44</td>
                <td>Odontologia - Ortodontia</td>
                <td>Dr. Pereira</td>
                <td>2023-07-05T09:00</td>
                <td>Instalação de aparelho ortodôntico</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
