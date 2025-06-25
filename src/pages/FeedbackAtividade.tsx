// src/pages/FeedbackAtividade.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FeedbackAtividade() {
  const { id: atividadeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState<number | null>(null);

  const enviarFeedback = async () => {
    if (!comentario.trim() || nota == null) {
      alert('Escreva um comentário e selecione uma nota.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:3001/atividades/${atividadeId}/feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comentario, nota }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      alert('Feedback enviado com sucesso!');
      navigate(-1);
    } catch (err: any) {
      alert('Erro ao enviar feedback: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback da Questão</h1>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Seu comentário..."
        className="w-full max-w-md h-32 p-2 border rounded mb-4"
      />
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => setNota(i)}
            className={`w-10 h-10 rounded-full text-white font-bold ${
              nota === i ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <button
        onClick={enviarFeedback}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Enviar Feedback
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mt-2 text-gray-600 underline"
      >
        Voltar
      </button>
    </div>
  );
}
