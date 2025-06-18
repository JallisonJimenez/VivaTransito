import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function validarData(data: string): boolean {
  // Regex para validar formato DD/MM/AAAA
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(data);
}

export default function Provas() {
  const [provas, setProvas] = useState<any[]>([]);
  const [dataProva, setDataProva] = useState('');
  const [erroData, setErroData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvas = async () => {
      try {
        const res = await fetch('http://localhost:3001/atividades?categoria=Prova');
        const dados = await res.json();
        setProvas(dados);
      } catch (err) {
        console.error('Erro ao buscar provas:', err);
      }
    };

    fetchProvas();
  }, []);

  const handleSalvar = () => {
    if (!validarData(dataProva)) {
      setErroData('Formato de data inválido. Use DD/MM/AAAA.');
      return;
    }

    setErroData('');
    alert('Alterações salvas com sucesso!');
    // Aqui poderia chamar uma API POST/PUT para salvar a data associada à prova
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

      <div className="mb-6 max-w-xs mx-auto">
        <label htmlFor="dataProva" className="block font-semibold mb-1">Data da prova (DD/MM/AAAA):</label>
        <input
          id="dataProva"
          type="text"
          value={dataProva}
          onChange={(e) => setDataProva(e.target.value)}
          placeholder="Ex: 25/12/2025"
          className="w-full px-3 py-2 border rounded focus:outline-none"
        />
        {erroData && (
          <p className="text-red-600 mt-1 text-sm">{erroData}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {provas.map((prova, idx) => (
          <div key={idx} className="border p-4 rounded shadow text-center">
            <h3 className="text-lg font-bold">{prova.texto_principal}</h3>
            <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Começar</button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSalvar}
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}