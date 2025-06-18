import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sinalizacao() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-yellow-600 flex items-center gap-3">
        <span>🚦</span> Sinalização de Trânsito
      </h1>

      <p className="mb-6 text-gray-700 text-lg leading-relaxed">
        A sinalização de trânsito é fundamental para organizar, orientar e garantir a segurança nas vias públicas. Ela informa condutores, ciclistas e pedestres sobre as regras, perigos, orientações e serviços existentes no local.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          Tipos de Sinalização
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-800">
          <li>
            <strong>Sinalização Vertical:</strong> Placas instaladas ao lado ou sobre a via que transmitem mensagens de regulamentação, advertência ou indicação.
          </li>
          <li>
            <strong>Sinalização Horizontal:</strong> Marcas pintadas diretamente no pavimento, como faixas de pedestres, linhas de divisão de pistas, setas indicativas, entre outras.
          </li>
          <li>
            <strong>Sinalização Luminosas:</strong> Semáforos que controlam o fluxo de veículos e pedestres com luzes verde, amarelo e vermelho.
          </li>
          <li>
            <strong>Sinalização Sonora e Gestual:</strong> Utilizadas por agentes de trânsito ou equipamentos sonoros para orientar o tráfego.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          Exemplos de Placas de Trânsito
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <img
              src="src/Images/placa-pare.png"
              alt="Placa de Pare"
              className="mb-2 w-24 h-24 object-contain"
            />
            <span className="font-semibold">Pare</span>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="src/Images/proibido-estacionar.png"
              alt="Placa de Proibido Estacionar"
              className="mb-2 w-24 h-24 object-contain"
            />
            <span className="font-semibold">Proibido Estacionar</span>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="src/Images/proibido-parar.png"
              alt="Placa de Proibido Parar"
              className="mb-2 w-24 h-24 object-contain"
            />
            <span className="font-semibold">Proibido Parar</span>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="src/Images/velocidade.png"
              alt="Placa de Velocidade Máxima"
              className="mb-2 w-24 h-24 object-contain"
            />
            <span className="font-semibold">Velocidade Máxima 60 km/h</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b-2 border-yellow-400 pb-2">
          Importância da Sinalização
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Uma boa sinalização previne acidentes e melhora o fluxo de veículos e pedestres, diminuindo congestionamentos e conflitos nas vias.  
          Ignorar a sinalização é uma das principais causas de acidentes de trânsito.
        </p>

        <p className="text-gray-700 leading-relaxed">
          É responsabilidade de todos os usuários do trânsito respeitar as sinalizações para garantir segurança e mobilidade eficiente.
        </p>
      </section>

      <button
        onClick={() => navigate('/')}
        className="mt-10 bg-yellow-600 text-white px-5 py-3 rounded hover:bg-yellow-700 font-semibold transition"
      >
        ← Voltar à Home
      </button>
    </div>
  );
}
