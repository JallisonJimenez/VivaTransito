// src/pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export default function Home() {
  const navigate = useNavigate();
  const { isOrientador, verified } = useUser();
  const [search, setSearch] = useState('');

  // Decodifica o token JWT (se existir) para extrair isOrientador e verified
  const token = localStorage.getItem('token');


  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));


    } catch (e) {
      console.warn('Token inválido', e);
    }
  }

  const handleSearch = () => {
    const termo = search.toLowerCase();
    if (['placa','sinal','sinalização','sinalizacao','parar','trânsito','transito']
        .some(w => termo.includes(w))) {
      navigate('/sinalizacao');
    } else if (['defensiva','direção','direcao','atitude']
        .some(w => termo.includes(w))) {
      navigate('/direcao-defensiva');
    } else if (['regras','conduta','infração','infracao']
        .some(w => termo.includes(w))) {
      navigate('/regras-transito');
    } else if (['detran','órgãos','orgaos','orgao','autoridade','prf']
        .some(w => termo.includes(w))) {
      navigate('/orgao-transito');
    } else {
      alert('Conteúdo não encontrado. Tente outro termo.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header, busca etc */}


      {/* Header */}
      <div className="bg-gray-400 flex items-center justify-between p-4">
        {/* Pesquisa */}
        <div className="flex items-center bg-white rounded-md px-3 py-2 w-1/2 max-w-md border border-black">
          <span className="mr-2 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
          {search && (
            <>
              <button onClick={handleSearch} className="ml-2 text-xl">🔎</button>
              <button onClick={() => setSearch('')} className="ml-2 text-xl">❌</button>
            </>
          )}
        </div>

        {/* Sair e perfil */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            className="bg-white border border-black px-3 py-1 rounded-md hover:bg-gray-300 transition"
          >
            Sair
          </button>
          <div
            onClick={() => navigate(token ? '/home' : '/login')}
            className="w-10 h-10 border border-black rounded-full flex items-center justify-center text-2xl cursor-pointer"
          >
            👤
          </div>
        </div>
      </div>

      {!verified && (
        <p className="text-red-600 p-4">
          Sua conta de orientador ainda não foi verificada. Entre em contato com o administrador.
        </p>
      )}

      {/* Conteúdo principal */}
      <div className="max-w-screen-lg mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Categorias fixas */}
        <div className="flex flex-col gap-4">
          {[
            { text: 'Regras de Trânsito', route: '/regras-transito' },
            { text: 'Direção Defensiva', route: '/direcao-defensiva' },
            { text: 'Sinalização', route: '/sinalizacao' },
            { text: 'Órgãos de Trânsito', route: '/orgao-transito' },
          ].map(({ text, route }) => (
            <button
              key={route}
              onClick={() => navigate(route)}
              className="bg-gray-300 text-black px-6 py-4 rounded-md text-lg text-left hover:bg-gray-400 transition"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Botões de acesso */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/atividades')}
            className="bg-red-400 text-white font-bold text-xl rounded-md px-4 py-10 hover:bg-red-500"
          >
            Atividades
          </button>
          <button
            onClick={() => navigate('/provas')}
            className="bg-orange-600 text-white font-bold text-xl rounded-md px-4 py-10 hover:bg-orange-700"
          >
            Minhas <br /> Provas
          </button>
          <button
            onClick={() => navigate('/progresso')}
            className="bg-red-600 text-white font-bold text-xl rounded-md px-4 py-20 hover:bg-red-700 "
          >
            Meu <br /> Progresso
          </button>

          {/* Só mostra “Minhas Atividades” se for orientador verificado */}
          {isOrientador && verified && (
            <button
              onClick={() => navigate('/minhas_atividades')}
              className="bg-purple-600 text-white font-bold text-xl rounded-md px-4 py-20 hover:bg-purple-700"
            >
              Minhas <br /> Atividades
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
