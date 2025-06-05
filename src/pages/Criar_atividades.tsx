import React, { useState } from "react";

export default function CreateActivity() {
  const [form, setForm] = useState({
    texto: "",
    imagem: null as File | null,
    respostas: ["", "", "", ""],
    respostaCerta: "1",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("Atividade criada:");
    console.log("Texto:", form.texto);
    console.log("Imagem:", form.imagem?.name || "Nenhuma");
    console.log("Respostas:", form.respostas);
    console.log("Resposta Correta:", form.respostaCerta);
  
    // Mostra pop-up de confirmação
    window.alert("✅ Atividade criada com sucesso!");
  
    // Reseta a página
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Criar Nova Atividade</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Texto principal */}
        <div>
          <label className="block font-medium mb-1">Texto Principal</label>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={form.texto}
            onChange={(e) => setForm({ ...form, texto: e.target.value })}
            required
          />
        </div>

        {/* Imagem (upload) */}
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

        {/* Resposta correta */}
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar Atividade
        </button>
      </form>
    </div>
  );
}
