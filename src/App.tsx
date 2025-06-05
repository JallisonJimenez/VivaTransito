import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Atividades from './pages/Atividades';
import Login from './pages/Login';
import Provas from './pages/Provas';
import Cadastro from './pages/Cadastro';
import Progresso from './pages/Progresso';
import Home_adm from './pages/Home_adm';
import Criar_atividades from './pages/Criar_atividades';
import React from 'react';

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
        <Route path="Criar_atividades" element={<Criar_atividades />} />
      </Routes>
    </Router>
  );
}