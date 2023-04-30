import React, { useState } from "react";
import "./style.css";
import {
  AiOutlineMenu,
  AiOutlineCalendar,
  AiOutlineOrderedList,
  AiOutlineMedicineBox,
  AiOutlineHome,
} from "react-icons/ai";
import { FaUserPlus, FaUser } from "react-icons/fa";
import { MdNoteAdd, MdExitToApp } from "react-icons/md";

export function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  function handleButtonClick() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div id="home_container">
      <div className={`sidebar ${showSidebar ? "visible" : ""}`}>
        <label style={{ marginTop: 10, marginLeft: 53, marginBottom: 30 }}>
          NAMEUSER
        </label>
        <ul>
          <li>
            <a href="#">
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
          </li>
          <li>
            <a href="#">
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <FaUser size={20} />
                Clientes
              </div>
            </a>
          </li>
          <li>
            <a href="/login">
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <MdExitToApp size={20} />
                Sair da conta
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div
        id="home_title" >
        <button className="home_toggle-button" onClick={handleButtonClick}>
          <AiOutlineMenu size={28}/>
        </button>
        <div
          style={{display: "flex",flexDirection: "column",alignItems: "center",width: "82%",}}>
          <label id="home_title_text_App">Yuzu</label>
          <label id="home_title_text_User">Bem vindo(a), NAMEUSER</label>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 100,
        }}
      >
        <div id="home_area">
          <a href="/homepage/atualizacaopacientes">
            <div className="home_area_button">
              <FaUserPlus size={35} />
              <span>
                Cadastro e Atualização
                <br />
                de pacientes
              </span>
            </div>
          </a>

          <a href="/homepage/agendamento_consulta">
            <div className="home_area_button">
              <AiOutlineCalendar size={35} />
              <span>
                Agendamento
                <br />
                de consulta
              </span>
            </div>
          </a>

          <a href="/homepage/registro_consulta">
            <div className="home_area_button">
              <AiOutlineOrderedList size={35} />
              <span>
                Registro de
                <br />
                agendamento de consulta
              </span>
            </div>
          </a>

          <a href="#">
            <div className="home_area_button">
              <AiOutlineMedicineBox size={35} />
              <span>
                Cadastro, atualização <br />e consulta de medicamentos
              </span>
            </div>
          </a>

          <a href="/homepage/cadastro_procedimento">
            <div className="home_area_button">
              <MdNoteAdd size={35} />
              <span>
                Cadastro de tipos de
                <br />
                procedimentos ao paciente
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
