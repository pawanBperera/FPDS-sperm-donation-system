import React from 'react';
export function SummaryCards({ summary }) {


  return (


    
   <div className="flex justify-center gap-6 mb-8 max-w-4xl mx-auto">
  {[
    { label: 'Total Donors', value: summary.totalDonors, icon: '👤' },
    { label: '% High Risk', value: `${summary.pctHighRisk}%`, icon: '⚠️' },
    { label: 'Top Age Group', value: summary.topAgeGroup, icon: '👥' },



  ].map((card, i) => (
    <div
      key={i}
      className="bg-white rounded-full px-8 py-6 flex flex-col items-center text-center shadow-md flex-1"
    >
      <span className="text-3xl mb-2">{card.icon}</span>
      <p className="text-sm text-gray-500 mb-1">{card.label}</p>
      <p className="text-2xl font-semibold">{card.value}</p>
    </div>
  ))}



</div>

  );
}
