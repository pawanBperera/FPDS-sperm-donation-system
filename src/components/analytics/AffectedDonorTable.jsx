import React from 'react';
export function AffectedDonorTable({ rows }) {


  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mb-8">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            {['Donor ID', 'Age', 'Location', 'Risk Level', 'Date'].map((h) => (
              <th key={h} className="py-2">{h}</th>
            ))}
          </tr>
        </thead>



        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{r.id}</td>
              <td>{r.age}</td>
              <td>{r.province}</td>
              <td className={r.riskLevel === 'High' ? 'text-red-500' : 'text-green-500'}>
                {r.riskLevel}
              </td>
              <td>{new Date(r.timestamp).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}
