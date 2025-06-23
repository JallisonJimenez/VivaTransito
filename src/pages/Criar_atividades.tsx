import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CriarAtividades() {
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

  const handleRespostaChange = (index: number, value: string) => {
    const novasRespostas = [...form.respostas];
    novasRespostas[index] = value;
    setForm({ ...form, respostas: novasRespostas });
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, imagem: file });
  };
const maxLenght = 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const atividade = {
      textoPrincipal: form.textoPrincipal,
      textoSecundario: form.textoSecundario,
      imagem: form.imagem?.name ?? null,
      respostas: form.respostas,
      respostaCerta: parseInt(form.respostaCerta),
      categoria: form.categoria,
      nivelDificuldade: form.nivelDificuldade,
    };

    const res = await fetch("http://localhost:3001/atividades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(atividade),
    });

    if (res.ok) {
      alert("✅ Atividade criada com sucesso!");
      window.location.reload();
    } else {
      alert("Erro ao criar atividade");
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

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Criar Nova Atividade</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Texto Principal */}
          <div>
            <label className="block font-medium mb-1">Título</label>
            <textarea
              className="w-full border rounded p-2"
              rows={1}
              value={form.textoPrincipal}
              onChange={(e) => setForm({ ...form, textoPrincipal: e.target.value })}
              required
            />
          </div>

          {/* Texto Secundário */}
          <div>
            <label className="block font-medium mb-1">Pergunta</label>
            <textarea
              className="w-full border rounded p-2"
           
              rows={1}
              value={form.textoSecundario}
              onChange={(e) => setForm({ ...form, textoSecundario: e.target.value })}
              required
            />
          </div>

          {/* Imagem */}
          <div>
            <label className="block font-medium mb-1">Imagem (opcional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={handleImagemChange}
            />
            {form.imagem && (
              <p className="text-sm text-gray-600 mt-1">Selecionado: {form.imagem.name}</p>
            )}
          </div>

          {/* Respostas */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <label className="block font-medium mb-1">Resposta {i + 1}</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={form.respostas[i]}
                onChange={(e) => handleRespostaChange(i, e.target.value)}
                required
              />
            </div>
          ))}

          {/* Resposta Correta */}
          <div>
            <label className="block font-medium mb-1">Resposta Correta</label>
            <select
              className="w-full border rounded p-2"
              value={form.respostaCerta}
              onChange={(e) => setForm({ ...form, respostaCerta: e.target.value })}
            >
              <option value="1">Resposta 1</option>
              <option value="2">Resposta 2</option>
              <option value="3">Resposta 3</option>
              <option value="4">Resposta 4</option>
            </select>
          </div>

          {/* Categoria */}
          <div>
            <label className="block font-medium mb-1 mb-2">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {["Regras de Trânsito", "Direção", "Legislação"].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setForm({ ...form, categoria: cat })}
                  className={`px-4 py-2 rounded border ${form.categoria === cat ? "bg-blue-600 text-white" : "bg-gray-100"
                    } hover:bg-blue-100`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Nível de Dificuldade */}
          <div>
            <label className="block font-medium mb-1">Nível de Dificuldade</label>
            <select
              className="w-full border rounded p-2"
              value={form.nivelDificuldade}
              onChange={(e) => setForm({ ...form, nivelDificuldade: e.target.value })}
              required
            >
              <option value="fácil">Fácil</option>
              <option value="médio">Médio</option>
              <option value="difícil">Difícil</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Criar Atividade
          </button>
        </form>
      </div>
    </div>
  );
}
