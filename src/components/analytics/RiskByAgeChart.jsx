import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function RiskByAgeChart({ data }) {
  return (
    <BarChart
      width={450}
      height={250}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }} // Add margins for better layout
    >
      <XAxis dataKey="ageGroup" />
      <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} /> {/* Set domain for percentage range */}
      <Tooltip formatter={(value) => `${value}%`} />
      <Bar
        dataKey="riskPct"
        fill="#8884d8" // Add a fill color
        radius={[4, 4, 0, 0]}
        barSize={30} // Set a fixed bar width for consistency
      />
    </BarChart>
  );
}
