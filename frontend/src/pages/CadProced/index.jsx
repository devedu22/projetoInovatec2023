import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import "./style.css";

export function CadProced() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [nomeproc, setnomeproc] = useState("");
  const [precoproc, setprecoproc] = useState("");
  const [cateproc, setcateproc] = useState("");

  function formatarValor(valor) {
    const decimalSeparator =
      (1.1).toLocaleString().substring(1, 2) === "." ? "." : ",";
    const regex = new RegExp(`[^0-9${decimalSeparator}]`, "g");
    const newValue = valor.replace(regex, "");
    const newNumber = parseFloat(newValue.replace(",", ".")).toFixed(2);
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(newNumber));
    return formattedValue;
  }

  function handleBlur(event) {
    const value = event.target.value;
    if (value !== "") {
      const formattedValue = formatarValor(value);
      setprecoproc(formattedValue);
    } else {
      setprecoproc(null);
    }
  }

  function handleButtonClick() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div id="cadproced_container">
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
            <a href="/homepage/atualizacaopacientes">
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <FaUserPlus size={20} />
                Cadastrar Paciente
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

      <div id="cadproced_title">
        <button id="agendamento_toggle-button" onClick={handleButtonClick}>
          <AiOutlineMenu size={28} />
        </button>
      </div>

      <div id="cadproced_area_info">
        <div id="cadproced_subarea_info">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap: 25,
            }}
          >
            <MdNoteAdd size={35} />
            <label id="cadproced_title_text_App">
              Cadastro de Procedimentos
            </label>
          </div>
          <div id="cadproced_sub_info">
            <label className="agendamento_subarea_info_label">
              Nome do Procedimento
            </label>
            <input
              type="text"
              className="cadproced_subarea_info_input"
              value={nomeproc}
              onChange={(event) => setnomeproc(event.target.value)}
            />
            <label className="agendamento_subarea_info_label">
              Preço do Procedimento
            </label>
            <input
              type="text"
              className="cadproced_subarea_info_input"
              value={precoproc !== null ? precoproc : ""}
              onChange={(event) => {
                const value = event.target.value;
                setprecoproc(value);
              }}
              onBlur={handleBlur}
            />

            <label className="agendamento_subarea_info_label">
              Categoria do Procedimento
            </label>
            <input
              type="text"
              className="cadproced_subarea_info_input"
              value={cateproc}
              onChange={(event) => setcateproc(event.target.value)}
            />
          </div>
          
          <div style={{display: "flex", flexDirection:"row", justifyContent: "flex-start", gap: "15px"}}>
          <button id="cadproced_subarea_info_button">Salvar</button>
          <button id="cadproced_subarea_info_button2">Atualizar</button>
          <button id="cadproced_subarea_info_button3">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
