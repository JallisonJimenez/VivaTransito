import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



interface Atividade {
  id: number;
  texto_principal: string;
  texto_secundario?: string;
  categoria: string;
  nivel_dificuldade: string;
}

export default function MinhasAtividades() {
  const navigate = useNavigate();
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [erro, setErro] = useState<string | null>(null);


  const excluirAtividade = async (id: number) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta atividade?");
    if (!confirmar) return;
  
    const token = localStorage.getItem("token");
  
    const res = await fetch(`http://localhost:3001/atividades/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      alert("✅ Atividade excluída!");
      // Atualiza a lista removendo a atividade localmente
      setAtividades((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("Erro ao excluir atividade.");
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Você precisa estar logado.");
      return;
    }

    fetch("http://localhost:3001/atividades/minhas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg);
        }
        return res.json();
      })
      .then(setAtividades)
      .catch((err) => setErro(err.message));
  }, []);

  if (erro) return <div className="p-6 text-red-600">{erro}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Atividades</h1>
      {atividades.length === 0 ? (
        <p className="text-gray-600">Nenhuma atividade encontrada.</p>
      ) : (
        
        <ul className="space-y-4">
        {atividades.map((a) => (
  <li key={a.id} className="border p-4 rounded shadow">
    <p className="font-bold">{a.texto_principal}</p>
    {a.texto_secundario && <p className="text-gray-600">{a.texto_secundario}</p>}
    <p className="text-sm text-gray-500">
      Categoria: {a.categoria} | Dificuldade: {a.nivel_dificuldade}
    </p>

    <div className="flex gap-4 mt-2">
      <button
        onClick={() => navigate(`/editar-atividade/${a.id}`)}
        className="text-blue-600 underline text-sm"
      >
        Editar
      </button>

      <button
        onClick={() => excluirAtividade(a.id)}
        className="text-red-600 underline text-sm"
      >
        Excluir
      </button>
    </div>
  </li>
))}

      </ul>
      
      )}
    </div>
  );
}
