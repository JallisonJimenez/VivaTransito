import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrgaoTransito() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-yellow-700 flex items-center gap-3">
        <span>🏛️</span> Órgãos de Trânsito
      </h1>

      <p className="mb-6 text-gray-800 text-lg leading-relaxed">
        O Sistema Nacional de Trânsito (SNT) é composto por diversos órgãos responsáveis por planejar, normatizar, fiscalizar e executar as políticas de trânsito em todo o Brasil. Conhecer esses órgãos é essencial para entender como funciona a gestão do trânsito no país.
      </p>

      {/* Seção 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          1. CONTRAN – Conselho Nacional de Trânsito
        </h2>
        <p className="text-gray-700">
          É o órgão máximo normativo do SNT. Define regras gerais e diretrizes da política nacional de trânsito. Também regulamenta resoluções aplicadas a todo o país.
        </p>
      </section>

      {/* Seção 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          2. DENATRAN (agora SENATRAN) – Secretaria Nacional de Trânsito
        </h2>
        <p className="text-gray-700">
          Responsável por coordenar e supervisionar os órgãos executivos de trânsito. Administra o Registro Nacional de Veículos Automotores (RENAVAM) e o Registro Nacional de Condutores Habilitados (RENACH).
        </p>
      </section>

      {/* Seção 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          3. DETRAN – Departamento Estadual de Trânsito
        </h2>
        <p className="text-gray-700">
          Atua em cada estado. É responsável por emitir e renovar a CNH, licenciar veículos, aplicar multas estaduais e realizar exames teóricos e práticos.
        </p>
      </section>

      {/* Seção 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          4. PRF – Polícia Rodoviária Federal
        </h2>
        <p className="text-gray-700">
          Responsável pela fiscalização e segurança nas rodovias federais. Atua na prevenção de acidentes, combate ao crime e educação no trânsito.
        </p>
      </section>

      {/* Seção 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          5. CIRETRAN – Circunscrição Regional de Trânsito
        </h2>
        <p className="text-gray-700">
          São unidades regionais do DETRAN que atendem a população fora das capitais. Prestam os mesmos serviços do DETRAN de forma descentralizada.
        </p>
      </section>

      {/* Seção 6 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          6. JARI – Junta Administrativa de Recursos de Infrações
        </h2>
        <p className="text-gray-700">
          Responsável por julgar recursos contra multas de trânsito aplicadas pelos órgãos executivos. Todo cidadão tem o direito de recorrer a ela.
        </p>
      </section>

      {/* Dica final */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-gray-800 rounded-md mb-10">
        <strong>Dica:</strong> Conhecer os órgãos de trânsito ajuda você a saber onde buscar informações, resolver pendências e exercer seus direitos como cidadão no trânsito.
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-10 bg-yellow-600 text-white px-5 py-3 rounded hover:bg-yellow-700 font-semibold transition"
      >
        ← Voltar à Home
      </button>
    </div>
  );
}
