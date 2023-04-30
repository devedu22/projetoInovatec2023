import React, { useState } from 'react';
import './style.css';
import { AiOutlineMenu, AiOutlineCalendar, AiOutlineOrderedList } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdExitToApp } from "react-icons/md";

export function HomeCli() {
    const [showSidebar, setShowSidebar] = useState(false);

    function handleButtonClick() {
        setShowSidebar(!showSidebar);
    }

    return (
        <div id="homecli_container">

            <div className={`sidebar ${showSidebar ? 'visible' : ''}`}>
                <label style={{ marginTop: 10, marginLeft: 53, marginBottom: 30 }}>NAMEUSER</label>
                <ul>
                    <li><a href="#"><div style={{alignItems:"center", display:"flex", flexDirection:"row", gap:20}}><FaUser size={20} />Minha conta</div></a></li>
                    <li><a href="/login"><div style={{alignItems:"center", display:"flex", flexDirection:"row", gap:20}}><MdExitToApp size={20} />Sair da conta</div></a></li>
                </ul>
            </div>


            <div id='homecli_title'>
                <button className="homecli_toggle-button" onClick={handleButtonClick}>
                    <AiOutlineMenu size={28}/>
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "82%" }}>
                    <label id="homecli_title_text_App">Yuzu</label>
                    <label id="homecli_title_text_User">Bem vindo(a), NAMEUSER</label>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 100 }}>
                <div id='homecli_area'>

                    <a href="/homepage/agendamento_consulta">
                        <div className="homecli_area_button">
                            <AiOutlineCalendar size={35} />
                            <span>Agendamento<br />de consulta</span>
                        </div>
                    </a>


                    <a href="/homepage/registro_consulta">
                        <div className="homecli_area_button">
                            <AiOutlineOrderedList size={35} />
                            <span>Minhas Consultas</span>
                        </div>
                    </a>


                </div>
            </div>

        </div>
    );
}


