import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-400 flex items-center justify-between p-4">
        <div className="flex items-center gap-2 w-1/2">
          <div className="bg-white rounded px-2 py-1 flex items-center w-full">
            <span className="mr-2">🔍</span>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
            {search && (
              <button onClick={() => setSearch('')}>❌</button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => navigate('/login')}>Entrar</Button>
          <div
            className="w-10 h-10 rounded-full border border-black flex items-center justify-center cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-8">
        {/* Lado Esquerdo */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          {['Regras de Transito', 'Direção Defensiva', 'Sinalização', 'Órgãos de Transito'].map((text) => (
            <button
              key={text}
              className="bg-gray-300 rounded px-4 py-3 text-left text-lg hover:bg-gray-400"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Lado Direito */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-2/3">
          <button
            onClick={() => navigate('/atividades')}
            className="bg-red-400 text-white font-bold text-xl rounded px-4 py-10 hover:bg-red-500"
          >
            Atividades
          </button>
          <button
            onClick={() => navigate('/progresso')}
            className="bg-red-600 text-white font-bold text-xl rounded px-4 py-16 hover:bg-red-700 col-span-1 row-span-2"
          >
            Meu <br /> Progresso
          </button>
          <button
            onClick={() => navigate('/provas')}
            className="bg-orange-600 text-white font-bold text-xl rounded px-4 py-10 hover:bg-orange-700"
          >
            Minhas <br /> Provas
          </button>
        </div>
      </div>
    </div>
  );
}
