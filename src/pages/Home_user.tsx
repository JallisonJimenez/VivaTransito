import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-400 flex items-center justify-between p-4">
        {/* Campo de pesquisa */}
        <div className="flex items-center bg-white rounded-md px-3 py-2 w-1/2 max-w-md border border-black">
          <span className="mr-2 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="ml-2 text-xl">❌</button>
          )}
        </div>

        {/* Botões de login */}
        <div className="flex items-center gap-4">
  
          <div
            
            className="w-10 h-10 border border-black rounded-full flex items-center justify-center text-2xl cursor-pointer"
          >
            👤
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-screen-lg mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Lado Esquerdo */}
        <div className="flex flex-col gap-4">
          {['Regras de Transito', 'Direção Defensiva', 'Sinalização', 'Órgãos de Transito'].map((text) => (
            <button
              key={text}
              className="bg-gray-300 text-black px-6 py-4 rounded-md text-lg text-left hover:bg-gray-400 transition"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Lado Direito */}
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
            className="bg-red-600 text-white font-bold text-xl rounded-md px-4 py-20 hover:bg-red-700 col-span-2"

          >
            Meu <br /> Progresso
          </button>

          

        </div>
      </div>
    </div>
  );
}
