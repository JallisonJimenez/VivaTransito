// src/pages/Progresso.tsx
import { PieChart, Pie, Cell, Legend, } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.tsx'; // ajuste conforme a estrutura

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
  

const dataSets = [
  {
    title: 'Direção Defensiva',
    data: [
      { name: 'Fácil', value: 43.5, color: '#ec7e2d' },
      { name: 'Médio', value: 26.1, color: '#ff0000' },
      { name: 'Difícil', value: 17.4, color: '#ffff00' },
      { name: 'Erros', value: 13, color: '#ffd700' },
    ],
  },
  {
    title: 'Mecânica Básica',
    data: [
      { name: 'Fácil', value: 26.8, color: '#90ee90' },
      { name: 'Médio', value: 44.6, color: '#00e5ff' },
      { name: 'Difícil', value: 10.7, color: '#ccff90' },
      { name: 'Erros', value: 17.9, color: '#00c853' },
    ],
  },
  {
    title: 'Legislação de Transito',
    data: [
      { name: 'Fácil', value: 13.2, color: '#ff80ab' },
      { name: 'Médio', value: 19.7, color: '#9c4dcc' },
      { name: 'Difícil', value: 27.6, color: '#ba68c8' },
      { name: 'Erros', value: 39.5, color: '#ff5252' },
    ],
  },
];

export default function Progresso() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="border rounded px-3 py-2 w-1/2"
        />
        <div className="flex gap-2 items-center">
          <Button onClick={() => navigate(-1)}>Voltar</Button>
          <div
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <span className="text-xl">👤</span>
          </div>
        </div>
      </div>

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
    </div>
  );
}