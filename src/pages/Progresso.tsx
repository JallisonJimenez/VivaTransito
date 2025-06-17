// src/pages/Progresso.tsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";

export default function Progresso() {
  const navigate = useNavigate();
  const [dataSets, setDataSets] = useState<any[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Você precisa estar logado.");
      return;
    }

    fetch("http://localhost:3001/progresso", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar progresso");
        return res.json();
      })
      .then((res) => {
        const agrupado = new Map<string, any[]>();

        res.forEach((item: any) => {
          const categoria = item.categoria;
          const dificuldade = item.nivel_dificuldade;
          const acertos = item.acertos;
          const erros = item.erros;

          if (!agrupado.has(categoria)) agrupado.set(categoria, []);
          agrupado.get(categoria)!.push({ dificuldade, acertos, erros });
        });

        const formatado = Array.from(agrupado.entries()).map(([categoria, dados]) => {
          let totalErros = 0;

          const data = dados.map(({ dificuldade, acertos, erros }) => {
            totalErros += Number(erros);
            const cores: any = {
              fácil: "#34d399",
              médio: "#fbbf24",
              difícil: "#f87171",
            };
            return {
              name: dificuldade.charAt(0).toUpperCase() + dificuldade.slice(1),
              value: Number(acertos),
              color: cores[dificuldade] || "#ccc",
            };
          });

          data.push({ name: "Erros", value: totalErros, color: "#9ca3af" });

          return { title: categoria, data };
        });

        setDataSets(formatado);
      })
      .catch((err) => setErro(err.message));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white">
      {/* Barra superior */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="border rounded px-3 py-2 w-1/2"
        />
        <div className="flex gap-2 items-center">
          <Button onClick={() => navigate(-1)}>Voltar</Button>
          <div
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <span className="text-xl">👤</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      {erro ? (
        <p className="text-red-600">{erro}</p>
      ) : dataSets.length === 0 ? (
        <p className="text-gray-600">Carregando progresso...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataSets.map(({ title, data }) => (
            <div key={title} className="flex flex-col items-center">
              <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <Button className="mt-4">Revisar</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
