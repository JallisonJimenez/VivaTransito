import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const atividadesPorCategoria = {
  'Direção Defensiva': ['Atividade 1', 'Atividade 2', 'Atividade 3'],
  'Legislação de Trânsito': ['Atividade 1', 'Atividade 2'],
  'Sinalização': ['Atividade 1'],
};

export default function Atividades() {
  const [aberto, setAberto] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleCategoria = (categoria: string) => {
    setAberto(aberto === categoria ? null : categoria);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Atividades</h1>
        <button
          onClick={() => navigate('/')}
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
            🍔 {categoria}
          </button>
          {aberto === categoria && (
            <div className="p-4">
              <ul>
                {atividades.map((atividade, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="block font-medium">{atividade}</span>
                    <button className="mt-1 text-sm text-blue-600 underline">
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
