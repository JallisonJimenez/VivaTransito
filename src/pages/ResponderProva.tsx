import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResponderProva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    fetch(`http://localhost:3001/prova/${id}/questoes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setQuestoes)
      .catch(err => console.error(err));
  }, [id]);

  const responder = async () => {
    if (respostaSelecionada === null) return alert("Selecione uma resposta.");
    const token = localStorage.getItem("token");
    const questao = questoes[indice];

    const res = await fetch("http://localhost:3001/responder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        usuarioId: JSON.parse(atob(token!.split(".")[1])).id,
        atividadeId: questao.id,
        resposta: respostaSelecionada,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.acertou) setPontuacao(p => p + 1);
    }

    setRespostaSelecionada(null);
    if (indice + 1 < questoes.length) {
      setIndice(i => i + 1);
    } else {
      setFinalizado(true);
    }
  };

  if (questoes.length === 0) return <div className="p-6">Carregando questões...</div>;

  if (finalizado) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Prova Finalizada!</h1>
        <p className="mt-4 text-xl">Você acertou {pontuacao} de {questoes.length} questões.</p>
        <button onClick={() => navigate(-1)} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
          Voltar
        </button>
      </div>
    );
  }

  const q = questoes[indice];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Questão {indice + 1}</h2>
      <p className="mb-4">{q.texto_principal}</p>
      {[1, 2, 3, 4].map((i) => (
        <label key={i} className="block mb-2">
          <input
            type="radio"
            name="resposta"
            value={i}
            checked={respostaSelecionada === i}
            onChange={() => setRespostaSelecionada(i)}
            className="mr-2"
          />
          {q[`resposta${i}`]}
        </label>
      ))}
      <button
        onClick={responder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Responder
      </button>
    </div>
  );
}
