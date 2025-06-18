import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegrasTransito() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-blue-700 flex items-center gap-3">
        <span>📘</span> Regras de Trânsito
      </h1>

      <p className="mb-6 text-gray-800 text-lg leading-relaxed">
        As regras de trânsito são normas legais estabelecidas para garantir a segurança e fluidez no tráfego de veículos e pedestres. Segui-las é essencial para evitar acidentes, proteger vidas e manter a ordem nas vias públicas.
      </p>

      {/* Seção 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-400 pb-2">
          1. Regras de Prioridade
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Em cruzamentos sem sinalização, a preferência é de quem vem pela direita.</li>
          <li>Pedestres têm prioridade nas faixas de travessia, mesmo sem semáforo.</li>
          <li>Veículos de emergência (ambulância, bombeiros, polícia) têm sempre prioridade.</li>
        </ul>
      </section>

      {/* Seção 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-400 pb-2">
          2. Limites de Velocidade
        </h2>
        <p className="text-gray-700 mb-4">
          Os limites de velocidade variam de acordo com o tipo de via:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Vias urbanas: entre 30 km/h e 60 km/h.</li>
          <li>Rodovias: até 110 km/h para veículos leves.</li>
          <li>Vias escolares: máximo de 30 km/h durante o horário escolar.</li>
        </ul>
      </section>

      {/* Seção 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-400 pb-2">
          3. Regras de Ultrapassagem
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Ultrapassar sempre pela esquerda.</li>
          <li>É proibido ultrapassar em curvas, pontes, cruzamentos e locais sem visibilidade.</li>
          <li>Sinalize antes de iniciar a manobra e retorne à faixa com segurança.</li>
        </ul>
      </section>

      {/* Seção 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-400 pb-2">
          4. Uso Obrigatório de Equipamentos
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Cinto de segurança para todos os ocupantes do veículo.</li>
          <li>Cadeirinhas e assentos apropriados para crianças.</li>
          <li>Capacete para motociclistas e ciclistas em vias movimentadas.</li>
          <li>Faróis acesos em rodovias e em baixa visibilidade.</li>
        </ul>
      </section>

      {/* Seção 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-blue-400 pb-2">
          5. Penalidades por Infrações
        </h2>
        <p className="text-gray-700 mb-4">
          O não cumprimento das regras de trânsito pode resultar em:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Multas financeiras.</li>
          <li>Perda de pontos na CNH.</li>
          <li>Suspensão ou cassação do direito de dirigir.</li>
          <li>Recolhimento do veículo.</li>
        </ul>
      </section>

      {/* Dica final */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-gray-800 rounded-md mb-10">
        <strong>Dica:</strong> Conhecer o <i>Código de Trânsito Brasileiro (CTB)</i> é essencial para quem deseja ser um condutor responsável.
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-10 bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 font-semibold transition"
      >
        ← Voltar à Home
      </button>
    </div>
  );
}
