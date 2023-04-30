import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AgenConsult } from "./pages/AgenConsult";
import { CadastroUsuario} from "./pages/CadastroUsuario"
import { RecuperaSenha } from "./pages/RecuperaSenha"
import { HomeCli } from "./pages/HomeCli";
import { RegisConsult } from "./pages/RegisConsult";
import { CadProced } from "./pages/CadProced";
import { CadastroAtualizacaoPaciente} from "./pages/CadastroAtualizacaoPaciente"


export function Router() {
  return (
   
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/primeiroacesso" element={<CadastroUsuario />} />
          <Route path="/recuperasenha" element={<RecuperaSenha />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/homepagec" element={<HomeCli />} />
          <Route path="/homepage/agendamento_consulta" element={<AgenConsult />} />
          <Route path="/homepage/registro_consulta" element={<RegisConsult />} />
          <Route path="/homepage/cadastro_procedimento" element={<CadProced />} />
          <Route path="/homepage/atualizacaopacientes" element={<CadastroAtualizacaoPaciente />}/>
          <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    
  );
}
