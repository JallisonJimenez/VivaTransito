import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Atividades from './pages/Atividades';
import Login from './pages/Login';
import Provas from './pages/Provas';
import Cadastro from './pages/Cadastro';
import Progresso from './pages/Progresso';
import Home_adm from './pages/Home_adm';
import CriarAtividades from './pages/Criar_atividades';
import MinhasAtividades from './pages/MinhasAtividades';
import EditarAtividade from './pages/EditarAtividade';
import ResponderAtividade from './pages/ResponderAtividade';
import Home_user from './pages/Home_user';
import DirecaoDefensiva from './pages/DirecaoDefensiva';
import OrgaoTransito from './pages/OrgaoTransito';
import RegrasTransito from './pages/RegrasTransito';
import Sinalizacao from './pages/Sinalizacao';
import ResponderProva from './pages/ResponderProva';
import MinhasProvas from './pages/MinhasProvas';
import Feedback from './pages/feedback';




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Atividades" element={<Atividades />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Provas" element={<Provas />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Progresso" element={<Progresso />} />
        <Route path="/Home_adm" element={<Home_adm />} />
        <Route path="/Criar_atividades" element={<CriarAtividades />} />
        <Route path="/minhas_atividades" element={<MinhasAtividades />} />
        <Route path="/editar_atividade/:id" element={<EditarAtividade />} />
        <Route path="/responder/:id" element={<ResponderAtividade />} />
        <Route path="/Home" element={<Home_user />} />
        <Route path="/" element={<Home />} />
        <Route path="/direcao-defensiva" element={<DirecaoDefensiva />} />
        <Route path="/orgao-transito" element={<OrgaoTransito />} />
        <Route path="/regras-transito" element={<RegrasTransito />} />
        <Route path="/sinalizacao" element={<Sinalizacao />} />
        <Route path="/responder-prova/:id" element={<ResponderProva />} />
        <Route path="/minhas_provas" element={<MinhasProvas />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}
