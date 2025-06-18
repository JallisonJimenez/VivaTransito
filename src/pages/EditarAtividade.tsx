import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarAtividade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    textoPrincipal: "",
    textoSecundario: "",
    imagem: null as File | null,
    respostas: ["", "", "", ""],
    respostaCerta: "1",
    categoria: "",
    nivelDificuldade: "fácil",
  });

  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    fetch(`http://localhost:3001/atividades/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          textoPrincipal: data.texto_principal,
          textoSecundario: data.texto_secundario || "",
          imagem: null,
          respostas: [data.resposta1, data.resposta2, data.resposta3, data.resposta4],
          respostaCerta: data.resposta_certa.toString(),
          categoria: data.categoria,
          nivelDificuldade: data.nivel_dificuldade,
        });
      })
      .catch(err => {
        console.error(err);
        setErro("Não foi possível carregar a atividade.");
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3001/atividades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        imagem: form.imagem?.name ?? null,
        respostaCerta: parseInt(form.respostaCerta),
      }),
    });

    if (res.ok) {
      alert("✅ Atividade atualizada!");
      navigate("/minhas_atividades");
    } else {
      alert("Erro ao atualizar atividade.");
    }
  };

  const handleRespostaChange = (index: number, value: string) => {
    const novasRespostas = [...form.respostas];
    novasRespostas[index] = value;
    setForm({ ...form, respostas: novasRespostas });
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, imagem: file });
  };

  if (erro) return <div className="p-4 text-red-600">{erro}</div>;

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
      
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Atividade</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-2"
          value={form.textoPrincipal}
          onChange={(e) => setForm({ ...form, textoPrincipal: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2"
          placeholder="Texto secundário (opcional)"
          value={form.textoSecundario}
          onChange={(e) => setForm({ ...form, textoSecundario: e.target.value })}
        />
        <input type="file" onChange={handleImagemChange} />
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            className="w-full border p-2"
            value={form.respostas[i]}
            onChange={(e) => handleRespostaChange(i, e.target.value)}
            required
          />
        ))}
        <select
          value={form.respostaCerta}
          onChange={(e) => setForm({ ...form, respostaCerta: e.target.value })}
        >
          <option value="1">Resposta 1</option>
          <option value="2">Resposta 2</option>
          <option value="3">Resposta 3</option>
          <option value="4">Resposta 4</option>
        </select>
        <input
          className="w-full border p-2"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          required
        />
        <select
          value={form.nivelDificuldade}
          onChange={(e) => setForm({ ...form, nivelDificuldade: e.target.value })}
        >
          <option value="fácil">Fácil</option>
          <option value="médio">Médio</option>
          <option value="difícil">Difícil</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar Alterações
        </button>
      </form>
    </div>
    </div>
  );
}
