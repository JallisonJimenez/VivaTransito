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
import Feedback from './pages/FeedbackAtividade';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/direcao-defensiva" element={<DirecaoDefensiva />} />
        <Route path="/orgao-transito" element={<OrgaoTransito />} />
        <Route path="/regras-transito" element={<RegrasTransito />} />
        <Route path="/sinalizacao" element={<Sinalizacao />} />
        <Route path="/atividades" element={<Atividades />} />
        <Route path="/provas" element={<Provas />} />
        <Route path="/responder/:id" element={<ResponderAtividade />} />
        
        
        {/* Rotas protegidas ALUNO E ORIENTADOR*/}
        <Route path="/atividades/:id/feedback" element={<PrivateRoute><Feedback /></PrivateRoute> }/>
        <Route path="/home" element={<PrivateRoute><Home_user /></PrivateRoute>} />
        <Route path="/progresso" element={<PrivateRoute><Progresso /></PrivateRoute>} />
        
        <Route path="/responder-prova/:id" element={<PrivateRoute><ResponderProva /></PrivateRoute>} />
        <Route path="/minhas_provas" element={<PrivateRoute><MinhasProvas /></PrivateRoute>} />
 {/* Rotas protegidas ORIENTADOR */}

 <Route path="/home_adm"element={<AdminRoute><Home_adm /></AdminRoute>}/>
        <Route path="/criar_atividades"element={<AdminRoute><CriarAtividades /></AdminRoute>}/>
        <Route path="/minhas_atividades"element={<AdminRoute><MinhasAtividades /></AdminRoute> }/>
        <Route path="/editar_atividade/:id"element={<AdminRoute><EditarAtividade /></AdminRoute>}/>

      </Routes>
    </Router>
  );
}
