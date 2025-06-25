// src/pages/Cadastro.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

export default function Cadastro() {
  const navigate = useNavigate();
  const [isOrientador, setIsOrientador] = useState(false);
  const [termos, setTermos] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termos) return alert('Você precisa concordar com os termos.');

    // FRONT validation (mesmo regex do backend)
    if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) {
      return alert('CPF inválido. Use 000.000.000-00');
    }
    if (!/^\+55\s\(\d{2}\)\s\d{5}\-\d{4}$/.test(telefone)) {
      return alert('Telefone inválido. Use +55 (00) 00000-0000.');
    }
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[\W_]/.test(password)
    ) {
      return alert('Senha fraca. Mínimo 8 caracteres, com maiúscula, minúscula, número e especial.');
    }

    const res = await fetch('http://localhost:3001/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        email,
        isOrientador,
        cpf,
        telefone,
        foto: foto?.name ?? null,
      }),
    });

    if (res.ok) {
      alert('Cadastro realizado!');
      navigate('/login');
    } else {
      const msg = await res.text();
      alert('Erro no cadastro: ' + msg);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-end">
        <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 border p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Cadastro</h1>

        <input
          type="text"
          placeholder="Usuário"
          className="w-full p-2 border rounded"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-2 border rounded"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <InputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
        >
          {(props: any) => (
            <input
              {...props}
              type="text"
              placeholder="CPF (000.000.000-00)"
              className="w-full p-2 border rounded"
              required
            />
          )}
        </InputMask>

        <InputMask
          mask="+55 (99) 99999-9999"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
        >
          {(props: any) => (
            <input
              {...props}
              type="tel"
              placeholder="+55 (00) 00000-0000"
              className="w-full p-2 border rounded"
              required
            />
          )}
        </InputMask>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isOrientador}
            onChange={e => setIsOrientador(e.target.checked)}
          />
          <span>Sou orientador</span>
        </label>

        <div>
          <label className="block mb-1">Foto</label>
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={termos}
            onChange={e => setTermos(e.target.checked)}
          />
          <span>Concordo com os termos de uso</span>
          <a href="/termos-de-uso.pdf" download className="ml-auto text-blue-600 underline">
            Baixar termos
          </a>
        </label>

        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Finalizar
        </button>
      </form>
    </div>
  );
}
