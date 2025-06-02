import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const provasPorAssunto = {
  'Direção Defensiva': ['Prova 1', 'Prova 2', 'Prova 3'],
  'Legislação de Trânsito': ['Prova 1', 'Prova 2'],
  'Primeiros Socorros': ['Prova 1'],
};

const assuntos = Object.keys(provasPorAssunto);

export default function Provas() {
  const [indiceAssunto, setIndiceAssunto] = useState(0);
  const navigate = useNavigate();

  const proximo = () => {
    setIndiceAssunto((prev) => (prev + 1) % assuntos.length);
  };

  const anterior = () => {
    setIndiceAssunto((prev) =>
      prev === 0 ? assuntos.length - 1 : prev - 1
    );
  };

  const assuntoAtual = assuntos[indiceAssunto];
  const provas = provasPorAssunto[assuntoAtual];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Provas</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Voltar
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">{assuntoAtual}</h2>
        <div className="flex justify-center mt-2 space-x-4">
          <button onClick={anterior} className="px-4 py-2 bg-gray-200 rounded">◀</button>
          <button onClick={proximo} className="px-4 py-2 bg-gray-200 rounded">▶</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {provas.map((prova, idx) => (
          <div key={idx} className="border p-4 rounded shadow text-center">
            <h3 className="text-lg font-bold">{prova}</h3>
            <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Começar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
