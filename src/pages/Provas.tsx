// src/pages/Provas.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Prova {
  id: number;
  titulo: string;
  data: string;
}

export default function Provas() {
  const [provas, setProvas] = useState<Prova[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setErro("Você precisa estar logado.");

    fetch("http://localhost:3001/provas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("Erro ao buscar provas")))
      .then(setProvas)
      .catch((err) => setErro(String(err)));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Provas Disponíveis</h1>
        <button onClick={() => navigate(-1)} className="bg-gray-200 px-4 py-2 rounded">
          Voltar
        </button>
      </div>

      {erro ? (
        <p className="text-red-600">{erro}</p>
      ) : provas.length === 0 ? (
        <p className="text-gray-600">Nenhuma prova encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {provas.map((prova) => (
            <div key={prova.id} className="border p-4 rounded shadow text-center">
              <h3 className="text-lg font-bold">{prova.titulo}</h3>
              <p className="text-sm text-gray-600">Data: {new Date(prova.data).toLocaleDateString()}</p>
              <button
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/responder-prova/${prova.id}`)}
              >
                Começar Prova
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  