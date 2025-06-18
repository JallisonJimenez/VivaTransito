// src/pages/Provas.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function validarData(data: string): boolean {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(data);
}

export default function Provas() {
  const [provas, setProvas] = useState<any[]>([]);
  const [dataProva, setDataProva] = useState('');
  const [erroData, setErroData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch('http://localhost:3001/atividades?categoria=Prova', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setProvas)
      .catch((err) => console.error('Erro ao buscar provas:', err));
  }, []);

  const handleSalvarData = async (provaId: number) => {
    if (!validarData(dataProva)) {
      setErroData('Formato de data inválido. Use DD/MM/AAAA.');
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/provas/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          provaId,
          data: dataProva,
        }),
      });

      if (res.ok) {
        alert("Data salva com sucesso!");
        setErroData('');
      } else {
        const erro = await res.text();
        alert("Erro ao salvar data: " + erro);
      }
    } catch (err) {
      alert("Erro de conexão.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Provas</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Voltar
        </button>
      </div>

      {provas.length === 0 ? (
        <p className="text-gray-600">Nenhuma prova encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {provas.map((prova, idx) => (
            <div key={idx} className="border p-4 rounded shadow text-center">
              <h3 className="text-lg font-bold mb-2">{prova.texto_principal}</h3>

              <input
                type="text"
                placeholder="Data da prova (DD/MM/AAAA)"
                value={dataProva}
                onChange={(e) => setDataProva(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              {erroData && <p className="text-red-600 text-sm">{erroData}</p>}

              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mb-2 w-full"
                onClick={() => handleSalvarData(prova.id)}
              >
                Salvar Data
              </button>

              <button
                onClick={() => navigate(`/responder/${prova.id}`)}
                className="bg-green-500 text-white px-3 py-1 rounded w-full"
              >
                Começar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
