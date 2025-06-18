import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Feedback() {
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState<number | null>(null);
  const navigate = useNavigate();

  const enviarFeedback = () => {
    if (nota === null || comentario.trim() === '') {
      alert('Por favor, escreva um comentário e selecione uma nota.');
      return;
    }

    // Aqui você pode enviar os dados para o backend futuramente
    console.log('Nota:', nota);
    console.log('Comentário:', comentario);

    alert('Obrigado pelo seu feedback!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Deixe seu Feedback</h1>

      {/* Campo de texto */}
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escreva aqui sua opinião sobre a plataforma..."
        className="w-full max-w-xl h-40 p-4 border border-gray-400 rounded-md mb-6 resize-none"
      />

      {/* Notas de 0 a 10 */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
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

      {/* Botão de envio */}
      <button
        onClick={enviarFeedback}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
      >
        Enviar Feedback
      </button>
    </div>
  );
}
