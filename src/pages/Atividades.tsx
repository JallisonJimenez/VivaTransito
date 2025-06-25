import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Atividade {
  id: number;
  texto_principal: string;
  categoria: string;
  nivel_dificuldade: string;
  // outros campos, se necessário
}

export default function Atividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [aberto, setAberto] = useState<string | null>(null);
  const navigate = useNavigate();
  const atividadesFiltradas = atividades.filter(a => a.categoria !== "Prova");

  // Agrupa atividades por categoria
  const atividadesPorCategoria = atividadesFiltradas.reduce<Record<string, Atividade[]>>((acc, atividade) => {
    if (!acc[atividade.categoria]) {
      acc[atividade.categoria] = [];
    }
    acc[atividade.categoria].push(atividade);
    return acc;
  }, {});
        {/* Botão fixo no canto inferior direito */}
      <button
        onClick={() => navigate('/feedback')}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
      >
        Deixe seu feedback!
      </button>

useEffect(() => {
  async function fetchAtividades() {
    const headers: Record<string,string> = {};
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch('http://localhost:3001/atividades', { headers });
    if (!res.ok) throw new Error('Erro ao buscar atividades');
    const data = await res.json();
    setAtividades(data);
  }
  fetchAtividades();
}, []);


  const toggleCategoria = (categoria: string) => {
    setAberto(aberto === categoria ? null : categoria);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Atividades</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Voltar
        </button>
      </div>

      {Object.entries(atividadesPorCategoria).map(([categoria, atividades]) => (
        <div key={categoria} className="mb-4 bg-white shadow rounded">
          <button
            onClick={() => toggleCategoria(categoria)}
            className="w-full text-left px-4 py-3 bg-gray-200 font-semibold"
          >
            📂 {categoria}
          </button>
          {aberto === categoria && (
            <div className="p-4">
              <ul>
                {atividades.map((atividade) => (
                  <li key={atividade.id} className="mb-2">
                    <span className="block font-medium">{atividade.texto_principal}</span>
                    <span className="text-sm text-gray-600"> Dificuldade: {atividade.nivel_dificuldade + " "}
                    </span>
                    <button
                      onClick={() => navigate(`/responder/${atividade.id}`)}
                      className="mt-1 text-sm text-blue-600 underline"
                    >
                      Acessar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
