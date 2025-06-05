import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Atividades from './pages/Atividades';
import Login from './pages/Login';
import Provas from './pages/Provas';
import Cadastro from './pages/Cadastro';
import Progresso from './pages/Progresso';
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
      </Routes>
    </Router>
  );
}