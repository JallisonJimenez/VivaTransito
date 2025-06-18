import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DirecaoDefensiva() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-green-700 flex items-center gap-3">
        <span>🛡️</span> Direção Defensiva
      </h1>

      <p className="mb-6 text-gray-800 text-lg leading-relaxed">
        Direção defensiva é um conjunto de técnicas e atitudes que visam prevenir acidentes, mesmo em situações causadas por fatores externos como condições climáticas, falhas mecânicas ou erro de outros condutores. Um bom motorista antecipa riscos e age com responsabilidade.
      </p>

      {/* Seção 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-400 pb-2">
          1. Princípios da Direção Defensiva
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Conhecimento:</strong> Domínio das leis de trânsito, sinalizações e do próprio veículo.</li>
          <li><strong>Atenção:</strong> Estar concentrado no trânsito, evitando distrações com celular, rádio etc.</li>
          <li><strong>Previsão:</strong> Antecipar possíveis erros de outros condutores e agir com prudência.</li>
          <li><strong>Decisão:</strong> Agir rapidamente, com segurança e responsabilidade.</li>
          <li><strong>Habilidade:</strong> Manusear o veículo com domínio e técnica.</li>
        </ul>
      </section>

      {/* Seção 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-400 pb-2">
          2. Condições de Risco
        </h2>
        <p className="text-gray-700 mb-4">
          O condutor deve estar atento a diferentes fatores que podem representar risco:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Ambiente:</strong> Chuva, neblina, buracos, má sinalização ou iluminação deficiente.</li>
          <li><strong>Veículo:</strong> Falta de manutenção, pneus carecas, freios com defeito.</li>
          <li><strong>Condutor:</strong> Sono, uso de álcool ou drogas, estresse, distrações.</li>
          <li><strong>Outros:</strong> Comportamento de pedestres, ciclistas ou motoristas imprudentes.</li>
        </ul>
      </section>

      {/* Seção 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-400 pb-2">
          3. Dicas de Direção Defensiva
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Mantenha distância segura do veículo à frente.</li>
          <li>Reduza a velocidade em cruzamentos e locais de baixa visibilidade.</li>
          <li>Use os espelhos retrovisores com frequência.</li>
          <li>Respeite os limites de velocidade e as sinalizações.</li>
          <li>Evite freadas bruscas e ultrapassagens perigosas.</li>
          <li>Não use celular ao dirigir.</li>
        </ul>
      </section>

      {/* Seção 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-green-400 pb-2">
          4. Benefícios da Direção Defensiva
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Redução de acidentes e mortes no trânsito.</li>
          <li>Menores custos com manutenção, combustível e seguros.</li>
          <li>Mais conforto e segurança para todos os ocupantes.</li>
          <li>Maior confiança e tranquilidade ao dirigir.</li>
        </ul>
      </section>

      {/* Dica final */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 text-gray-800 rounded-md mb-10">
        <strong>Dica:</strong> A direção defensiva não depende só de habilidade, mas de consciência e respeito pela vida!
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-10 bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700 font-semibold transition"
      >
        ← Voltar à Home
      </button>
    </div>
  );
}
