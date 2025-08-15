import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function RiskByAgeChart({ data }) {



  return (
    <BarChart
      width={450}
      height={250}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }} 
    >
      <XAxis dataKey="ageGroup" />
      <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} /> 
      <Tooltip formatter={(value) => `${value}%`} />


        
      <Bar
        dataKey="riskPct"
        fill="#8884d8" 
        radius={[4, 4, 0, 0]}
        barSize={30} 
      />

      
    </BarChart>



  );
}
