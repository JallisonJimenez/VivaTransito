import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MinhasProvas() {
  const [provas, setProvas] = useState<any[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Você precisa estar logado.");
      return;
    }

    fetch("http://localhost:3001/provas/minhas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setProvas)
      .catch(err => {
        console.error(err);
        setErro("Erro ao carregar provas.");
      });
  }, []);

  if (erro) return <div className="p-6 text-red-600">{erro}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Provas</h1>
      {provas.length === 0 ? (
        <p className="text-gray-600">Nenhuma prova cadastrada.</p>
      ) : (
        <ul className="space-y-4">
          {provas.map((prova) => (
            <li key={prova.id} className="border p-4 rounded shadow flex justify-between items-center">
              <span className="font-semibold">{prova.titulo}</span>
              <button
                onClick={() => navigate(`/prova/${prova.id}`)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Começar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
