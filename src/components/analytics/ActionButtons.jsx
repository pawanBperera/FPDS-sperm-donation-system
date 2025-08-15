import React from 'react';
export function ActionButtons({ onDownload, onUpdate }) {


  
  return (
    <div className="action-buttons">
      <button
        onClick={onDownload}
        className="action-button icon"
      >
        <span className="icon">⬇️</span>
        Download Report
      </button>
      <button
        onClick={onUpdate}
        className="action-button icon"
      >
        <span className="icon">🔄</span>
        Update Data
      </button>
    </div>
  );
}
