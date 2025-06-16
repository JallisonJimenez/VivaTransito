// src/pages/Cadastro.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Cadastro() {
  const navigate = useNavigate();
  const [isOrientador, setIsOrientador] = useState(false);
  const [termos, setTermos] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termos) return alert('Você precisa concordar com os termos.');
  
    const res = await fetch('http://localhost:3001/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'usuarioExemplo',
        password: 'senhaSegura',
        isOrientador,
        cpf: '123.456.789-00',
        telefone: '11999999999',
        foto: foto?.name ?? null,
      }),
    });
  
    if (res.ok) {
      alert('Cadastro realizado!');
      navigate('/');
    } else {
      alert('Erro no cadastro');
    }
  };
  
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 border rounded hover:bg-gray-100"
        >
          Voltar
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4 border p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Cadastro</h1>

const
        <input type="text" placeholder="Usuário" className="w-full p-2 border rounded" required />

        <input type="password" placeholder="Senha" className="w-full p-2 border rounded" required />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isOrientador}
            onChange={(e) => setIsOrientador(e.target.checked)}
          />
          <span>Sou orientador</span>
        </label>

        <input type="file" accept="application/*" className="w-full" />

        <input type="text" placeholder="CPF" className="w-full p-2 border rounded" required />

        <input type="tel" placeholder="Telefone" className="w-full p-2 border rounded" required />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={termos}
            onChange={(e) => setTermos(e.target.checked)}
          />
          <span>Concordo com os termos de uso</span>
          <a
            href="/termos-de-uso.pdf"
            download
            className="ml-auto text-blue-600 underline"
          >
            Baixar termos
          </a>
        </div>

        <div>
          <label className="block mb-1">Foto</label>
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-2 rounded hover:bg-gray-800"
        >
          Finalizar
        </button>
      </form>
    </div>
  );
}
