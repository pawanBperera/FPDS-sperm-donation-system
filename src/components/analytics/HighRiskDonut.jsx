import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#EF4444', '#10B981'];

export function HighRiskDonut({ highRisk, lowRisk }) {
  const pieData = [
    { name: 'High Risk', value: highRisk },
    { name: 'Low/No Risk', value: lowRisk },
  ];
  return (
    <PieChart width={300} height={250}>
      <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={80}>
        {pieData.map((_, idx) => (
          <Cell key={idx} fill={COLORS[idx]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
