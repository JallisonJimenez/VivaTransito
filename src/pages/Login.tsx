// src/pages/Login.tsx
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      if (data.isOrientador) {
        navigate('/Home_adm');
      } else {
        navigate('/Home');
      }
    } else {
      alert('Usuário ou senha incorretos');
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
    
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-8 border rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-2 rounded hover:bg-gray-800"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-4 text-black">
          Não tem uma conta?{' '}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate('/cadastro')}
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
    </div>
  );
}
