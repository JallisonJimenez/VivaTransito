import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResponderAtividade() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [atividade, setAtividade] = useState<any>(null);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/atividades/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.ok ? res.json() : Promise.reject("Erro ao carregar atividade"))
      .then(setAtividade)
      .catch(setErro);
  }, [id]);

  const enviarResposta = async () => {
    if (respostaSelecionada === null) return alert("Escolha uma alternativa.");

    const res = await fetch("http://localhost:3001/responder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarioId: atividade.usuario_id, // ou do token
        atividadeId: atividade.id,
        resposta: respostaSelecionada,
      }),
    });

    const json = await res.json();
    setResultado(json.acertou ? "✅ Você acertou!" : "❌ Você errou.");
  };

  if (erro) return <div className="p-6 text-red-600">{erro}</div>;
  if (!atividade) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <button onClick={() => navigate(-1)} className="mb-4 underline text-blue-600">Voltar</button>
      <h1 className="text-xl font-bold mb-4">Responder Atividade</h1>

      <p className="mb-2">{atividade.texto_principal}</p>
      {atividade.texto_secundario && <p className="mb-2 text-gray-600">{atividade.texto_secundario}</p>}
      {atividade.imagem && (
        <img src={`http://localhost:3001/imagens/${atividade.imagem}`} alt="Imagem" className="mb-4" />
      )}

      {[1, 2, 3, 4].map((num) => (
        <label key={num} className="block mb-2 cursor-pointer">
          <input
            type="radio"
            name="resposta"
            value={num}
            checked={respostaSelecionada === num}
            onChange={() => setRespostaSelecionada(num)}
            className="mr-2"
          />
          {atividade[`resposta${num}`]}
        </label>
      ))}

      <button
        onClick={enviarResposta}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Enviar Resposta
      </button>

      {resultado && (
        <p className={`mt-4 font-bold ${resultado.includes("acertou") ? "text-green-600" : "text-red-600"}`}>
          {resultado}
        </p>
      )}
    </div>
  );
}
